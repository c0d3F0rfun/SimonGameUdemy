var gamePattern = [];
var userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
$("h1").html("Press A Key to Start");

function nextSequence() {
    var randomNumber= Math.floor(Math.random()*3 + 1);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("."+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
    level++;
    $("h1").html("Level "+level);
}

$(document).keypress(function(event){
    nextSequence()
})

$(".btn").on("click",function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio('./sounds/'+name+".mp3");
    audio.play();

}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100)

}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")
        if (userClickedPattern.length === gamePattern.length){
            console.log(userClickedPattern);
            console.log(gamePattern);
            setTimeout(function(){
                nextSequence();
                userClickedPattern=[];
            }, 1000)
        }
    }
    else{
        console.log("F")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        var whrong = new Audio("./sounds/wrong.mp3");
        whrong.play();
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}
