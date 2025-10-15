import BikoOrderQuantity from './BikoOrderQuantity.jsx';
import {useState, useEffect} from 'react';

function BikoMenuDisplay(props) {
  const [content, setContent] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:8000")
      .then((response) => response.json())
      .then((data) => setContent(data))
      .catch((error) => console.log(error));
    };

  useEffect(() => {
    fetchData();
  }, []);

  let listMenu;
  content.length > 0 ? (
    listMenu = content.map(item =>
      <tr>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.description}</td>
        <td><BikoOrderQuantity quantity={props.quantity} setQuantity={props.setQuantity} item={item} isLoggedIn={props.isLoggedIn}/></td>
      </tr> 
    ) ) : (
    listMenu
  );

  return content.length > 0 ? (
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
  ) : (
    <h2>Menu Loading</h2>
  );
}

export default BikoMenuDisplay;