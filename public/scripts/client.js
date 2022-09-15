/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// ----- JQuery Doc Ready -----
$(() => {
  console.log(`client.js is working!`)

  // ----- Initially Hide Error Div -----
  const $error1 = $("#error1");
  const $error2 = $("#error2");
  $error1.hide();
  $error2.hide();

  // 
  // ----- Function Definitions -----
  // 

  // Creates the tweet element
  const createTweetElement = (tweetData) => {
    // take a tweet obj
    const user = tweetData.user;
    const content = tweetData.content;
    // imported timeago.js lib in index.html as script, use timeago.format(timestamp)
    const timestamp = tweetData.created_at;

    // ----- Escape Function to create SAFE HTML from user input -----
    // Because our form is a <textarea> - it's "safe HTML" 
    // BUT if displayed as <textarea>, we can edit it... 
    // MUST display as <h1-6>, or <p>, etc.
    // BUT those are "UNSAFE HTML" susceptible to XSS'd
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };


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
        <h4 class="tweet-display">${escape(content.text)}</h4>
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
    $.get("/tweets",(tweets) => {
      // before rendering new tweet, clear all others in the TWEET container
      $(".tweet-container").empty();
      renderTweet(tweets);
    })
  };

  // 
  //----- Initially Load All Tweets Currently In Server -----
  // 
  loadTweets();
  
  // 
  //----- "Submit" Event Listener -----
  // 
  const $newTweetForm = $(".new-tweet form");

  $($newTweetForm).submit((event) => {
    // Don't touch - prevents default page refresh behavior
    event.preventDefault();
    const $serializedData = $newTweetForm.serialize();

    

    // Don't touch - for AJAX Post && tweet validation
    const $textArea = $("#tweet-text-area");
    // Add new tweet validation logic
    const $tweet = $textArea.val(); // checks primitive string, NOT url encoded .serialize()

    // 
    // ----- Tweet Validation on Submit Event -----
    // 

    // IF tweet empty OR too long, CATCH ERROR as we hit submit
    if (!$tweet || $tweet.length > 140) {
      // THEN we check which error it is
      if (!$tweet) return $error1.slideDown(200).show();
      // LEAVE .slideUP(200) IN HERE && OUTSIDE the check 
      $error1.slideUp(200);
      if ($tweet.length > 140) return $error2.slideDown(200).show();
      // in case of BACK TO BACK errors; prevents both error <div> from stacking
      $error2.slideUp(200);
    }
    // ELSE NO CATCH on submit? hide both errors; proceed to post
    $error1.slideUp(200);
    $error2.slideUp(200);

    // 
    // ----- AJAX Post -----
    // 
    $.post("/tweets", $serializedData, () => {
      // On submit => empty text box && reset word counter
      $textArea.val("");
      $(".counter").text(140);
      // Then AJAX load all tweets from /tweets
      loadTweets();
    });
  });

  
});