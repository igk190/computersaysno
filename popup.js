// let changeColor = document.getElementById('changeColor');


// chrome.storage.sync.get('color', function(data) {
//     changeColor.style.backgroundColor = data.color;
//     changeColor.setAttribute('value', data.color)
// })
// changeColor.onclick = function(element) {
//     let color = element.target.value;
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id,
//           {code: 'document.body.style.backgroundColor = "' + color + '";'}); 
//     });
// };

 
// function openIndex() {
//     chrome.tabs.create( { url: "popup.html"} );
// } ?? never runs, why do you need this?


// let options = document.getElementById('go-to-options')
// options.addEventListener('click', function() {
//     chrome.runtime.openOptionsPage();
// })
function openOptionsPage() {
    // chrome.runtime.openOptionsPage();
    chrome.runtime.openOptionsPage(function() { console.log(' oh no it didnt work')})
};

document.getElementById('go-to-options').addEventListener('click',
openOptionsPage);


 

 