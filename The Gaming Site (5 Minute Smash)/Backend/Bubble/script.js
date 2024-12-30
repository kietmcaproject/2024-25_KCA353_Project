var timer=60;
var score=0;
var hitrn=0;



function increaseScore(){
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

function getNewHit(){
   hitrn = Math.floor(Math.random()*10);
   document.querySelector("#hitval").textContent = hitrn;
}
function Makebubble(){
var clutter="";
for(var i=1;i<=96;i++){
    clutter += `<div class="bubble">${Math.floor(Math.random()*10)}</div>`;
}

document.querySelector("#pbtm").innerHTML = clutter;
}

function runTimer(){
    var timerInterval = setInterval(function(){
        if(timer>0)
        {
        timer--;
        document.querySelector("#timerVal").textContent = timer;
        }
        else{
            clearInterval(timerInterval);
            document.querySelector("#pbtm").innerHTML = `<h1>Game Over</h1><br><h1>Your Score: ${score}</h1>`;
            
        }
    },1000)
}

document.querySelector("#pbtm").addEventListener("click",
function(details){
    var clickedNum = Number(details.target.textContent)
    if(clickedNum === hitrn){
        increaseScore();
        Makebubble();
        getNewHit();
    }
})


getNewHit();
runTimer();
Makebubble();