import { countries, continents } from "countries-list";

export const sortedCountries = Object.entries(countries).sort((a, b) => {
  const countryA = a[1].name.toUpperCase();
  const countryB = b[1].name.toUpperCase();
  return countryA.localeCompare(countryB);
});

export const sortedContinents = Object.entries(continents).sort((a, b) => {
  const continentA = a[1].toUpperCase();
  const continentB = b[1].toUpperCase();
  return continentA.localeCompare(continentB);
});
