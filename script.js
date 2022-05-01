let sound = new Audio('over.wav')
let eachbox = new Audio('each5.wav');
let   speed_var = 8
let   start_speed_var = 2;
let canvas = document.getElementById("myCanvas");
let cover = document.getElementById("cover");
let sound_offon = document.getElementById("sound_btn");
let diff = document.getElementById("diff_btn");
let theme = document.getElementById("theme_btn");
let size_btn_increase = document.getElementById("size_btn_increase");
let size_btn_decrease = document.getElementById("size_btn_decrease");
let gameOver_restart = document.getElementById("gameover_restart");
let gameOver_score = document.getElementById("gameover_score");
let restart_btn = document.getElementById("restart_btn");
let context = canvas.getContext("2d");
context.font = 'bold 2em sans-serif';
let scrollCounter, cameraY, current, mode, xSpeed;
let ySpeed = 5;
let height = 40;
let boxes = [];
boxes[0] = {
  x: 50,
  y: 150,
  width: 300
};
let debris = {
  x: 0,
  width: 0
};
 
function newBox() {
  
  boxes[current] = {
    x: 0,
    y: (current + 10) * height,
    width: boxes[current - 1].width
  };
}


//Difficulty
diff.addEventListener('click', function(){
  console.log('clicked')
   if(diff.classList.contains('med')){
    diff.classList.add('hard');
    diff.classList.remove('med');
    document.getElementById('diff_text').innerHTML = 'HARD'
    speed_var = 20
    start_speed_var = 6;
    restart()

  }
  else if(diff.classList.contains('hard')){
    diff.classList.add('easy');
    diff.classList.remove('hard');
    document.getElementById('diff_text').innerHTML = 'EASY'
    speed_var = 8
    start_speed_var = 2;
    restart()
  
  }
  else{
    console.log('easy')
    diff.classList.add('med');
    diff.classList.remove('easy');
    document.getElementById('diff_text').innerHTML = 'MED.'
    speed_var = 14
    start_speed_var = 4;
    restart()
   
   
  }
})

function theme_changer(r){
  if(r === 'light'){
    theme.classList.toggle('light')
    theme.classList.toggle('dark')
    canvas.style.backgroundColor = 'aliceblue'
    canvas.style.backgroundImage = "url('grid2.png')"
    theme.classList.remove('fa-moon')
    theme.classList.add('fa-sun')
    localStorage.setItem('theme', 'light')
  }else if(r === 'dark'){
    theme.classList.toggle('light')
    theme.classList.toggle('dark')
    canvas.style.backgroundColor = '#212121'
    canvas.style.backgroundImage = "url('grid2-white.png')"
    theme.classList.add('fa-moon')
    theme.classList.remove('fa-sun')
    localStorage.setItem('theme', 'dark')
   
  }
}

theme_changer(localStorage.getItem('theme'))

theme.addEventListener('click',function(){
 if(theme.classList.contains('light')){
  theme_changer('dark')
 }else{
  theme_changer('light')
 }
})



//theme


//sizing
let default_width ;
console.log(localStorage.getItem("default_width"))
if(localStorage.getItem("default_width") === null){
    default_width = 325
    localStorage.setItem("default_width", 325)
}else
default_width = parseInt(localStorage.getItem("default_width"))

function text_resising(){
  if(localStorage.getItem("default_width") < 215){
    console.log('run')
    document.querySelectorAll('.menu_para').forEach(function(el) {
      el.style.display = 'none';
    });
    document.querySelectorAll('.menu_item i').forEach(function(el) {
      el.style.margin = '0';
    });
    document.getElementById('size_btn_decrease').style.marginTop = '-0.4em'
  }
}

text_resising()



// Set Item

size_btn_increase.addEventListener('click',function(){
    default_width = default_width + 5
    canvas.style.width = `${default_width}`
    cover.style.width = `${default_width}`


     localStorage.setItem("default_width", default_width);
     text_resising()
})
size_btn_decrease.addEventListener('click',function(){
    default_width = default_width - 5
    canvas.style.width = `${default_width}`
    cover.style.width = `${default_width}`



  localStorage.setItem("default_width", default_width);
  text_resising()
})

function shadeColor(color, percent) {

var R = parseInt(color.substring(1,3),16);
var G = parseInt(color.substring(3,5),16);
var B = parseInt(color.substring(5,7),16);

R = parseInt(R * (100 + percent) / 100);
G = parseInt(G * (100 + percent) / 100);
B = parseInt(B * (100 + percent) / 100);

R = (R<255)?R:255;  
G = (G<255)?G:255;  
B = (B<255)?B:255;  

var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

return "#"+RR+GG+BB;
}

function gameOver() {

    canvas.style.display = 'none'
    cover.style.display = 'block'

    //To keep the width same after game over
    cover.style.width = `${default_width}`
  console.log('gameover')
  mode = 'gameOver';


  ///////////////////////////////////////////////
  ///////////////////////////////////////////////////



 





  /////////////////////////////////////////////////////

 // context.fillText('Game over. Click to play again!', 200, 50);
}
 
if (localStorage.getItem("high_score") === null){
  localStorage.setItem("high_score", 0);
}
function animate() {
  if (mode != 'gameOver') {
    context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText('CURRENT   ' + (current - 1).toString(), 230, 40);
  context.fillText('HIGH  ' + localStorage.getItem("high_score").toString(), 10, 40);
  if((current - 1) > localStorage.getItem("high_score")){
    localStorage.setItem("high_score", (current - 1).toString());
    document.querySelector('.cover_heading').innerHTML = 'HIGH SCORE'
    document.querySelector('.cover_heading').style.color = '#ffffff'

  }else if((current - 1) < localStorage.getItem("high_score")){
    document.querySelector('.cover_heading').innerHTML = 'GAME OVER'
    document.querySelector('.cover_heading').style.color = '#00c1cc'
  }
  
  
//choosing differnt shades
   
    let cllr = ['#ff6700']

    for (let n = 0; n < boxes.length; n++) {
        //repeating after 10
      if((n/10 ) % 1 === 0 && n > 1){
        cllr[0] = '#FF7D00'
      }

      //shades func.
       cllr[0] = shadeColor(cllr[0],7);
      
      let box = boxes[n];
      context.fillStyle = cllr[0];
      context.fillRect(box.x, 600 - box.y + cameraY, box.width, height);
    }
    context.fillStyle = '#00c1cc';
    context.fillRect(debris.x, 600 - debris.y + cameraY, debris.width, height);
    if (mode == 'bounce') {
      boxes[current].x = boxes[current].x + xSpeed;
      if (xSpeed > 0 && boxes[current].x + boxes[current].width > canvas.width)
        xSpeed = -xSpeed;
      if (xSpeed < 0 && boxes[current].x < 0)
        xSpeed = -xSpeed;
    }
    if (mode == 'fall') {
      boxes[current].y = boxes[current].y - ySpeed;
      if (boxes[current].y == boxes[current - 1].y + height) {
        mode = 'bounce';
        let difference = boxes[current].x - boxes[current - 1].x;
        if (Math.abs(difference) >= boxes[current].width) {
            if(sound_offon.classList.contains('true')){
                sound.play(); 
            }
          gameOver_score.innerHTML = `<p>SCORE<SPAN>${(current - 1).toString()}</SPAN> </p>`
          gameOver();
        }
        debris = {
          y: boxes[current].y,
          width: difference
        };
        if (boxes[current].x > boxes[current - 1].x) {
          console.log('right')
          boxes[current].width = boxes[current].width - difference;
          debris.x = boxes[current].x + boxes[current].width;
        }
         else if (boxes[current].x < boxes[current - 1].x){
          console.log('left')
          debris.x = boxes[current].x - difference;
          boxes[current].width = boxes[current].width + difference;
          boxes[current].x = boxes[current - 1].x;
        }else{
          console.log('center')
          boxes[current].width = boxes[current].width + 10;
        }
        if (xSpeed > 0 && xSpeed < speed_var ){
          xSpeed++;
        }
        else 
        if(xSpeed > -(speed_var) ){
        xSpeed--;
        }
        current++;
        scrollCounter = height;
        if(sound_offon.classList.contains('true')){
            eachbox.play();
        }
     
        newBox();
      }
      console.log(xSpeed);
    }
    debris.y = debris.y - ySpeed;
    if (scrollCounter) {
      cameraY++;
      scrollCounter--;
    }
  }
  window.requestAnimationFrame(animate);
}


 
function restart() {
  boxes.splice(1, boxes.length - 1);
  mode = 'bounce';
  cameraY = 0;
  scrollCounter = 0;
  xSpeed = start_speed_var;
  current = 1;
  newBox();
  debris.y = 0;
  canvas.style.width = `${localStorage.getItem("default_width")}`

}
 
canvas.onpointerdown = function() {
  console.log(boxes)
  if (mode == 'gameOver')
    restart();
  else {

    if (mode == 'bounce')
      mode = 'fall';
  }
};
document.addEventListener('keydown', function(e){
 if (e.code === 'space')
 console.log(boxes)
  if (mode == 'gameOver')
    restart();
  else {

    if (mode == 'bounce')
      mode = 'fall';
  }
})

gameOver_restart.addEventListener('click', function(){
    canvas.style.display = 'block'
    cover.style.display = 'none'
    restart()
})

// Button event listners
function soundoffon(r){
  if(r === 'true'){
    sound_offon.classList.add('true')
    sound_offon.classList.add('fa-volume-high')
  sound_offon.classList.remove('fa-volume-xmark')
  localStorage.setItem('sound', 'true')
  }else{
    sound_offon.classList.remove('true')
    sound_offon.classList.remove('fa-volume-high')
  sound_offon.classList.add('fa-volume-xmark')
  localStorage.setItem('sound', 'false')
  }
 
}


if(localStorage.getItem('sound') === null){
  soundoffon('true')
}else{
  soundoffon(localStorage.getItem('sound'))
}
//sound_offon.classList.toggle(localStorage.getItem('sound'))

sound_offon.addEventListener('click',function(){
  if(sound_offon.classList.contains('true'))
  soundoffon('false')
  else
  soundoffon('true')
})


restart_btn.addEventListener('click', function(){
  restart()
})

restart();
animate();





