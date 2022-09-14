/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  // Tweet element function
  const createTweetElement = (tweetData) => {
    const user = tweetData.user;
    const content = tweetData.content;
    // take a tweet obj
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
    // return an article element with HTML details inside
    return $tweetArticle;
  };

  
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  const $tweet = createTweetElement(tweetData);

  // Test temporary code
  console.log($tweet); // see what it looks like 
  $(".tweet-container").append($tweet); // add it to the page to make sure it has correct elements and stuff


  // Render Tweet Functionality - array of tweets
  const renderTweet = (tweetsArray) => {
    // look through the array

    // at each tweet object, pass into our earlier createTweetElement function

    
  };

});