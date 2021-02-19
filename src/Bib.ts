export class Bib {
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
    let lastName = ""
    let givenName = ""
    if (author.includes(',')) {  // Last name, first name and ...
      [lastName, givenName] = author.trim().split(',')
    } else { // First name last name and ...
      const fullname = author.trim().split(' ')
      const lname = fullname.splice(-1)
      lastName = lname[0]
      givenName = fullname.join(' ')
    }
    return {lastName: lastName.trim(), givenName: givenName.trim()}
  }

  citep(id: string, f: () => string = () => "", add: boolean=true): string {
    return this.cite(id, true, f, add)
  }

  // Make an infline references (like `\cite` and `\citep` in latex).
  // TODO: TEST THIS.
  cite(id: string, paren: boolean=false, f: () => string = () => "", add: boolean=true): string {
    let citation = ""
    const authors = this.refs[id].author.split(' and ').map(this.parseAuthor)
    const year = this.refs[id].year
    if (authors.length == 1) {
      citation += `${authors[0].lastName} [${year}]`
    } else if (authors.length == 2) {
      if (paren) {
        citation += `(${authors[0].lastName} and ${authors[1].lastName} ${year})`
      } else {
        citation += `${authors[0].lastName} and ${authors[1].lastName} (${year})`
      }
    } else {
      if (paren) {
        citation += `(${authors[0].lastName} et al. ${year})`
      } else {
        citation += `${authors[0].lastName} et al. (${year})`
      }
    }
    add && this.citedItems.add(id)
    return citation
  }

  bibitem(id: string, format={}) {
    // TODO: handle the format.
    let {author, year, title, journal} = this.refs[id]
    let authors = author.split(' and ').map(this.parseAuthor)
                        .map(_ => [_.givenName, _.lastName].join(' '))
    let lastAuthor = authors.splice(-1)
    let allAuthors = authors.join(', ') + ', and ' + lastAuthor[0]
    return `${allAuthors}. ${title}. ${journal}, ${year}`
  }

  // Generate the bibliography.
  bibliography(format={}) {
    // TODO: handle the format.
    return Array.from(this.citedItems).map(id => this.bibitem(id, format))
  }
}
