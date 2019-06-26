// chrome.runtime.onInstalled.addListener(function() {

function interceptRequest(request) {
    return { redirectUrl: chrome.runtime.getURL("no.html") } // before a url in quotes
}
chrome.webRequest.onBeforeRequest.addListener(
    interceptRequest, 
    {urls: ['*://*.twitter.com/*']},
    ['blocking']);
// });
      
      
        
   