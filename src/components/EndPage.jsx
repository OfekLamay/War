import React from 'react'

export default function EndPage(props) {

    const goHome = () => {
        props.goHome();
    }

    const startNewGame = () => {
        props.newGame();
    }

    const startNewClassicGame = () => {
        props.newClassicGame();
    }

    return (
    props.playerWon ? 
        <div id='end'>
        
            <div id='endWin' >
                <div id='exit' onClick={goHome}>
                    X
                </div>
                WIN
                <br/>
                {props.playerData.wins} - {props.compData.wins}
            </div>
        
            <div className='newGameTypeContainer'>
                <div className='clickDivNewGame' onClick={startNewGame}>
                    New game
                </div>
                <div className='clickDivNewGame' onClick={startNewClassicGame}>
                    Classic game
                </div>
            </div>
                
        </div>
        : 
        <div id='end'>

            <div id='endLose'>
                <div id='exit' onClick={goHome}>
                    X
                </div>
                Lose
                <br/>
                {props.playerData.wins} - {props.compData.wins}
            </div>

            <div className='newGameTypeContainer'>
                <div className='clickDivNewGame' onClick={startNewGame}>
                    New game
                </div>
                <div className='clickDivNewGame' onClick={startNewClassicGame}>
                    Classic game
                </div>
            </div>
            
        
        </div>
    )
}
