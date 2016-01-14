//-----------------------------------------------------------------------//
//----------------   GENERAL FITBIT API DETAILS    ----------------------// 
//-----------------------------------------------------------------------//

// Register your application to get an API client credentials. You will need a Fitbit account (free) to register an app.

// OAuth Authentication shows you how to request permission to access a user's data.
		// Fitbit uses OAuth 2.0 for user authorization and API authentication. The OAuth 2.0 framework requires your application to obtain an Access Token when the Fitbit user authorizes your app to access their data. The Access Token is used for making HTTP request to the Fitbit API

//For security consideration, the OAuth 2.0 authorization page must be presented in a dedicated browser view. Fitbit users can only confirm they are authenticating with the genuine Fitbit.com site if they have they have the tools provided by the browser, such as the URL bar and Transport Layer Security (TLS) certificate information. For native applications, this means the authorization page must open in the default browser. Native applications can use custom URL schemes as callback URIs to redirect the user back from the browser to the application requesting permission.
// Web applications may use a pop-up window, so long as the URL bar is visible.

// (RISK BAZAAR WEB APP WILL HAVE OFFICIAL FITBIT LOGIN PAGE FOR USERS TO LOGIN and approve access to data)

// Subscriptions API explains how to subscribe to changes in a user's data to always have the freshest data.

// You can make 150 API requests per hour for each user that has authorized your application to access their data.

// API to retrieve or post Fitbit Data, subscribe to User Data-feeds and render and display information in external applications according to these Terms of Service.

// Flex (one of fitbit's devices) syncs automatically and wirelessly to tablets, computers and 150+ leading iOS, Android and Windows smartphonesusing Bluetooth 4.0 wireless technology. Syncing range: 20 feet, Syncing to computers requires Internet connection and USB port


 //-----------------------------------------------------------------------//
//--------------    IMPLICIT MODE OF AUTHENTICATION  --------------------// 
//-----------------------------------------------------------------------//

// The Implicit Code Grant flow has the following steps:

// Your application redirects the user to Fitbit's authorization page.
// Upon user consent, Fitbit redirects the user back to your application's callback URL with an access token as a URL fragment.
// Your application stores the access token. It will use the access token to make requests to the Fitbit API.

//  Users may specify the lifetime of the access token from the authorization page when an application uses the Implicit Grant flow. The access token lifetime options are 1 day, 1 week, and 30 days (default is 1 day). Applications can pre-select a token lifetime option, but the user ultimately decides.

// If an application using the Implicit Grant flow sends a user to the authorization page before the previously issued access token has expired, the user will not be prompted unless the scope has increased. The user will be redirected immediately to the application with an access token. 


// ******* access token lifetime options are 1 day, 1 week, and 30 days *********** 

//-----------------------------------------------------------------------//
//---------------------  DATA ACCESS LIMITATIONS     --------------------// 
//-----------------------------------------------------------------------//


// All applications have access to day-level data. Minute and second-level data (intraday time series) is reserved feature. -- (will need to email fitbit to get this feature)
// For non-personal use cases, contact us to request access. Include the client id of the application you registered at https://dev.fitbit.com and tell how the data will be used. Fitbit is very supportive of non-profit research and personal projects. Commercial and widely-distributed applications require additional review and are subject to additional requirements if approved.

 
// If your application is for personal use only, you can enable this feature by following the instructions here.
 

//-----------------------------------------------------------------------//
//---------------------  APP SET UP AND APP FLOW     --------------------// 
//-----------------------------------------------------------------------//


// 1) Register you app in dev.fitbit.com where your app will be issued consumer key and consumer secret.
// 2) You need to create an OAuth 2 authorization flow to obtain consent from each user. User A visits your site, connect there Fitbit account to your site. During this process you'll be issued access token and access token secret that you'll need to store somewhere. You can use these access token and access token secret to make api requests to get data for user A only.

// The user should be redirected to your app's redirect_uri with a `state` and `code` URL parameter for the Authorization Code Grant flow. The Implicit Grant flow uses a URL fragment (data after the `#` symbol).


//-----------------------------------------------------------------------//
//---------------------  SUBSCRIPTION API  ------------------------------// 
//-----------------------------------------------------------------------//


// Everytime user clicks "Allow" button Fitbit will be issuing the request to the callback url that you specify in you app settings.
// Once you get the request and exchange your temp token with permanent token you can just create subscription in your code

// Everytime Fitbit will send you push notifications it will be sending user id with it so it should be easy for you to detect what user this push notifications belongs to.



//-----------------------------------------------------------------------//
//-------------------------    Q and A    -------------------------------// 
//-----------------------------------------------------------------------//


// Q: Can a client — that has been set up with a fitbit dev account — access multiple user devices and their respective data— For example, I have multiple family members, who would like me to organize and keep track of their fitbit data info for them. 
// A: Yes, this is possible, but you will need to 'authorize' the family members application through the open authentication protocol (oauth).

// Q. In order to set up a subscription api, do we need to have different authorization from the user in addition to the authorization required for basic api calls?
// A:  Subscriptions are push events from Fitbit, so once a user is authorized on your application, and your subscription endpoint is authorized (you need to do this separately), push events will be sent to your subscription endpoint. It's really just a notification of sorts and you still need to go to the FitBit API to get the latest data.
 
// Q. Currently, is there a way to limit access to a certain devices's data on the basis of time. For example, I grant this source to have access to my activity data for the next 48hrs only. I know there is a expiration date for a dev auth token but is this the same?
// A:  You can if you use the implicit mode you can specific time to expire the access code
 
// Q. As I practice using the fitbit api, is there a testing environment or dummy device data I can work with?
// A: For oauth1 you can set it up on any local environment without a valid URL, or you can use what's available on the dev.fitbit.com portal. Otherwise for oauth2, you need to have a valid url to work with, that fitbit can access. It's one of the caveats of oauth2

// Q. Is there a robust testing fibit dataset I can practice with?
// A. Unfortunately not, you will need 1 fitbit device with data on it. If you search the forums you will see posts from @JeremiahFitbit﻿ where he's discussed authorizing his fitbit device on your application in read-only mode, but it's not the same as a data sandbox environment.
 
// Q. Clarification: consumer key and consumer secret are to authorize a web application. 
// Once a user signs in to Fitbit through my web app, I will get back a unique access token and access token secret that corresponds with that particular user ( so these tokens can be stored in a local database for later api calls ) Is this correct? 
// A. You use the consumer key and consumer secret to form part of the authorization header. The API returns an access token, refresh token and expires date for the access token. You use the access token for each request to the API. After 1 hour the token will automatically expire, regardless how many times you use it, so you will need to use the refresh token to fetch a new access token.
 
// Q. If I am using Authorization mode instead of implicit, is there a way the user can limit the use of refresh tokens?
// A. No, you can view my profile for a recent forum thread that discusses when refresh tokens become invalid a user has to re-authorize their account on your application. They can de-authorize their account on your application and any subsequent requests will need you to re-authorize them. Something that isn't really covered but is extremely important; there is only ever 1 refresh token in existence for an account <=> application relationship. So if you create an application A and user 1 authorizes themselves on your application, then that relationship exists. If that user authorizes themselves again as a new user in your system, but uses the same fitbit account credentials, the old authorization will become invalidated.

// Q: if I have concerns disclosing my private/secret api keys on the web and/or to a third party, is there a way to incorporate signed API (signed requests) with OAuth protocol? Ideally I want to prevent anyone from using my api request information to make other calls that I have not authorized. 
// A: If a third-party has your application's client secret, it could impersonate you. Request signing would not protect you from this in that scenario.

// Q: I've read up that other api's use protocols that sign the url with a secret key making a request authorized but does not contain my secret key, but also can be used by anybody for just this one specific request. Is this something that Fitbit also uses and/or is there a way I can incorporate this to my web app?
// A: OAuth 1.0a uses request signing, however, OAuth 2.0 does not use it. Request signing was necessary with OAuth 1.0a because HTTPS was not required. OAuth 2.0 requires HTTPS.
// A: In order for an evil app to make "calls that [you] have not authorized", the evil app would need to obtain a user access token from your application. If an evil app is capable of obtaining an access token, it is likely also capable of obtaining your client secret, so signing the request would not be beneficial.

// A: I've used HMAC with sufficiently large keys and request timeout limits (built into the hash as well as the request header) in the past without any issues on APIs I've built, but more can certainly be done to improve security.

// While there have been minor issues, HTTPS is strong enough to protect the world's economy.
 
// If your HTTPS is compromised via a man-in-the-middle attack, you have significantly greater concerns than request signing. You can do a reverse DNS lookup on each request or implement your own HPKP if you're that concerned.





