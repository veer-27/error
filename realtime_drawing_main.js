noseX = 0;
noseY = 0;

difference = 0;
rightwristX = 0;
leftwristX = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(550,500);

    canvas = createCanvas(550,500);
    canvas.position(600,100);

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPose);
}

function modelLoaded()
{
    console.log('poseNet is initialized');
}

function draw()
{
    background('#808080');
    document.getElementById("square_hw").innerHTML = "Width and height of the square is = " + difference + "px";
    fill('#0000FF');
    stroke('#000000');
    square(noseX,noseY,difference);
}

function gotPose(results)
{
   if(results.length > 0) 
   {
       console.log(results);
       noseX = results[0].pose.nose.x;
       noseY = results[0].pose.nose.y;
       console.log("nosex = " + noseX + "nosey = " + noseY);
       
       rightwristX = results[0].pose.rightWrist.x;
       leftwristX = results[0].pose.leftWrist.x;
       difference = floor(leftwristX - rightwristX);
       console.log("rightwristX = " + rightwristX + "leftwristX = " + leftwristX + "difference = " + difference);
   }
}