import menu from './menu.svg';
import './App.css';
import { useState } from 'react';

function BikoSideMenu() {
  return (
    <div className="Biko-side-menu-expanded">
      View Menu
    </div>
  );
}

function Button( { className, onClick, children}) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

/**
 * Top Horizontal Menu Component
 * @param {*} onBikoSideMenu
 * @returns HTML div tag that encompasses the top horizontal menu of the application
 */
function BikoTopMenu({onBikoSideMenu}) {
  const fullscreen = (window.screen.width === window.outerWidth && window.outerHeight === window.screen.height);
  const [isMaximized, setIsMaximized] = useState((window.screen.width === window.outerWidth && window.outerHeight === window.screen.height) ? false : true);
  let sideMenuToggle;
  console.log(isMaximized);
    
  function actualResizeHandler() {
    console.log((fullscreen) ? false : true);
    setIsMaximized((fullscreen) ? false : true);
  }
  
  function resizeThrottler(fn, limit) {
    let inThrottle;
    return (...args) => {
      if (inThrottle) return;
        fn.apply(this, args); 
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
    }
  }

  window.addEventListener('resize', resizeThrottler(actualResizeHandler, 10000));

  (!isMaximized) ? sideMenuToggle = null : sideMenuToggle= (
    <Button className="Biko-side-menu" onClick={onBikoSideMenu}> 
      <img src={menu} className="three-lines" alt="menu"/>
    </Button>
  );
  
  return (
  <div className="Biko-top-menu">
    {sideMenuToggle}
  </div>
  );
}

/**
 * Biko Web Application Component
 * @returns Entire HTML page of the Biko application
 */
function Biko() {
  
  // This state hook is to keep track if the side menu is expanded when the browser is not in fullscreen mode
  const [isExpanded, setIsExpanded] = useState(false);
  
  function sideMenuExpand() {
    setIsExpanded(!isExpanded);
  }

  let sideMenu;
  let bikoTopMenu = <BikoTopMenu onBikoSideMenu={sideMenuExpand} />;

  if(isExpanded) {
   sideMenu = <BikoSideMenu/>;
  }

  return (
    <div className="Biko">
      {bikoTopMenu}      
      {sideMenu}

      <header className="Biko-header">
        <h1>Biko.com</h1>
        
      </header>
    </div>
  )
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
