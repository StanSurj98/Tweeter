/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// JQuery Doc Ready 
$(() => {
  console.log(`client.js is being reached`)

  // Creates the tweet element
  const createTweetElement = (tweetData) => {
    // take a tweet obj
    const user = tweetData.user;
    const content = tweetData.content;
    // return an article element with HTML details inside
    const $tweetArticle = $(`
      <article class="tweet-articles">
        <header>
          <div>
            <img class="profile-icon" src="${user.avatars}">
            <h4>${user.name}<h4>
          </div>
          <div>${user.handle}</div>
        </header>
        <textarea>${content.text}</textarea>
        <footer>
          <div>${tweetData.created_at}</div>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweetArticle;
  };

  // Render Tweet from array of tweets
  const renderTweet = (tweetsArray) => {
    // forEach tweet in tweetsArray, create tweet element and prepend to the container
    tweetsArray.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $(".tweet-container").prepend($tweet);
    });
  };

  // Fetch tweets from /tweets with AJAX GET and use renderTweet
  const loadTweets = () => {
    $.get("/tweets", function(tweets) {
      // before rendering new tweet, clear all others
      $(".tweet-container").empty();
      // console.log(tweets);
      renderTweet(tweets);
    })
  };

  const $newTweetForm = $(".new-tweet form");
  
  // Submit EVENT listener

  // JQuery $("onlyOnFormsHere").submit(handlerFunction) <-- .submit attaches only to forms
  // Listens for a "submit" event.
  $($newTweetForm).submit((event) => {
    // console.log(`event.preventDefault() is working`)
    event.preventDefault();
    const $serializedData = $newTweetForm.serialize();
    // console.log($serializedData);

    // submit the URL encoded serialized data via AJAX to server
    $.post("/tweets", $serializedData, () => {
      // on submit post, we empty the text box 
      $("#tweet-text-area").val('');
      // reset text counter
      $(".counter").text(140);
      // then loads from GET request
      loadTweets();
    });
  });

  
});