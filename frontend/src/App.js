import './App.css';
import Searchinput from './components/input';
import Title from './components/title'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <Searchinput />
      </header>
    </div>
  );
}

export default App;
