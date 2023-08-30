let recordedPseudo = localStorage.getItem('pseudo')
if(recordedPseudo){
    console.log(recordedPseudo)
    let playerPseudo = recordedPseudo
}else{
    playerPseudo = prompt('entrez votre pseudo');
    localStorage.setItem('pseudo', playerPseudo);
}
const spanPseudo = document.querySelector('#pseudo')
//sans storage
//spanPseudo.innerText = playerPseudo
//avec local storage
spanPseudo.innerText = localStorage.getItem('pseudo')
const vanguard = document.querySelector('#vanguard')
const vanduul = document.querySelector('#vanduul')
const loading = document.querySelector('#loading')
const root = document.querySelector('#game')
//let selectedShip = "img/vanguard.png"
//let enemyShip = "img/vanduul.png"

let drawLaser = function(ship) {
    let missile = document.createElement('img')
    missile.style.height = "50px"
    missile.style.width = "5px"
    missile.style.position = "absolute"
    missile.style.left = ship.style.left
    if(ship.className !== "enemy"){
        missile.src = "img/green_laser.png"
        missile.style.top = ship.style.top
    } else {
        missile.src = "img/red_laser.png"
        missile.style.top = (parseInt(ship.style.top) + parseInt(ship.style.height)) + "px"
    }
    root.appendChild(missile)
}


/*let heroMissileMove = function() {

}*/

let drawHero = function(ship){
    
    let hero = document.createElement('img')
    if(ship === "img/vanguard.png"){
        hero.src = "img/vanguard.png"
    } else {
        hero.src = "img/vanduul.png"
    }
    hero.className = "hero"
    hero.style.height = "150px"
    hero.style.width = "100px"
    hero.style.position = "absolute"
    hero.style.top = "80%"
    hero.style.left = "50%"
    root.appendChild(hero)
    document.addEventListener('keydown', function(e){
        let heroPosX = parseInt(hero.style.left)
        switch(e.code){
            case "ArrowLeft":
                //console.log('je vais à gauche')
                let newLeft = heroPosX - 1
                hero.style.left = newLeft + "%"
            break
            case "ArrowRight":
                //console.log('je vais à droite')
                let newRight = heroPosX + 1
                hero.style.left = newRight + "%"
            break
            case "Space": 
                drawLaser(hero)
            break   
        }
    })
}

let drawEnnemies = function(ship, speed, enemies){
    for(i=0; i<enemies; i++){
        let alien = document.createElement('img')
        if(ship === "img/vanguard.png"){
            alien.src = "img/vanduul.png"
        } else {
            alien.src = "img/vanguard.png"
        }
        alien.className = "enemy"
        alien.style.height = "150px"
        alien.style.width = "150px"
        alien.style.position = "absolute"
        alien.style.top = "0"
        alien.style.left = i * 200 + "px"
        root.appendChild(alien)
        let enemyMove = setInterval(function() {
            let alienPosY = parseInt(alien.style.top)
            let newTop = alienPosY + 10
            alien.style.top = newTop + "px" 
            drawLaser(alien) 
        },speed)
    }
}

let gameLoop = function(lvl, speed, enemiesCount, ship){
    let difficulty = lvl
    let enemySpeed = speed
    let enemies = enemiesCount
    drawHero(ship)
    drawEnnemies(ship, speed, enemies)
}

vanguard.addEventListener('click', function() {
    loading.style.display = "none"
    root.style.display = "block"
    gameLoop(1, 500, 6, 'img/vanguard.png')
})

vanduul.addEventListener('click', function() {
    loading.style.display = "none"
    root.style.display = "block"
    gameLoop(1, 500, 6, 'img/vanduul.png')
})
