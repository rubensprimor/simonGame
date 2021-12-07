var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Início do jogo ao clicar em uma tecla na primeira vez
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  userClickedPattern = [];   //limpar o vetor userClickedPattern
  var randomNumber = Math.floor(Math.random() * 4); //número aleatório de 0 a 3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  //pisca e toca o som do botão
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){ $("body").removeClass("game-over"); }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
  // if(gamePattern[i] == userClickedPattern[i]){
  //   setTimeout(nextSequence(), 1000);
  // } else {
  //   $("#level-title").text("Resposta Errada! GAME OVER!");
  //   playSound("wrong");
  // }

  // gamePattern[level]-1  //última posição do vetor, contém a última cor inserida
  // userClickedPattern[level]-1


// function checkAnswer1(array1, array2){
//   if (array1.toString() == array2.toString()){  //sem .toString não funciona a comparação entre arrays
//     setTimeout(nextSequence(), 1000);  //chama a função após 1 segundo
//   } else {
//     $("#level-title").text("Resposta Errada! GAME OVER!");
//     playSound("wrong");
//   }
//
// }

function playSound(name){
  $("#"+name).fadeOut(100).fadeIn(100);
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){ $("#"+currentColour).removeClass("pressed"); }, 100);
}
