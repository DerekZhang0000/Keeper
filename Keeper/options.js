var friends = {};
var currentDate = Date.now();
var ONE_DAY = 24 * 60 * 60 * 1000;

function refreshName(name) {
    friends[name] = Date.now();
    chrome.storage.sync.set({["friends"]: friends});
    location.reload();
}
function deleteName(name) {
    chrome.storage.sync.get("friends", function(result) {
        friends = result.friends;
        delete friends[name];
        chrome.storage.sync.set({["friends"]: friends});
    });
    location.reload();
}
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("friends", function(result) {
        if (result.friends != null) {
            friends = result.friends;
            for (const [name, lastSpoken] of Object.entries(friends)) {
                if (currentDate - lastSpoken < 14 * ONE_DAY) {
                    let namePara = document.createElement("p");
                    namePara.setAttribute("id", "recF");
                    namePara.innerText = name;
                    let refreshButton = document.createElement("button");
                    refreshButton.setAttribute("id", "refresh");
                    refreshButton.setAttribute("name", name)
                    refreshButton.innerText = "Refresh";
                    namePara.appendChild(refreshButton);
                    document.getElementById("recent").appendChild(namePara);
                    let deleteButton = document.createElement("button");
                    deleteButton.setAttribute("id", "delete");
                    deleteButton.setAttribute("name", name)
                    deleteButton.innerText = "Remove";
                    namePara.appendChild(deleteButton);
                    document.getElementById("recent").appendChild(namePara);
                }
                else if (currentDate - lastSpoken < 60 * ONE_DAY) {
                    let namePara = document.createElement("p");
                    namePara.setAttribute("id", "wk2F");
                    namePara.innerText = name;
                    let refreshButton = document.createElement("button");
                    refreshButton.setAttribute("id", "refresh");
                    refreshButton.setAttribute("name", name)
                    refreshButton.innerText = "Refresh";
                    namePara.appendChild(refreshButton);
                    document.getElementById("2wk").appendChild(namePara);
                    let deleteButton = document.createElement("button");
                    deleteButton.setAttribute("id", "delete");
                    deleteButton.setAttribute("name", name)
                    deleteButton.innerText = "Remove";
                    namePara.appendChild(deleteButton);
                    document.getElementById("2wk").appendChild(namePara);
                }
                else if (currentDate - lastSpoken < 180 * ONE_DAY) {
                    let namePara = document.createElement("p");
                    namePara.setAttribute("id", "mo2F");
                    namePara.innerText = name;
                    let refreshButton = document.createElement("button");
                    refreshButton.setAttribute("id", "refresh");
                    refreshButton.setAttribute("name", name)
                    refreshButton.innerText = "Refresh";
                    namePara.appendChild(refreshButton);
                    document.getElementById("2mo").appendChild(namePara);
                    let deleteButton = document.createElement("button");
                    deleteButton.setAttribute("id", "delete");
                    deleteButton.setAttribute("name", name)
                    deleteButton.innerText = "Remove";
                    namePara.appendChild(deleteButton);
                    document.getElementById("2mo").appendChild(namePara);
                }
                else if (currentDate - lastSpoken < 365 * ONE_DAY) {
                    let namePara = document.createElement("p");
                    namePara.setAttribute("id", "mo6F");
                    namePara.innerText = name;
                    let refreshButton = document.createElement("button");
                    refreshButton.setAttribute("id", "refresh");
                    refreshButton.setAttribute("name", name)
                    refreshButton.innerText = "Refresh";
                    namePara.appendChild(refreshButton);
                    document.getElementById("6mo").appendChild(namePara);
                    let deleteButton = document.createElement("button");
                    deleteButton.setAttribute("id", "delete");
                    deleteButton.setAttribute("name", name)
                    deleteButton.innerText = "Remove";
                    namePara.appendChild(deleteButton);
                    document.getElementById("6mo").appendChild(namePara);
                }
                else {
                    let namePara = document.createElement("p");
                    namePara.setAttribute("id", "yr1F");
                    namePara.innerText = name;
                    let refreshButton = document.createElement("button");
                    refreshButton.setAttribute("id", "refresh");
                    refreshButton.setAttribute("name", name)
                    refreshButton.innerText = "Refresh";
                    namePara.appendChild(refreshButton);
                    document.getElementById("1yr").appendChild(namePara);
                    let deleteButton = document.createElement("button");
                    deleteButton.setAttribute("id", "delete");
                    deleteButton.setAttribute("name", name)
                    deleteButton.innerText = "Remove";
                    namePara.appendChild(deleteButton);
                    document.getElementById("1yr").appendChild(namePara);
                }
            }
            var refrButtons = document.querySelectorAll("#refresh");
            for (var i = 0; i < refrButtons.length; i++) {
                var self = refrButtons[i];
                self.addEventListener("click", function(event) {
                    event.preventDefault();
                    refreshName(this.getAttribute("name"));
                });
            }
            var delButtons = document.querySelectorAll("#delete");
            for (var i = 0; i < delButtons.length; i++) {
                var self = delButtons[i];
                self.addEventListener("click", function(event) {
                    event.preventDefault();
                    deleteName(this.getAttribute("name"));
                });
            }
        }
    });
    document.getElementById("save").addEventListener("submit", () => {
        var name = new String(document.getElementById("name").value);
        if (document.getElementById("lastSpoken").value == "") {
            var lastSpoken = Date.now();
        }
        else {
            var date = new Date(document.getElementById("lastSpoken").value);
            var lastSpoken = date.getTime();
        }
        if (name != "") {
            friends[name] = lastSpoken;
            chrome.storage.sync.set({["friends"]: friends});
        }
    });
});
