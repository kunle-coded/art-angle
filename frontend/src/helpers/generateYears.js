const startYear = 2024;
const numYears = 100;
const years = [];

for (let i = 0; i < numYears; i++) {
  years.push((startYear - i).toString());
}

export { years };
