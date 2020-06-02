/*********************************************************
 * Schedule JS
 * @package git-it-done
 * @author Jeremy C Collins
 * @version Develop
 * @license none (public domain)
 * 
 * ===============[ TABLE OF CONTENTS ]===================
 * 0. Globals
 * 1. Functions
 *   1.1 getUserRepos()
 *   1.2 loadSchedule()
 *   1.3 Time function
 * 
 * 2. Document Ready
 *   2.1 Render Schedule on ready
 *   2.2 Add click listeners (add, edit, delete, reset)
 * 
 *********************************************************/

/* ===============[ 0. GLOBALS ]=========================*/



/* ===============[ 1. Functions ]=========================*/
/**
 * 1.1 getUserRepos()
 */
var getUserRepos = function (user) {
    // Format the github API url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // Make a request to the URL provided
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
};

/* ===============[ 2. Document Ready ]=========================*/
getUserRepos("microsoft");