function getStocks(value) {
  console.log(value);
  $.get(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=DCJ1QDASJFVH1S53`,
    function (data) {
      console.log(data);
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
