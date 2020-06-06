const mapDiv = document.getElementById('map')

for(let i=1; i<=4; i++){
  for(let j=1; j<=4; j++){
    let child = document.createElement('div')
    child.className = 'box b'+i+j
    mapDiv.appendChild(child)
  }
}