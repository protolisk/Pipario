//--Boiler plate - canvas creation--//
import platform from "../img/platform_1.png"
console.log(platform);
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
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
        this.isGrounded = false;
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

class Platform {
    constructor({x, y, image}){
        this.position = {
            x: x,
            y: y
        }

        this.image = image
        this.width = image.width
        this.height = image.height


    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const image = new Image()
image.src = platform

console.log(image);
//---------------------------------------------------//
//--Actually creating objects--//
const player = new Player();
//const platform = new Platform();
const platforms = [new Platform({x: -1, y: 520, image: image}), new Platform({x: 500, y: 700, image: image}), new Platform({x: 700, y: 900, image: image})]
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
//---------------------------------------------------//
//---Win scenario---//
let scrollOffset = 0
//-----------------//
//--Animation--//
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    platforms.forEach(platform => {
        platform.draw();
    })
    player.update();
    
//--key presses and sidescrolling--//
    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }else if(keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5 }
        else{
        player.velocity.x = 0
        if (keys.right.pressed) {
            platforms.forEach((platform) => {
                platform.position.x -=5
                scrollOffset += 5
            })
        }else if (keys.left.pressed){
            platforms.forEach((platform) => {
                platform.position.x +=5
                scrollOffset -= 5
            })
            
        }
        //wincon
        if (scrollOffset > 1000){
            console.log("You win");
        }
    }
    //-----------------//
    //--Can you jump detection--//
    if (player.position.y == canvas.height - player.height+ 0.5){
        player.isGrounded = true;
    }else {
        player.isGrounded = false;
    }

    
    //--------------------------//
 //--Platform collision detection--//   
platforms.forEach((platform) => {
    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0
        player.isGrounded = true;
    }
})
//-------------------------------- //
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
            console.log(player.isGrounded);
            if(player.isGrounded){
                player.velocity.y -= 15 //up
            }else{
                break
            }
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
            //player.velocity.y = 0 //up
            break


    }
})

//-----------------------------------------------------//