import { handleDirection, Slider } from './pager.js'
// import { citefrombib } from './citefrombib.min.js'

// Initialize the slider.
const slider = new Slider()

// This handles slide navigation.
$(document).on("keydown", function (e) {
  handleDirection(e, slider)
});

// citefrombib
citefrombib.make()
