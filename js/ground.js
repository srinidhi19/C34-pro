class Ground{
    constructor(centerX, centerY, width, height, color="white"){
        this.width = width;
        this.height = height;
        this.color = color
        let options ={
            isStatic: true,
            friction: 1
        }
        this.body = Bodies.rectangle(centerX,centerY,width,height, options);
        World.add(world, this.body);
    }

    render(){
        let postion = this.body.position;
        push()
            translate(postion.x, postion.y);
            fill(this.color);
            strokeWeight(0);
            rectMode(CENTER)
            rect(0, 0, this.width, this.height);
        pop()
    }
}