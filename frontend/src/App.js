import './App.css';
import {useState} from 'react';
import BikoSideMenu from './Components/BikoSideMenu.jsx';
import BikoTopMenu from './Components/BikoTopMenu.jsx';
import BikoMenuDisplay from './Components/BikoMenuDisplay.jsx';
import BikoLoginForm from './Components/BikoLoginForm.jsx';
import BikoLogout from './Components/BikoLogout.jsx';
import BikoMenuSelect from './Components/BikoMenuSelect.jsx';
/**
 * Biko Web Application Component
 * @returns Entire HTML page of the Biko application
 */
function Biko() {

  const [sideMenu, setSideMenu] = useState(null);
  const isExpanded = () => {
    sideMenu === null ? setSideMenu(<BikoSideMenu/>) : setSideMenu(null);
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
   
  return !isLoggedIn ? (
    <div className="Biko">

      <BikoTopMenu onBikoSideMenu={isExpanded}/>     
      {sideMenu}
      <h1>Biko.com</h1>
      <div>
        <BikoMenuDisplay isLoggedIn={isLoggedIn}/>
        <BikoLoginForm setIsLoggedIn={(setIsLoggedIn)}/>
      </div>
      
    </div>
  ) : (
    <div className="Biko">

      <BikoTopMenu onBikoSideMenu={isExpanded}/>     
      {sideMenu}
      <h1>Biko.com</h1>
        <BikoMenuSelect isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <BikoLogout setIsLoggedIn={setIsLoggedIn}/>
      <div>
        
      </div>
    </div>
  );
  /*return (
    <div className="Biko">
      <header className="Biko-header">
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
      </header>
    </div>
  );*/
}

export default Biko;
