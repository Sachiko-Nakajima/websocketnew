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
let rphone, rbear, rbottle, rtoothbrush, rcup;

let detector, detections;
let kitty, phonesound, phone, bearsound, bear, cupsound, cup, bottlesound, bottle, booksound, book, plantsound, plant, toothbrush, toothbrushsound, scissor, scissorsound, apple, applesound;
let phonesounds=[];
let cupsounds =[];
let bottlesounds =[];
let bearsounds =[];
let toothbrushsounds=[];
let scissorsounds=[];
let applesounds=[];
let plantsounds=[];
let time = 0;
let phonenumber = 0;
let bearnumber = 0;
let bottlenumber = 0;
let cupnumber = 0;
let plantnumber = 0;
let toothbrushnumber = 0;
let scissornumber = 0;
let applenumber = 0;
let socket;
//let font1_shadow; let cam_y =-220;
let name;
//let colorr,colorg,colorb;
let phonereceivenum=0;
let bearreceivenum=0;
let cupreceivenum=0;
let bottlereceivenum=0;
let bookreceivenum=0;
let plantreceivenum=0;
let toothbrushreceivenum=0;
let scissorreceivenum=0;
let applereceivenum=0;
let prephonereceivenum=0;
let prebearreceivenum=0;
let precupreceivenum=0;
let prebottlereceivenum=0;
let prebookreceivenum=0;
let preplantreceivenum=0;
let pretoothbrushreceivenum=0;
let prescissorreceivenum=0;
let preapplereceivenum=0;
let preprephonereceivenum=0;
let preprebearreceivenum=0;
let preprecupreceivenum=0;
let preprebottlereceivenum=0;
let preprebookreceivenum=0;
let prepreplantreceivenum=0;
let prepretoothbrushreceivenum=0;
let preprescissorreceivenum=0;
let prepreapplereceivenum=0;

let prepreprecupreceivenum=0;
let prepreprebookreceivenum=0;

let buttonState = false; 
let button;
let bearx,beary,phonex, phoney, cupx, cupy, bookx, booky, bottlex, bottley, plantx, planty, toothbrushx, toothbrushy, scissorx, scissory, applex, appley;

let recorder, soundFile;
let timer = 4; //timer starts at 4 second
let starttime;
let nowtime;
let soundFileState = false;

let urlBlob;
let soundofBook; 
let remoteSoundofBook;

let fft;
let filter, filterFreq, filterRes;
let filterButton;
let filterOn = false;

//filter button
let efxButton,efxArrow,efxState0,efxState1,efxText;
let efxState = false;


function preload() {
  soundFormats('mp3', 'ogg', 'wav');
  // phonesound = loadSound("audios/piano0.wav");
  phonesounds[0] = loadSound("audios/piano0.wav");
  // phonesounds[1] = loadSound("audios/piano1.wav");
//  phonesounds[2] = loadSound("audios/piano2.wav");
  // bearsound = loadSound("audios/guitar0.wav");
  bearsounds[0] = loadSound("audios/guitar0.wav");
  // bearsounds[1] = loadSound("audios/guitar1.wav");
//  bearsounds[2] = loadSound("audios/guitar22.wav");
  // cupsound = loadSound("audios/drums0.wav");
  cupsounds[0] = loadSound("audios/vib0.wav");
  // cupsounds[1] = loadSound("audios/drums1.wav");
//  cupsounds[2] = loadSound("audios/drums2.wav");
  // bottlesound = loadSound("audios/recorder.wav");
  bottlesounds[0] = loadSound("audios/recorder.wav");
  // bottlesounds[1] = loadSound("audios/sax1.wav");
//  bottlesounds[2] = loadSound("audios/sax2.wav");

// plantsound = loadSound("audios/nature0.mp3");
plantsounds[0] = loadSound("audios/nature0.mp3");
// plantsounds[1] = loadSound("audios/nature1.mp3");
//plantsounds[2] = loadSound("audios/nature2.wav");

// toothbrushsound = loadSound("audios/animal0.wav");
toothbrushsounds[0] = loadSound("audios/animal0.wav");
// toothbrushsounds[1] = loadSound("audios/animal1.wav");
//  toothbrushsounds[2] = loadSound("audios/animal2.mp3");
  // scissorsound = loadSound("audios/bass1.wav");

  scissorsounds[0] = loadSound("audios/bass0.wav");
  // scissorsounds[1] = loadSound("audios/bass1.wav");
//  scissorsounds[2] = loadSound("audios/bass2.wav");

// applesound = loadSound("audios/vib0.wav");
applesounds[0] = loadSound("audios/drums0.wav");
//   applesounds[1] = loadSound("audios/vib1.wav");
//  applesounds[2] = loadSound("audios/vib2.wav");

  // phonesound = loadSound("audios/Phone.mp3");
  // bearsound = loadSound("audios/Teddy.mp3");
  // cupsound = loadSound("audios/Cup.mp3");
  // bottlesound = loadSound("audios/Bottle.mp3");
  //plantsound = loadSound("audios/Plant.mp3");
  // toothbrushsound = loadSound("audios/raindrop.wav");
  // scissorsound = loadSound("audios/cow.wav");

  //booksound = loadSound("audios/meow.wav");
  kitty = loadImage("images/kitty.jpeg");
  phone = createImg("images/phonegif.gif");
  bear = createImg("images/bear.gif");
  cup = createImg("images/cupgif.gif");
  bottle = createImg("images/bottlegif.gif");
  book = createImg('images/book.gif');
  plant = createImg('images/plant.gif');
  toothbrush = createImg('images/toothbrush.gif');
  scissor = createImg('images/scissors.gif');
  apple = createImg('images/apple.gif');
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
  cup.position(8000, 8000);
  phone.position(8000, 8000);
  bottle.position(8000, 8000);
  bear.position(8000, 8000);
  book.position(8000, 8000);
  plant.position(8000, 8000);
  toothbrush.position(8000, 8000);
  scissor.position(8000, 8000);
  apple.position(8000, 8000);


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
 
 phonesound = new p5.SoundFile();  
 bearsound = new p5.SoundFile();  
 cupsound = new p5.SoundFile();  
 bottlesound = new p5.SoundFile();  
 toothbrushsound = new p5.SoundFile();  
 scissorsound = new p5.SoundFile();  
 applesound = new p5.SoundFile();  
 plantsound = new p5.SoundFile();  

 phonesound = phonesounds[0];
 bearsound = bearsounds[0];
 cupsound = cupsounds[0];
 bottlesound = bottlesounds[0];
 toothbrushsound = toothbrushsounds[0];
 scissorsound = scissorsounds[0];
 applesound = applesounds[0];
 plantsound = plantsounds[0];
// remoteSoundofBook = new p5.SoundFile();  
//  recordButton = createButton('Book Sound Rec');
//  recordButton.position(500,710);
//  recordButton.size(150,30);

    // bearx = random(300)+300;
    // beary = random(200)+100;
    // phonex = random(600)+300;
    // phoney = random(400)+100;
    // cupx = random(600)+300;
    // cupy = random(400)+100;
    // bottlex = random(600)+300;
    // bottley = random(400)+100;
    // bookx = random(600)+300;
    // booky = random(400)+100;
    // plantx = random(600)+300;
    // planty = random(400)+100; 
    // toothbrushx = random(600)+300;
    // toothbrushy = random(400)+100; 
    // scissorx = random(600)+300;
    // scissory = random(400)+100;
    // applex = random(600)+300;
    // appley = random(400)+100; 

    bearx = 400;
    beary = 400;
    phonex = 200;
    phoney = 200;
    cupx = 600;
    cupy = 400;
    bottlex = 800;
    bottley = 200;
    bookx = random(600)+300;
    booky = random(400)+100;
    plantx = 800;
    planty = 400; 
    toothbrushx = 400;
    toothbrushy = 400; 
    scissorx = 200;
    scissory = 200;
    applex = 600;
    appley = 200;   
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
  
  rphone=rbear=rbottle=rcup=rtoothbrush=rplant=rapple=rscissor=0;  

  filter = new p5.LowPass();
  fft = new p5.FFT();
  
  efxButton = document.getElementById('efxKnob');
  efxArrow = document.getElementById('knobmid');
  efxState0 = document.getElementById('state0');
  efxState1 = document.getElementById('state1');
  efxText = document.getElementById('efxText');
  
  // filterButton = createButton('filter ON/OFF');
  // filterButton.mousePressed(toggle);
}

function filterToggle() {
  filterOn = !filterOn;
  if (filterOn) {
    efxArrow.style.animation = "efxOn_inside 1s forwards ease-in-out";
    efxState0.style.animation = "state0 1s forwards ease-in-out";
    efxState1.style.animation = "state1 1s forwards ease-in-out";
    efxText.style.animation = "efxText 1s forwards ease-in-out"; 
    cupsound.disconnect();
    cupsound.connect(filter);
    phonesound.disconnect();
    phonesound.connect(filter);
    bottlesound.disconnect();
    bottlesound.connect(filter);
    scissorsound.disconnect();
    scissorsound.connect(filter);
    bearsound.disconnect();
    bearsound.connect(filter);
  }else{
      efxArrow.style.animation = "efxOn_inside_off 1s forwards ease-in-out";
      efxState0.style.animation = "state0_off 1s forwards ease-in-out";
      efxState1.style.animation = "state1_off 1s forwards ease-in-out";
      efxText.style.animation = "efxText_off 1s forwards ease-in-out"; 
    cupsound.disconnect(filter);
    cupsound.connect();
    phonesound.disconnect(filter);
    phonesound.connect();
    bottlesound.disconnect(filter);
    bottlesound.connect();
    scissorsound.disconnect(filter);
    scissorsound.connect();
    bearsound.disconnect(filter);
    bearsound.connect();
  }
}

function draw() {

  if(time%3==0){
//background(239,220,187,120);
rectMode(CENTER);
fill(239, 220, 187,120);
strokeWeight(10);
rect(width/2,height/2-108,1010,544);
noStroke();
rect(0,750,600,60);
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
  
    socket.on('detectedgif', newDrawing);

 // ***********the blobs converted back to sound file, listen to server 
   socket.on('recordedSent', (blobArrayBuffer) => {
    console.log('recordedSent')
    let blob = new Blob([blobArrayBuffer]);
    urlBlob = URL.createObjectURL(blob);
    
    remoteSoundofBook = createAudio(urlBlob);
  })
//  ***********

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
      isRecording=false;
      console.log("playing stopped");
      if(soundofBook!=null){
      soundofBook.stop();
      }
//      phonesound.stop();
// if(SoundFileState){
//       if(remoteSoundofBook){
//       remoteSoundofBook.stop();
//       }
//     }
    }
    if(isRecording){
//      recordButton.html("Book Sound Rec");
      isRecording=false;
      console.log("recording stopped");
      // if(!playButtonState){
      // pressToPlayBack();
      // }
    }
  }
 }  
  time++;

  if (camState){
    if (detections) {
    detections.forEach(detection => {
    //   if(detection.label != "cup" && detection.label != "cell phone" && detection.label != "bottle" ){
    //     var data = {
    //   label: detection.label, 
    //   name: input.value(),
    //   //  x: detection.x,
    //   //  y: detection.y,
    //    w: detection.width,
    //    h: detection.height
    //   }
    //   socket.emit('detected', data);     
    // }

//      if(detection.label == "cup" || detection.label == "cell phone" || detection.label == "bottle"){
      var datagif = {
      label: detection.label, 
      name: input.value(),
      //  x: detection.x,
      //  y: detection.y
       w: detection.width
      }
      socket.emit('detectedgif', datagif);     
//    }
  })
  }
  }
//if(switchState){
  if(phonereceivenum==preprephonereceivenum){
    phonesound.setVolume(0);    
    phone.position(8000, 8000);
    phonenumber++;
    if(phonenumber%5==0){
      // rphone = floor(random(2));
      // phonesound = phonesounds[rphone];
      // phonex = random(300)+300;
      // phoney = random(200)+100;
    }
  }
  if(bearreceivenum==preprebearreceivenum){
    bearsound.setVolume(0);
    bear.position(8000, 8000);
    bearnumber++;
    if(bearnumber%5==0){
      // rbear = floor(random(2));
      // bearsound = bearsounds[rbear];
      // bearx = random(300)+300;
      // beary = random(200)+100;
      }
    }

  if(cupreceivenum==prepreprecupreceivenum){
    cupsound.setVolume(0);
    cup.position(8000, 8000);
    cupnumber++;
    if(cupnumber%5==0){
      // rcup = floor(random(2));
      // cupsound = cupsounds[rcup];
      // cupx = random(600)+300;
      // cupy = random(400)+100;
      }
  }

  if(bottlereceivenum==preprebottlereceivenum){
    bottlesound.setVolume(0);
    bottle.position(8000, 8000);
    bottlenumber++;
    if(bottlenumber%5==0){
      // rbottle = floor(random(2));
      // bottlesound = bottlesounds[rbottle];
      // bottlex = random(600)+300;
      // bottley = random(400)+100;
        }
  }

  if(bookreceivenum==prepreprebookreceivenum){
    //booksound.setVolume(0);
    // if(soundofBook){
    // soundofBook.setVolume(0);        // add the soundofBook
    if(soundFileState){
    if(remoteSoundofBook!=null){
      remoteSoundofBook.volume(0); //recording 
      }
    }
    book.position(8000, 8000);  
  }

  if(plantreceivenum==prepreplantreceivenum){
    plantsound.setVolume(0);
    plant.position(8000, 8000);  
    plantnumber++;
    if(plantnumber%5==0){
      // rplant = floor(random(2));
      // plantsound = plantsounds[rplant];
      // plantx = random(600)+300;
      // planty = random(400)+100;
      }
  }
  
  if(toothbrushreceivenum==prepretoothbrushreceivenum){
    toothbrushsound.setVolume(0);
    toothbrush.position(8000, 8000);  
    toothbrushnumber++;
    if(toothbrushnumber%5==0){
      // rtoothbrush = floor(random(2));
      // toothbrushsound = toothbrushsounds[rtoothbrush];
      // toothbrushx = random(600)+300;
      // toothbrushy = random(400)+100;
      }
  }

  if(scissorreceivenum==preprescissorreceivenum){
    scissorsound.setVolume(0);
    scissor.position(8000, 8000);  
    scissornumber++;
    if(scissornumber%5==0){
      // rscissor = floor(random(2));
      // scissorsound = scissorsounds[rscissor];
      // scissorx = random(600)+300;
      // scissory = random(400)+100;
      }
  }

  if(applereceivenum==prepreapplereceivenum){
    applesound.setVolume(0);
    apple.position(8000, 8000);  
    applenumber++;
    if(applenumber%5==0){
      // rapple = floor(random(2));
      // applesound = applesounds[rapple];
      // applex = random(600)+300;
      // appley = random(400)+100;
      }
  }


  preprephonereceivenum = prephonereceivenum;
  prephonereceivenum = phonereceivenum;
  preprebearreceivenum = prebearreceivenum;
  prebearreceivenum = bearreceivenum;
  prepreprecupreceivenum = preprecupreceivenum;
  preprecupreceivenum = precupreceivenum;
  precupreceivenum = cupreceivenum;
  preprebottlereceivenum = prebottlereceivenum;
  prebottlereceivenum = bottlereceivenum;
  prepreplantreceivenum = preplantreceivenum;
  preplantreceivenum = plantreceivenum;
  prepretoothbrushreceivenum = pretoothbrushreceivenum;
  pretoothbrushreceivenum = toothbrushreceivenum;
  preprescissorreceivenum = prescissorreceivenum;
  prescissorreceivenum = scissorreceivenum;
  prepreapplereceivenum = preapplereceivenum;
  preapplereceivenum = applereceivenum;

  prepreprebookreceivenum = preprebookreceivenum;
  preprebookreceivenum = prebookreceivenum;
  prebookreceivenum = bookreceivenum;

  efxButton.onclick = filterToggle;

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
    // rphone = floor(random(2));
    // phonesound = phonesounds[rphone];
    // rbear = floor(random(2));
    // bearsound = bearsounds[rbear];
    // rbottle = floor(random(2));
    // bottlesound = bottlesounds[rbottle];
    // rcup = floor(random(2));
    // cupsound = cupsounds[rcup];
    // rtoothbrush = floor(random(2));
    // toothbrushsound = toothbrushsounds[rtoothbrush];
    // rscissor = floor(random(2));
    // scissorsound = scissorsounds[rscissor];
    // rapple = floor(random(2));
    // applesound = applesounds[rapple];
    // rplant = floor(random(2));
    // plantsound = plantsounds[rplant];
    
    for(let i=0;i<1;i++){
      phonesounds[i].loop();
      phonesounds[i].setVolume(0);
      cupsounds[i].loop();
      cupsounds[i].setVolume(0);
      bearsounds[i].loop();
      bearsounds[i].setVolume(0);
      bottlesounds[i].loop();
      bottlesounds[i].setVolume(0);
      toothbrushsounds[i].loop();
      toothbrushsounds[i].setVolume(0);
      scissorsounds[i].loop();
      scissorsounds[i].setVolume(0);
      applesounds[i].loop();
      applesounds[i].setVolume(0);
      plantsounds[i].loop();
      plantsounds[i].setVolume(0);
    }

      // phonesound.loop();
      // phonesound.setVolume(0.3);
      // cupsound.loop();
      // cupsound.setVolume(0);
      // bearsound.loop();
      // bearsound.setVolume(0);
      // bottlesound.loop();
      // bottlesound.setVolume(0);
      // toothbrushsound.loop();
      // toothbrushsound.setVolume(0);
      // scissorsound.loop();
      // scissorsound.setVolume(0);
      // applesound.loop();
      // applesound.setVolume(0);
      // plantsound.loop();
      // plantsound.setVolume(0);

    // for(let i=0;i<2;i++){
      if (filterOn) {
        cupsound.disconnect();
        cupsound.connect(filter);
        phonesound.disconnect();
        phonesound.connect(filter);
        bottlesound.disconnect();
        bottlesound.connect(filter);
        scissorsound.disconnect();
        scissorsound.connect(filter);
        bearsound.disconnect();
        bearsound.connect(filter);   
      // cupsounds[i].disconnect();
      // cupsounds[i].connect(filter);
      // phonesounds[i].disconnect();
      // phonesounds[i].connect(filter);
      // bottlesounds[i].disconnect();
      // bottlesounds[i].connect(filter);
      // scissorsounds[i].disconnect();
      // scissorsounds[i].connect(filter);
      // bearsounds[i].disconnect();
      // bearsounds[i].connect(filter);
    }else{
      // cupsounds[i].disconnect(filter);
      // cupsounds[i].connect();
      // phonesounds[i].disconnect(filter);
      // phonesounds[i].connect();
      // bottlesounds[i].disconnect(filter);
      // bottlesounds[i].connect();
      // scissorsounds[i].disconnect(filter);
      // scissorsounds[i].connect();
      // bearsounds[i].disconnect(filter);
      // bearsounds[i].connect();
      cupsound.disconnect(filter);
      cupsound.connect();
      phonesound.disconnect(filter);
      phonesound.connect();
      bottlesound.disconnect(filter);
      bottlesound.connect();
      scissorsound.disconnect(filter);
      scissorsound.connect();
      bearsound.disconnect(filter);
      bearsound.connect();
    }

  

    // phonesound.loop();
    // phonesound.setVolume(0);
    // cupsound.loop();
    // cupsound.setVolume(0);
    // bearsound.loop();
    // bearsound.setVolume(0);
    // bottlesound.loop();
    // bottlesound.setVolume(0);
    // plantsound.loop();
    // plantsound.setVolume(0);
    // toothbrushsound.loop();
    // toothbrushsound.setVolume(0);
    // scissorsound.loop();
    // scissorsound.setVolume(0);
    // booksound.loop();
    // booksound.setVolume(0);
    // if(soundofBook){
    //   soundofBook.loop();        //play soundof Book
    //   soundofBook.setVolume(0);
    // }
    if(soundFileState){
    if (remoteSoundofBook!=null){
      remoteSoundofBook.loop(); //recording 
      remoteSoundofBook.volume(0); //recording 
    }
    console.log("remote Sound has started!");
  }
    // bearx = random(300)+300;
    // beary = random(200)+100;
    // phonex = random(600)+300;
    // phoney = random(400)+100;
    // cupx = random(600)+300;
    // cupy = random(400)+100;
    // bottlex = random(600)+300;
    // bottley = random(400)+100;
    // bookx = random(600)+300;
    // booky = random(400)+100;
    // plantx = random(600)+300;
    // planty = random(400)+100; 
    // toothbrushx = random(600)+300;
    // toothbrushy = random(400)+100; 
    // scissorx = random(600)+300;
    // scissory = random(400)+100;     
    // applex = random(600)+300;
    // appley = random(400)+100; 
}
else{
    bearsound.stop();
    phonesound.stop();
    cupsound.stop();
    bottlesound.stop();
    plantsound.stop();
    toothbrushsound.stop();
    scissorsound.stop();
    applesound.stop();
//    booksound.stop();
if(soundFileState){
  if (remoteSoundofBook!=null){
      remoteSoundofBook.stop(); 
      console.log("remote Sound has stopped!");
        }
      }
    }
  }


function record() {
      if(switchState){
        text("stop the music to record the book sound",0,780);
        console.log("stop the music to record the book sound");
    }
    else{
     if (!isRecording) {
       starttime = Date.now();
        recorder.record(soundofBook, 4, pressToPlayBack); 
        isRecording = true; 
        recordButton.html("Now Recording");
        console.log("Now Recording");
        bearsound.loop();
        bearsound.setVolume(0);
if(playButtonState){
  playButton.remove();
  playButtonState = false;
  console.log("playButton is now removed");
  }
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
        bearsound.stop();

    // playButton = createButton('Play Book Sound');}
    // playButton.position(500,750);
    // playButton.size(150,30);

    let soundBlob = soundofBook.getBlob();  
    let fileReader = new FileReader();
    let blobArray;
  
    fileReader.readAsArrayBuffer(soundBlob);
    fileReader.onload = function() {
      blobArray = this.result;
      console.log("Array contains", blobArray.byteLength, "bytes.");
      socket.emit('recorded', blobArray);
    };
     }
     //create blob file for the booksound file
  }
  }

function playIt(){
//  isPlaying = !isPlaying;
  if(switchState){
    text("stop the music to check the book sound",0,780);
    console.log("stop the music to check the book sound");
  }
  else{
    starttime = Date.now();
//    if(soundFileState){
  if (isPlaying) {
    if(soundofBook!=null){
    soundofBook.stop();
    }
//    phonesound.stop();
    playButton.html("Play Book Sound");
    isPlaying = false; 
    console.log("stop the play!");
  } else {
    console.log("trying to play the recorded sounds");
    // phonesound.play();
    // phonesound.setVolume(1);
    if(soundofBook!=null){
      soundofBook.stop();
    soundofBook.play();
    soundofBook.setVolume(1);
    if(soundofBook.isPlaying){console.log("it is really playing!!!");}}
    playButton.html("Stop Playing");
    isPlaying = true; 
    console.log("starting to play the recorded sound");
  }
//}
}
}

//object selector: callback the drop up menu
function objectListPop(){
  if(!objectBtnState){
  objectList.style.display = "block";
  objectList.style.animation = "goUp 0.7s ease-out forwards";
  objectBtn.style.animation = "reflect_1 0.7s ease-out forwards";
}
  else{
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

// function newDrawing(data){
//   // if(data.label == 'person'){
//   //   image(kitty, 800-data.x*20, data.y*3+200, data.w, data.h);}

//           fill(0);
//           stroke(0);
//           strokeWeight(0.8);
//           textSize(18);

//       text(data.name, xxx + data.w/2, yyy+data.h/2);
//       text(data.label, xxx + 10, yyy-10);
// }

function newDrawing(data){
   let xxx,yyy;

   if(data.label == 'person'){
    filterFreq = map(data.w, 0, width, 100, 2000);
    filterRes = map(data.h, 0, height, 40, 5);
    filter.set(filterFreq, filterRes);
  }

if(data.label == 'book'){
                xxx =bookx;
                yyy =booky;
                book.position(xxx, yyy);
                book.size(3*data.w, 3*data.w);
            if(soundFileState){
  if (remoteSoundofBook!=null){
      remoteSoundofBook.volume(1); //recording 
  }
            }
        bookreceivenum++;
            }

      if(data.label == 'cell phone'){
                xxx =phonex;
                yyy =phoney;
                phone.position(xxx, yyy);
                phone.size(3*data.w, 3*data.w);
                if(filterOn){
                  phonesound.disconnect();
                  phonesound.connect(filter);}
                else{
                    phonesound.disconnect(filter);
                    phonesound.connect();}
                    phonesound.setVolume(1);
        phonereceivenum++;
              }
        
      if(data.label == "cup"){
            xxx =cupx;
            yyy =cupy;
            cup.position(xxx, yyy);
            cup.size(2*data.w, 2*data.w);
            if(filterOn){
              cupsound.disconnect();
              cupsound.connect(filter);}
            else{
                cupsound.disconnect(filter);
                cupsound.connect();}
            cupsound.setVolume(1);
            cupreceivenum++;
          }

      if(data.label == "bottle"){
            xxx =bottlex;
            yyy =bottley;
            bottle.position(xxx, yyy);
            bottle.size(3*data.w, 3*data.w);
            // if(filterOn){
            //   bottlesound.disconnect();
            //   bottlesound.connect(filter);}
            // else{
            //   bottlesound.disconnect(filter);
            //   bottlesound.connect();}
            bottlesound.setVolume(1);
            bottlereceivenum++;
          }

      if(data.label == 'teddy bear'){
            xxx =bearx;
            yyy =beary;
            bear.position(xxx, yyy);
            bear.size(3*data.w, 3*data.w);
            if(filterOn){
              bearsound.disconnect();
              bearsound.connect(filter);}
            else{
              bearsound.disconnect(filter);
              bearsound.connect();}
            bearsound.setVolume(1);
            bearreceivenum++;
            }

  if(data.label == 'potted plant'){
            xxx =plantx;
            yyy =planty;
            plant.position(xxx, yyy);
            plant.size(3*data.w, 3*data.w);
            plantsound.setVolume(1);
            plantreceivenum++;
                }
  
    
      if(data.label == 'toothbrush'){
            xxx =toothbrushx;
            yyy =toothbrushy;
            toothbrush.position(xxx, yyy);
            toothbrush.size(3*data.w, 3*data.w);
            toothbrushsound.setVolume(1);
            toothbrushreceivenum++;
              }

    if(data.label == 'scissors'){
            xxx =scissorx;
            yyy =scissory;
            scissor.position(xxx, yyy);
            scissor.size(3*data.w, 3*data.w);
            if(filterOn){
              scissorsound.disconnect();
              scissorsound.connect(filter);}
            else{
              scissorsound.disconnect(filter);
              scissorsound.connect();}
        scissorsound.setVolume(1);
            scissorreceivenum++;
           }

  if(data.label == "apple" || data.label == "orange"){
    xxx =applex-200;
    yyy =appley;
    apple.position(xxx, yyy);
    apple.size(3*data.w, 3*data.w);
    applesound.setVolume(1);
    applereceivenum++;
  }
  
          fill(0);
          stroke(0);
          strokeWeight(0.8);
          textSize(18);
      text(data.name, xxx-180, yyy+50);
      text(data.label, xxx + 30-180, yyy-30+50);
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
  






