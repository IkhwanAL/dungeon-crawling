function drawScene() {
    const canvas = document.getElementById("scene")
    const canvasParent = document.getElementById("main-scene")
    
    /**
     * @type {CanvasRenderingContext2D}
     */
    const ctx = canvas.getContext("2d")
    ctx.canvas.width = canvasParent.clientWidth
    ctx.canvas.height = canvasParent.clientHeight

    // Draw a blue rectangle
    ctx.fillStyle = 'gray';

    ctx.fillRect(0,0, canvasParent.clientWidth, canvasParent.clientHeight)

    const side = 150

    for (let index = 0; index < 5; index++) {
      let x = Math.random() * canvasParent.clientWidth
      let y = Math.random() * canvasParent.clientHeight

      // Simulate the width size of rect 
      if (x + side >= canvasParent.clientWidth) {
        x -= side
      }

      // Simulate the height size of rect 
      if (y + side >= canvasParent.clientHeight) {
        y -= side
      }

      createSquareDungeon(ctx, x, y, side, side)
    }
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
function createSquareDungeon(ctx, x, y, width, height) {
  ctx.fillStyle = "black"
  ctx.fillRect(x, y, width, height)
}