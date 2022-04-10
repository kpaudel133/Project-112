var prediction = "";
var prediction1 = "";


Webcam.set({
width:350,
height:300,
image_format:"png",
png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach(camera);

function capture(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'/>"
    });
}

console.log("ml5 version : ", ml5.version);

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/CJM2G8haJ/model.json", modelLoaded);

function modelLoaded(){
    console.log("model loaded")
}

function speak(){
    var synth = window.speechSynthesis
    speak_data_1= "My first prediction is " + prediction;
    speak_data_2= "My second prediction is " + prediction1;

    var utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utter_this);
}

function result(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult)
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        document.getElementById("gestureName").innerHTML = results[0].label;
        document.getElementById("gestureName2").innerHTML = results[1].label;
        
        prediction = results[0].label;
        prediction1 = results[1].label;

        speak();

        if(results[0].label == "Good"){
            document.getElementById("Gesture").innerHTML = "&#128077;";
        }
        if(results[0].label == "Peace"){
            document.getElementById("Gesture").innerHTML = "&#9996;";
        }
        if(results[0].label == "Ok"){
            document.getElementById("Gesture").innerHTML = "&#128076;";
        }

        if(results[1].label == "Good"){
            document.getElementById("Gesture2").innerHTML = "&#128077;";
        }
        if(results[1].label == "Peace"){
            document.getElementById("Gesture2").innerHTML = "&#9996;";
        }
        if(results[1].label == "Ok"){
            document.getElementById("Gesture2").innerHTML = "&#128076;";
        }
    }
}