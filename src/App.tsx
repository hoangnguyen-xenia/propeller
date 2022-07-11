import './App.scss';
import HeaderBar from './components/header';
import PokemonContainer from './components/pokemon';

function App() {
  return (
    <div className="App">
      <HeaderBar />
      <PokemonContainer />
    </div>
  );
}

export default App;
