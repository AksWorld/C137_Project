Status="";
objects=[];
objects_name="";
speak_data="";
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function begin(){
    objects_name=document.getElementById("ColeD").value;
    console.log("objects_name");
    console.log(objects_name);
 objectDetector=ml5.objectDetector('cocossd',modelLoaded);
 document.getElementById("Status").innerHTML="Status : Detecting";
}


 function modelLoaded(){
    console.log("The Devil Fruit has arrived");
    Status=true;
   
}
function draw(){
    image(video,0,0,480,380);
    if(Status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length;i++){
          document.getElementById("Status").innerHTML="Status : Objects Detected";
          document.getElementById("Status").innerHTML="Number of object detected "+ objects.length;
          fill("#FF0000");
          percent=floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
          if(objects[i].label==objects_name){
            objectDetector.detect(gotResult);
            console.log("objects_name2");
            console.log(objects_name);
            document.getElementById("Identifier").innerHTML= objects_name + " found";
            console.log("wait if bards can play string instruments can they play on.... the weave?!?!?!");
           speak_data=objects_name + "detected";
            speak(speak_data);
            videoLiveView.stop();
          
            
        }else{
            document.getElementById("Identifier").innerHTML=objects_name + " Not Detected";
            speak_data=objects_name + " not detected";
            speak(speak_data);
        }
        

        }
       }
       function speak(){
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
        speak_data = "";
    }
    
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
