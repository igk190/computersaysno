let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
let list = document.getElementById('showUrls')

function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    page.appendChild(button);  
  }
}
// -----------IT STARTS BELOW ----------------------------------

// Save options to chrome.storage
function save_options() {
    let newUrl = document.getElementById('url').value.trim();
    console.log( 'T or F', newUrl === '');

    if (newUrl === null || newUrl === '') {
        document.getElementById('url').value = '';
        alert('Please fill out a valid URL.')
    } else {
        chrome.storage.sync.get(['blockedUrl'], function(data) {
            let urlData = data.blockedUrl;

            if (Array.isArray(urlData)) { // if there IS an array
                // first check if  new url arleady exists in urlData,
                // if true, alert 'already added'
                if (urlData.includes(newUrl)) {
                    alert('URL already added.')
                // else: proceed
                } else {
                    urlData.push(newUrl); // add new url to arr + save in storage
                    chrome.storage.sync.set({'blockedUrl': urlData}, function() {
                        showOptionSavedMsg(urlData);
                        document.getElementById('url').value = '';
                        addUrlToDisplay(newUrl);
                      });
                }
            } else {  // create new arr + add to it
                console.log('was undefined, nothing was there yet. ')
                let newArr = [];
                newArr.push(newUrl);
                chrome.storage.sync.set({'blockedUrl': newArr}, function() {
                    showOptionSavedMsg(newArr);
                    document.getElementById('url').value = '';
                    addUrlToDisplay(newUrl);
                  });
            }
        });
    }
}

function showOptionSavedMsg(url) {
        console.log('Value is set to ' + url);
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1000);
}
function addUrlToDisplay(newAdd) {
    let tr = document.createElement('TR');
    list.appendChild(tr);
    let td1 = document.createElement('TD');
    let td2 = document.createElement('TD');

    let textnode = document.createTextNode(newAdd);
    td1.appendChild(textnode);
    let removeButton = createRemoveBtn();
    td2.appendChild(removeButton);

    tr.appendChild(td1);
    tr.appendChild(td2);
}


function display_url() {
    chrome.storage.sync.get(['blockedUrl'], function(data) {
        let url = data.blockedUrl;
        console.log('hier', url)
        for (let i in url) {
            if (url[i] != null) {

                let tr = document.createElement('TR');
                list.appendChild(tr);

                let td1 = document.createElement('TD');
                let td2 = document.createElement('TD');
               
                let textnode = document.createTextNode(url[i]);
                td1.appendChild(textnode);
                let removeButton = createRemoveBtn();
                td2.appendChild(removeButton);

                tr.appendChild(td1);
                tr.appendChild(td2);
            }
        }
    })
}

function createRemoveBtn() {
    let button = document.createElement("button");
    button.innerHTML = "delete";
    button.setAttribute("class", "deleteUrl"); // is not being used atm
    button.addEventListener('click', deleteSingleUrl)
    return button;
}



function removeUrlFromStorage(clickedText) {
    chrome.storage.sync.get(['blockedUrl'], function(data) {
        let urlList = data['blockedUrl'] // TO DO: compare line 63! dot / brackets?
        // Checks if the url that'll be deleted is in the array
        console.log('before', urlList)
        if (urlList.includes(clickedText)) { 
            // create a new array without url
            let newUrlList = urlList.filter(function(item) {
                return item !== clickedText;
            });
            // set new url list to the storage
            chrome.storage.sync.set({'blockedUrl': newUrlList}, function() {
                console.log('removed! now we have: ', newUrlList );
            });
            // chrome.runtime.reload(); // TO DO: what is dis?
        }
    })
}
function deleteSingleUrl(e) {
 let textEl = e.target.parentNode.previousSibling;
 let text = textEl.textContent;
 console.log('TEXT to delete:', textEl)
 removeUrlFromStorage(text);
 let toBeRemovedEl = e.target.parentNode.parentNode; // 2 parents above, otherwise yr only del td, but we need higher level: tr
 toBeRemovedEl.remove();
}

function deleteAllUrlsFromPage() {
    // delete everything under either #id showUrls or <tbody>
    let test = list.children;
    // console.log('test', test)
    // test.remove(); // FIX ME PLS
 
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
     }
     var removedStatus = document.getElementById('removedStatus');
     removedStatus.textContent = 'All urls deleted.';
     setTimeout(function() {
        removedStatus.textContent = '';
     }, 1000);
}

function removeAll() { // deletes entire ref
    chrome.storage.sync.remove(['blockedUrl'],function(){
        deleteAllUrlsFromPage();
        var error = chrome.runtime.lastError;
           if (error) {
               console.error(error);
           }
       })
}


// constructOptions(kButtonColors);
document.getElementById('saveBtn').addEventListener('click',
    save_options);
document.getElementById('removeAllBtn').addEventListener('click',
    removeAll);
display_url();      


