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
    ctx.beginPath()
    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width / 2, height)
    ctx.stroke()

    let binaryRoom = new BNode({
        minX: 0,
        maxX: width / 2,
        minY: 0,
        maxY: height
    })

    const leftNode = new BNode({
        minX: 0,
        maxX: width / 2,
        minY: 0,
        maxY: height
    })

    const rightNode = new BNode({
        minX: width / 2,
        maxX: width,
        minY: 0,
        maxY: height
    })

    binaryRoom.left = leftNode
    binaryRoom.right = rightNode

    generateRoom(ctx, binaryRoom.left, 350 * 350)
    generateRoom(ctx, binaryRoom.right, 350 * 350)

    console.log(binaryRoom)
}

/**
 * TODO Create Separate Left Node Right Node For Each Direction
 * @param {CanvasRenderingContext2D} ctx 
 * @param {BNode} binaryRoom
 * @param {number} maxSize in Pixel Size
 * @returns 
 */
function generateRoom(ctx, binaryRoom, maxSize) {
    const area = (binaryRoom.data.maxX - binaryRoom.data.minX) * (binaryRoom.data.maxY - binaryRoom.data.minY)
  
    if (maxSize >= area) {
        return
    }

    const split = chooseRandomSplitting()
    const leftNode = new BNode()
    const rightNode = new BNode()

    if (split == "vertical") {
        const randomStartX = Math.floor(
            (Math.random() * ((binaryRoom.data.maxX - 200) - (binaryRoom.data.minX + 200))) + (binaryRoom.data.minX + 200)
        )
        const randomStartY = binaryRoom.data.minY

        const randomX = randomStartX
        const randomY = binaryRoom.data.maxY
        // console.log(randomStartX, randomStartY, randomX, randomY, "VER")
        ctx.beginPath()
        ctx.moveTo(randomStartX, randomStartY)
        ctx.lineTo(randomX, randomY)
        ctx.stroke()

        leftNode.data = {
            minX: binaryRoom.data.minX,
            minY: binaryRoom.data.minY,
            maxX: randomStartX,
            maxY: randomY,
        }
        rightNode.data = {
            minX: randomStartX,
            maxX: binaryRoom.data.maxX,

            minY: randomStartY,
            maxY: randomY
        }
    } else {
        const randomStartX = binaryRoom.data.minX
        const randomStartY = Math.floor(
            (Math.random() * ((binaryRoom.data.maxY - 100) - (binaryRoom.data.minY + 100))) + (binaryRoom.data.minY + 100)
        )

        const randomX = binaryRoom.data.maxX
        const randomY = randomStartY
        // console.log(randomStartX, randomStartY, randomX, randomY, "HOZ")
        ctx.beginPath()
        ctx.moveTo(randomStartX, randomStartY)
        ctx.lineTo(randomX, randomY)
        ctx.stroke()     

        leftNode.data = {
            maxY: randomStartY,
            maxX: randomX,
            
            minX: randomStartX,
            minY: binaryRoom.data.minY
        }

        rightNode.data = {
            maxX: binaryRoom.data.maxX,
            maxY: binaryRoom.data.maxY,
            
            minY: randomStartY,
            minX: randomStartX, 
        }
    }

    binaryRoom.left = leftNode
    binaryRoom.right = rightNode

    generateRoom(ctx, binaryRoom.left, maxSize)
    generateRoom(ctx, binaryRoom.right, maxSize)
}

function chooseRandomSplitting() {
    const splits = ["horizontal", "vertical"]
    
    return splits[Math.floor(Math.random() * splits.length)]
    // return "vertical"
    // return "horizontal"
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