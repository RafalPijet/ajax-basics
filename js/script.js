"use strict";
(function () {
    var url = "http://api.icndb.com/jokes/random";
    var button = document.getElementById("get-joke");
    var paragraph = document.getElementById("joke");
    var icon = document.querySelector("img");
    var description = document.querySelector("#name");

    button.addEventListener("click", function () {
        getJoke();
    });

    function getJoke() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        button.disabled = true;
        icon.classList.remove("display-off");
        description.classList.add("display-off");

        xhr.addEventListener("load", function () {
            var response = JSON.parse(xhr.response);
            paragraph.innerText = response.value.joke + " (ID=" + response.value.id + ")";
            button.disabled = false;
            icon.classList.add("display-off");
            description.classList.remove("display-off");
        });
        xhr.send();
    }

    getJoke();
})();