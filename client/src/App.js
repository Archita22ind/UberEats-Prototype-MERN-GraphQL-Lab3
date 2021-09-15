import RestaurantSearch from './customer/restaurantSearch';
import RestaurantDetails from './restaurant/restaurantDetails';
import ProfileInfo from './customer/profileInfo';
import SignUp from './restaurant/signUp';
import HomePage from './common/homePage';


import logo from './logo.svg';
import './styling/App.css';
import MainHeader from './common/mainHeader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {



  
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <MainHeader/> */}
    
      <Router>
      <Switch>
        <Route path="/restaurantDetails" component={RestaurantDetails} />
        <Route path="/profileInfo" component={ProfileInfo} />
        <Route path="/customerSignUp" component={SignUp} />
        <Route path="/restaurantSearch" component={RestaurantSearch} />
        <Route path="/restaurantSignUp" component={SignUp} />
        <Route component={HomePage} />
      </Switch>

      </Router>
      
    </div>
  );
}

export default App;
