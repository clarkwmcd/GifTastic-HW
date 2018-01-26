$(document).ready(function() {

  var topics = [ "DOG", "CAT", "GIRAFFE", "ELEPHANT", "RABBIT", "HEDGEHOG", "MOUSE", "MONKEY", "GORILLA", "DONKEY", "HORSE", "PIG","GOAT"];


  $("#submit-btn").on("click", function(event) {
    event.preventDefault();
    var inputAnimal = $("#input-animal").val().trim().toUpperCase();
    $("#button-group").append("<button type='button' class='btn btn-warning' id='name-"+inputAnimal+"' value=" + inputAnimal + ">" + inputAnimal + "</button> ")
    topics.push(inputAnimal);
    console.log(inputAnimal);
    $("#input-animal").val(" ")
  });

  $(document).on("click", ".btn-warning", function(event) {

    var animalName = $(this).text()
    var APIKey = "6J46Hn8jDjSJL8PalH9fptqrq9IkxvGg";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=" + APIKey + "&limit=10";
    $("#gif-container").text(" ");

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      for(i=0; i<10; i++) {
      var giphyimg = $("<img>");
      var still = response.data[i].images.original_still.url
      var original = response.data[i].images.original.url
      var rating = response.data[i].rating

      giphyimg.attr("src", still);
      giphyimg.attr("data-state", "still");
      giphyimg.attr("data-still", still);
      giphyimg.attr("data-original", original);

      $("#gif-container").append("<br></br>");
      $("#gif-container").append(giphyimg);
      $("#gif-container").append("  Rating: " + rating);
      };



    });

  });

  $(document).on("click", "img", function(event) {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-original"));
      $(this).attr("data-state", "original");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

});
