document.addEventListener('DOMContentLoaded', function(){

    if(!localStorage["defined_urls"])
    {
        localStorage["defined_urls"]="chrome://newtab/"
    }


//Sets in the value when popup is opened
document.getElementById("links").value = localStorage["defined_urls"];


document.getElementById("save").addEventListener("click", function(e){

    chrome.runtime.sendMessage({
        command: "save_new_links",
        links: document.getElementById("links").value
    
    },
    function(response){
       
    });


});
    
document.getElementById("reset").addEventListener("click", function(e){

    if(confirm("Are you sure you want to reset the links?") == true)
    {
    localStorage["defined_urls"]="chrome://newtab/";

    document.getElementById("links").value = localStorage["defined_urls"];
    }

});


document.getElementById("squash").addEventListener("click", function(e){
    
        

        chrome.runtime.sendMessage({
            command: "squash_tabs"
        }, 
        function(response){
           
        });
});

document.getElementById("unsquash").addEventListener("click", function(e){
    
   

    chrome.runtime.sendMessage({
        command: "restore_tabs"
    }, 
    function(response){
        
    });
});

document.getElementById("add").addEventListener("click", function(e){

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        
        document.getElementById("links").value += "\n";
        document.getElementById("links").value += tabs[0].url;

        localStorage["defined_urls"] = document.getElementById("links").value;
    });
});

});