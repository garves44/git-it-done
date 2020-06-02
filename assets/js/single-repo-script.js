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
 *   1.1 getRepoIssues()
 *   1.2 displayIssues()
 *   1.3 displayWarning()
 *   1.4 getRepoName()
 * 
 * 2. Document Ready
 *   2.1 Render Schedule on ready
 *   2.2 Add click listeners (add, edit, delete, reset)
 * 
 *  *********************************************************/

/* ===============[ 0. GLOBALS ]=========================*/
var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

/* ===============[ 1. Functions ]=========================*/
/**
 * 1.1 getRepoIssues()
 */
var getRepoIssues = function (repo) {
    console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayIssues(data);
                    if (response.headers.get("Link")) {
                        displayWarning(repo);
                    }
                });
            } else {
                document.location.replace("./index.html");
            }
        });
};
/**
 * 1.2 displayIssues()
 */
var displayIssues = function (issues) {
    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        issueEl.appendChild(titleEl);
        var typeEl = document.createElement("span");
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        issueEl.appendChild(typeEl);
        issuesContainerEl.appendChild(issueEl);
    }
};
/**
 * 1.3 displayWarning()
 */
var displayWarning = function (repo) {
    limitWarningEl.textContent = "To see more then 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues On GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
};
/**
 * 1.4 getRepoName()
 */
var getRepoName = function () {
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    if (repoName) {
        getRepoIssues(repoName);
        repoNameEl.textContent = repoName;
    } else {
        document.location.replace("./index.html");
    }

};


/* ===============[ 2. Document Ready ]=========================*/

getRepoName();