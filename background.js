// chrome.runtime.onInstalled.addListener(function() {
// }); NO NEED for now.

// function interceptRequest(request) {
//     console.log("Redirecting request: ", request.url)
//     return { redirectUrl: chrome.runtime.getURL("no.html") } // before a url in quotes
// }
// chrome.webRequest.onBeforeRequest.addListener(
//     interceptRequest, 
//     {urls: ['*://*.twitter.com/*'], types: ["main_frame"]},
//     ['blocking']
//     );

      
// add listener for all tabs
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     console.log(tabId, '2,', changeInfo, '3', tab )
//     var safesite = false;

//     if (changeInfo === "loading") {
//         // logic for checking white list, using tab.url
//         console.log('test')

//         if (!safesite) {
//             chrome.tabs.update(tabId, { url: 'no.html' });
//         }
//     }
// });
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  
    if (change.status === "complete") {
      // alert('tabId ' + tabId + " tab " +  tab.url)
      chrome.storage.sync.get(['blockedUrl'], function(data) {
        let urls = data.blockedUrl; 
        let values = Object.values(urls) // now array-like object
        let tabURL = tab.url

        for (var i = 0, len = values.length; i < len; i++) {
          if (tabURL.includes(values[i])) {
          // alert(' OMG its a match');
          // chrome.tabs.update(tabId, { url: 'no.html' });
          break;
        } 
      }
      
    })

      // chrome.tabs.update(tabId, { url: 'no.html' });
    // alert('Tab' + tab.url)
    }
  })