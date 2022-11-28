import React from 'react'
import ScoreBoard from './ScoreBoard';

export default function HomePage(props) {

  const validateName = () => {
    let name = document.getElementById("nameInput").value

    if (name.length > 0 && name.length < 11)
    {
      props.updateName(name);
      props.changePage("game");
    }
    else
      window.alert("Please enter your name, max 10 letters long")
  }

  return (
    <div id='home'>
      
      <h2 id='warHeader'>Ready for WAR?</h2> <br/>
      <input id="nameInput" type={"text"} placeholder='Enter your name' className='nameLabel'></input> <br/> <br/>
      <div className='clickDiv' onClick={validateName}>START</div> <br/> <br/>
      <ScoreBoard tableData={props.tableData}/>

    </div>
  )
}
