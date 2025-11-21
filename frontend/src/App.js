import './App.css';
import { useState, useEffect } from 'react';
import { MenuDataProvider } from './contexts/BikoMenuContext.jsx';
import { useToggleForm } from './contexts/BikoAuthToggleContext.jsx';
import BikoSideMenu from './components/BikoSideMenu.jsx';
import BikoTopMenu from './components/BikoTopMenu.jsx';
import BikoMenuDisplay from './components/BikoMenuDisplay.jsx';
import BikoRegisterAccountForm from './components/BikoRegisterAccountForm.jsx';
import BikoLoginForm from './components/BikoLoginForm.jsx';
import BikoLogout from './components/BikoLogout.jsx';
import BikoOrderForm from './components/BikoOrderForm.jsx';
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
  const { toggleForm, setToggleForm } = useToggleForm();
  useEffect(() => {
    setToggleForm(<BikoLoginForm setIsLoggedIn={setIsLoggedIn}/>)
  }, []); 
   
  return (
  <MenuDataProvider>
    <div className="Biko">
      {!isLoggedIn ? (
        <>
        <BikoTopMenu onBikoSideMenu={isExpanded}/>     
        {sideMenu}
        <h1>Biko.com</h1>      
        <BikoMenuDisplay isLoggedIn={isLoggedIn}/>
        {toggleForm}
        </>
      ) : (
        <>
        <BikoTopMenu onBikoSideMenu={isExpanded}/>     
        {sideMenu}
        <h1>Biko.com</h1>
        <BikoOrderForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <BikoLogout setIsLoggedIn={setIsLoggedIn}/>
        </>
      )} 
    </div>
  </MenuDataProvider>
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
