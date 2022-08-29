import './App.css';
import { Switch, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import Home from './Components/Home/Home.jsx';
import Details from "./Components/Details/Details.jsx";
import Form from "./Components/Form/Form.jsx";

function App() {
  return (
    <div className="App">
     <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/videogame/:id" component={Details} />
      <Route exact path="/new" component={Form}/>
      </Switch>
    </div>
  );
}

export default App;
