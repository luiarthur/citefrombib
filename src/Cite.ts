export class Cite {
  // This stores a json object of all the references (from a jsonified latex
  // bib file).
  refs: Object

  // This stores the items that have been cited.
  citedItems: Set<string>

  constructor(refs) {
    this.refs = refs
    this.citedItems = new Set([])
  }

  parseAuthor(author: string) {
    if (author.includes(',')) {  // Last name, first name and ...
      const lastname = author.trim().split(',')[0]
    } else { // First name last name and ...
      const lastname = author.trim().split(' ').slice(-1)[0]
    }
    return {lastname: lastname}
  }

  // Make an infline references (like `\cite` and `\citep` in latex).
  // TODO: TEST THIS.
  cite(id: string, paren: boolean=false, f: () => string = () => "", add: boolean=true): string {
    let citation = ""
    const authors = this.refs[id].author.split(' and ').map(this.parseAuthor)
    const year = this.refs[id].year
    if (authors.length == 1) {
      citation += `${authors[0].lastname} [${year}]`
    } else if (authors.length == 2) {
      citation += `${authors[0].lastname} and ${authors[1].lastname} [${year}]`
    } else {
      citation += `${authors[0].lastname} et. al [${year}]`
    }
    this.citedItems.add(id)
    return citation
  }

  // Generate the bibliography.
  bibliography(format={}) {
  }
}
