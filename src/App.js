import logo from './logo.svg';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CustomBtn from './components/CustomBtn';
import './App.css';

const theme = createMuiTheme({
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
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <h2
          style={{
            position: "absolute",
            left: `${(Math.random()* 600)}px`,
            top: `${(Math.random()* 750)}px`,
          }}
        >
          <CustomBtn txt="Button"
            onClick={() => this.handleClick(1)}
          />
        </h2>
        <h2
          style={{
            position: "absolute",
            left: `${(Math.random()* 600)}px`,
            top: `${(Math.random()* 750)}px`,
          }}
        >
          <CustomBtn txt="Button"/>
        </h2>
        <h2
          style={{
            position: "absolute",
            left: `${(Math.random()* 600)}px`,
            top: `${(Math.random()* 750)}px`,
          }}
        >
          <CustomBtn txt="Button"/>
        </h2>
        <h2
          style={{
            position: "absolute",
            left: `${(Math.random()* 600)}px`,
            top: `${(Math.random()* 750)}px`,
          }}
        >
          <CustomBtn txt="Button"/>
        </h2>
        <h2
          style={{
            position: "absolute",
            left: `${(Math.random()* 600)}px`,
            top: `${(Math.random()* 750)}px`,
          }}
        >
          <CustomBtn txt="Button"/>
        </h2>
        <h2
          style={{
            position: "absolute",
            left: `${(Math.random()* 600)}px`,
            top: `${(Math.random()* 750)}px`,
          }}
        >
          <CustomBtn txt="Button"/>
        </h2>
      </ThemeProvider>
    </div>
  );
}

export default App;
