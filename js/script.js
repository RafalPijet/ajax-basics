"use strict";
(function () {
    var url = "http://api.icndb.com/jokes/random";
    var button = document.getElementById("get-joke");
    var paragraph = document.getElementById("joke");

    button.addEventListener("click", function () {
        getJoke();
    });

    function getJoke() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        button.disabled = true;

        xhr.addEventListener("load", function () {
            var response = JSON.parse(xhr.response);
            paragraph.innerText = response.value.joke + " (ID=" + response.value.id + ")";
            button.disabled = false;
        });
        xhr.send();
    }

    getJoke();
})();