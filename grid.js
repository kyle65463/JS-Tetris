export class Grid{
    constructor() {
        this.sizeX = 30;
        this.sizeY = 30;
        this.fillStyle = 'white';
        this.strokeStyle = 'black';

        this.posX = 0;
        this.posY = 0;
    }

    setPos(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    render(ctx) {
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(this.posX, this.posY, this.sizeX, this.sizeY);
        ctx.strokeStyle = this.strokeStyle;
        ctx.strokeRect(this.posX, this.posY, this.sizeX, this.sizeY);
    }
};