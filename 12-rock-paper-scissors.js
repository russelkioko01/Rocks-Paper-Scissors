//using json and default operator
let score =JSON.parse(localStorage.getItem('score')) || {
  Wins:0,
  Loses:0,
  Ties:0
  };


let isAutoPlay=false;
let intervalId;


function autoPlay(){
  if (!isAutoPlay){
    intervalId=setInterval(() =>  {
      const playerMove =pickComputerMove();
      playGame(playerMove);
  
    },1000);
    isAutoPlay =true;
  }
  else{
    clearInterval(intervalId);
    isAutoPlay=false;

  }
}
document.querySelector('.js-button-rock').addEventListener('click',()=>{
  playGame('rock');
});

document.querySelector('.js-button-paper').addEventListener('click',()=>{
  playGame('paper');
});

document.querySelector('.js-button-scissors').addEventListener('click',()=>{
  playGame('scissors');
});

document.body.addEventListener('keydown',(event)=>{
  if (event.key === 'r'){
    playGame('rock');
  }
  else if (event.key === 'p'){
    playGame('paper');
  }
  else if (event.key === 's'){
    playGame('scissors');
  }

});


function playGame(playerMove){
  const computerMove=pickComputerMove();
  let result='';
  if (playerMove === 'scissors'){
    if (computerMove === 'rock'){
    result='You Lose';
    }
    else if(computerMove === 'paper'){
      result='You Win';
    }
    else if(computerMove === 'scissors'){
      result='Tie';
    }
  }

  else if (playerMove === 'paper'){
    if (computerMove === 'rock'){
      result='You Win';

    }
    else if(computerMove === 'paper'){
      result='Tie';
    }
    else if(computerMove === 'scissors'){
      result='You Lose';
    }

  }

  else if (playerMove === 'rock'){
    if (computerMove === 'rock'){
  result='Tie';
    }
    else if(computerMove === 'paper'){
      result='You Lose';
    }
    else if(computerMove === 'scissors'){
      result='You Win';
    }

  }

  if (result === 'You Win'){
    score.Wins +=1;
  }
  else if(result === 'You Lose'){
    score.Loses +=1;
  }
  else if(result === 'Tie'){
    score.Ties +=1;
  }

  localStorage.setItem('score',JSON.stringify(score));

  document.querySelector('.js-result')
  .innerHTML=result;

  document.querySelector('.js-moves')
  .innerHTML=`you
<img src="image/${playerMove}-emoji.png">
<img src="image/${computerMove}-emoji.png">
computer`;

  updateScoreElement();
  
}

function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML=`Wins:${score.Wins}, Loses:${score.Loses}, Ties:${score.Ties}`;

}


function pickComputerMove() {
  const randomNumber=Math.random();
  let computerMove='';
  if (randomNumber >=0 && randomNumber <1/3) {
    computerMove= 'rock';

  }
  else if (randomNumber >=1/3 && randomNumber <2/3){
    computerMove='paper';

  }
  else if (randomNumber >=2/3 && randomNumber < 1){
    computerMove='scissors';
  }

  return computerMove;

}
