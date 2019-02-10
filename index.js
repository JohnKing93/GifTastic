const topics = ["Hamburger", "Hotdog", "Salad", "Banana", "Tomato", "Icecream"];

const render = () => {
  $("#button-block").empty();
  topics.map(topic => {
    let button = $(`<button type="button" class="btn btn-outline-primary" style="margin: 1rem;">`);
    button.addClass("gif-button");
    button.attr("data-id", topic);
    button.text(topic);
    $("#button-block").append(button);
  })
}

function search() {
  let topic = $(this).attr("data-id");
  const query = `https://api.giphy.com/v1/gifs/search?api_key=8OisNJWzm5t7dzDKUmpfp2hMIY8vKPPq&q=${topic}&limit=10`;
  $.ajax({
    url: query,
    method: "GET"
  }).done(res => {
    $("#gif-block").html("");
    res.data.map((gif, index) => {
      console.log("Loop");
      let item = $(`<div class="card gif-item" style="max-width: 20rem;">`);
      let body = $(`<div class="card-body">`);
      let rating = $(`<span class="badge badge-primary gif-rating">`);
      let stillImage = $(`<img class="card-img-top gif-image-still">`);
      let dynamicImage = $(`<img class="card-img-top gif-image-dynamic">`);
      rating.text(`Rating: ${gif.rating.toUpperCase()}`);
      stillImage.attr("src", gif.images.fixed_height_still.url).attr("id", `static-${index}`);
      dynamicImage.attr("src", gif.images.fixed_height.url).attr("id", `dynamic-${index}`).hide();
      item.attr("data-id", index);
      item.append(stillImage);
      item.append(dynamicImage);
      item.append(body);
      body.append(rating);
      $("#gif-block").append(item);
      console.log(item);
    })
  });
}

function play() {
  var item = $(this).attr("data-id");
  $(`#static-${item}`).is(":visible") ? (
    $(`#static-${item}`).hide(),
    $(`#dynamic-${item}`).show()
  ):(
    $(`#static-${item}`).show(),
    $(`#dynamic-${item}`).hide()
  )
}

$("#gif-submit").on("click", event => {
  event.preventDefault();
  var gif = $("#gif-search").val().trim();
  $("#gif-search").val("");
  topics.unshift(gif);
  return render();
});

$(document).on("click", ".gif-button", search);
$(document).on("click", ".gif-item", play);
render();