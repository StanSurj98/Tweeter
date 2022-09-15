/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// ----- JQuery Doc Ready -----
$(() => {
  console.log(`client.js is working!`)

  // ----- Function Definitions -----

  // Creates the tweet element
  const createTweetElement = (tweetData) => {
    // take a tweet obj
    const user = tweetData.user;
    const content = tweetData.content;
    // imported timeago.js library in index.html as script, use timeago.format(timestamp)
    const timestamp = tweetData.created_at;
    
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
          <div>${timeago.format(timestamp)}</div>
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
      // before rendering new tweet, clear all others in the TWEET container
      $(".tweet-container").empty();
      renderTweet(tweets);
    })
  };

  
  //----- "Submit" Event Listener -----
  const $newTweetForm = $(".new-tweet form");

  $($newTweetForm).submit((event) => {
    // prevents default page refresh behavior
    event.preventDefault();
    const $serializedData = $newTweetForm.serialize();

    // post URL encoded serialized data via AJAX to server
    $.post("/tweets", $serializedData, () => {
      // each submit, empty the text box && reset word counter
      $("#tweet-text-area").val('');
      $(".counter").text(140);
      // then AJAX loads from /tweets
      loadTweets();
    });
  });

  
});