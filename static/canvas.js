function drawScene() {
    const canvas = document.getElementById("scene")
    const canvasParent = document.getElementById("main-scene")
    
    /**
     * @type {CanvasRenderingContext2D}
     */
    const ctx = canvas.getContext("2d")
    ctx.canvas.width = canvasParent.clientWidth
    ctx.canvas.height = canvasParent.clientHeight

    ctx.fillStyle = 'gray';

    ctx.fillRect(0,0, canvasParent.clientWidth, canvasParent.clientHeight)  

    ctx.strokeStyle = "white"
    ctx.lineWidth = 5

    binarySpacePartition(
        ctx,
        canvasParent.clientWidth, 
        canvasParent.clientHeight,
        150
    )
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {*} width 
 * @param {*} height 
 * @param {*} maxWidth 
 * @returns 
 */
function binarySpacePartition(ctx, width, height) {
    const split = chooseRandomSplitting()

    console.log(split)

    // if (split == "vertical") {
    //     ctx.beginPath()
    //     ctx.moveTo(0, height / 2)
    //     ctx.lineTo(width, height / 2)
    //     ctx.stroke()
    // } else {
    ctx.beginPath()
    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width / 2, height)
    ctx.stroke()
    // }

    let binaryRoom = new BNode({
        minWidth: 0,
        maxWidth: width / 2,
        minHeight: 0,
        maxHeight: height
    })

    const leftNode = new BNode({
        minWidth: 0,
        maxWidth: width / 2,
        minHeight: 0,
        maxHeight: height
    })

    const rightNode = new BNode({
        minWidth: width / 2,
        maxWidth: width,
        minHeight: 0,
        maxHeight: height
    })

    binaryRoom.left = leftNode
    binaryRoom.right = rightNode

    generateRoom(ctx, binaryRoom.left, 4)
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {BNode} binaryRoom
 * @param {number} maxRecursive 
 * @returns 
 */
function generateRoom(ctx, binaryRoom, maxRecursive) {
    let max = maxRecursive + 1
    if (max == 4) {
        return
    }

    const split = chooseRandomSplitting()

    if (split == "vertical") {
        const randomStartX = Math.random() * binaryRoom.data.minWidth
        const randomStartY = Math.random() * binaryRoom.data.maxHeight

        const randomX = binaryRoom.data.maxWidth
        const randomY = Math.random() * binaryRoom.data.maxHeight
        console.log(randomStartX, randomStartY, randomX, randomY)
        ctx.beginPath()
        ctx.moveTo(randomStartX, randomStartY)
        ctx.lineTo(randomX, randomY)
        ctx.stroke()
    }
}

function chooseRandomSplitting() {
    const splits = ["horizontal", "vertical"]
    
    // return splits[Math.floor(Math.random() * splits.length)]
    return "vertical"
}

function chooseColorRandom() {
    const colors = ["purple", "green", "red", "blue", "white", "black"]
    
    return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
function createSquareDungeon(ctx, x, y, width, height) {
    ctx.fillStyle = "black"
    ctx.fillRect(x, y, width, height)
}

function junk() {

    const side = 150
    const bossSide = 250

    let randX = Math.floor(Math.random() * canvasParent.clientWidth)
    let randY = Math.floor(Math.random() * canvasParent.clientHeight)

    if (randX + bossSide >= canvasParent.clientWidth) {
      randX -= bossSide
    }

    // Simulate the height size of rect 
    if (randY + bossSide >= canvasParent.clientHeight) {
      randY -= bossSide
    }

    createSquareDungeon(ctx, randX, randY, bossSide, bossSide)

    let dungeonPoints = []

    for (let index = 0; index < 5; index++) {
      let x = Math.floor(Math.random() * canvasParent.clientWidth)
      let y = Math.floor(Math.random() * canvasParent.clientHeight)

      // Simulate the width size of rect 
      if (x + side >= canvasParent.clientWidth) {
        x -= side
      }

      // Simulate the height size of rect 
      if (y + side >= canvasParent.clientHeight) {
        y -= side
      }

      createSquareDungeon(ctx, x, y, side, side)

      dungeonPoints.push([x, y])
    }

    const start = dungeonPoints[0]

    const pivotDungeon = Math.floor(side / 2)

    ctx.strokeStyle = "white"
    ctx.lineWidth = 25

    ctx.beginPath()
    ctx.moveTo(start[0] + pivotDungeon, start[1] + pivotDungeon)
    
    
    for (let index = 1; index < dungeonPoints.length; index++) {
      const [x, y] = dungeonPoints[index];

      ctx.lineTo(x + pivotDungeon, y + pivotDungeon)
    }

    const pivotBossDungeon = Math.floor(bossSide / 2)

    ctx.lineTo(randX + pivotBossDungeon, randY+ pivotBossDungeon)
    
    ctx.stroke()
}