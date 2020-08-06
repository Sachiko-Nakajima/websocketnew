var cnv,camframe,cambutton,video,textS,fader,faderSection,reddot;
var objectBtn,objectList,innerP;
var recordButton,playButton;
//state for start/stop the music
var switchState = false;
//state for turning on/off the camera
var camState = false;
//state for record button
var isRecording = false;
//state for the object selection button
var objectBtnState = false;
var isPlaying = false;
var playButtonState = false;
var input;

let detector, detections;
let kitty, phonesound, phone, bearsound, bear, cupsound, cup, bottlesound, bottle, booksound, book;
let time = 0;
let socket;
//let font1_shadow; let cam_y =-220;
let name;
//let colorr,colorg,colorb;
let phonereceivenum=0;
let bearreceivenum=0;
let cupreceivenum=0;
let bottlereceivenum=0;
let bookreceivenum=0;
let prephonereceivenum=0;
let prebearreceivenum=0;
let precupreceivenum=0;
let prebottlereceivenum=0;
let prebookreceivenum=0;
let preprephonereceivenum=0;
let preprebearreceivenum=0;
let preprecupreceivenum=0;
let preprebottlereceivenum=0;
let preprebookreceivenum=0;
let prepreprebookreceivenum=0;
let buttonState = false; 
let button;
let bearx,beary,phonex, phoney, cupx, cupy, bookx, booky, bottlex, bottley;

let recorder, soundFile;
let timer = 4; //timer starts at 4 second
let starttime;
let nowtime;
let soundFileState = false;

let urlBlob;
let soundofBook; 
let remoteSoundofBook;


function preload() {
  soundFormats('mp3', 'ogg', 'wav');
  phonesound = loadSound("audios/piano.wav");
  bearsound = loadSound("audios/guitar.wav");
  cupsound = loadSound("audios/drums.wav");
  bottlesound = loadSound("audios/recorder.wav");
  booksound = loadSound("audios/meow.wav");
  kitty = loadImage("images/kitty.jpeg");
  phone = loadImage("images/phonegif.gif");
  bear = loadImage("images/bear.jpeg");
  cup = createImg("images/cupgif.gif");
  bottle = loadImage("images/bottlegif.gif");
  book = loadImage('images/book.jpeg');
}

function setup() {
  
  let cnv = createCanvas(1020,770);
  cnv.style('position','absolute');
  cnv.style('background-color','solid transparent');
  cnv.style('border','none')
  rectMode(CENTER);
  fill(239, 220, 187);
  strokeWeight(10)
  rect(width/2,height/2-108,1010,544)
  cup.position(8000, 8000)


    camera_1 = createCapture(VIDEO);
    // camera_1.style('border','8px solid black');
    camera_1.size(188,141);
    camera_1.position(627,585);
    camera_1.hide();
    cambutton= document.getElementById('cambutton');
  
  //Camera Cover Image, image to be changed after more design
  //Click on the camera to turn on the camera
    camCover = createImg('./imgs/camCoverTest_3.png','camCover');
    camCover.position(642,648);
    camCover.style('position','absolute');
    camCover.style('transition','1s');
    // camCover.style('border','8px solid black');
  
    camframe = document.getElementById('camframe');
    
  
  //User Name Input
  input = createInput();
  input.position(291,640);
  input.size(175,50);
  input.style('outline','none')
  input.style('border','8px solid black')
  input.style('font-family','lemon')
  input.style('font-size','17px')
  input.style('text-indent','10px')
  input.attribute('placeholder','YOUR NAME')
  input.attribute('onfocus','this.placeholder = ""')
  input.attribute('onblur','this.placeholder = "YOUR NAME"')

  // colorr = 50+random(150);
  // colorg = 50+random(150);
  // colorb = 50+random(150);

  detector = ml5.objectDetector('cocossd', modelReady)  //activate the ml5 Object Detection machine learning model

 socket = io.connect('https://cocreative2.herokuapp.com/');
 
//  button = document.getElementById('start');
//  button.onclick = changeName;

 mic = new p5.AudioIn(); 
 mic.start(); 
 
 recorder = new p5.SoundRecorder();
 recorder.setInput(mic);   
 soundofBook = new p5.SoundFile();  
//  recordButton = createButton('Book Sound Rec');
//  recordButton.position(500,710);
//  recordButton.size(150,30);

 bearx = random(600)+100;
 beary = random(300);
 phonex = random(600)+100;
 phoney = random(300);
 cupx = random(600)+100;
 cupy = random(300);
 bottlex = random(600)+100;
 bottley = random(300);
 bookx = random(600)+100;
 booky = random(300); 
  
  //getting all the HTML elements for Start/Stop Music Switch
  faderSection = document.getElementById("switch");
  fader = document.getElementById("fader");
  switchText = document.getElementById("switchText");
  innerTrack = document.getElementById("innertrack");
  
  //record button dom element
  recordButton = createButton(' ');
  recordButton.style('position','absolute');
  recordButton.style('top','700px');
  recordButton.style('left','911px');
  recordButton.style('border','none');
  recordButton.style('width','60px');
  recordButton.style('height','60px');
  recordButton.style('border-radius','100px');
  recordButton.style('background-color','#da0201');
  recordButton.style('cursor','pointer');
  recordButton.style('outline','none');
  

  
  //object selection drop up menu setup
  objectList = document.getElementById('options');
  
  objectBtn = document.getElementById('upBtn');
    
  innerP = document.getElementById('innerP')

  
  //visual metronome
  reddot = document.getElementById("reddot")
  
  
  
}

function draw() {

  if(time%3==0){
//    background(240,210,210,120);
rectMode(CENTER);
fill(239, 220, 187,120);
strokeWeight(10);
rect(width/2,height/2-108,1010,544);
    }
  
   //Camera onclick to Switch On/Off
   cambutton.onclick = switchCam;
  if(!camState){
    camCover.show();
  }
  else{camCover.hide()}
  
  //flip the camera
  push()
  translate(width,0);
  scale(-1,1)
  camera_2 = image(camera_1,480,577,188,141);
  
  pop()
  
  
  //Start/Stop the Music Switch Animations
  faderSection.onclick = switchMusic;
  
  
  if(switchState){
    fader.style.animation = "turnOn 1.3s forwards ease";
    switchText.style.animation = "turnOnText 1.6s forwards ease";
    innerTrack.style.animation = "innerOn 1.3s forwards ease"
    switchText.innerHTML = "stop the music";
  }
    else{
    fader.style.animation = "turnOff 1.3s forwards ease";
    switchText.style.animation = "turnOffText 1.6s forwards ease";
    innerTrack.style.animation = "innerOff 1.3s forwards ease"
    switchText.innerHTML = "start the music"
  }
    
  if(!switchState){
    if(isRecording){

  // recordButton.style('background-color','#fab702');
    reddot.style.display = "block";
    reddot.style.animation = "metro 4s forwards steps(1)";
    // recordButton.style('animation','recordbuttonactive 0.5s backwards');
  recordButton.style('position','absolute');
  recordButton.style('top','700px');
  recordButton.style('left','911px');
  recordButton.style('border','none');
  recordButton.style('width','60px');
  recordButton.style('height','60px');
  recordButton.style('border-radius','100px');
  recordButton.style('background-color','#da0201');
  recordButton.style('cursor','pointer');
  recordButton.style('outline','none');
  recordButton.html('');
  
  }
  else{ 

  reddot.style.display = "none";
  recordButton.style('position','absolute');
  recordButton.style('top','700px');
  recordButton.style('left','911px');
  recordButton.style('border','none');
  recordButton.style('width','60px');
  recordButton.style('height','60px');
  recordButton.style('border-radius','100px');
  recordButton.style('background-color','#da0201');
  recordButton.style('cursor','pointer');
  recordButton.style('outline','none');
  recordButton.html('ready<br>to<br>record')
  recordButton.style('font-size','10px')
   
  }

  if(playButtonState){
//  playButton.mousePressed(playIt);
  if(isPlaying){
    playButton.style('border','none');
    playButton.style('background-color','#016ac2');
    playButton.style('width','50px');
    playButton.style('height','50px');
    playButton.style('left','1020px');
    playButton.style('top','706px');
    playButton.style('cursor','pointer');
    playButton.style('outline','none');   
  }else{
  playButton.style('background-color','transparent')
  playButton.style('position','absolute');
  playButton.style('width','0');
  playButton.style('height','0');
  playButton.style('border-top','30px solid transparent');
  playButton.style('border-left','50px solid #016ac2');
  playButton.style('border-bottom','30px solid transparent');
  playButton.style('border-right','0px solid transparent');
  playButton.style('left','1020px');
  playButton.style('top','698px');
  playButton.style('cursor','pointer');
  playButton.style('outline','none');  
  }
}
  }
  
  
  //object selection button click
  objectBtn.onclick = objectListPop;
  
    socket.on('detected', newDrawing);
    socket.on('detectedcup', newDrawing2);

  // //***********the blobs converted back to sound file, listen to server 
  // socket.on('recordedSent', (blobArrayBuffer) => {
  //   console.log('recordedSent')
  //   let blob = new Blob([blobArrayBuffer]);
  //   urlBlob = URL.createObjectURL(blob);
    
  //   remoteSoundofBook = createAudio(urlBlob);
  // })
  // //***********

  recordButton.mousePressed(record);

  // if(playButtonState){
  //   playButton.mousePressed(playIt);  
  // }

   if (isRecording||isPlaying) {
// //    countDown(); 
    nowtime = Date.now();
//       if(nowtime - starttime < 4000){
// //         if(isRecording){
// //           if(nowtime - starttime > 900 && nowtime - starttime < 1000){
// //         text('⚪️REC', 500, 660);}
// //     　else if(nowtime - starttime > 1900 && nowtime - starttime < 2000){
// //         text('⚪️REC', 500, 660);}
// //       else if(nowtime - starttime > 2900 && nowtime - starttime < 3000){
// //         text('⚪️REC', 500, 660);}
// //       else if(nowtime - starttime > 3900 && nowtime - starttime < 4000){
// //          text('⚪️REC', 500, 660);}
// //       else{
// //     text('🔴REC', 500, 660);}}
// // if(isPlaying){
// //     text('Cheking', 500, 680);}
// //}
 if(nowtime - starttime == 4000 || nowtime - starttime > 4000 )
  {
    if(playButtonState){
      playButton.html("Play Book Sound");
      isPlaying=false;
      console.log("playing stopped");
      phonesound.stop();
      // if(soundofBook){
      // soundofBook.stop();
      // }
    }
    if(isRecording){
      recordButton.html("Book Sound Rec");
      isRecording=false;
      console.log("recording stopped");
      if(!playButtonState){
      pressToPlayBack();
      }
    }
  }
 }  
  time++;

  if (camState){
    if (detections) {
    detections.forEach(detection => {
      if(detection.label != "cup"){
        var data = {
      label: detection.label, 
      name: input.value(),
      //  r: colorr,
      //  g: colorg,
      //  b: colorb,
      //  x: detection.x,
      //  y: detection.y,
       w: detection.width,
       h: detection.height
      }
      socket.emit('detected', data);     
    }

      if(detection.label == "cup"){
      var datacup = {
      label: detection.label, 
      name: input.value(),
       x: detection.x,
       y: detection.y
      //  w: detection.width,
      //  h: detection.height
      }
      socket.emit('detectedcup', datacup);     
    }
  })
  }
  }
//if(switchState){
  if(phonereceivenum==preprephonereceivenum){
    phonesound.setVolume(0);
  }
  if(bearreceivenum==preprebearreceivenum){
    bearsound.setVolume(0);
  }
  if(cupreceivenum==preprecupreceivenum){
    cupsound.setVolume(0);
    cup.position(8000, 8000);
  }
  if(bottlereceivenum==preprebottlereceivenum){
    bottlesound.setVolume(0);
  }
  if(bookreceivenum==prepreprebookreceivenum){
    booksound.setVolume(0);
    // if(soundofBook){
    // soundofBook.setVolume(0);        // add the soundofBook
    // if(remoteSoundofBook){
    //   remoteSoundofBook.setVolume(0); //recording 
    //   }
//    }
  //}
  preprephonereceivenum = prephonereceivenum;
  prephonereceivenum = phonereceivenum;
  preprebearreceivenum = prebearreceivenum;
  prebearreceivenum = bearreceivenum;
  preprecupreceivenum = precupreceivenum;
  precupreceivenum = cupreceivenum;
  preprebottlereceivenum = prebottlereceivenum;
  prebottlereceivenum = bottlereceivenum;
  prepreprebookreceivenum = preprebookreceivenum;
  preprebookreceivenum = prebookreceivenum;
  prebookreceivenum = bookreceivenum;
  }
}


function switchCam(){
  
  //Camera State
camState=!camState;
  //Camera State true/false switch on/off (into javascript)
const nativeVideoTracks = camera_1.elt.srcObject.getTracks()      
  nativeVideoTracks.forEach(track => track.enabled = camState)
}

function switchMusic(){
  event.preventDefault();
  switchState=!switchState;
  if(switchState){
    bearsound.loop();
    bearsound.setVolume(0);
    phonesound.loop();
    phonesound.setVolume(0);
    cupsound.loop();
    cupsound.setVolume(0);
    bottlesound.loop();
    bottlesound.setVolume(0);
    booksound.loop();
    booksound.setVolume(0);
    // if(soundofBook){
    //   soundofBook.loop();        //play soundof Book
    //   soundofBook.setVolume(0);
    // }
    // if (remoteSoundofBook){
    //   remoteSoundofBook.loop(); //recording 
    //   remoteSoundofBook.setVolume(0); //recording 
    bearx = random(600)+100;
    beary = random(300);
    phonex = random(600)+100;
    phoney = random(300);
    cupx = random(600)+100;
    cupy = random(300);
    bottlex = random(600)+100;
    bottley = random(300);
    bookx = random(600)+100;
    booky = random(300);
  }
  else{
    bearsound.stop();
    phonesound.stop();
    cupsound.stop();
    bottlesound.stop();
    booksound.stop();
  }
}


function record() {
      if(switchState){
        text("stop the music to record the book sound",350,750);
        console.log("stop the music to record the book sound");
    }
    else{
     if (!isRecording) {
       starttime = Date.now();
        recorder.record(soundofBook, 4, pressToPlayBack); 
//        recorder.record(booksound, 4); 
        isRecording = true; 
//        recordButton.html("Now Recording");
        soundFileState = true;
        console.log("Now Recording");
      }
//    }
if(playButtonState){
  playButton.remove();
  playButtonState = false;
  console.log("playButton is now removed");
  }
 }
}

 function pressToPlayBack() {
        //play_stop button dom element
        console.log("Trying to create the playbutton");

        if(!switchState){
        if(!playButtonState){
        playButton = createButton(' ');
        playButton.style('background-color','transparent')
        playButton.style('position','absolute');
        playButton.style('width','0');
        playButton.style('height','0');
        playButton.style('border-top','30px solid transparent');
        playButton.style('border-left','50px solid #016ac2');
        playButton.style('border-bottom','30px solid transparent');
        playButton.style('border-right','0px solid transparent');
        playButton.style('left','1020px');
        playButton.style('top','698px');
        playButton.style('cursor','pointer');
        playButton.style('outline','none');
              
        console.log("Playbutton is now created!");
        playButtonState = true;
        soundFileState = true;
        playButton.mousePressed(playIt);
    // playButton = createButton('Play Book Sound');}
    // playButton.position(500,750);
    // playButton.size(150,30);
    // let soundBlob = soundofBook.getBlob();  
    // let fileReader = new FileReader();
    // let blobArray;
  
    // fileReader.readAsArrayBuffer(soundBlob);
    // fileReader.onload = function() {
    //   blobArray = this.result;
    //   console.log("Array contains", blobArray.byteLength, "bytes.");
    //   socket.emit('recorded', blobArray);
    // };
    }
    isRecording = false; 
    starttime = Date.now();
    recordButton.html("Start Recording");
    console.log("recording stopped");
  
     //create blob file for the booksound file
  }
  }




function playIt(){
//  isPlaying = !isPlaying;
  if(switchState){
    text("stop the music to check the book sound",350,750);
    console.log("stop the music to check the book sound");
  }
  else{
    starttime = Date.now();
//    if(soundFileState){
  if (isPlaying) {
//    soundofBook.stop();
    phonesound.stop();
    playButton.html("Play Book Sound");
    isPlaying = false; 
    console.log("stop the play!");
  } else {
    console.log("trying to play the recorded sounds");
    phonesound.play();
    phonesound.setVolume(1);
    // soundofBook.stop();
    // soundofBook.play();
    // soundofBook.setVolume(1);
    // if(soundofBook.isPlaying){console.log("it is really playing!!!");}
    playButton.html("Stop Playing");
    isPlaying = true; 
    console.log("starting to play the recorded sound");
  }
//}
}


}

//object selector: callback the drop up menu
function objectListPop(){
  if(objectBtnState == false){
  objectList.style.display = "block";
  objectList.style.animation = "goUp 0.7s ease-out forwards";
  objectBtn.style.animation = "reflect_1 0.7s ease-out forwards";
}
  else if(objectBtnState == true){
  objectList.style.display = "block";
  objectList.style.animation = "goDown 0.7s ease-out forwards";
  objectBtn.style.animation = "reflect_2 0.7s ease-out forwards";
}

  objectBtnState=!objectBtnState;
}

//object selector: put what being clicked into the object selector
function reply_click(clicked_id)
{
     innerP.innerHTML = clicked_id; 
}


function newDrawing(data){
  // if(data.label == 'person'){
  //   image(kitty, 800-data.x*20, data.y*3+200, data.w, data.h);}
  let xxx,yyy;
  if(data.label == 'cell phone'){
if(time%3==0){      
  image(phone, phonex, phoney, 2*data.w, 2*data.h);
}
        phonesound.setVolume(1);
        phonereceivenum++;
        xxx = phonex;
        yyy = phoney;      
      }
  if(data.label == 'teddy bear'){
//      image(bear, 800-data.x*4, data.y*3+200, data.w, data.h);
      image(bear, bearx, beary, data.w, data.h);
      bearsound.setVolume(1);
      bearreceivenum++;
      xxx = bearx;
      yyy = beary;      
  }

//   if(data.label == 'cup'){
// //      image(cup, 800-data.x*4, data.y*3+200, data.w, data.h);
// //if(time%3==0){ 
//   xxx = map(data.x,0,1200,300,900);
//   xxx = map(data.y,0,1000,50,300);
//   cup.position(data.x, data.y);
//   //image(cup, cupx, cupy,data.w,data.h);
// //}
//         cupsound.setVolume(1);
//         cupreceivenum++;
//         xxx = cupx;
//         yyy = cupy;      
//       }

  if(data.label == 'bottle'){
    image(bottle, bottlex, bottley, 2*data.w, 2*data.h);
    //image(bottle, 800-data.x*4, data.y*3+200, data.w, data.h);
          bottlesound.setVolume(1);
          bottlereceivenum++;
          xxx = bottlex;
          yyy = bottley;      
          }

        if(data.label == 'book'){
//          image(book, 800-data.x*4, data.y*3+200, data.w, data.h);
image(book, bookx, booky, data.w, data.h);
// //booksound.setVolume(1);
// if(soundFileState){
//   if (remoteSoundofBook){
//   remoteSoundofBook.setVolume(1); //recording 
// } else {
//   soundofBook.setVolume(1);  //local recording file             
// }
// }
          bookreceivenum++;
          xxx = bookx;
          yyy = booky;      
            }
  
//          noFill();
          // strokeWeight(2);
          // // stroke(data.r, data.g, data.b,220);
          // rect(xxx,yyy,data.w,data.h);
          // // fill(data.r, data.g, data.b);
          fill(0);
          strokeWeight(0.8);
          textSize(18);
//   if(data.label=='person'){
//       rect(800-data.x*20, data.y*3+200, data.w, data.h);}
// else{
// rect(800-data.x*4, data.y*3+200, data.w, data.h);}
  // if(data.label=='person'){
  //   text(data.name, 800-data.x*20 + data.w/2, data.y*3+200+data.h/2);
  //   text(data.label, 800-data.x*20 + 10, data.y*3+200-10);}
  // else{
      text(data.name, xxx + data.w/2, yyy+data.h/2);
      text(data.label, xxx + 10, yyy-10);
    //}
// }
}

function newDrawing2(data){
      xxx = map(data.x,0,1200,300,900);
      yyy = map(data.y,0,1000,50,400);
      //image(cup, cupx, cupy,data.w,data.h);
            cupsound.setVolume(1);
            cupreceivenum++;
            cup.position(1000-xxx, yyy);
            cupsound.setVolume(1);
        cupreceivenum++;
          fill(0);
          strokeWeight(0.8);
          textSize(18);
      text(data.name, 1000-xxx + data.w/2, yyy+data.h/2);
      text(data.label, 1000-xxx + 10, yyy-10);
}

function modelReady() {
  console.log('model loaded')  
  detect(); //function modelReady to load the modeal and initiate the detect objects by calling the "detect" funtion
}

function detect() {
  detector.detect(camera_1, gotResults); 
}

function gotResults(err, results) {
  if (err) {
    console.log(err);
    return
  }

  detections = results;

  detect();    

}
  






