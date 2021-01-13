function getStocks(value) {
  let $container = $(".stockResults");
  $(".stockItems").remove();
  $.get(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=DCJ1QDASJFVH1S53`,
    function (data) {
      data.bestMatches.forEach((element) => {
        let symbol = element["1. symbol"];
        $container.append(
          `<div id=${symbol} class='stockItems'>${symbol}</div>`
        );
      });
    }
  );
  $(document).on("click", ".stockItems", function (event) {
    let id = event.target.id;
    location.href = `stockPage.html?symbol=${id}`;
  });
}

$(function () {
  $("#searchButton").click(function (event) {
    event.preventDefault();
    let value = $("#inputValue").val();
    getStocks(value);
  });
});
