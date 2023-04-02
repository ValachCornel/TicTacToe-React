import './App.css';
import restart from './reset.png';
import { useState, useEffect} from 'react';

function checkWinner(squares){
  const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  let winMethod = null;
  // for(let i = 0; i < winPatterns.length; i++){
  //   const [a,b,c] = winPatterns[i];
  //   if(squares[a] === squares[b] && squares[a] === squares[c]){
  //     console.log(squares[a]);
  //     return squares[a];   
  //   }
  // }
  winPatterns.forEach((pattern) => {
    if(squares[pattern[0]] && squares[pattern[0]] === squares[pattern[1]] && 
      squares[pattern[0]] === squares[pattern[2]]){
        winMethod=squares[pattern[0]];
    }
  });
  return winMethod;
}

const Square = ({value, onClick}) => {
  return(
    <button className='square' onClick={onClick}>
      <span>{value}</span>
    </button>
  );
}

const Board = () => {
  const [sign, setSign] = useState(Array(9).fill(null));
  const [isX, setX] = useState(true);

  const squareClick = (i) => {  
    console.log(checkWinner(sign));  
    if(checkWinner(sign) != sign[i]){
      console.log("win");
    }
    checkWinner(sign);
    if(sign[i] === null){
        if(isX)
        sign[i] = 'X';
      else
        sign[i] = 'O';

        setSign(sign);
        setX(!isX);
    }
  }

  function restartGame(){
    setX(true);
    setSign(Array(9).fill(null));
  }
  const [playerTurn, setPlayerTurn] = useState('X');
  useEffect(()=>{
    if(isX) setPlayerTurn('X');
    else setPlayerTurn('O');
	}, [isX])

  const winner = checkWinner(sign);
  let showWinner;
  if(winner){
    showWinner = `Winner: ${winner}`;
  }

  return(
    <div className='board'>
      <h1 className='winner'>{showWinner}</h1>
      <div className='row-board'>
        <Square value={sign[0]} onClick={() => squareClick(0)}/>
        <Square value={sign[1]} onClick={() => squareClick(1)}/>
        <Square value={sign[2]} onClick={() => squareClick(2)}/>
      </div>
      <div className='row-board'>
        <Square value={sign[3]} onClick={() => squareClick(3)}/>
        <Square value={sign[4]} onClick={() => squareClick(4)}/>
        <Square value={sign[5]} onClick={() => squareClick(5)}/>
      </div>
      <div className='row-board'>
        <Square value={sign[6]} onClick={() => squareClick(6)}/>
        <Square value={sign[7]} onClick={() => squareClick(7)}/>
        <Square value={sign[8]} onClick={() => squareClick(8)}/>
      </div>
      <div className='media'>
        <p>Player's turn: {playerTurn}</p>
        <button onClick={restartGame}>
          <img src={restart}/>
        </button>
      </div>
      
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
