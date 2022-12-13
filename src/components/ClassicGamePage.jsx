import React from 'react'
import { useState, useEffect} from 'react';

export default function ClassicGamePage(props) {

    const [counter, setCounter] = useState(0);
    const [playerCards, setPlayerCards] = useState([]);
    const [computerCards, setComputerCards] = useState([]);
    const [computerCardImageName, setComputerCardImageName] = useState("computerCard");
    const [playerCardImageName, setPlayerCardImageName] = useState("userCard");
    const [didGameStart, setDidGameStart] = useState(false);
    const [warCards, setWarCards] = useState([])

    const cardTypes = 4, sameTypeCards = 13;

    useEffect(()=>{
        if (!didGameStart)
          dealCards()
    })
    
    const dealCards = () => { // Randomly distribute cards
      setDidGameStart(true);
      let cardLetters = ['C', 'D', 'H', 'S'];
      let allCards = []

      for (let i = 1; i <= cardTypes ; i++)
        for (let j = 1; j <= sameTypeCards ; j++)
          allCards.push({
            value: j,
            type: cardLetters[i-1]
          });
      
      allCards = randomizeArr(allCards);

      let playerHalfCards = [];
      
      for (let i = 1; i <= cardTypes * sameTypeCards / 2; i++)
        playerHalfCards.push(allCards.pop());

      let userFirst = playerHalfCards.shift();

      let computerHalfCards = [];

      for (let i = 1; i <= cardTypes * sameTypeCards / 2; i++)
        computerHalfCards.push(allCards.pop());
      
      let compFirst = computerHalfCards.shift();

      setComputerCardImageName(`${compFirst.value}${compFirst.type}`);
      setPlayerCardImageName(`${userFirst.value}${userFirst.type}`);

      if (compFirst.value > userFirst.value)
      {
        setComputerCards([...computerHalfCards, compFirst, userFirst]);
        setPlayerCards([...playerHalfCards])
      }
      else if (compFirst.value < userFirst.value)
      {
        setPlayerCards([...playerHalfCards, compFirst, userFirst]);
        setComputerCards([...computerHalfCards]);
      }
      else
      {
        setPlayerCards([...playerHalfCards, compFirst, userFirst]);
        setComputerCards([...computerHalfCards]);
      }

      document.getElementById("roundNumberShow").innerHTML = ((counter + 1));
      setCounter(counter + 1);
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

      if (computerCards.length === 0 )
      {
        window.alert("Game ended");
        props.updateResult(1, 0)
        props.changePage("end");
        return;
      }
      else if (playerCards.length === 0)
      {
        window.alert("Game ended");
        props.updateResult(0, 1)
        props.changePage("end");
        return;
      }

      setCounter(counter + 1);

      setComputerCardImageName(`${computerCards[0].value}${computerCards[0].type}`);
      setPlayerCardImageName(`${playerCards[0].value}${playerCards[0].type}`);

      let usedCards = [computerCards[0], playerCards[0]]

      if (computerCards[0].value > playerCards[0].value)
      {

        computerCards.shift()
        playerCards.shift()
        setComputerCards([...computerCards, ...usedCards])
      }
      else if (computerCards[0].value < playerCards[0].value)
      {
        computerCards.shift()
        playerCards.shift()
        setPlayerCards([...playerCards, usedCards[1], usedCards[0]])
      }
      else
        performWar();

      document.getElementById("roundNumberShow").innerHTML = (counter + 1);
    }

    const performWar = () => {

      let warUsedCards = []
      alert("WAR!!!");

      if (computerCards.length === 1 || playerCards.length === 1)
      {
        // Don't perform war, not all sides have enough cards
        if (computerCards.length === 1)
        {
          warUsedCards = [playerCards.shift()]
          setPlayerCards([...playerCards, ...warUsedCards])
        }
        else
        {
          warUsedCards = [computerCards.shift()]
          setComputerCards([...computerCards, ...warUsedCards])
        }
      }
      else if (computerCards.length === 2 || playerCards.length === 2)
      {
        // Perform war with 1 card, not all sides have enough cards for a regular war
        warUsedCards.push(computerCards.shift())
        warUsedCards.push(playerCards.shift())
        setWarCards([...warCards, ...warUsedCards]);
      }
      else if (computerCards.length === 3 || playerCards.length === 3)
      {
        // Perform war with 2 card, not all sides have enough cards for a regular war
        for (let i = 0; i < 2; i++)
        {
          warUsedCards.push(computerCards.shift())
          warUsedCards.push(playerCards.shift())
        }
        setWarCards([...warCards, ...warUsedCards]);
      }
      else
      {
        // Perform regular war - 3 cards
        for (let i = 0; i < 3; i++)
        {
          warUsedCards.push(computerCards.shift())
          warUsedCards.push(playerCards.shift())
        }
        setWarCards([...warCards, ...warUsedCards]);
      } 
    }

    const warStep = () => {

      setCounter(counter + 1);

      setComputerCardImageName(`${computerCards[0].value}${computerCards[0].type}`);
      setPlayerCardImageName(`${playerCards[0].value}${playerCards[0].type}`);

      let usedCards = [computerCards[0], playerCards[0]]

      if (computerCards[0].value > playerCards[0].value)
      {
        computerCards.shift()
        playerCards.shift()
        setComputerCards([...computerCards, ...usedCards, ...warCards])
        setWarCards([]);
      }
      else if (computerCards[0].value < playerCards[0].value)
      {
        computerCards.shift();
        playerCards.shift();
        setPlayerCards([...playerCards, usedCards[1], usedCards[0], ...warCards]);
        setWarCards([]);
      }
      else
        performWar();

      document.getElementById("roundNumberShow").innerHTML = (counter + 1);

    }
  
  return (
    <div>

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

      <div className='clickDiv' type = {"submit"} onClick={(warCards.length === 0) ? playNextMove : warStep}>Hit!</div>
        
    </div>
  )
}
