"use strict";
(function () {
    var tweetLink = "https://twitter.com/intent/tweet?text=";
    var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    var prefix = "https://cors-anywhere.herokuapp.com/";
    var randomButton = document.querySelector(".trigger");
    var tweetButton = document.querySelector(".tweet");

    function getQuote() {
        randomButton.classList.add("hidden");
        tweetButton.classList.add("hidden");

        fetch(prefix + quoteUrl, {cache: "no-store"})
            .then(function (response) {

                if (response.status == 200) {
                    randomButton.classList.remove("hidden");
                    tweetButton.classList.remove("hidden");
                }
                return response.json();
            })
            .then(createTweet);
    }

    function createTweet(input) {
        var data = input[0];
        var dataElement = document.createElement("div");
        dataElement.innerHTML = data.content;
        var quoteText = dataElement.innerText.trim();
        var quoteAuthor = data.title;
        var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

        if (!quoteAuthor.length) {
            quoteAuthor = "Unknown author";
        }

        if (tweetText.length > 140) {
            getQuote();
        } else {
            var tweet = tweetLink + encodeURIComponent(tweetText);
            document.querySelector(".quote").innerText = quoteText;
            document.querySelector(".author").innerText = "Author: " + quoteAuthor;
            document.querySelector(".tweet").setAttribute("href", tweet);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        getQuote();
        document.querySelector(".trigger").addEventListener("click", function () {
            getQuote();
        })
    })
})();