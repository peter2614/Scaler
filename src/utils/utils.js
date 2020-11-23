// compute the profit margin
export function calculateProfitMargin(revenue, spend) {
  var num = (revenue-spend)/revenue;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// compute the weighted profit margin
export function calculateWeightedProfitMargin(spend, days, profit) {
  // spend * (Math.pow(0.5, days from most recent performance))
  var weight = spend * Math.pow(0.5, days);
  var num = weight * profit;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// compute the recommended budget
export function recommendedBudget(data, budget) {
  var avgProfit = (
    calculateWeightedProfitMargin(data['2020-01-01'].spend, 4, calculateProfitMargin(data['2020-01-01'].revenue, data['2020-01-01'].spend)) +
    calculateWeightedProfitMargin(data['2020-01-02'].spend, 3, calculateProfitMargin(data['2020-01-02'].revenue, data['2020-01-02'].spend)) +
    calculateWeightedProfitMargin(data['2020-01-03'].spend, 2, calculateProfitMargin(data['2020-01-03'].revenue, data['2020-01-03'].spend)) +
    calculateWeightedProfitMargin(data['2020-01-04'].spend, 1, calculateProfitMargin(data['2020-01-04'].revenue, data['2020-01-04'].spend)) +
    calculateWeightedProfitMargin(data['2020-01-05'].spend, 0, calculateProfitMargin(data['2020-01-05'].revenue, data['2020-01-05'].spend))
  ) / 5;
  var num = (1 + avgProfit) * budget;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// compute the click rate of an ad
export function clickRate(impressions, clicks) {
  var num = clicks/impressions*100;
  return Math.round((num + Number.EPSILON) * 100) / 100 + "%";
}