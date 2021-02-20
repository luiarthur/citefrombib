import $ from 'jquery'
import { Bib } from './Bib'

type settingsType = {
  citeattr: string,
  citepattr: string,
  bibattr: string,
  citetag: string
}

export let defaultSettings: settingsType = {
  citeattr: "cite",
  citepattr: "citep",
  bibattr: "bibliography",
  citetag: "param"
}

// Get path to bibtex json file.
export function getBibPath(bibattr: string=defaultSettings.bibattr) {
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
export function makebib(bibjson: Object, settings: settingsType=defaultSettings) {
  const {citeattr, citepattr, bibattr, citetag} = settings
  const bib = new Bib(bibjson)

  // Parse and replace the `cite` and `citep`
  const attrs = [citeattr, citepattr]
  attrs.forEach(attr => {
    const tags = Array.from($(`${citetag}[${attr}]`))
    tags.forEach(tag => {
      const ref = tag.getAttribute(attr)
      const citeItem = attr == citeattr? bib.cite(ref) : bib.citep(ref)
      $(`${citetag}[${attr}='${ref}']`).replaceWith(`<a class="citation" ref="${ref}"> ${citeItem} </a>`)
    })
  })
  console.log(`Replaced <${citetag}> with citation.`)

  // Replace bibliography
  const bibtag = $(`div[${bibattr}]`)
  bib.bibliography().forEach(item => {
    bibtag.append(`<p> ${item} </p>`)
  })
  console.log(`Replaced ${bibattr}.`)
}

export function make(bibPath: string=getBibPath(), settings: settingsType=defaultSettings) {
  $.getJSON(bibPath, data => makebib(data, settings))
  console.log(`Got ${bibPath}!`)
}

// Run this on load.
// $(() => make())
