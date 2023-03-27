function collision{
    this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.position.x<=collisionBlock.position.x+collisionBlock.width &&
                this.position.x+this.width>=collisionBlock.position.x
}