import $ from 'jquery'
import { Bib } from './Bib'

// Get path to bibtex json file.
export function getBibPath(bibattr: string="bibliography") {
  return $(`div[${bibattr}`)[0].getAttribute(bibattr)
}

/** Parse the html file using a jsonified bibtex.
 *
 * @param bibjsob: bibtex file contents in json format.
 *
 * @param tag: the tag that is used to contain the bibtex reference id.
 * (Defaults to "param". References in HTML should be thus be called as `<param
 * cite="myBibTexRefID">`.
 *
 * @param citeattr: an attribute to distinguish to denote `\cite`. Defaults to "cite".
 *
 * @param citepattr: an attribute to distinguish to denote `\citep`. Defaults to "citep".
 *
 * @param bibattr: Path to "bib.json" should be written in html at the bottom of the page as 
 *                 <div bibliography="path/to/my/bib.json"></div>. If `bibattr` is provided, 
 *                 then <div `provided-attr`="path/to/my/bib.json"></div>.
 */
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
