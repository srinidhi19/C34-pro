class Brick{
    constructor(centerX, centerY, width, height){
        this.width = width;
        this.height = height;
        this.color = color(random(255),random(255),random(255));
        let options ={
            friction: 1,
            restitution: 0,

        }
        this.body = Bodies.rectangle(centerX,centerY,width,height, options);
        World.add(world, this.body);
    }

    render(){
        let postion = this.body.position;
        push()
            translate(postion.x, postion.y);
            fill(this.color);
            strokeWeight(1);
            rectMode(CENTER)
            rect(0, 0, this.width, this.height,this.height*0.20);
        pop()
    }
}