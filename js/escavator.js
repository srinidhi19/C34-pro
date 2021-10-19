class Escavator{
    constructor(centerX, centerY, width, height, color="yellow"){
        this.width = width;
        this.height = height;
        this.color = color
        let options ={
            isStatic: true,
        }
        this.body = Bodies.rectangle(centerX,centerY,width,height, options);
        // World.add(world, this.body);

        //ARM 1 - START
        this.arm1 = {
            length: width * 0.95,
            width: width * 0.20,
            offset: 10,
            body: null,
            constraint: null
        };
        let arm1Hinge ={
            x: (this.width/2),
            y: -(this.height/2)
        }
        this.arm1['hinge']=arm1Hinge;

        let arm1Option={
            isStatic: false,
            restitution: 1,
        };

        let arm1CenterX=this.arm1.hinge.x+(this.arm1.length/2);
        let arm1CenterY=this.arm1.hinge.y+(this.arm1.width/2);

        this.arm1.body=  Bodies.rectangle(arm1CenterX, arm1CenterY, this.arm1.length, this.arm1.width, arm1Option);
        // World.add(world,this.arm1.body);

        this.arm1.constraint = Constraint.create({
            bodyA: this.body,
            bodyB: this.arm1.body,
            pointA: this.arm1.hinge,
            pointB: {
                x: -(this.arm1.length/2),
                y: 0
            },
            length: 0,
            stiffness: 1,
            damping: 0.5
        });

        // World.add(world, this.arm1.constraint);
        //ARM 1 - END

        //ARM 2 - START
        this.arm2 = {
            length: width * 0.75,
            width: width * 0.20,
            offset: 10,
            body: null,
            constraint: null
        };
        let arm2Hinge ={
            x: (this.arm1.length/2),
            y: 0
        }
        this.arm2['hinge']=arm2Hinge;

        let arm2Option={
            isStatic: false,
            restitution: 1,
            mass:0.5
        };
        let arm2CenterX = arm1CenterX + (this.arm2.length/2);
        let arm2CenterY = arm1CenterY + (this.arm2.width/2);

        this.arm2.body=  Bodies.rectangle(arm2CenterX, arm2CenterY, this.arm2.length-20, this.arm2.width, arm2Option);
        // World.add(world,this.arm2.body);

        this.arm2.constraint = Constraint.create({
            bodyA: this.arm1.body,
            bodyB: this.arm2.body,
            pointA: this.arm2.hinge,
            pointB: {
                x: -(this.arm2.length/2),
                y: (this.arm2.width/2)
            },
            length: 0,
            stiffness: 1,
            damping: 0.5
        });

        // World.add(world, this.arm2.constraint);
        //ARM 2 - END


        //BUCKET - START
        this.bucket = {
            length: width * 0.4,
            width: width * 0.4,
            offset: 30,
            body: null,
            constraint: null
        };
        let bucketHinge ={
            x: (this.arm2.length/2),
            y: (this.arm2.width/2)
        }
        this.bucket['hinge']=bucketHinge;

        let bucketOption={
            isStatic: false,
            restitution: 1,
            mass:1
        };

        let bucketCenterX = arm2CenterX + (this.bucket.length/2);
        let bucketCenterY = arm2CenterY + (this.bucket.width/2);
        this.bucket.body=  Bodies.rectangle(bucketCenterX, bucketCenterY, this.bucket.length-20, this.bucket.width, bucketOption);
        // World.add(world,this.bucket.body);

        this.bucket.constraint = Constraint.create({
            bodyA: this.arm2.body,
            bodyB: this.bucket.body,
            pointA: this.bucket.hinge,
            pointB: {
                x: -(this.bucket.length/2),
                y:  0
            },
            length: 0,
            stiffness: 1,
            damping: 1
        });

        // World.add(world, this.bucket.constraint);
        World.add(world, [this.body, 
                          this.arm1.body,
                          this.arm2.body,
                          this.bucket.body,
                          this.arm1.constraint,
                          this.arm2.constraint,
                          this.bucket.constraint
                        ]);
        //BUCKET - END
    }

    render(){
        let postion = this.body.position;
        let angle = this.body.angle;

        push()
            translate(postion.x, postion.y);
            rectMode(CENTER);
            fill(this.color);
            strokeWeight(0);
            rotate(angle);
            // rect(0, 0, this.width, this.height);
            imageMode(CENTER);
            image(bodyImage,0, 0, this.width, this.height)
        pop()

        push()
            translate(this.arm1.body.position.x + (this.arm1.offset*2), this.arm1.body.position.y-this.arm1.offset)
            fill('gray');
            strokeWeight(0);
            rectMode(CENTER);
            rotate(this.arm1.body.angle);
            rect(-(this.arm1.offset*3),0, this.arm1.length+80, this.arm1.width, this.arm1.width/2);
        pop()

        push()
            translate(this.arm2.body.position.x-this.arm2.offset, this.arm2.body.position.y+this.arm2.offset)
            fill('gray');
            strokeWeight(0);
            rectMode(CENTER);
            rotate(this.arm2.body.angle);
            rect(0,0, this.arm2.length+this.arm2.width, this.arm2.width, this.arm2.width/2);
        pop()

        push()
            translate(this.bucket.body.position.x-this.bucket.offset, this.bucket.body.position.y+this.bucket.offset)
            fill('orange');
            strokeWeight(0);
            // rectMode(CENTER);
            rotate(this.bucket.body.angle);
            // rect(0,0, this.bucket.length, this.bucket.width);
            imageMode(CENTER);
            image(bucketImage,-this.bucket.offset, 0, this.bucket.length, this.bucket.width)
        pop()
    }
}