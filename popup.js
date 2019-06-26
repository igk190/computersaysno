function openOptionsPage() {
    // chrome.runtime.openOptionsPage();
    chrome.runtime.openOptionsPage(function() { 
        console.log(' oh no it didnt work')
    })
};

function getTabUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];
        var url = new URL(tab.url)
        var domain = url.hostname
        // `domain` now has a value like 'example.com'
        console.log('THE DOMAIN', domain)
      })


}


document.getElementById('go-to-options').addEventListener('click',
openOptionsPage);
document.getElementById('get-tab-url').addEventListener('click',
getTabUrl);

 

 