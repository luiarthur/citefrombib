import { Cite } from '../Cite'
import * as bib from './bib.json'

test("", () => {
  const citer = new Cite(bib)

  // Sanity check: print one bibentry.
  // console.log(citer.refs.advi)

  // Check citations are correctly formatted.
  expect(citer.cite("advi")).toEqual("Kucukelbir et al. (2017)")
  expect(citer.cite("lui2020bayesian")).toEqual("Lui et al. (2020)")

  // Check parenthesized citations are correctly formatted.
  expect(citer.citep("advi")).toEqual("(Kucukelbir et al. 2017)")
  expect(citer.citep("lui2020bayesian")).toEqual("(Lui et al. 2020)")

  // Check that the cited items are being tracked.
  expect(citer.citedItems).toEqual(new Set(["advi", "lui2020bayesian"]))

  // Check number of cited items is correct.
  expect(citer.citedItems.length == 2)

  // Print a sample bibliography.
  console.log(citer.bibliography().join('\n'))
})
