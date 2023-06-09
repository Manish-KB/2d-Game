

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
gravity = 0.4

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36)
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))

const platformCollisions2d = []
for (let i = 0; i < platformCollisions.length; i += 36)
    platformCollisions2d.push(platformCollisions.slice(i, i + 36))


const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    }
                })
            )
        }
    })
})

const platformCollisionBlocks = []
platformCollisions2d.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                    height: 4
                })
            )
        }
    })
})




const player = new Player({
    position: {
        x: 100,
        y: 300,
    },
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc: './img/warrior/Idle.png',
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: './img/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 7,
        },
        IdleLeft: {
            imageSrc: './img/warrior/IdleLeft.png',
            frameRate: 8,
            frameBuffer: 7,
        },

        Run: {
            imageSrc: './img/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 7,
        },
        RunLeft: {
            imageSrc: './img/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 7,
        },
        Jump: {
            imageSrc: './img/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        JumpLeft: {
            imageSrc: './img/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        Fall: {
            imageSrc: './img/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        FallLeft: {
            imageSrc: './img/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },


    }

})

let y = 100

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    }

}
background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png',
})
const backgroundImageHeight = 432
const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height,
    },
}
function animate() {
    window.requestAnimationFrame(animate)

    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.scale(4, 4)

    c.translate(camera.position.x, camera.position.y)

    background.update()


    // collisionBlocks.forEach((collisionBlock) => {
    //     collisionBlock.update()
    // })

    // platformCollisionBlocks.forEach((collisionBlock) => {
    //     collisionBlock.update()
    // })


    player.update()

    player.velocity.x = 0
    if (keys.d.pressed) {
        player.shouldPanCameraToTheLeft({ canvas, camera })

        player.switchSprite('Run')
        player.velocity.x = 2
        player.lastDirection = 'right'
    }

    else if (keys.a.pressed) {
        player.velocity.x = -2
        player.lastDirection = 'left'

        player.shouldPanCameraToTheRight({ canvas, camera })
        player.switchSprite('RunLeft')
    }
    else if (player.velocity.y === 0) {
        if (player.lastDirection === 'right')
            player.switchSprite('Idle')
        else
            player.switchSprite('IdleLeft')
    }

    if (player.velocity.y < 0) {
        player.shouldPanCameraDown({ camera, canvas })
        if (player.lastDirection === 'right')
            player.switchSprite('Jump')
        else
            player.switchSprite('JumpLeft')
    }
    else if (player.velocity.y > 0) {
        player.shouldPanCameraUp({ camera, canvas })
        if (player.lastDirection === 'right')
            player.switchSprite('Fall')
        else
            player.switchSprite('FallLeft')
    }
    player.updateFrames()
    c.restore()





}
animate()
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd': keys.d.pressed = true

            break
        case 'a': keys.a.pressed = true
            break

        case 'w': player.velocity.y = -6
            var soundEffect = new Audio("./music/jump.mp3")
            soundEffect.play()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd': keys.d.pressed = false
            break
        case 'a': keys.a.pressed = false
            break


    }
})






document.getElementById('left').addEventListener('mousedown', function() {
    keys.a.pressed = true
});
document.getElementById('left').addEventListener('mouseup', function() {
    keys.a.pressed = false
});

document.getElementById('up').addEventListener('mousedown', function() {
    player.velocity.y = -6
});


document.getElementById('right').addEventListener('mousedown', function() {
    keys.d.pressed = true
});
document.getElementById('right').addEventListener('mouseup', function() {
    keys.d.pressed = false
});





//https://youtu.be/rTVoyWu8r6g?t=7530

