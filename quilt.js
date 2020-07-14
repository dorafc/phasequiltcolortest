// color pallette
const plum = "#906678"
const greys = ["#e4e7ed", "#d3d5db", "#b8babf", "#a6a8ad", "#989a9e", "#84868a", "#696b6e", "#46484a"]

const background = plum
const gradient = greys

// dimensions
const dimensions = {
  block : 100,
}

let quilt = "phaseQuilt"
let quiltSVG

// add quilt SVG
function insertQuiltSVG(spaceName, quiltID, dimensions){

  let quiltSVG, quiltSpace

  quiltSpace = document.getElementById(spaceName)
  quiltSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")

  quiltSVG.setAttribute("height", dimensions.block * 5)
  quiltSVG.setAttribute("width", dimensions.block * 5)
  quiltSVG.setAttribute("viewbox", `0 0 ${dimensions.block * 5} ${dimensions.block * 5}`)
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

// draw semi circle block

// draw 3x3 triangles

// draw 2x2 triangles

// MAKE QUILT
quiltSVG = insertQuiltSVG("quilt", quilt, dimensions)
quiltSVG.appendChild(drawSquare(0, 0, background, dimensions.block))
quiltSVG.appendChild(drawTriangle(dimensions.block, 0, background, gradient[0], dimensions.block, 0))
quiltSVG.appendChild(drawCurve(dimensions.block*2, 0, background, gradient[0], dimensions.block, 0))