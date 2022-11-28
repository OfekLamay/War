import React from 'react'

export default function ScoreBoard(props) {

  if (props.tableData.length > 0)
  {return (
    <div>
        <table>
          <thead id="top">
            <tr>
              <th ><b>Name</b></th>
              <th ><b>Wins</b></th>
              <th ><b>Games Played</b></th>
            </tr>
          </thead>
          <tbody>
          {props.tableData.map((player) => {
            return (
              <tr key={player.name}>
              <td >{player.name}</td>
              <td >{player.wins}</td>
              <td >{player.gamesPlayed}</td>
            </tr>      
          )
          })}
          </tbody>
        </table>
    </div>
  )}
  else {return}
}
