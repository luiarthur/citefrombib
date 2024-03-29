// A slider for slide transitions.
export class Slider {
  constructor(currentPage=1) {
    this.currentPage = currentPage
    this.extraPages = $('div.backup-slides section').length
    this.totalPages = $('section').length - this.extraPages
    this.realTotalPages = this.totalPages + this.extraPages
    this.previousPage = 0
    makePager()
    this.setVisibility()
    this.verbose = false 
    this.setSectionId()
  }

  setSectionId() {
    for (let i = 0; i < this.realTotalPages; i++) {
      $("section").eq(i).attr('id', i)
    }
  }

  increment() {
    if (this.currentPage < this.realTotalPages) {
      this.previousPage = this.currentPage
      this.currentPage += 1
      this.setVisibility()
    }
  }

  decrement() {
    if (this.currentPage > 1) {
      this.previousPage = this.currentPage
      this.currentPage -= 1
      this.setVisibility()
    }
  }

  setVisibility() {
    this.previousPage > 0 && $("section").eq(this.previousPage - 1).css("display", "none")
    $("section").eq(this.currentPage - 1).css("display", "block")

    $("#current-page").text(this.currentPage)
    if (this.currentPage > this.totalPages) {
      $("#total-pages").text(this.realTotalPages)
    } else {
      $("#total-pages").text(this.totalPages)
    }

    this.verbose && console.log("setting visibility")
  }
}

export function handleDirection(e, slider) {
  const leftKeys = [8 ,37, 72]  // backspace, left, h
  const rightKeys = [13, 32, 39, 76]  // enter, space, right, l

  if (leftKeys.includes(e.which)) {
    slider.decrement()
  } else if (rightKeys.includes(e.which)) {
    slider.increment()
  }
}

// Page counter.
export function makePager() {
  const pager = `
  <div id="page-counter">
    <span id="current-page"></span> / <span id="total-pages"></span>
  </div>`
  $('.slide-deck').before(pager)
}
