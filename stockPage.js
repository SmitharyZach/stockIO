function getUrlParam(name) {
  console.log(window.location.href);
  let results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  return results[1];
}

function getStockInfo(symbol) {
  let $container = $(".main-card");
  let html = "";
  $.get(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=DCJ1QDASJFVH1S53`,
    function (data) {
      console.log(data);
      html = `
      <div class='card-body'>
        <h3 class='card-title stockOveriewText'>${data["Symbol"]}</h3>
        <h4 class='card-title stockOveriewText'>${data["Name"]}</h4>
        <div class='stockOveriewText'><span class='overviewHeader'>Stock Market:</span> ${data["Exchange"]}</div>
        <div class='stockOveriewText'><span class='overviewHeader'>Currency:</span> ${data["Currency"]}</div>
        <div class='stockOveriewText'><span class='overviewHeader'>Sector:</span> ${data["Sector"]}</div>
        <div class='stockOveriewText'><span class='overviewHeader'>Industry:</span> ${data["Industry"]}</div>
        <div class='stockOveriewText'><span class='overviewHeader'>Book Value:</span> ${data["BookValue"]}</div>
        <div class='stockOveriewText'><span class='overviewHeader'>Divindend Per Share:</span> ${data["DividendPerShare"]}</div>
        <div class='stockOveriewText'><span class='overviewHeader'>52 Week High:</span> ${data["52WeekHigh"]}</div>
        <div class='stockOveriewText'><span class='overviewHeader'>52 Week Low:</span> ${data["52WeekLow"]}</div>
      </div>
      `;
      $container.append(html);
    }
  );
}

function getStockPrices(symbol) {
  let $container = $(".row");
  let html = "";
  $.get(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=DCJ1QDASJFVH1S53`,
    function (data) {
      console.log(data["Global Quote"]);
      let global = data["Global Quote"];
      opening = global["02. open"];
      console.log(parseInt(opening).toFixed(2));
      html = `
      <div col-3 >
        <div class='card text-center  ml-4 minor'>
          <div card-body>
            <h3 class='card-title stockOveriewText'>Opening</h3> 
            <h3 class>${parseInt(global["02. open"]).toFixed(2)}</h3>
          </div>
        </div>
      </div>  
      <div col-3>
        <div class='card text-center ml-4 minor'>
          <div card-body>
            <h3 class='card-title stockOveriewText'>High</h3> 
            <h3>${parseInt(global["03. high"]).toFixed(2)}</h3>
          </div>
        </div>
      </div>
      <div col-3>
        <div class='card text-center ml-4 minor'>
          <div card-body>
            <h3 class='card-title stockOveriewText'>Low</h3> 
            <h3>${parseInt(global["04. low"]).toFixed(2)}</h3>
          </div>
        </div>
      </div>
      <div col-3>  
        <div class='card text-center ml-4 minor'>
          <div card-body>
            <h3 class='card-title stockOveriewText'>Price</h3> 
            <h3>${parseInt(global["05. price"]).toFixed(2)}</h3>
          </div>
        </div>  
      </div>
     <!-- <div col-3>
        <div class='card text-center ml-4 minor'>
          <div card-body>
            <h3 class='card-title stockOveriewText'>Volume</h3> 
            <h3>${parseInt(global["06. volume"]).toFixed(2)}</h3>
          </div>
        </div>
      </div>
      <div col-3>
        <div class='card text-center ml-4 minor'>
          <div card-body>
            <h3 class='card-title stockOveriewText'>Previous Close</h3> 
            <h3>${parseInt(global["08. previous close"]).toFixed(2)}</h3>
          </div>
        </div>
      </div>
      <div col-3>  
        <div class='card text-center ml-4 minor'>
          <div card-body>
            <h3 class='card-title stockOveriewText'>Percent Change</h3> 
            <h3>${global["10. change percent"]}</h3>
          </div>
        </div>
      </div>  --!>
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
