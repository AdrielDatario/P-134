img = ""
flag = ""
object = [];
objectDetector = "";

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded(){
console.log("Model Loaded");
flag = true;
objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
}

function preload(){
    song = loadSound('https://www.zedge.net/ringtone/8764ea8c-1a3a-4b97-b798-75ed22edfecf');
}

function draw(){
    image(video , 0, 0, 380, 380);

    if(flag != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            if(object[i].label == "person"){
            document.getElementById("number_of_object").innerHTML = "Baby Found : ";
            console.log("stop");
            song.stop();
            }
            else{
                document.getElementById("number_of_object").innerHTML = "Baby not Found : ";
                console.log("play");
                song.play();
                }
            
            if(object.length == 0){
                document.getElementById("number_of_object").innerHTML = "Baby not Found : ";
                console.log("play");
                song.play();
                }
            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
    
    /*

    fill("#FF0000")
    text("Cat", 320, 110);
    noFill();
    stroke("#FF0000");
    rect(300, 90, 270, 320);*/
}