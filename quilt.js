// color pallette
const plum = "#906678"
const greys = ["#BEC2C5", "#A9AEB2", "#939A9F", "#7D868C", "#697277", "#565D61", "#43494C", "#303436"]
const rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "black"]

const background = plum
const gradient = greys

// dimensions
const size = 100;

let quilt = "phaseQuilt"
let quiltSVG

// add quilt SVG
function insertQuiltSVG(spaceName, quiltID, dimensions){

  let quiltSVG, quiltSpace

  quiltSpace = document.getElementById(spaceName)
  quiltSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")

  quiltSVG.setAttribute("height", size * 5)
  quiltSVG.setAttribute("width", size * 5)
  quiltSVG.setAttribute("viewbox", `0 0 ${size * 5} ${size * 5}`)
  quiltSVG.setAttribute("id", quiltID)

  quiltSpace.appendChild(quiltSVG)

  return quiltSVG
}

// draw square block
function drawSquare(startX, startY, background, size){
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute("fill", background)

  let draw = `M${startX} ${startY} l${size} 0 l0 ${size} l${-size} 0Z`
  path.setAttribute("d", draw)

  path.setAttribute("style", "stroke-width:.25; stroke:#000")

  return path
}

// draw triangle block
function drawTriangle(startX, startY, background, color, size, rotate){
  let triangleGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")

  let pathBG = document.createElementNS("http://www.w3.org/2000/svg", "path")
  pathBG.setAttribute("fill", background)

  let drawBG = `M${startX} ${startY} l${size} 0 l${-size} ${size}Z`
  pathBG.setAttribute("d", drawBG)

  let pathColor = document.createElementNS("http://www.w3.org/2000/svg", "path")
  pathColor.setAttribute("fill", color)

  let drawColor = `M${startX+size} ${startY} l0 ${size} l${-size} 0Z`
  pathColor.setAttribute("d", drawColor)

  triangleGroup.appendChild(pathBG)
  triangleGroup.appendChild(pathColor)

  // rotate the block
  if (rotate !== 0){
    triangleGroup.setAttribute("transform", `rotate(${rotate} ${size/2 + startX} ${size/2 + startY})`)
  }

  triangleGroup.setAttribute("style", "stroke-width:.25; stroke:#000")

  return triangleGroup
}

// draw curved block
function drawCurve(startX, startY, background, color, size, rotate){
  let curveGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")

  let pathBG = document.createElementNS("http://www.w3.org/2000/svg", "path")
  pathBG.setAttribute("fill", background)

  let drawBG = `M${startX} ${startY} l${size} 0 a${-size} ${size} 0 0 0 ${-size} ${size}Z`
  pathBG.setAttribute("d", drawBG)

  let pathColor = document.createElementNS("http://www.w3.org/2000/svg", "path")
  pathColor.setAttribute("fill", color)

  let drawColor = `M${startX+size} ${startY} a${-size} ${size} 0 0 0 ${-size} ${size} l${size} 0Z`
  pathColor.setAttribute("d", drawColor)

  curveGroup.appendChild(pathBG)
  curveGroup.appendChild(pathColor)

  // rotate the block
  if (rotate !== 0){
    curveGroup.setAttribute("transform", `rotate(${rotate} ${size/2 + startX} ${size/2 + startY})`)
  }

  curveGroup.setAttribute("style", "stroke-width:.25; stroke:#000")

  return curveGroup
}

// draw circle block
function drawCircle(startX, startY, background, color, size){
  let halfSize = size/2
  let block = document.createElementNS("http://www.w3.org/2000/svg", "g")
  block.appendChild(drawCurve(startX, startY, background, color, halfSize, 0))
  block.appendChild(drawCurve(startX+halfSize, startY, background, color, halfSize, 90))
  block.appendChild(drawCurve(startX+halfSize, startY+halfSize, background, color, halfSize, 180))
  block.appendChild(drawCurve(startX, startY+halfSize, background, color, halfSize, 270))
  return block
}

// draw semi circle block
function drawSemiCircle(startX, startY, background, color, size, rotate){
  let halfSize = size/2
  let block = document.createElementNS("http://www.w3.org/2000/svg", "g")
  block.appendChild(drawCurve(startX, startY, background, color[0], halfSize, 0))
  block.appendChild(drawCurve(startX+halfSize, startY, background, color[0], halfSize, 90))
  block.appendChild(drawCurve(startX+halfSize, startY+halfSize, background, color[1], halfSize, 90))
  block.appendChild(drawCurve(startX, startY+halfSize, background, color[1], halfSize, 0))

  if (rotate !== 0){
    block.setAttribute("transform", `rotate(${rotate} ${size/2 + startX} ${size/2 + startY})`)
  }

  return block
}

// draw 3x3 triangles
function drawThreeTriangles(startX, startY, background, color, size, rotate){
  let thirdSize = size/3
  let block = document.createElementNS("http://www.w3.org/2000/svg", "g")
  block.appendChild(drawTriangle(startX, startY, background, color[0], thirdSize, 0))
  block.appendChild(drawTriangle(startX+thirdSize, startY, background, color[1], thirdSize, 0))
  block.appendChild(drawTriangle(startX+thirdSize*2, startY, background, color[2], thirdSize, 0))

  block.appendChild(drawTriangle(startX, startY+thirdSize, background, color[1], thirdSize, 0))
  block.appendChild(drawTriangle(startX+thirdSize, startY+thirdSize, background, color[2], thirdSize, 0))
  block.appendChild(drawTriangle(startX+thirdSize*2, startY+thirdSize, background, color[3], thirdSize, 0))

  block.appendChild(drawTriangle(startX, startY+thirdSize*2, background, color[2], thirdSize, 0))
  block.appendChild(drawTriangle(startX+thirdSize, startY+thirdSize*2, background, color[3], thirdSize, 0))
  block.appendChild(drawTriangle(startX+thirdSize*2, startY+thirdSize*2, background, color[4], thirdSize, 0))

  if (rotate !== 0){
    block.setAttribute("transform", `rotate(${rotate} ${size/2 + startX} ${size/2 + startY})`)
  }
  
  return block
}

// draw 2x2 triangles
function drawTwoTriangles(startX, startY, background, color, size, rotate){
  let halfSize = size/2
  let block = document.createElementNS("http://www.w3.org/2000/svg", "g")
  block.appendChild(drawTriangle(startX, startY, background, color[0], halfSize, 0))
  block.appendChild(drawTriangle(startX+halfSize, startY, background, color[0], halfSize, 90))
  block.appendChild(drawTriangle(startX+halfSize, startY+halfSize, background, color[1], halfSize, 90))
  block.appendChild(drawTriangle(startX, startY+halfSize, background, color[1], halfSize, 0))

  if (rotate !== 0){
    block.setAttribute("transform", `rotate(${rotate} ${size/2 + startX} ${size/2 + startY})`)
  }
  
  return block
}

// MAKE QUILT
quiltSVG = insertQuiltSVG("quilt", quilt, size)
quiltSVG.appendChild(drawSquare(0, 0, background, size))
quiltSVG.appendChild(drawSquare(size, 0, background, size))
quiltSVG.appendChild(drawTwoTriangles(size*2, 0, background, gradient.slice(5,7).reverse(), size, 0))
quiltSVG.appendChild(drawSquare(size*3, 0, background, size))
quiltSVG.appendChild(drawSquare(size*4, 0, background, size))

quiltSVG.appendChild(drawSquare(0, size, background, size))
quiltSVG.appendChild(drawThreeTriangles(size, size, background, gradient.slice(1,6).reverse(), size, 0))
quiltSVG.appendChild(drawSemiCircle(size*2, size, background, gradient.slice(1,3).reverse(), size, 0))
quiltSVG.appendChild(drawThreeTriangles(size*3, size, background, gradient.slice(1,6).reverse(), size, 90))
quiltSVG.appendChild(drawSquare(size*4, size, background, size))

quiltSVG.appendChild(drawTwoTriangles(0, size*2, background, gradient.slice(5,7).reverse(), size, 270))
quiltSVG.appendChild(drawSemiCircle(size, size*2, background, gradient.slice(1,3).reverse(), size, 270))
quiltSVG.appendChild(drawCircle(size*2, size*2, background, gradient[0], size))
quiltSVG.appendChild(drawSemiCircle(size*3, size*2, background, gradient.slice(1,3).reverse(), size, 90))
quiltSVG.appendChild(drawTwoTriangles(size*4, size*2, background, gradient.slice(5,7).reverse(), size, 90))

quiltSVG.appendChild(drawSquare(0, size*3, background, size))
quiltSVG.appendChild(drawThreeTriangles(size, size*3, background, gradient.slice(1,6).reverse(), size, 270))
quiltSVG.appendChild(drawSemiCircle(size*2, size*3, background, gradient.slice(1,3).reverse(), size, 180))
quiltSVG.appendChild(drawThreeTriangles(size*3, size*3, background, gradient.slice(1,6).reverse(), size, 180))
quiltSVG.appendChild(drawSquare(size*4, size*3, background, size))

quiltSVG.appendChild(drawSquare(0, size*4, background, size))
quiltSVG.appendChild(drawSquare(size, size*4, background, size))
quiltSVG.appendChild(drawTwoTriangles(size*2, size*4, background, gradient.slice(5,7).reverse(), size, 180))
quiltSVG.appendChild(drawSquare(size*3, size*4, background, size))
quiltSVG.appendChild(drawSquare(size*4, size*4, background, size))


// quiltSVG.appendChild(drawTriangle(size, 0, background, gradient[0], size, 0))
// quiltSVG.appendChild(drawCurve(size*2, 0, background, gradient[0], size, 0))
// quiltSVG.appendChild(drawCircle(size*3, 0, background, gradient[0], size))
// quiltSVG.appendChild(drawSemiCircle(size*4, 0, background, gradient.slice(0,2), size, 0))
// quiltSVG.appendChild(drawTwoTriangles(0, size, background, gradient.slice(0,2), size, 0))
// quiltSVG.appendChild(drawThreeTriangles(size, size, background, gradient.slice(0,4), size, 0))