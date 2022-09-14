/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// JQuery Doc Ready 
$(() => {
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

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  // Render Tweet from array of tweets
  const renderTweet = (tweetsArray) => {
    // forEach tweet in tweetsArray, create tweet element and prepend to the container
    tweetsArray.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $(".tweet-container").prepend($tweet);
    });
  };

  renderTweet(data); 

});