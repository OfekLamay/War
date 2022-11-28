import React from 'react'
import { useState, useEffect} from 'react';

export default function GamePage(props) {

  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [counter, setCounter] = useState(0);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [computerCardImageName, setComputerCardImageName] = useState("computerCard");
  const [playerCardImageName, setPlayerCardImageName] = useState("userCard");
  const [didGameStart, setDidGameStart] = useState(false);

  useEffect(()=>{
    if (!didGameStart)
      dealCards()
  })

  const dealCards = () => { // Randomly distribute cards
    setDidGameStart(true);
    let cardTypes = 4, sameTypeCards = 13;
    let cardLetters = ['C', 'D', 'H', 'S'];
    let allCards = []

    for (let i = 1; i <= cardTypes ; i++)
      for (let j = 1; j <= sameTypeCards ; j++)
        allCards.push({
          value: j,
          type: cardLetters[i-1]
        });
    
    allCards = randomizeArr(allCards);

    let halfFromCards = [];
    
    for (let i = 1; i <= cardTypes * sameTypeCards / 2; i++)
      halfFromCards.push(allCards.pop());
    setPlayerCards(halfFromCards);
    let userFirst = halfFromCards[0];

    halfFromCards = [];

    for (let i = 1; i <= cardTypes * sameTypeCards / 2; i++)
      halfFromCards.push(allCards.pop());
    setComputerCards(halfFromCards);
    let compFirst = halfFromCards[0];

    setComputerCardImageName(`${compFirst.value}${compFirst.type}`);
    setPlayerCardImageName(`${userFirst.value}${userFirst.type}`);

    if (compFirst.value > userFirst.value)
      {
        setComputerWins(computerWins + 1);
        setPlayerWins(0);
        document.getElementById("computerScore").innerHTML = "Com - " + (computerWins + 1);
        document.getElementById("playerScore").innerHTML = "You - " + (playerWins);
      }
    else if (compFirst.value < userFirst.value)
      {
        setPlayerWins(playerWins + 1);
        setComputerWins(0);
        document.getElementById("playerScore").innerHTML = "You - " + (playerWins + 1);
        document.getElementById("computerScore").innerHTML = "Com - " + (computerWins);
      }
    else
      {
        document.getElementById("playerScore").innerHTML = "You - " + (playerWins);
        document.getElementById("computerScore").innerHTML = "Com - " + (computerWins);
      }

    document.getElementById("roundNumberShow").innerHTML = ((counter + 1) % 26);

    setCounter(counter % (cardTypes * sameTypeCards / 2) + 1);
  }

  const randomizeArr = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const playNextMove = () => {
    if (counter === computerCards.length)
    {
      // End game and go to result page
      window.alert("Game ended");
      props.updateResult(playerWins, computerWins)
      props.changePage("end");
      return;
    }
    else if (computerWins >= playerWins + (computerCards.length - counter))
    {
      window.alert("Game ended \nFinished before all cards needed to be used");
      props.updateResult(playerWins, computerWins)
      props.changePage("end");
      return;
    }
    else if (playerWins > computerWins + (computerCards.length - counter))
    {
      window.alert("Game ended \nFinished before all cards needed to be used");
      props.updateResult(playerWins, computerWins)
      props.changePage("end");
      return;
    }

    setCounter(counter + 1);

    setComputerCardImageName(`${computerCards[counter].value}${computerCards[counter].type}`);
    setPlayerCardImageName(`${playerCards[counter].value}${playerCards[counter].type}`);

    if (computerCards[counter].value > playerCards[counter].value)
    {
      setComputerWins(computerWins + 1);
      document.getElementById("computerScore").innerHTML = "Com - " + (computerWins + 1);
      document.getElementById("playerScore").innerHTML = "You - " + (playerWins);
    }
    else if (computerCards[counter].value < playerCards[counter].value)
    {
      setPlayerWins(playerWins + 1);
      document.getElementById("playerScore").innerHTML = "You - " + (playerWins + 1);
      document.getElementById("computerScore").innerHTML = "Com - " + (computerWins);
    }

    document.getElementById("roundNumberShow").innerHTML = (counter + 1);
  }

  return (
    <div id='game' className='game'>

      <div id='scoreBoard'>
        Score: <br/>
        <br/>
        <div id='computerScore'></div> <br/>
        <div id='playerScore'></div> 
      </div>

      <div id='roundNumber'>
        N.O: <br/>
        <div id='roundNumberShow'></div>
      </div>
      
      <h2 id='computerNameDisplay' className='nameLabel'>Computer</h2> <br/>

      <div className='flexboxContainer'>

        <div id="computerCard" className='cardNumber'>
          <img src={require(`../public/cards/${computerCardImageName}.png`)} alt='card' ></img>
        </div>
        <br/>
        <div id='playerCard' className='cardNumber'>
          <img src={require(`../public/cards/${playerCardImageName}.png`)} alt='card' ></img>
        </div> 
        <br/>

      </div>

      <h2 id='playerNameDisplay' className='nameLabel'>{props.player.name}</h2> <br/>

      <div className='clickDiv' type = {"submit"} onClick={playNextMove}>Hit!</div>

    </div>
  )
}
