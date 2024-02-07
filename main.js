img = "";
status = "";
object = [];
function preload() {

}
function setup() {
    canvas = createCanvas(400,300);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(400,300);
    video.hide();


}
function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video,gotResults);
}
function draw() {
    image(video,0,0,400,300);


    if (status != "") {
        for(i=0; i < object.length; i++) {
            document.getElementById("object_count").innerHTML = "Number of objects detected are : " + object.length;
            fill("red");
            percentage = floor(object[i].confidence * 100);
            text(object[i].label + percentage + "%",object[i].x,object[i].y + 15);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function gotResults(error,results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
    }
}