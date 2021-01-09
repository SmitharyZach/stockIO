function getStocks(value) {
  let $container = $(".container-fluid");
  $.get(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=DCJ1QDASJFVH1S53`,
    function (data) {
      data.bestMatches.forEach((element) => {
        let symbol = element["1. symbol"];
        $container.append(`<div>${symbol}</div>`);
      });
    }
  );
}

$(function () {
  $("#searchButton").click(function (event) {
    event.preventDefault();
    let value = $("#inputValue").val();
    getStocks(value);
  });
});
