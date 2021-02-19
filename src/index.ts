import $ from 'jquery'
import { Bib } from './Bib'

export function getBibPath(bibattr: string="bibliography") {
  return $(`div[${bibattr}`)[0].getAttribute(bibattr)
}

export function makebib(bibjson: Object, citeattr: string="cite", citepattr:
                        string="citep", bibattr: string="bibliography",
                        tag: string="param") {
  const bib = new Bib(bibjson)

  // Parse and replace the `cite` and `citep`
  const attrs = [citeattr, citepattr]
  attrs.forEach(attr => {
    const tags = Array.from($(`${tag}[${attr}]`))
    tags.forEach(citetag => {
      const ref = citetag.getAttribute(attr)
      const citeItem = attr == citeattr? bib.cite(ref) : bib.citep(ref)
      $(`${tag}[${attr}='${ref}']`).replaceWith(`<a ref="${ref}"> ${citeItem} </a>`)
    })
  })

  // Replace bibliography
  console.log("Replacing bibliography.")
  const bibtag = $(`div[${bibattr}]`)
  bib.bibliography().forEach(item => {
    bibtag.append(`<p> ${item} </p>`)
  })
}

// Run this on load.
$(() => $.getJSON(getBibPath(), data => makebib(data)))
