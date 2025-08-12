import BikoSideMenuButton from './BikoSideMenuButton.jsx'
import Button from './Button.jsx'

function BikoTopMenu(props) {
  
    return (
    <div className="Biko-top-menu">
      <BikoSideMenuButton onClick={props.onBikoSideMenu}/>
      <Button />
    </div>
    );
  }

  export default BikoTopMenu;