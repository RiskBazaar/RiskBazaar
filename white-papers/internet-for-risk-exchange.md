# RiskBazaar – The internet for risk exchange

Authors: Michael Folkson, Alexandra Groetsema, Nathan Basanese
Email: michael, alexandra, nathan @riskbazaar.org

This is an update on “Building a risk market for the digital age” published in August 2015.

Individuals can now send information and currency directly, peer-to-peer to another individual located anywhere in the world. RiskBazaar is in the process of enabling individuals to do the same with risk exposures. There are no barriers to anyone with an internet connection to use the platform to offload risk exposures (e.g. policyholder) or accept them (e.g. insurer). Before Bitcoin, this wouldn’t have been possible. Strong regulatory safeguards were required to ensure databases weren’t tampered with and reserves weren’t stolen. Now public blockchains such as Bitcoin can provide the backbone for a new insurance industry and a platform for permissionless innovation. Setting up an insurance company in the regulated financial system typically requires millions of dollars in capital and months of regulatory submissions. Unless there is strong evidence of unmet demand for a new class of insurance or a contract for a new risk type, it is not rational for an incumbent to launch one. On RiskBazaar, two parties will be able to enter into a new risk contract within seconds.

Risk contracts

We define a risk contract as “a contract that pays out conditional on the occurrence of a future event”. We decided it was necessary to define this new term for a number of reasons.

•	The RiskBazaar platform will be able to facilitate wagers, conditional payments and insurance contracts. We required a catch all term for any contract that transfers risk.
•	We wish to avoid discussion on whether the contracts being entered into on the platform are wagers or insurance contracts. Our primary objective is to build a dependable, scalable platform that can eventually be entrusted with higher value and more complex insurance products rather than seeking to analyze early users’ motivations for entering into contracts.
•	The blockchain ecosystem is still in an experimental phase. The pre-existing financial system has whole industries built around each risk type (e.g. insurance, market, credit, operational, regulatory) though they do not transfer risk exposures directly peer-to-peer. We do not know at this stage which types of risk contracts will be most popular on our platform but will observe usage on the platform when deciding which specific insurance contracts to provide extra support for.

To demonstrate the need for the use of the term ‘risk contract’, consider these three examples. Alice and Bob are friends who support opposing soccer teams that are playing each other this weekend in a semi-final.

•	Alice and Bob agree to make a wager with Alice betting on her team and Bob betting on his. This is clearly a wager (or bet).
•	Bob is worried that if his team loses, he will be depressed. He seeks a payout to cheer him up in the event of his team losing. Alice agrees to insure him against his team losing. This is an insurance contract though admittedly an unconventional one.
•	Alice and Bob would like to go to the final but only if their team successfully reaches the final. Alice and Bob agree to transfer funds into a contract that pays out the value of the ticket price to whomever has a team in the final. The lucky individual who ends up going to the final will end up attending at a significantly reduced price. This contract is a conditional payment.

Some may also question why a marketplace for insurance would facilitate other contracts such as wagers and conditional payments. There are two main reasons. Firstly, both the technology (Bitcoin multi-signature transactions) and the economics of the transaction are the same for P2P wagers and P2P insurance contracts. As Tim Harford states: “Both the gambler and the insurer agree that money will change hands depending on what transpires in some unknowable future.” Secondly, it is generally wise to first build a platform for toy contracts or contracts transferring small amounts of value rather than complex insurance products that pay out larger amounts and typically cover tail risks. Conventional insurance products are depended upon in times of distress and this doesn’t encourage a mindset for experimentation and a tolerance for failure. Our approach has historical parallels too. It is not widely known but the first historical record referring to the insurance marketplace Lloyd’s of London was a newspaper advertisement in the 1680s offering reward payments for information on stolen watches. Experimental business models and new technologies need to prove themselves using simple transactions before they can be trusted with high value, complex contracts. This was demonstrated by the failure of the decentralized venture fund ‘The DAO’ built on the Ethereum blockchain that at one stage held over $150 million. We believe we should learn to crawl before we learn how to run.

To begin with, we will be ensuring all risk contracts on RiskBazaar are fully collateralized. We identify three options for risk contracts that are on-blockchain in an unregulated environment:

•	Fully collateralized – Lock up funds totaling the full limit of each policy
•	Partially collateralized (with non-legally binding guarantee) – Requires trust in the insurer to compensate the policyholder if the claim is higher than the allocated reserve in an unregulated environment
•	Partially collateralized (no guarantee) – Attempt to convince policyholders to enter into an arrangement that may not be able to compensate them in the event of an unlikely set of claims

Regulated insurance companies offer partially collateralized insurance contracts with a legally binding guarantee. (It is worth noting that if the insurance company goes insolvent it is by no means guaranteed you will receive the full claim amount.) If you buy an insurance policy from them with a limit of say $100, the insurance company will not hold $100 as a reserve in case you make a claim for the full amount. Instead they will pool your policy with many others and actuaries will estimate how many claims there will be across the whole pool and the average size of those claims. Regulators sign off these estimates. If the actual claims are higher than the reserves held, insurance companies will dip into contingency reserves. They will also typically buy reinsurance contracts (insurance for insurers) in case the claims exhaust all of their reserves. In our opinion, it is highly unlikely that regulated reinsurers will reinsure on-blockchain insurance arrangements whilst they are unregulated. We seek to facilitate the transfer of risk exposures immediately and therefore take the view that at this stage all risk contracts on RiskBazaar should be fully collateralized (i.e. an insurance policy with a limit of $100 should have a reserve for the full $100).

This does restrict the types of risk contracts that can be entered into on the platform. It is clearly not viable to fully collateralize risk contracts that have high (or no) limits over long time periods. Few investors will be interested in locking away millions of dollars in a Bitcoin multi-signature address earning no interest over a 10 year period. (In future we expect there to be crypto-assets that pay coupons or dividends on the blockchain.) The ideal contracts for RiskBazaar at this stage will be over shorter time periods with low, defined limits. Some of these will be conventional insurance products (e.g. weather), others will be novel insurance products (e.g. exam insurance) and some may be futuristic insurance (e.g. machines insuring other machines). The back end technology will be the same in all cases; two parties transferring funds to a 2-of-3 multisig address with a moderator to rule in the case of dispute. 

RiskBazaar, like OpenBazaar relies on multisignature transactions on the Bitcoin blockchain. Standard Bitcoin transactions or single-signature transactions require only one signature from the owner of the private key associated with the Bitcoin address. In contrast, M-of-N multi-signature transactions require the signatures of several people before funds can be transferred. Users entering into a contract on RiskBazaar will have the choice of using 2-of-2 multisignature transactions (no moderator) or 2-of-3 multisignature transactions (with a moderator who receives a small fee). We expect users to predominantly enter into 2-of-2 multisignature transactions in the earlier phases of RiskBazaar as they enter into contracts with people they know and trust. However, as the platform matures and especially as insurance products proliferate, we expect most transactions to be 2-of-3.

The following diagram shows how conventional insurance works. An insurance company collects premiums on a multitude of policies into a pool and pays claims out of this pool. If the pool is depleted it has access to pools of capital supplied by its investors (debtholders and equityholders) or reinsurers. An investor in the insurance company is not assigned a particular policyholder or even a particular risk type.

 

The following is a typical RiskBazaar transaction. It is directly peer-to-peer; there are only two individuals who provide funds and those funds are locked on the Bitcoin blockchain rather than held by the insurance company.

 


We have built a prototype made up of a generalized wager platform and our first supported conventional insurance product: transaction insurance on OpenBazaar. 

Generalized Wager Platform

Two individuals will be able to use the generalized wager platform to speculate on the occurrence of any future event. The originator is the individual who completes the original form. The counterparty is the individual who receives the proposed wager and can decide whether to accept or reject the terms. The required fields in the form to be completed by the originator include a description of the event being speculated upon, the identity of the counterparty and the proposed stakes the originator and counterparty will be required to post if the counterparty agrees to the wager. The originator will also be able to assign a moderator in case there is a future dispute between the two parties on whether the event occurred or not.

Below is a screenshot of a completed form that the originator is able to submit to the counterparty (opponent) for review.

 


When the originator completes the form, it is obviously important that the wording of the future event is unambiguous so that it is easily determined who won the wager (by both the participants in the wager and the moderator if assigned). The event described must have binary outcomes (i.e. Yes/No) and it must be possible to determine whether the event occurred or not. If it is not, the participants in the contract risk being returned to the prior state they were in before they entered into the contract (i.e. the original stakes posted at the creation of the contract are returned to the original owners).

The events that can be speculated upon range from public events (e.g. result of US Presidential election) to private events (e.g. result of a table tennis game with a friend). The latter is more interesting to us because insurance contracts are generally focused on personal events rather than public events but as discussed previously we will not be restricting how users choose to use our platform. (Additionally it is more enjoyable for user testers to set up creative wagers than it is insurance products)

 


Some contracts will be similar to the events of prediction markets such as Augur. However, RiskBazaar does not require the initial liquidity that a prediction market requires on set up as it can be settled with only two parties. Also Augur distributes the reporting function amongst a network of Reputation (REP) token holders. At the current time, users on RiskBazaar choose one particular moderator to adjudicate in the case of a dispute. This reduces the period of reporting from up to 8 weeks whilst the network collects all the necessary reports on Augur to less than a minute if the moderator responds instantly to a notification. However, it does concentrate power in the hands of the chosen moderator. RiskBazaar chooses to address this through a decentralized reputation system rather than collecting reports from a distributed network of moderators.




OpenBazaar

The first conventional insurance product supported on RiskBazaar will be transaction insurance for the OpenBazaar marketplace. As explained in ‘Building a risk market for the digital age’, OpenBazaar allows individuals to conduct peer-to-peer (P2P) e-commerce. You can buy directly from a merchant using a protocol like the internet protocol TCP/IP. There is no centralized entity like Ebay to charge a toll and govern the trade that is conducted on the marketplace. As with all technological advances, there are pros and cons to decentralized trade but we believe the former greatly outnumber the latter.

Below is a screenshot of a completed form that the originator is able to submit to the counterparty (insurer) for review.

 

This form is tailored to one specific insurance product (rather than generalized wagers) and as a result there is much less potential ambiguity. It is also advantageous from a user experience perspective that some fields can be auto-filled from the OpenBazaar order details. The current prototype requires the user to copy and paste the order details JSON from the OpenBazaar application but future versions will have the order details update automatically. The premium that the counterparty (the insurer) accepts as sufficient will depend on the reputation of the originator (and the moderator if assigned) as well as other risk factors such as the delivery method. As with wagers, the counterparty will be able to accept, reject or negotiate the terms proposed by the originator.



Reputation

Most e-commerce platforms rely on reputation systems to some extent and there are several effective ones in operation on Ebay, Airbnb, Uber etc. These are all controlled and maintained by the owner of the platform who has the ability to use manual intervention and secrecy to defend the system from attack (e.g. Sybil attacks), retaliation and collusion. However, it is not possible for users to transfer the reputation score they have accumulated on one platform to another or be easily assessed cross platform. Building a decentralized reputation system that is censorship resistant and not controlled by any one party is a new frontier.

Identity is the first layer of a reputation system. Reputation data can be cryptographically linked to an online identity but if you are unsure of the identity of the individual you are transacting with, that reputation data is of no value. Blockstack provides a decentralized identity solution on the blockchain that can be linked to other online identities. Not only does this allow users to truly own an online identity rather than a corporation but it also allows them to prove with increasing probability that they are who they say they are. The more accounts you prove you control (Facebook, Twitter, GitHub) associated with that real world identity and the more private keys you prove you own (Bitcoin, PGP, RSA) the more confident a third party can be that they are transacting with who you say you are. The introduction of Bitcoin and blockchains has accelerated the movement towards cryptographic identities. Rather than a corporation owning your online identity, with a public, private keypair we expect it to become increasingly common to control your own portable online identity through digital signatures using your private key.

However, centralized platforms such as Facebook generally try to restrict how many Facebook accounts you set up. An individual can generate as many public-private keypairs and own as many Blockstack IDs as they wish. For a decentralized application like OpenBazaar, this means it is particularly vulnerable to Sybil attacks. Sybil attacks occur when a single individual or organization can generate multiple identities at little cost (both time and money) and are able to distort their reputation score by entering into unlimited transactions with their alternate identities. 

Austin Williams has proposed what we are referring to Austin’s Square (inspired by Zooko’s Triangle). Its hypothesis is that a ratings or reputation system cannot be all four of the following (assuming a reasonable security model):

1)	Decentralized (no trusted third parties)
2)	Free/cheap for the users
3)	Resistant to Sybil attacks
4)	Anonymous/private for those leaving the ratings

Zero knowledge proofs may present an opportunity to achieve all four in future though they are still an emerging field and at least for now are computationally expensive.

It is possible to build a reputation system with three of these four qualities. There are solutions being built for OpenBazaar that relax the first property with a trusted agency certifying identities. DuoSearch is building a centralized search engine for OpenBazaar. One of the additional services it provides at the time of writing is a discretionary “Trusted Store” badge for stores that meet various checks and due diligence requirements. Cross platform reputation solutions such as Bitrated or Traity may also in future build a reputation system on OpenBazaar. They may build a third party API or plug-in to interact with the OpenBazaar protocol and leverage tools such as coin analytics to identify and reduce the impact of sybils. An alternative for a decentralized protocol seeking to not be dependent on centralized services is to relax the fourth property. We expect that many users will be happy to forego anonymity and broadcast transactional data to the network in order to build up a reliable and free reputation score. However, we do not wish to force a particular solution on any individual and strongly support a user’s ability to opt-in or opt-out of any reputation solution.

An additional challenge for decentralized reputation is that the reputation data is stored on multiple servers (in this case IPFS nodes) maintained by a large number of distinct users. To retrieve the data on a particular user, the network must be crawled. If you don’t use a third party service, your node has to carry out this work (download every individual review). This is time consuming especially if you need to do this every time you wish to assess a user’s reputation. There are additional challenges such as users only hosting reviews that are positive and not hosting their negative reviews. And once the data has been collected, metrics need to be calculated such as the average review score. It is unlikely that at this stage, end users will put up with the poor user experience caused by the requirement to complete all this computation every time they use the protocol. This provides opportunities to third parties such as DuoSearch or Oraclize who could crawl the network and complete verifiable computation. 

Moderators

The first layer of protection for buyers on the OpenBazaar protocol is the reputation system that allows them to assess the past history of vendors on the marketplace. The second layer of protection is the ability to assign a moderator to adjudicate in the case of a dispute between the buyer and the vendor. Moderators cannot access the funds held at the multisignature address. As described earlier, transferring funds from a 2 of 3 Bitcoin multisignature requires digital signatures from two of the three parties. However, moderators can collude with either the buyer or the vendor to defraud the other party. They can also attempt to profit from a dispute by selling their digital signature to the highest bidder. Therefore, a reputation system is a critical part of ensuring moderators are held accountable. Our expectation is that the role of the moderator will professionalize over time as usage of the protocol grows and the moderator opportunity becomes more lucrative. However, in the early phases of OpenBazaar and RiskBazaar, the ability to assess a moderator’s reputation, using both formal and informal tools, will be critical.

The third (optional) layer of protection at least for users of OpenBazaar will be transaction insurance on RiskBazaar. In an insurance setting, moderators are equivalent to the claims handlers. RiskBazaar is in the process of unbundling the insurance company. It will provide an opportunity for independent claims handlers with no affiliation to a particular insurer or investor to generate revenue. Just as Bitcoin relies on coinbase transactions and transaction fees to incentivize miners to secure the network, the promise of a stream of moderator fees will incentivize moderators to act honestly on RiskBazaar. Those that act dishonestly or incompetently will not build up reputation scores to ensure they are chosen as moderators in future transactions.

Phases for RiskBazaar

Balaji Srinivasan stated that “for a while, to get useful applications with digital currency, you’re going to want to centralize everything other than the payment network itself”. Our prototype follows this thought process and relies on centralized servers and a centralized database (MongoDB). The diagram below shows the software architecture for the current RiskBazaar prototype. Although the payments and the holding of funds is done in a decentralized manner using the Bitcoin blockchain, the server and the database are both centralized.

 


However, due to the regulatory uncertainty surrounding blockchain applications we will need to follow the precedent set by OpenBazaar and Augur in building a decentralized, censorship resistant application. Citizens all over the world are used to doing peer-to-peer wagers and settling in physical cash and it is inevitable they will be able to do so with cryptocurrency. The application of peer-to-peer insurance excites us more from a social utility perspective and we hope that regulators and governments will be supportive. However, we certainly don’t want to be in a position where we can be shut down on the whim of any one regulator or government. Therefore the plan is to gradually decentralize the application and leverage the OpenBazaar protocol being built for decentralized trade. There is a reason why all digital currencies pre-Bitcoin failed or were shut down. Bitcoin has been running without interruption since 2009 and no national government or regulator has the power to stop the software being run in every jurisdiction across the world.

We have started work on decentralizing the two currently centralized elements (database and server) by using IPFS just like OpenBazaar. Limited resources and a desire to experiment with a simpler, better understood architecture led us to build the former first. It is challenging to fully decentralize application code and still provide a seamless user experience and expect OpenBazaar to be one of the first widely used applications to achieve it. The decentralized RiskBazaar application is both inspired by and utilizing the work done in building the OpenBazaar application. When you download the OpenBazaar application, you automatically install both a server and a client. The current version of OpenBazaar requires stores to have their servers continually running for users to be able to access your store. If you disconnect from the internet, your store is no longer visible to the rest of the network though there are third party hosting solutions to address this problem. The upcoming version 2.0 of OpenBazaar will be built on IPFS so other nodes will be able to seed your content.

 


Conclusion

There is lots of hype around blockchains at the time of writing with financial institutions seeking to upgrade their back-end systems using some variant of a “blockchain”. We subscribe to Chris Dixon’s view that it will be a full stack startup, one that builds “a complete end-to-end product or service” that will truly capitalize on the promise and potential of public blockchains such as Bitcoin. A full stack startup can control the customer experience from start to finish, extricate oneself from the legacy systems of large incumbents and avoid the inertia caused by cannibalization concerns. It is ambitious and requires many interlocking pieces but once accomplished it is very difficult for a competitor to replicate. Ambition and vision also makes it easier to attract the talent that is arguably the most valuable resource. Bitcoin is a brand new architecture and a bottom-up reinvention of money that presents opportunities to those willing and able to start from first principles.












Acknowledgements

We would like to thank the OpenBazaar community for inspiring the creation of RiskBazaar but particularly Dr Washington Sanchez, Austin Williams and Chris Pacia for their contributions to the discussion and prior work completed. No acknowledgement would be complete in this space without thanking the original cypherpunks and particularly Ian Grigg and Nick Szabo for laying the intellectual foundations for Bitcoin, Ricardian contracts and what has been popularized as smart contracts. 
Bibliography
Ali, M., Nelson, J., Shea, R., & Freedman, M. J. (2016). Blockstack: A Global Naming and Storage System Secured by Blockchains. Retrieved from Blockstack: https://blockstack.org/blockstack.pdf
Antonopoulos, A. (2014). Mastering Bitcoin: Unlocking Digital Cryptocurrencies. O'Reilly.
Benet, J. (2014). IPFS - Content Addressed, Versioned, P2P File System. Retrieved from arxiv.org: https://arxiv.org/pdf/1407.3561v1.pdf
Blockstack. (2016). Linking your OpenBazaar GUID to your Blockstack ID. Retrieved from GitHub: https://github.com/blockstack/blockstack-cli/blob/master/docs/openbazaar.md
Dixon, C. (2014). Full stack startups. Retrieved from cdixon blog: http://cdixon.org/2014/03/15/full-stack-startups/ 
Douceur, J. R. (n.d.). Microsoft. Retrieved from The Sybil Attack: https://www.microsoft.com/en-us/research/wp-content/uploads/2002/01/IPTPS2002.pdf
Drake, K. (2015). HTTP is obsolete. It's time for the distributed, permanent web. Retrieved from ipfs.io: https://ipfs.io/ipfs/QmNhFJjGcMPqpuYfxL62VVB9528NXqDNMFXiqN5bgFYiZ1/its-time-for-the-permanent-web.html
DuoSearch. (2016). Trusted OpenBazaar stores. Retrieved from Duo Search Blog: https://blog.duosear.ch/trusted-openbazaar-stores-7129dd34360b#.y2jdtdmsz
Folkson, M. (2015). Building a risk market for the digital age. Retrieved from https://www.riskbazaar.org/RiskBazaar_whitepaper.pdf
Folkson, M. (2016). Moderators - the key to P2P contracts. Retrieved from Medium: https://medium.com/@therealopenbazaar/moderators-the-key-to-p2p-contracts-e0692e9a7647#.iroj5f96k
Folkson, M. (2016). RiskBazaar - Avoiding the temporary cracks in crypto-utopia. Retrieved from Medium: https://medium.com/@RiskBazaar/riskbazaar-avoiding-the-temporary-cracks-in-crypto-utopia-65c1c2229390#.obu1q3dfe
Folkson, M. (2016). RiskBazaar - Sometimes the revolution is bubbling below the surface. Retrieved from Medium: https://medium.com/@RiskBazaar/riskbazaar-sometimes-the-revolution-is-bubbling-below-the-surface-fe1d9a760459#.yuzk3mred
Grigg, I. (2004). The Ricardian contract. Retrieved from iang.org: http://iang.org/papers/ricardian_contract.html
Harford, T. (2017). 50 Things That Made the Modern Economy . Retrieved from www.bbc.co.uk: http://www.bbc.co.uk/programmes/p04r1sjb
Hariharan, A. (2016). a16z. Retrieved from All about Network Effects: http://a16z.com/2016/03/07/all-about-network-effects/
Lee, T. (2016). Venture capitalist Marc Andreessen explains how AI will change the world. Retrieved from Vox: http://www.vox.com/new-money/2016/10/5/13081058/marc-andreessen-ai-future
Litos, O., & Zindros, D. (2016). Trust is Risk. Retrieved from GitHub: https://github.com/OrfeasLitos/TrustIsRisk
Lloyd's of London. (n.d.). History & Chronology. Retrieved from lloyds.com: http://www.lloyds.com/~/media/lloyds/reports/top%20100%20pdfs/lloydshistoryandchronologyfactsheet2.pdf
Lundkvist, C. (2015). IPFS Introduction by Example. Retrieved from What does the quant say?: http://whatdoesthequantsay.com/2015/09/13/ipfs-introduction-by-example
Mougayar, W. (2016). The Business Blockchain. Wiley.
Pacia, C. (2016). OpenBazaar - High level overview. Retrieved from GitHub: https://github.com/OpenBazaar/docs/blob/master/protocol/docs/overview.md
Peterson, J., & Krug, J. (2015). Augur: a Decentralized, Open-Source Platform for Prediction Markets. 
Poon, J., & Dryja, T. (2016). The Bitcoin Lightning Network: Scalable Off-Chain Instant Payments. 
Sanchez, W. (2015). OpenBazaar Blog. Retrieved from Oracles and Risk Contracts in OpenBazaar: https://blog.openbazaar.org/oracles-and-risk-contracts-in-openbazaar/
Sanchez, W. (2016). The Case for Dumb Contracts. Retrieved from Medium: https://medium.com/@therealopenbazaar/the-case-for-dumb-contracts-6308aa5b757#.b2im399yl
Srinivasan, B., & Pande, V. (2013). Startup Engineering. Retrieved from https://class.coursera.org/startup-001
Szabo, N. (2008). Wet code and dry. Retrieved from Unenumerated: http://unenumerated.blogspot.co.uk/2006/11/wet-code-and-dry.html
Tarun, P. (2016). The future is now: Why machines will take over our wallets. Retrieved from Mixpanel: https://blog.mixpanel.com/2016/10/04/machine-payable-web/
Tempany, M. (2016). Lemonade - a reason to start from scratch. Retrieved from LinkedIn: https://www.linkedin.com/pulse/case-starting-from-scratch-michael-tempany
Traity. (2015). Decentralized Identity and Reputation. Retrieved from Traity: https://traity.org/decentralized-identity-and-reputation
Wikipedia. (n.d.). Ricardian Contract. Retrieved from Wikipedia: https://en.wikipedia.org/wiki/Ricardian_Contract
Wikipedia. (n.d.). Smart contract. Retrieved from Wikipedia: https://en.wikipedia.org/wiki/Smart_contract

