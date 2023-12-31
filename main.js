song = "";
status = "";
objects = [];
function setup(){
    canvas = createCanvas(380,380 );
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status:detecting objects";
    
}

function preload(){
    song=loadSound("Alarm.wav");

}

function modelLoaded(){
    console.log("model loaded");
    status = true;
     
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Baby Detected ";
          
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "" +percent+ "%" , objects[i].x+15,objects[i].y+15 );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label =="person"){
                document.getElementById("number_of_objects").innerHTML="baby found";
                song.stop();
                console.log("stop");

            }
            else{
                document.getElementById("number_of_objects").innerHTML="baby not found";
                song.play();
                console.log("play");   
            }
            
        }
    }
    if(objects.length ==0){
        document.getElementById("number_of_objects").innerHTML="baby not found";
                song.play();
                console.log("play");
    }
}

  
      
