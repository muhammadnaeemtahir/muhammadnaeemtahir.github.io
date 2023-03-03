$(function () {
  var mediumPromise = new Promise(function (resolve) {
    var $content = $("#jsonContent");
    var data = {
      rss: "https://medium.com/feed/@muhammadnaeemtahir",
    };
    $.get(
      " https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40muhammadnaeemtahir",
      data,
      function (response) {
        if (response.status == "ok") {
          $("#logo").append(
            `<img src="${response.feed["image"]}" class="rounded mx-auto d-block">`
          );
          var display = "";
          $.each(response.items, function (k, item) {
            display += `<div class="col-md-3">`;
            display += `<div class="card h-100 mb-3" style="height: auto;">`;
            var src = item["thumbnail"]; // use thumbnail url
            display += `<img src="${src}" class="card-img-top img-fluid" alt="${item.title}">`;
            display += `<div class="card-body">`;
            display += `<h5 class="card-title"><a class="text-decoration-none text-dark" href="${item.link}">${item.title}</a></h5>`;
            var yourString = item.description.replace(/<img[^>]*>/g, ""); //replace with your string.
            yourString = yourString.replace("h4", "p");
            yourString = yourString.replace("h3", "p");
            var maxLength = 120; // maximum number of characters to extract
            //trim the string to the maximum length
            var trimmedString = yourString.substr(0, maxLength);
            //re-trim if we are in the middle of a word
            trimmedString = trimmedString.substr(
              0,
              Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
            );
            display += `<p class="card-text">${trimmedString}...</p>`;

            display += `<small><a href="${item.link}" target="_blank" class="text-decoration-none text-muted" >Read More</a></small>`;
            display += "</div></div>";
            display += "</div>";
            return k < 10;
          });

          resolve($content.html(display));
        }
      }
    );
  });

  mediumPromise.then(function () {
    //Pagination
    pageSize = 4;

    var pageCount = $(".card").length / pageSize;

    for (var i = 0; i < pageCount; i++) {
      $("#pagin").append(
        `<li class="page-item"><a class="page-link" href="#">${i + 1}</a></li> `
      );
    }
    $("#pagin li:nth-child(1)").addClass("active");
    showPage = function (page) {
      $(".card").hide();
      $(".card").each(function (n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page) $(this).show();
      });
    };

    showPage(1);

    $("#pagin li").click(function () {
      $("#pagin li").removeClass("active");
      $(this).addClass("active");
      showPage(parseInt($(this).text()));
      return false;
    });
  });
});
