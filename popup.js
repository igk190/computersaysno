function openOptionsPage() {
    chrome.runtime.openOptionsPage(function() { 
        console.log(' oh no it didnt work')
    })
};


function addCurrentWebsite() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tab = tabs[0];
        let url = new URL(tab.url)
        let domain = url.hostname    // `domain` now has a value like 'example.com'
        let newUrl = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

        let chromeURL1 = 'chrome://extensions/'
        let urlAsString = url.toString()

        console.log('newURL', newUrl, typeof chromeURL1)

        if (chromeURL1.includes(newUrl) || urlAsString.includes('chrome-extension://') ) {
            showErrorMsg();
        } else {

            chrome.storage.sync.get(['blockedUrl'], function(data) {
                let urlData = data.blockedUrl;
                if (Array.isArray(urlData)) { // If there is an array, the domain will be new bc you can't be on a blocked page 
                    
                    if (urlData.includes(newUrl)) {
                        showErrorDuplicateMsg();
                    } else {
                        urlData.push(newUrl); // add new url to arr + save in storage
                        chrome.storage.sync.set({'blockedUrl': urlData}, function() {
                            showSavedMsg(urlData);
                        });
                    }
                    
                } else {  // If there is NO array, create one, add url to it
                    console.log('nothing there yet')
                    let newArr = [];
                    newArr.push(newUrl);
                    chrome.storage.sync.set({'blockedUrl': newArr}, function() {
                        showSavedMsg(newArr);            
                    });
                }
            }); // end chrome.storage.sync
        } // end else above chrome,storage
      }) // end chrome.tabs.query    
} // end addCurrentWebsite

function showSavedMsg(url) {
    console.log('Value is set to ' + url);
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'URL saved.';
    setTimeout(function() {
        status.textContent = '';
    }, 1000);
}
function showErrorMsg() {
    var status = document.getElementById('status');
    status.textContent = 'This URL cannot be added.'
    setTimeout(function() {
        status.textContent = '';
    }, 1000);
}
function showErrorDuplicateMsg() {
    var status = document.getElementById('status');
    status.textContent = 'You already added this URL.'
    setTimeout(function() {
        status.textContent = '';
    }, 1000);
}



document.getElementById('go-to-options').addEventListener('click',
openOptionsPage);
document.getElementById('add-website').addEventListener('click',
addCurrentWebsite);

 

 