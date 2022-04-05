//--Boiler plate - canvas creation--//

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//--------------------------------//

//--Gravity and Player object setup with drawing and updates--//
const gravity = 0.5
class Player{
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }

    draw(){
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        }else{
            this.velocity.y = 0
        }
        

    }
}
//---------------------------------------------------//
//--Actually creating key and calling the Player object--//
const player = new Player();
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
//---------------------------------------------------//

//--Animation--//
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update();

    if(keys.right.pressed){
        player.velocity.x = 5
    }else if(keys.left.pressed){
        player.velocity.x = -5 }
        else{
        player.velocity.x = 0
    }
}

animate()
//-----------------------------------------------------//

//--Event listeners for keypresses--//
window.addEventListener("keydown", ({ keyCode }) => {
    switch(keyCode){
        case 65: 
            //console.log("left");
            keys.left.pressed = true // left
            break
        case 83:
            break //down
        case 68:
            //player.velocity.x = 1
            keys.right.pressed = true // right
            break
        case 87:
            player.velocity.y -= 20 //up
            break


    }
})
window.addEventListener("keyup", ({ keyCode }) => {
    switch(keyCode){
        case 65: 
            //console.log("left");
            keys.left.pressed = false // left
            break
        case 83:
            break //down
        case 68:
            //player.velocity.x = 0 
            keys.right.pressed = false //right
            break
        case 87:
            player.velocity.y -= 20 //up
            break


    }
})

//-----------------------------------------------------//