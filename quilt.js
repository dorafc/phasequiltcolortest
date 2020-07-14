// color pallette
const plum = "#906678"
const greys = ["#cfd4cb", "#c0c4bc", "#989c95", "#7d807a", "#636661", "#4a4d49", "#2f302e", "#1e1f1d"]

const background = plum
const gradient = greys

// dimensions
const dimensions = {
  block : 200,
}

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
}

// draw square block

// draw triangle block

// draw curved block

// draw circle block

// draw semi circle block

// draw 3x3 triangles

// draw 2x2 triangles

// MAKE QUILT
insertQuiltSVG("quilt", "phaseQuilt", dimensions)