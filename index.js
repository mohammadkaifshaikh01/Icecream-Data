const fs = require("fs");
const data = fs.readFileSync("./ice.csv", "utf8").split("\n");
// console.log(data);

// for total

function totalPrice(data) {
  let totalPrice = 0;
  for (let i = 1; i < data.length; i++) {
    let [date, sku, unitPrice, qty, total] = data[i].split(",");
    totalPrice += +total;
  }
  return totalPrice;
}

// for month wise

function monthWiseSalesTotal(data) {
  let monthWise = {};
  for (let i = 1; i < data.length; i++) {
    let [date, sku, unitPrice, qty, total] = data[i].split(",");
    let [year, month, day] = date.split("-").map(Number);
    monthWise[month] = (monthWise[month] || 0) + Number(total);
  }
  return monthWise;
}

// for mostPopular

function mostPopularItemPerMonth(data) {
   let monthlyPopularity = {};
 
   for (let i = 1; i < data.length; i++) {
     let [date, sku, unitPrice, qty, total] = data[i].split(",");
     let [year, month, day] = date.split("-").map(Number);
     qty = Number(qty);
 
     if (!monthlyPopularity[month]) {
       monthlyPopularity[month] = {};
     }
 
     monthlyPopularity[month][sku] = (monthlyPopularity[month][sku] || 0) + qty;
   }
 
   let result = {};
   for (let month in monthlyPopularity) {
     let items = monthlyPopularity[month];
     let mostPopular = Object.keys(items).reduce((a, b) =>
       items[a] > items[b] ? a : b
     );
     result[month] = mostPopular;
   }
 
   return result;
 }

// for highest

 function highestRevenueItemPerMonth(data) {
  let monthlyRevenue = {};

  for (let i = 1; i < data.length; i++) {
    let [date, sku, unitPrice, qty, total] = data[i].split(",");
    let [year, month, day] = date.split("-").map(Number);
    total = Number(total);

    if (!monthlyRevenue[month]) {
      monthlyRevenue[month] = {};
    }

    monthlyRevenue[month][sku] = (monthlyRevenue[month][sku] || 0) + total;
  }

  let result = {};
  for (let month in monthlyRevenue) {
    let items = monthlyRevenue[month];
    let highestRevenueItem = Object.keys(items).reduce((a, b) =>
      items[a] > items[b] ? a : b
    );
    result[month] = highestRevenueItem;
  }

  return result;
}

// for min max


function minMaxAvgOrdersForPopularItems(data) {
  const mostPopularItems = mostPopularItemPerMonth(data);
  let monthlyStats = {};

  for (let i = 1; i < data.length; i++) {
    let [date, sku, unitPrice, qty, total] = data[i].split(",");
    let [year, month, day] = date.split("-").map(Number);
    qty = Number(qty);

    if (mostPopularItems[month] === sku) {
      if (!monthlyStats[month]) {
        monthlyStats[month] = [];
      }
      monthlyStats[month].push(qty);
    }
  }

  let result = {};
  for (let month in monthlyStats) {
    const orders = monthlyStats[month];
    const min = Math.min(...orders);
    const max = Math.max(...orders);
    const avg = orders.reduce((sum, val) => sum + val, 0) / orders.length;
    result[month] = { min, max, avg: avg.toFixed(2) };
  }

  return result;
}


console.log(totalPrice(data));
console.log(monthWiseSalesTotal(data));
console.log(mostPopularItemPerMonth(data));
console.log(highestRevenueItemPerMonth(data));
console.log(minMaxAvgOrdersForPopularItems(data));
