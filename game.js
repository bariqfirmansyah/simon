
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var hasStart = false;

var level = 0;


$(".play-btn").click(function(){

  if (!hasStart) {
    $(".play-btn").animate({opacity:0.2});
    setTimeout(function(){nextSequence();}, 1100);
    hasStart = true;
    $("#level-title").text("level "+level)
  };
});

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  $(this).fadeOut(100).fadeIn(100);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

})

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");}, 100);
}

function nextSequence() {

  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level++;
  $("#level-title").text("level "+level)

};

function playSound(name) {

  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();

}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function(){nextSequence();}, 1300);
    }
  } else {
    console.log("wrong");
    var wrongAudio = new Audio('sounds/wrong.mp3');
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over, Press Play to Restart ")
    startOver();
  }

}

function startOver() {

  level = 0;
  gamePattern = [];
  hasStart = false;
  $(".play-btn").animate({opacity:1})

}
