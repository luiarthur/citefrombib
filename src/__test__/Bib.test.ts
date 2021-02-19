import { Bib } from '../Bib'
import * as bibjson from './bib.json'

test("", () => {
  const bib = new Bib(bibjson)

  // Sanity check: print one bibentry.
  // console.log(bib.refs.advi)

  // Check citations are correctly formatted.
  expect(bib.cite("advi")).toEqual("Kucukelbir et al. (2017)")
  expect(bib.cite("lui2020bayesian")).toEqual("Lui et al. (2020)")

  // Check parenthesized citations are correctly formatted.
  expect(bib.citep("advi")).toEqual("(Kucukelbir et al. 2017)")
  expect(bib.citep("lui2020bayesian")).toEqual("(Lui et al. 2020)")

  // Check that the cited items are being tracked.
  expect(bib.citedItems).toEqual(new Set(["advi", "lui2020bayesian"]))

  // Check number of cited items is correct.
  expect(bib.citedItems.size == 2)

  // Print a sample bibliography.
  console.log(bib.bibliography().join('\n'))
})
