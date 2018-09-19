const result = require('./fixer_latest.json');
const rates = result.rates;

const ratesArray = [];

for (let r of Object.keys(rates)) {
	ratesArray.push({ currency: r, rate: rates[r] });
}

console.log(ratesArray)
