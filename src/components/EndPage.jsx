import React from 'react'

export default function EndPage(props) {

    const goHome = () => {
        props.goHome();
    }

    const startNewGame = () => {
        props.newGame();
    }

    if (props.playerWon) {
        return (
            <div id='end'>
        
                <div id='endWin' >
                    <div id='exit' onClick={goHome}>
                    X
                    </div>
                    WIN
                    <br/>
                    {props.playerData.wins} - {props.compData.wins}
                </div>
        
                <div className='clickDiv' onClick={startNewGame}>
                    Again?
                </div>
                
            </div>
        )
    }
    else {
        return (
            <div id='end'>

                <div id='endLose'>
                    <div id='exit' onClick={goHome}>
                    X
                    </div>
                    Lose
                    <br/>
                    {props.playerData.wins} - {props.compData.wins}
                </div>
        
                <div className='clickDiv' onClick={startNewGame}>
                    Again?
                </div>
                
            </div>
          )
    }
}
