// Create the SVG element
let svgNS = "http://www.w3.org/2000/svg";
let svg = document.createElementNS(svgNS, "svg");
svg.setAttribute("width", "80");
svg.setAttribute("height", "80");
// Apply styles to the SVG element
svg.style.position = "fixed";
svg.style.pointerEvents = "none";

// Create the path element
let path = document.createElementNS(svgNS, "path");
path.setAttribute("d", "M40 40 L40 0 L40 80 L40 40 L0 40 L80 40 Z");

// Create the circle element
let circle = document.createElementNS(svgNS, "circle");
circle.setAttribute("cx", "40");
circle.setAttribute("cy", "40");
circle.setAttribute("r", "20");

for (let element of [path, circle]) {
    element.style.fill = "none";
    element.style.stroke = "#000000";
    element.style.strokeWidth = "2px";
    element.style.strokeLinecap = "butt";
    element.style.strokeLinejoin = "miter";
    element.style.strokeOpacity = "0.5";

    svg.appendChild(element);
}

// Append the SVG to the body
export function displayCrosshair() {
    document.body.appendChild(svg);
}