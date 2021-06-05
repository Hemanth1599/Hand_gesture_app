prediction_1 = ""

Webcam.set({
    height: 350,
    width: 400,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'">';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/RXazccP1L/model.json', modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction_1;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterthis);
}

function check(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522";
        }
        if(results[0].label == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532";
        }
        if(results[0].label == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548";
        }
        if(results[1].label == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522";
        }
        if(results[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532";
        }
        if(results[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128548";
        }
    }
}