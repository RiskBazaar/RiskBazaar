import json
import nacl.signing
import os
import time
from binascii import unhexlify
from collections import OrderedDict
from constants import DATA_FOLDER
from dht.utils import digest
from keyutils.keys import KeyChain
from market.contracts import Contract
from protos.objects import PlaintextMessage


def process_dispute(contract, db, message_listener, notification_listener, testnet):
    """
    This function processes a dispute message received from another node. It checks the
    contract to see if this a dispute for a purchase we made, a dispute for one of our
    sales, or a new case if we are the moderator.
    If it's a purchase or sale it will
    update the order status to disputed and push a notification to the listener.
    If it's a new case it will validate the contract, create a new case in the db,
    and push a notification to the listener.
    Args:
        contract: a json contract of the current order state. Should have a "dispute"
            object attached with dispute info.
        db: a `Database` object.
        message_listener: a `MessageListenerImpl` object.
        notification_listener: a `NotificationListenerImpl` object.
        testnet: `bool` of whether we're on testnet or not.
    """
    tmp_contract = contract
    if "vendor_order_confirmation" in tmp_contract:
        del tmp_contract["vendor_order_confirmation"]
    if "buyer_receipt" in tmp_contract:
        del tmp_contract["buyer_receipt"]

    order_id = digest(json.dumps(tmp_contract, indent=4)).encode("hex")
    own_guid = KeyChain(db).guid.encode("hex")

    if contract["dispute"]["info"]["guid"] == contract["vendor_offer"]["listing"]["id"]["guid"]:
        guid = unhexlify(contract["vendor_offer"]["listing"]["id"]["guid"])
        signing_key = unhexlify(contract["vendor_offer"]["listing"]["id"]["pubkeys"]["guid"])
        if "blockchain_id" in contract["vendor_offer"]["listing"]["id"]:
            handle = contract["vendor_offer"]["listing"]["id"]["blockchain_id"]
        else:
            handle = ""
        encryption_key = unhexlify(contract["vendor_offer"]["listing"]["id"]["pubkeys"]["encryption"])
        proof_sig = contract["dispute"]["info"]["proof_sig"]
    elif contract["dispute"]["info"]["guid"] == contract["buyer_order"]["order"]["id"]["guid"]:
        guid = unhexlify(contract["buyer_order"]["order"]["id"]["guid"])
        signing_key = unhexlify(contract["buyer_order"]["order"]["id"]["pubkeys"]["guid"])
        if "blockchain_id" in contract["buyer_order"]["order"]["id"]:
            handle = contract["buyer_order"]["order"]["id"]["blockchain_id"]
        else:
            handle = ""
        encryption_key = unhexlify(contract["buyer_order"]["order"]["id"]["pubkeys"]["encryption"])
        proof_sig = None
    else:
        raise Exception("Dispute guid not in contract")

    verify_key = nacl.signing.VerifyKey(signing_key)
    verify_key.verify(json.dumps(contract["dispute"]["info"], indent=4),
                      contract["dispute"]["signature"])

    p = PlaintextMessage()
    p.sender_guid = guid
    p.handle = handle
    p.signed_pubkey = signing_key
    p.encryption_pubkey = encryption_key
    p.subject = order_id
    p.type = PlaintextMessage.Type.Value("DISPUTE_OPEN")
    p.message = contract["dispute"]["info"]["claim"]
    p.timestamp = time.time()
    p.avatar_hash = contract["dispute"]["info"]["avatar_hash"]

    if db.Purchases().get_purchase(order_id) is not None:
        db.Purchases().update_status(order_id, 4)

    elif db.Sales().get_sale(order_id) is not None:
        db.Purchases().update_status(order_id, 4)

    elif "moderators" in contract["vendor_offer"]["listing"]:
        # TODO: make sure a case isn't already open in the db
        is_selected = False
        for moderator in contract["vendor_offer"]["listing"]["moderators"]:
            if moderator["guid"] == own_guid and contract["buyer_order"]["order"]["moderator"] == own_guid:
                is_selected = True
        if not is_selected:
            raise Exception("Not a moderator for this contract")
        else:
            if "blockchain_id" in contract["vendor_offer"]["listing"]["id"]:
                vendor = contract["vendor_offer"]["listing"]["id"]["blockchain_id"]
            else:
                vendor = contract["vendor_offer"]["listing"]["id"]["guid"]
            if "blockchain_id" in contract["buyer_order"]["order"]["id"]:
                buyer = contract["buyer_order"]["order"]["id"]["blockchain_id"]
            else:
                buyer = contract["buyer_order"]["order"]["id"]["guid"]

            c = Contract(db, contract=contract, testnet=testnet)

            validation_failures = c.validate_for_moderation(proof_sig)

            db.Cases().new_case(order_id,
                                contract["vendor_offer"]["listing"]["item"]["title"],
                                time.time(),
                                contract["buyer_order"]["order"]["date"],
                                contract["buyer_order"]["order"],
                                float(contract["buyer_order"]["order"]["payment"]["amount"]),
                                contract["vendor_offer"]["listing"]["item"]["image_hashes"][0],
                                buyer, vendor, json.dumps(validation_failures),
                                contract["dispute"]["info"]["claim"])

            with open(DATA_FOLDER + "cases/" + order_id + ".json", 'wb') as outfile:
                outfile.write(json.dumps(contract, indent=4))
    else:
        raise Exception("Order ID for dispute not found")

    message_listener.notify(p, "")
    notification_listener.notify(guid, handle, "dispute_open", order_id,
                                 contract["vendor_offer"]["listing"]["item"]["title"],
                                 contract["vendor_offer"]["listing"]["item"]["image_hashes"][0])


def close_dispute(resolution_json, db, message_listener, notification_listener, testnet):
    """
    This function processes a dispute close message received from the moderator. It will
    store the resolution in the contract and send a notification to the listeners telling
    them that the dispute is resolved.
    Args:
        resolution_json: The `dispute_resolution` portion of the contract received from the moderator.
        db: a `Database` object.
        message_listener: a `MessageListenerImpl` object.
        notification_listener: a `NotificationListenerImpl` object.
        testnet: `bool` of whether we're on testnet or not.
    """

    order_id = resolution_json["dispute_resolution"]["resolution"]["order_id"]

    if os.path.exists(DATA_FOLDER + "purchases/in progress/" + order_id + ".json"):
        file_path = DATA_FOLDER + "purchases/trade receipts/" + order_id + ".json"
    elif os.path.exists(DATA_FOLDER + "store/contracts/in progress/" + order_id + ".json"):
        file_path = DATA_FOLDER + "store/contracts/in progress/" + order_id + ".json"

    with open(file_path, 'r') as filename:
        contract = json.load(filename, object_pairs_hook=OrderedDict)

    for moderator in contract["vendor_offer"]["listing"]["moderators"]:
        if moderator["guid"] == contract["buyer_order"]["order"]["moderator"]:
            moderator_guid = unhexlify(moderator["guid"])
            moderator_handle = moderator["blockchain_id"]
            moderator_pubkey = unhexlify(moderator["pubkeys"]["signing"]["key"])
            moderator_enc_key = unhexlify(moderator["pubkeys"]["encryption"]["key"])
            moderator_avatar = unhexlify(moderator["avatar"])

    verify_key = nacl.signing.VerifyKey(moderator_pubkey)
    verify_key.verify(json.dumps(resolution_json["dispute_resolution"]["resolution"], indent=4),
                      resolution_json["dispute_resolution"]["signature"])

    contract["dispute_resolution"] = resolution_json["dispute_resolution"]

    with open(file_path, 'wb') as outfile:
        outfile.write(json.dumps(contract, indent=4))

    p = PlaintextMessage()
    p.sender_guid = moderator_guid
    p.handle = moderator_handle
    p.signed_pubkey = moderator_pubkey
    p.encryption_pubkey = moderator_enc_key
    p.subject = order_id
    p.type = PlaintextMessage.Type.Value("DISPUTE_CLOSE")
    p.message = resolution_json["dispute_resolution"]["resolution"]["decision"]
    p.timestamp = time.time()
    p.avatar_hash = moderator_avatar

    message_listener.notify(p, "")
    notification_listener.notify(moderator_guid, moderator_handle, "dispute_close", order_id,
                                 contract["vendor_offer"]["listing"]["item"]["title"],
                                 contract["vendor_offer"]["listing"]["item"]["image_hashes"][0])