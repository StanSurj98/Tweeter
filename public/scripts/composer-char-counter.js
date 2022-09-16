// Make sure the HTML fully loads first before we run the script
$(document).ready(function() {
  console.log(`Document ready && JQuery working`);

  // This entire event chain fires EVERY time we type into the <form> <textarea>
  $("#tweet-text-area").keyup(function() {
    let textLength = $(this).val().length;
    let counter = $(this).next().find("output");

    // Adds a class if textLength is > 140; turns counter text red
    if (textLength > 140) {
      counter.addClass("text-red");
      // make sure we still show the counter update, will be negative if > 140
      counter.text(140 - textLength);
    } else {
      counter.removeClass("text-red");
      counter.text(140 - textLength);
    }
  });
});
