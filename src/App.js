import './App.css';
import Die from "./component/Die"
import React,{useState} from "react"
import {nanoid} from "nanoid";
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function App() {
  // const { width, height } = useWindowSize()
  const [dice, setDice] = useState(allNewDice())
  const [result,setResult] = useState(false)
    
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push({
            id:nanoid(),
            value:Math.ceil(Math.random() * 6),
            isHeld:false
          })
      }
      return newDice
  }

  function random(){
    setDice(function(old){
        return old.map((ele)=>{
          return ele.isHeld ? 
          ele: 
          {id:nanoid(),value:Math.ceil(Math.random() * 6),isHeld:false}
        })
    })
  }
  function refresh(){
    setDice(function(old){
      return old.map((ele)=>{
        return {id:nanoid(),value:Math.ceil(Math.random() * 6),isHeld:false}
      })
    })
    setResult((old)=>!old)
  }

  function change(id){
    setDice(function(old){
        return old.map((ele)=>{
          if (ele.id===id){
            return {...ele,isHeld:!ele.isHeld}
          }else{return ele}
        })
    })
  }
 

  React.useEffect(()=>{
    let win=true;
    let v=dice[0].value
    for(let i=0;i<dice.length;i++){
      if (dice[i].value !== v || !dice[i].isHeld){
        win=false
      }
    }
    if(win){
      setResult((old)=>!old)
    }
  },[dice])

  const diceElements = dice.map(die => <Die key={die.id} onChange={change} obj={die} />)

  return (
    <>
    {result && <Confetti/>}
    <main className="App">
      <h1 className="title">{result ? "WOW! You won":"Tenzies"}</h1>
      <p className="instructions">
        {result?"Yeeeeeee!!!":"Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
      <div className='container'>
      {diceElements}
      </div>
      <button onClick={result? refresh:random}>{result ? "Play Again":"Random"}</button>
    </main>
    </>
  );
}

export default App;
