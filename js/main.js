const { Engine, World, Bodies, Constraint, MouseConstraint, Mouse} = Matter;
let engine, world;
let height, width, CANVAS;
let excavator, ground, sideGround, bodyImage, bucketImage;
let bricks=[];
FRAME_RATE=60;

function preload(){
    bodyImage = loadImage('assets/body.png');
    bucketImage = loadImage('assets/bucket.png')
}

function setup(){
    calcCanvasSize();
    CANVAS = createCanvas(width, height);
    CANVAS.parent('canvas-container');

    engine = Engine.create();
    world = engine.world;
    let groundWidth = width*0.75, groundHeight=150;
    let sideGroundHeight = height-groundHeight;
    sideGround = new Ground(0, sideGroundHeight/2, 5, sideGroundHeight,'black');
    ground = new Ground(groundWidth/2,height-(groundHeight/2),groundWidth,groundHeight, 'brown');

    let escavatorHeight=200, escavatorWidth=200;
    escavator = new Escavator(width/4, sideGroundHeight - escavatorHeight/2, escavatorWidth,escavatorHeight);

    let mouse = Mouse.create(CANVAS.elt);
    let mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 1
        }
    });
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(world, mouseConstraint);

    setTimeout(()=>{
        for(let i=0; i<50; i++){
            let brick = new Brick(width*0.6,0,25,25);
            bricks.push(brick);
        }
    },2000)

}

function draw(){
    background(0);
    ground.render();
    sideGround.render();
    for(let brick of bricks){
        brick.render();
    }
    escavator.render();
    Engine.update(engine);
}



// function keyPressed(){
//     let STEP = 5;
//     if(keyCode == LEFT_ARROW){
//         if(escavator.body.position.x-(escavator.width/2) > 30){
//             escavator.body.position.x-=STEP;
//         }
//     }
//     if(keyCode == RIGHT_ARROW){
//         if(escavator.body.position.x+(escavator.width/2) < width){
//             escavator.body.position.x+=STEP;
//         }
//     }
// }


// function configChange(){
//     angleIncrement = parseInt(document.querySelector("#angleIncrement").value);
//     NO_OF_SPIRALS = parseInt(document.querySelector("#curveNumbers").value);
//     STROKE_WEIGHT = parseInt(document.querySelector("#thickness").value);

//     document.querySelector("#curveNumbersValue").innerText = document.querySelector("#curveNumbers").value;
//     document.querySelector("#thicknessValue").innerText = document.querySelector("#thickness").value;
//     document.querySelector("#angleIncrementValue").innerText = document.querySelector("#angleIncrement").value;
//     FRAME_RATE=60;
//     calcCanvasSize();
//     resizeCanvas(width,height)
//     redraw();
//   }

function calcCanvasSize(){
    height = windowHeight;
    width = windowWidth;
}