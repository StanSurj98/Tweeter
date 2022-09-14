// Make sure the HTML fully loads first before we run the script
$(document).ready(function() {
  console.log(`Document ready && JQuery working`);

  // Next we want an event on the form for tweets to take place
  // $( ".new-tweet" ).on("keyup", "textarea", function() {
  //   console.log($(this).val().length); // gets value of THIS text-area, and its length of chars
  // });

  $("#tweet-text-area").keyup(function() {
    let textLength = $(this).val().length;
    let counter = $(this).next().find("output");

    // Now we add logic for turning the text red by adding a class if textLength is > 140
    if (textLength > 140) {
      // new css class that will turn the color: red
      counter.addClass("text-red");
      // make sure we still show the counter update, will be negative if > 140
      counter.text(140 - textLength);
    } else {
      counter.removeClass("text-red");
      counter.text(140 - textLength);
    }
    
  });

});
