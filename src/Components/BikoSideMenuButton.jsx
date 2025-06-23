import Button from './Button.jsx'
import menu from './../menu.svg'
import {useState, useEffect} from 'react'

/**
 * 
 * @param {*} param0 
 * @returns The side menu toggle to disappear if browser size is maximized
 */
function BikoSideMenuButton(props) {

    // Used to ensure expandable side menu icon is only accessible when window is not maximized
    function checkFullscreen() {
      return (window.outerWidth < window.screen.width);
    }
    
    // Hook to keep track of the browser size (ex. maximized/windowed)
    const [isMaximized, setIsMaximized] = useState(checkFullscreen);
    //let sideMenuToggle;
    
    useEffect(() => {
      const actualResizeHandler = () => { setIsMaximized(checkFullscreen()); }  
          
      function resizeThrottler(fn, limit) {
        let inThrottle;
        return (...args) => {
          if (inThrottle) return;
            fn.apply(this, args); 
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
      }
  
      // Resize event triggered whenever size of browser is adjusted
      window.addEventListener('resize', resizeThrottler(actualResizeHandler, 1000));
  
      return window.removeEventListener('resize', resizeThrottler(actualResizeHandler, 1000));
    }, []);
  
    // Conditional that checks if browser is windowed then side menu will be available 
    return (
      <>
        {!isMaximized ? null : (
        <Button className="Biko-side-menu" onClick={props.onClick}> 
          <img src={menu} className="three-lines" alt="menu"/>
        </Button>)   
        };
      </>
    )
  }
  export default BikoSideMenuButton;