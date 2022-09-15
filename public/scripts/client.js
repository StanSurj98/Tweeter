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

  
  // ----- Function Definitions -----
  
  // Creates the tweet element
  const createTweetElement = (tweetData) => {
    // take a tweet obj
    const user = tweetData.user;
    const content = tweetData.content;
    // imported timeago.js library in index.html as script, use timeago.format(timestamp)
    const timestamp = tweetData.created_at;

    // ----- Escape Function to create SAFE HTML from user input -----
    // Because our form is a textarea - it's safe, but when we display as text area, we can edit it... so we have to display as <h1-6>, or <p>
    // but those by themselves are UNSAFE HTML and we can get XSS'd
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

  // Validate NEW Tweets - slideDown() the div class="tweet-error" if catches any
  const validateTweet = ($tweet) => {
    // 1. i need to look at the value of the FORM
    console.log("type of $tweet: ", typeof $tweet);
    console.log("value: ", $tweet);
    console.log("length: ", $tweet.length);
    
    // 2. if form value is empty, return appropriate error
    if (!$tweet) return $error1.slideDown(200).show();
    $error1.slideUp(200);
    // 3. if form value exceeds character count, return appropriate error
    if ($tweet.length > 140) return $error2.slideDown(200).show();
    $error2.slideUp(200);
    // 4. base case is return nothing and continue so we can ajax post
    return;
  };

  //----- Initially Load All Tweets Currently In Server -----
  loadTweets();
  
  //----- "Submit" Event Listener -----
  const $newTweetForm = $(".new-tweet form");

  $($newTweetForm).submit((event) => {
    // prevents default page refresh behavior
    event.preventDefault();
    const $serializedData = $newTweetForm.serialize();

    

    // Don't touch - affects the AJAX Post
    const $textArea = $("#tweet-text-area");
    // add form validation logic
    const $tweet = $serializedData.slice(5); // w/o slice -> text=
    validateTweet($tweet);



    // ----- AJAX Post -----
    $.post("/tweets", $serializedData, () => {
      // each submit, empty the text box && reset word counter
      $textArea.val("");
      $(".counter").text(140);
      // then AJAX load all tweets from /tweets
      loadTweets();
    });
  });

  
});