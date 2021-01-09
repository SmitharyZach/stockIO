function getUrlParam(name) {
  console.log(window.location.href);
  let results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  return results[1];
}

function getStockInfo(symbol) {
  let $container = $(".container-fluid");
  let html = "";
  $.get(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=DCJ1QDASJFVH1S53`,
    function (data) {
      console.log(data);
      html = `
      <div class='stockOverview'>
        <div>${data["Name"]}</div>
        <div>Stock Market: ${data["Exchange"]}</div>
        <div>Currency: ${data["Currency"]}</div>
        <div>Sector: ${data["Sector"]}</div>
        <div>Industry: ${data["Industry"]}</div>
        <div>Book Value: ${data["BookValue"]}</div>
        <div>Divindend Per Share${data["DividendPerShare"]}</div>
        <div>52 Week High ${data["52WeekHigh"]}</div>
        <div>52 Week Low ${data["52WeekLow"]}</div>
      </div>
      `;
      $container.append(html);
    }
  );
}

function getStockPrices(symbol) {
  let $container = $(".container-fluid");
  let html = "";
  $.get(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=DCJ1QDASJFVH1S53`,
    function (data) {
      console.log(data["Global Quote"]);
      let global = data["Global Quote"];
      opening = global["02. open"];
      console.log(parseInt(opening).toFixed(2));
      html = `
      <div class='stockTrading'>
        <div>Stock Opening: ${parseInt(global["02. open"]).toFixed(2)}</div>
        <div>Stock High: ${parseInt(global["03. high"]).toFixed(2)}</div>
        <div>Stock Low: ${parseInt(global["04. low"]).toFixed(2)}</div>
        <div>Stock Price: ${parseInt(global["05. price"]).toFixed(2)}</div>
        <div>Stock Volume: ${parseInt(global["06. volume"]).toFixed(2)}</div>
        <div>Latest Trading Day: ${global["07. latest trading day"]}</div>
        <div>Stock Previous Close: ${parseInt(
          global["08. previous close"]
        ).toFixed(2)}</div>
        <div>Percent Change: ${global["10. change percent"]}</div>
      </div>
      `;
      $container.append(html);
    }
  );
}

$(function () {
  let symbol = getUrlParam("symbol");
  getStockInfo(symbol);
  getStockPrices(symbol);
});
