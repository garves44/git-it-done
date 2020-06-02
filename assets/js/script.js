/*********************************************************
 * Git it done
 * @package git-it-done
 * @author Jeremy C Collins
 * @version Develop
 * @license none (public domain)
 * 
 * ===============[ TABLE OF CONTENTS ]===================
 * 0. Globals
 * 1. Functions
 *   1.1 getUserRepos()
 *   1.2 formSubmitHandler()
 *   1.3 displayRepos()
 * 
 * 2. Document Ready
 *   2.1 Render Schedule on ready
 *   2.2 Add click listeners (add, edit, delete, reset)
 * 
 *********************************************************/

/* ===============[ 0. GLOBALS ]=========================*/
var userFormEl = document.getElementById("user-form");
var nameInputEl = document.getElementById("username");
var repoContainerEl = document.getElementById("repo-container");
var repoSearchTerm = document.getElementById("repo-search-term")



/* ===============[ 1. Functions ]=========================*/
/**
 * 1.1 getUserRepos()
 */
var getUserRepos = function (user) {
    // Format the github API url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // Make a request to the URL provided
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error){
        alert("Unable to connect to Github");
    });
    
};

/**
 * 1.2 formSubmitHandler()
 */
var formSubmitHandler = function (event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub Username");
    }

}
/**
 * 1.3 displayRepos()
 */
var displayRepos = function (repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // Reset Content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // Loop over Repo
    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        repoEl.appendChild(titleEl);
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }

}

/* ===============[ 2. Document Ready ]=========================*/
$("#user-form").on("submit", formSubmitHandler);