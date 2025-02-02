/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1650895778923
  },
  {
    "user": {
      "name": "Luffy",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@StrawHat"
    },
    "content": {
      "text": "If you don't take risks, you can't create a future!"
    },
    "created_at": 1650982173983
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1650982178923
  },
  {
    "user": {
      "name": "Nagato",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@Pain"
    },
    "content": {
      "text": "Those Who Do Not Understand True Pain Can Never Understand True Peace"
    },
    "created_at": 1650983958923
  }
];


$(document).ready(function () {

  // $('#submit-tweet').submit(function(event) {
  //   // alert("Handler for .submit() called.");
  //   event.preventDefault();
  // });

  $('#submit-tweet').on('submit', function(event) {
    event.preventDefault();
    const formData = $(this).serialize();

    const tweet = $('#tweet-text').val();

    if (tweet === '' || tweet === null) {
      $('.error-message').css({'display': 'block', 'border-color': 'red', 'border-style': 'solid'})
      $('.error-message').text(' ❗ Please enter valid tweet ❗')
      // alert('Tweet was empty');
    } else if (tweet.length > 140){
      $('.error-message').css({'display': 'block', 'border-color': 'red', 'border-style': 'solid'})
      $('.error-message').text(' ❗ Error: Character limit exceeded ❗')
      // alert('Too many characters');
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
      }).then(() =>  loadTweets());
    }


  });


  const createTweetElement = function (tweet) {
    const time = timeago.format(tweet.created_at);

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let $tweet = $(`
      <article class="single-tweet">
              <header class="tweet-header">
                <div class="avi-plus-name">
                  <img src=${tweet.user.avatars} class="tweet-avi">
                  <span class="tweet-name">${tweet.user.name}</span>
                </div>
                <span class="handle">${tweet.user.handle}</span>
              </header>
              <section class="tweet-content">
                <p>${escape(tweet.content.text)}</p>
              </section>
              <footer class="tweet-footer">
                <span class="days" style="font-size: 0.8em;">${time}</span>
                <span class="interact">
                  <i class="fa-solid fa-flag"></i>
                  <i class="fa-solid fa-retweet"></i>
                  <i class="fa-solid fa-heart"></i>
                </span>
              </footer>
            </article>`);

    return $tweet;
  };


  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
  };

  // renderTweets(data);

  const loadTweets = function() {
    $('.tweet-container').empty();
    $.ajax("/tweets")
      .then((res) => renderTweets(res))
      .catch((err) => console.log(err))

  }

  loadTweets();
});


// console.log(tweetsJSON)