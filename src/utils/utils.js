// compute the profit margin
export function calculateProfitMargin(revenue, spend) {
  var num = (revenue-spend)/spend;
  return roundTwoDec(num);
}

// compute the weighted profit margin
export function calculateWeightedProfitMargin(spend, days) {
  // spend * (Math.pow(0.5, days from most recent performance))
  var weight = spend * Math.pow(0.5, days);
  return roundTwoDec(weight);
}

// compute the recommended budget
export function recommendedBudget(data, budget) {
  var mostRecent = calculateProfitMargin(data['2020-01-05'].revenue, data['2020-01-05'].spend)
  var totalWeights = getTotalWeightedRoAS(data);
  var totalRoAS = getTotalRoAS(data);
  var avgProfit = totalRoAS/totalWeights;
  var num = (1 + avgProfit) * budget;
  var roundedNumber = roundTwoDec(num);
  return (roundedNumber < 10 && mostRecent > 0) ? Math.max(roundedNumber, 10) : roundedNumber;
}

// compute the click rate of an ad
export function clickRate(impressions, clicks) {
  var num = clicks/impressions*100;
  return roundTwoDec(num) + "%";
}

// get total return on ad spend
export function getTotalRoAS(data) {
  return roundTwoDec(
    calculateProfitMargin(data['2020-01-01'].revenue, data['2020-01-01'].spend) +
    calculateProfitMargin(data['2020-01-02'].revenue, data['2020-01-02'].spend) +
    calculateProfitMargin(data['2020-01-03'].revenue, data['2020-01-03'].spend) +
    calculateProfitMargin(data['2020-01-04'].revenue, data['2020-01-04'].spend) + 
    calculateProfitMargin(data['2020-01-05'].revenue, data['2020-01-05'].spend)
  );
}

// get total weights of return on ad spend
export function getTotalWeightedRoAS(data) {
  return roundTwoDec(
    calculateWeightedProfitMargin(data['2020-01-01'].spend, 4) +
    calculateWeightedProfitMargin(data['2020-01-02'].spend, 3) +
    calculateWeightedProfitMargin(data['2020-01-03'].spend, 2) +
    calculateWeightedProfitMargin(data['2020-01-04'].spend, 1) +
    calculateWeightedProfitMargin(data['2020-01-05'].spend, 0)
  );
}

// get weighted average of return on ad spend
export function getWeightedAvg(data) {
  return roundTwoDec(getTotalRoAS(data) / getTotalWeightedRoAS(data));
}

// round to two decimal
function roundTwoDec(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}