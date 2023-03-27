class Sprite {
    constructor({ position, imageSrc, frameRate = 1, scale=1 }) {
        this.position = position
        this.scale=scale
        this.image = new Image()
        this.image.src = imageSrc
        this.frameRate = frameRate
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate)*this.scale
            this.height = this.image.height *this.scale
           

        }
        this.frameBuffer = 5
        this.elapsedFrames = 0
        this.currentFrame = 0



    }
    draw() {
        if (!this.image) return
        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }


        c.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,)



    };
    update() {
        this.draw()
    }

    updateFrames() {
        this.elapsedFrames++

        if (this.elapsedFrames % this.frameBuffer === 0) {
            this.elapsedFrames=0
            this.currentFrame++
            if (this.currentFrame === 8)
                this.currentFrame = 1
        }
    }
}