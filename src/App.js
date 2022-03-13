import logo from './logo.svg';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CustomBtn from './components/CustomBtn';
import Counter from './components/Counter';
import './App.css';
import React, { useState } from "react";
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'
import { StylesContext } from '@material-ui/styles';
import "normal-distribution";
import NormalDistribution from 'normal-distribution';

//TODO: Verify math, Create Name, Fix UI, ship

const theme = createTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Serif'
    ],
    h1: {
      fontFamily: 'Serif',
      },
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      fontFamily: 'Serif',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
      fontFamily: 'Serif',
    },
  },
  allButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 5,
    flexWrap: 'wrap',
    display: 'flex',
    height: '100vh',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alighItems: 'center',
    height: '100px',
  },
});

const center = {
  content:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
},
}

const divStyle = {
  margin: '40px',
  border: '5px ridge #c7d8ed',
};
const pStyle = {
  fontFamily: 'Open Sans',
  fontWeight: '200',
  // fontSize: '15px',
  textAlign: 'center'
};

const hStyle = {
  fontFamily: 'Open Sans',
  fontWeight: '900',
  // fontSize: '15px',
  textAlign: 'center'
};

const StyledButton = withStyles({
  root: {
      flexDirection: "row",
      display: "flex",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      height: "44px",
      padding: "0 25px",
      boxSizing: "border-box",
      borderRadius: 0, 
      background: "#4f25f7",
      color: "#fff",
      transform: "none",
      boxShadow: "6px 6px 0 0 #c7d8ed",
      transition: "background .3s,border-color .3s,color .3s",
      "&:hover": {
          backgroundColor:  "#4f25f7"
        },
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

var Adifferences = [];
var Bdifferences = [];
var Unknown = [];
var currplayer = "A";
var calcplayer;

function App() {
  const [count, setCount] = useState(5);
  const [currplayer, setcurrplayer] = useState("A");

  let decrementCount = () => {
    setCount(count - 1);
  };
  let changePlayer = () => {
    if (currplayer == "A"){
      setcurrplayer("B");
      setCount(5);
    }
    else if (currplayer == "B"){
      setcurrplayer("Unknown");
      setCount(5);
    }
    else if (currplayer == "Unknown"){
      setcurrplayer("Finished");
    }
  };

  let mousedownTime;

let handleMouseDown = () => {
  mousedownTime = new Date().getTime();
}

let handleMouseUp = () => {
  const mouseupTime = new Date().getTime(),
  timeDifference = mouseupTime - mousedownTime;
  Adifferences.push(timeDifference)
  //alert(`Button held down for ${timeDifference}ms`);
}

let handleMouseDownB = () => {
  mousedownTime = new Date().getTime();
}

let handleMouseUpB = () => {
  const mouseupTime = new Date().getTime(),
  timeDifference = mouseupTime - mousedownTime;
  Bdifferences.push(timeDifference)
  //alert(`Button held down for ${timeDifference}ms`);
}

let handleMouseDownE = () => {
  mousedownTime = new Date().getTime();
}

let handleMouseUpE = () => {
  const mouseupTime = new Date().getTime(),
  timeDifference = mouseupTime - mousedownTime;
  Unknown.push(timeDifference)
  //alert(`Button held down for ${timeDifference}ms`);
}

let predictnextplayer = () => {
  if (currplayer == "A"){
    return "B"
  }
  else if (currplayer == "B"){
    return "Unknown"
  }
  else if (currplayer == "Unknown"){
    return "Finished"
  }
}

let calcRatio = () => {
  var prodA = 1
  var prodB = 1
  var Adev = dev(Adifferences)
  var Bdev = dev(Bdifferences)
  var Aavg = mean(Adifferences)
  var Bavg = mean(Bdifferences)
  console.log(Aavg)
  console.log(Adev)
  console.log(Bavg)
  console.log(Bdev)
  const normDistA = new NormalDistribution(Aavg, Adev);
  const normDistB = new NormalDistribution(Bavg, Bdev);
  var i = 0
  while (i < 5){
    prodA *= normDistA.pdf(Adifferences[i])
    console.log(normDistA.pdf(Adifferences[i]))
    i += 1
  }
  console.log(prodA)
  var i = 0
  while (i < 5){
    prodB *= normDistB.pdf(Bdifferences[i])
    console.log(normDistB.pdf(Bdifferences[i]))
    i += 1
  }
  console.log(prodB)
  if (prodA/prodB > 1){
    calcplayer = "A"
  } else {
    calcplayer = "B"
  }
  return Math.abs((prodA/prodB).toPrecision(2))
}

function reducer(accumulator, currentValue){
  return accumulator + currentValue;
}

function mean(arr){
  let mean = arr.reduce((acc, curr)=>{
    return acc + curr
  }, 0) / arr.length;
  return mean
}

function dev(arr){
  // Creating the mean with Array.reduce
  let mean = arr.reduce((acc, curr)=>{
    return acc + curr
  }, 0) / arr.length;
   
  // Assigning (value - mean) ^ 2 to every array item
  arr = arr.map((k)=>{
    return (k - mean) ** 2
  })
   
  // Calculating the sum of updated array
 let sum = arr.reduce((acc, curr)=> acc + curr, 0);
  
 // Calculating the variance
 let variance = sum / arr.length
  
 // Returning the Standered deviation
 return Math.sqrt(sum / arr.length)
}

function print(){
  if (currplayer == "A"){
    const temp = Adifferences.toString()
    return temp
  }
  if (currplayer == "B"){
    const temp = Bdifferences.toString()
    return temp
  }
  if (currplayer == "Unknown"){
    const temp = Unknown.toString()
    return temp
  }
}

function reset(){
  setcurrplayer("A");
  setCount(5);
  var Adifferences = [];
  var Bdifferences = [];
  var Unknown = [];
}

if(count > 0 && currplayer == "A"){
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <div>
        <div style={divStyle}>
          <h1 style = {hStyle}>The Real Click Shady</h1>
          <p style={pStyle}>
            Let's play a game. Grab a friend, a sibling, an acquaintance, or a total stranger.</p>
          <p style={pStyle}>
            Each of you will take turns clicking on the following 5 buttons. Then, one of you will play another round and I will guess who played the 3rd time. </p>
        </div>

          <h5 >Your turn: Player</h5>
          <h1 style={{ color: '#4f25f7' }}>{currplayer}</h1>
          <h5>Buttons left: {count}</h5>
      </div>
      <center>
        <div>
          <StyledButton variant="contained" onMouseDown = {handleMouseDown} onMouseUp={handleMouseUp} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDown} onMouseUp={handleMouseUp} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDown} onMouseUp={handleMouseUp} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDown} onMouseUp={handleMouseUp} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDown} onMouseUp={handleMouseUp} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
        </div>
        <button onClick={() => setCount(5)}>Reset</button>
      </center>
      </ThemeProvider>
    </div>
  );
}

if(count > 0 && currplayer == "B"){
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <div>
        <h5 >Your turn: Player</h5>
        <h1 style={{ color: '#4f25f7' }}>{currplayer}</h1>
          <h5>Count is {count}</h5>
      </div>
      <center>
        <div>
          <StyledButton variant="contained" onMouseDown = {handleMouseDownB} onMouseUp={handleMouseUpB} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDownB} onMouseUp={handleMouseUpB} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDownB} onMouseUp={handleMouseUpB} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDownB} onMouseUp={handleMouseUpB} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDownB} onMouseUp={handleMouseUpB} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
        </div>
      </center>
        <button onClick={() => setCount(5)}>Reset</button>
      </ThemeProvider>
    </div>
  );
}

if(count > 0 && currplayer == "Unknown"){
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <div>
        <h5 >Your turn: Player</h5>
        <h1 style={{ color: '#4f25f7' }}>{currplayer}</h1>
          <h5>Count is {count}</h5>
      </div>
      <center>
        <div>
          <StyledButton variant="contained" onMouseDown = {handleMouseDownE} onMouseUp={handleMouseUpE} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDownE} onMouseUp={handleMouseUpE} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDownE} onMouseUp={handleMouseUpE} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDownE} onMouseUp={handleMouseUpE} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
          <StyledButton variant="contained" onMouseDown = {handleMouseDownE} onMouseUp={handleMouseUpE} onClick={decrementCount}>Click here</StyledButton>
          &nbsp;
        </div>
      </center>
        <button onClick={() => setCount(5)}>Reset</button>
      </ThemeProvider>
    </div>
  );
}

if (currplayer == "Finished"){
  return (
  <div className="App">
  <ThemeProvider theme={theme}>
    <h5>Processed results</h5>  
    <h5>
      {calcplayer} was {calcRatio(Adifferences, Bdifferences, Unknown)}x more likely to have been the player that played twice. 
    </h5>
    <center>
    <StyledButton variant="contained" onClick={() => reset()}>Play again</StyledButton>
    </center>
    {console.log(count)}
    {console.log(currplayer)}
  </ThemeProvider>
</div>
  )
}

else {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <h5>Thanks for playing, Player {currplayer}. Here were your times in milliseconds.</h5>  
        {print(currplayer)}
        <h5>Onto the next player, Player {predictnextplayer(currplayer)}.  Click here to play again. </h5>
        <center>
          <StyledButton variant="contained" onClick={changePlayer}>Play again</StyledButton>
        </center>
      </ThemeProvider>
    </div>
  );
}

}

// class Count extends Component {
//   render() {
//     return <h1>{this.props.count}</h1>;
//     return <StyledButton variant="contained" onClick={action}>{this.props.txt}</StyledButton>;
//   }
// }
      // {/* <h2
      //     style={{
      //       position: "absolute",
      //       left: `${(Math.random()* 600)}px`,
      //       top: `${(Math.random()* 750)}px`,
      //     }}
      //   > */}
      //   {/* </h2> */}

export default App;
