
var buttonColours=["red", "blue", "green", "yellow"];
var randomNumber;
var randomChosenColour;
var userChosenColour;
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started = false;
$(document).keypress(function(){
    if(!started)
    {
    $("#level-title").html("Level "+level);
    nextSequence();
    started=true;
    }
});





function nextSequence()
{
userClickedPattern = [];
 level++;
 $("#level-title").text("Level " + level);
 randomNumber=Math.floor(Math.random()*4);
 //console.log(randomNumber);
 randomChosenColour=buttonColours[randomNumber];
 gamePattern.push(randomChosenColour);
 //console.log(gamePattern);
 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColour);
}
function playSound(name)
{
 var audio=new Audio("sounds/" + name + ".mp3");
 audio.play();
}

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColor)
{
$("#"+currentColor).addClass("pressed");
setTimeout(function(){
$("#"+currentColor).removeClass("pressed");
},100);
}

function checkAnswer(currentLevel)
{
if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
{
   // console.log("Success");
    if(gamePattern.length===userClickedPattern.length)
    {
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}else{
    playSound("wrong");
    $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    startOver();
    //console.log("wrong");
}
}

function startOver()
{
    level=0;
    gamePattern=[];
    started = false;
}