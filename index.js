var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;
gameStart = false;
gameOver = false;

$(document).on("keypress", function(){
    if(gameStart===false){
        nextSequence();
        gameStart=true;
    }
        
})


$(".btn").on("click", function(){
    var self = $(this);
    var userColour = self.attr("id");
    userPattern.push(userColour);
    console.log("user: " + userPattern);
    console.log("game: " + gamePattern);
    console.log(level);
    self.addClass("pressed");
    setTimeout(function(){
        self.removeClass("pressed");
    }, 50);
    playSound(userColour);
    checkAnswer(userPattern.length-1);

})


function checkAnswer(currentLevel){
    gameOver = false
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        gameOver = true;
        console.log("right")
        if(gamePattern.length === userPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("wrong")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        $("h1").html("Game Over, Press Any Key to Restart.");
        startOver();
    }

}


function nextSequence(){
    userPattern=[];
    $("h1").html("Level "+level);
    var randomNumber = Math.floor(4*Math.random())
    randomColour = buttonColours[randomNumber]; 
    gamePattern.push(randomColour);
    $("#" + randomColour).fadeOut(100).fadeIn(100);
    playSound(randomColour);
    level++;
}


function startOver(){
    level = 0;
    gamePattern=[];
    gameStart=false;
}


function playSound(colour){
    var audio = new Audio('sounds/'+colour+'.mp3');
    audio.play(); 
}