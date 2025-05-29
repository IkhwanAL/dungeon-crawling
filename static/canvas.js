function drawScene() {
    const canvas = document.getElementById("scene")

    /**
     * @type {CanvasRenderingContext2D}
     */
    const ctx = canvas.getContext("2d")

    // Draw a blue rectangle
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, vw(100), vh(83));
}

function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

function vw(percent) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * w) / 100;
}