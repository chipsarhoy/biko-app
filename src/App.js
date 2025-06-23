import './App.css';
import {useState} from 'react';
import BikoSideMenu from './Components/BikoSideMenu.jsx';
import BikoTopMenu from './Components/BikoTopMenu';


/**
 * Biko Web Application Component
 * @returns Entire HTML page of the Biko application
 */
function Biko() {

  const [sideMenu, setSideMenu] = useState(null);
  
  const isExpanded = () => {
    sideMenu === null ? setSideMenu(<BikoSideMenu/>) : setSideMenu(null);
  }

  return (
    <div className="Biko">

      <BikoTopMenu onBikoSideMenu={isExpanded}/>     
      {sideMenu}
      <header className="Biko-header">
        <h1>Biko.com</h1>
        
      </header>
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
