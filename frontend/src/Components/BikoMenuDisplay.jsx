import BikoOrderQuantity from './BikoOrderQuantity.jsx';
//import {useState, useEffect} from 'react';
import { useMenuData } from '../contexts/BikoMenuContext.jsx';

function BikoMenuDisplay(props) {
  const menuContext = useMenuData();
  if (!menuContext) {return null};
  const { menuData } = useMenuData();

  /*useEffect(() => {
    fetch("http://localhost:8000")
      .then((response) => response.json())
      .then((data) => setContent(data))
      .catch((error) => console.log(error));
    }, []);*/

  let listMenu = [];
  if(menuData.length > 0) {
    listMenu = menuData.map(item =>
      <tr id={item.name}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.description}</td>
        <td><BikoOrderQuantity quantity={props.quantity} setQuantity={props.setQuantity} item={item} isLoggedIn={props.isLoggedIn}/></td>
      </tr>
  )}

  if(menuData.length > 0) {
    return (
    <table>
      <thead>
        <tr>
          <th>Name</th>              
          <th>Price</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {listMenu}
      </tbody>
    </table>
    );
  }

  return <h2>Menu Loading</h2>;
}

export default BikoMenuDisplay;