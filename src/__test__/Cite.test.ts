import { Cite } from '../Cite'
import * as bib from './bib.json'

test("", () => {
  const citer = new Cite(bib)
  console.log(citer.refs.advi)
  console.log(citer.cite("advi"))
  console.log(citer.cite("lui2020bayesian"))
  console.log(citer.citedItems)

  expect(1).toEqual(1)
})
