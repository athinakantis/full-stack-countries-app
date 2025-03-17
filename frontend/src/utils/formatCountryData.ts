import { Currency } from '../types/country'

export function formatPopulation(population: number): string {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatCurrencies(currencies: Record<string, Currency>) {
  return Object.values(currencies).map(currency => currency.name).join(', ')
}