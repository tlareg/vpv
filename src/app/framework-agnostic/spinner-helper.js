import Spinner from 'spin.js'

const spinnerConfig = {
  lines: 17 // The number of lines to draw
, length: 16 // The length of each line
, width: 2 // The line thickness
, radius: 84 // The radius of the inner circle
, scale: 1 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#101010' // #rgb or #rrggbb or array of colors
, opacity: 0 // Opacity of the lines
, rotate: 4 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 2 // Rounds per second
, trail: 64 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '50%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: false // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
}

class SpinnerHelper {
  constructor() {}

  startAppSpinner() {
    this.stopAppSpinner();
    this.appSpinner = new Spinner(spinnerConfig).spin(document.body);
    this.appendBodyOverlay();
  }

  stopAppSpinner() {
    this.appSpinner && this.appSpinner.stop();
    this.removeBodyOverlay();
  }

  appendBodyOverlay() {
    this.bodyOverlay = document.createElement('div');
    this.bodyOverlay.classList.add('vpv-spinner-overlay');
    document.body.insertBefore(this.bodyOverlay, this.appSpinner.el);
  }

  removeBodyOverlay() {
    this.bodyOverlay && this.bodyOverlay.parentNode.removeChild(this.bodyOverlay);
    this.bodyOverlay = null;
  }
}

const spinnerHelper = new SpinnerHelper()
export default spinnerHelper