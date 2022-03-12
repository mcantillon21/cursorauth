import logo from './logo.svg';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CustomBtn from './components/CustomBtn';
import Counter from './components/Counter';
import './App.css';
import React, { useState } from "react";

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
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
  allButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    flexWrap: "wrap",
  },
});


function App() {
  const [count, setCount] = useState(6);
  let starttime = 0
  let endtime = 0
  let length = 0

  let incrementCount = () => {
    setCount(count + 1);
  };
  let decrementCount = () => {
    setCount(count - 1);
  };
  let startCapture = () => {
  };
  if ({count} == 0) {
    //end capture
  }
  let mousedownTime;

let handleMouseDown = () => {
  mousedownTime = new Date().getTime();
}

let handleMouseUp = () => {
  const mouseupTime = new Date().getTime(),
  timeDifference = mouseupTime - mousedownTime;
  alert(`Button held down for ${timeDifference}ms`);
}

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <div class="count">
          <h5>Count is {count}</h5>
      </div>
      <ThemeProvider style = {theme.allButtons}>
        <button onMouseDown = {handleMouseDown} onMouseUp={handleMouseUp}>handle</button>
        <CustomBtn action={startCapture} txt = {"Start"}></CustomBtn>
        <CustomBtn action={decrementCount} txt = {"Click me"}></CustomBtn>
        <CustomBtn action={decrementCount} txt = {"Click me"}></CustomBtn>
        <CustomBtn action={decrementCount} txt = {"Click me"}></CustomBtn>
        <CustomBtn action={decrementCount} txt = {"Click me"}></CustomBtn>
        <CustomBtn action={decrementCount} txt = {"Click me"}></CustomBtn>
      </ThemeProvider>
        <button onClick={() => setCount(6)}>Reset</button>
      </ThemeProvider>
    </div>
  );
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
