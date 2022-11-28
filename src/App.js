import Header from './components/Header';
import './App.css';
import {useState} from 'react';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import EndPage from './components/EndPage';

function App() {

  const [playersHistory, setPlayersHistory] = useState([])
  const [playerWon, setPlayerWon] = useState(false)
  const [player, setPlayer] = useState({
    name: "",
    roundWins: 0,
    wins: 0,
    gamesPlayed: 0
  });
  const [computer, setComputer] = useState({
    roundWins: 0,
    wins: 0
  });

  const updatePlayerHistory = (player) => {
    let currentHistory = playersHistory, playerPosition = -1;

    for (let i = 0; i< currentHistory.length; i++)
      if (currentHistory[i].name === player.name)
      {
        currentHistory[i] = player;
        playerPosition = i;
      }
        

    if (playerPosition === -1)
    {
      setPlayersHistory([...currentHistory, player]);
      return;
    }

    setPlayersHistory([...currentHistory]);
  }

  const updateWins = (playerWins, compWins) => {
    if (playerWins > compWins)
      {
        setPlayerWon(true);
        setPlayer({
          name: player.name,
          roundWins: playerWins,
          wins: player.wins + 1,
          gamesPlayed: player.gamesPlayed + 1
        })
        setComputer({
          roundWins: compWins,
          wins: computer.wins
        })
      }
    else
      {
        setPlayerWon(false);
        setPlayer({
          name: player.name,
          roundWins: playerWins,
          wins: player.wins,
          gamesPlayed: player.gamesPlayed + 1
        });
        setComputer({
          roundWins: compWins,
          wins: computer.wins + 1
        });
      }
  }

  const isPlayerExist = (name) => {
    for (let i = 0; i< playersHistory.length; i++)
      if (playersHistory[i].name === name)
      {
        setPlayer({
          name: name,
          roundWins: 0,
          wins: playersHistory[i].wins,
          gamesPlayed: playersHistory[i].gamesPlayed
        });
        setComputer({
          roundWins: 0,
          wins: playersHistory[i].gamesPlayed - playersHistory[i].wins
        })
        return true;
      }
        
    return false;
  }

  const pages = {
    home: 'home',
    game: 'game',
    end: 'end'
  }
  const [currentPage, setCurrentPage] = useState(pages.home)

  const displayPage = () => { // Show what needed and hide everything else
    switch(currentPage) {
      case pages.home:
        {
          return <HomePage tableData={playersHistory} updateName = {updateName} changePage = {setCurrentPage}/>
        }
      case pages.game:
        {
          return <GamePage player = {player} changePage = {setCurrentPage} updateResult = {updateWins}/>
        }
      case pages.end:
        {
          return <EndPage newGame = {newGame} goHome = {goHome} changePage = {setCurrentPage} playerWon = {playerWon} playerData = {player} compData = {computer}/>
        }
    }
  }

  const newGame = () => {
    updatePlayerHistory(player);
    setCurrentPage("game");
  }

  const goHome = () => {
    updatePlayerHistory(player);
    setCurrentPage("home");
  }

  const updateName = (name) => {
    if (!isPlayerExist(name))
    {
      setPlayer({
        name: name,
        roundWins: 0,
        wins: 0,
        gamesPlayed: 0
      });
      setComputer({
        roundWins: 0,
        wins: 0
      })
    }
  }

  return (
    <div className="App">
      <Header title = {"Ofek Lamay's War Game"}/>
      <br/>
      {displayPage()}
    </div>  
  );
}

export default App;