//All opentabs URLs will be saved in openTabs array
var openTabs = [];

function squash() {


    if(!localStorage["defined_urls"])
    {
        localStorage["defined_urls"]="chrome://newtab/"
    }
    
    openTabs = [];

    chrome.tabs.query({
        currentWindow: true
         }, function (array_of_tabs) {

                var urls = localStorage["defined_urls"].split('\n');

                if(urls.length) {

                    urls.forEach(function (link) {
                        chrome.tabs.create({
                            url: link,
                            active: false
                        });
            });

            }
            else
            {
                chrome.tabs.create({url:"https://www.google.com"});
            }
            

                array_of_tabs.forEach(function (tab) {
                    id = tab.id;
                    openTabs.push(tab.url);
                    chrome.tabs.remove(id);

                });
                
               

            
    });


}

function restore() {

    

    if(openTabs.length)
    {

    chrome.tabs.query({
            currentWindow: true
        }, function (array_of_tabs) {
            array_of_tabs.forEach(function (tab) {
                chrome.tabs.remove(tab.id);
            });
        });
        
    openTabs.forEach(function (taburl) {
        chrome.tabs.create({
            url: taburl,
            active: false
        });
    });
    }
    else{
        alert("Nothing to unsquash!");
    }   

    openTabs = [];


}


chrome.commands.onCommand.addListener(function (command) {
    if (command == "squash_tabs") {
        squash();
    }

    if (command == "restore_tabs") {
        restore();
    }

});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.command == "squash_tabs") {
            squash();
        }

        if (request.command == "restore_tabs") {
            restore();
        }

        if (request.command == "save_new_links") {
            localStorage["defined_urls"] = request.links;
        }
    }
);