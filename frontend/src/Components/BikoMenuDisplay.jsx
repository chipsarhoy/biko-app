import {useState, useEffect} from 'react';

function BikoMenuDisplay() {
  const [content, setContent] = useState([]);

  async function fetchData() {
    await fetch("http://localhost:8000")
      .then((response) => response.json())
      .then((data) => setContent(data))
      .catch((error) => console.log(error));
    };

  useEffect(() => {
    fetchData();
  }, []);

  const listMenu = content.map(item =>
    <tr>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.description}</td>
    </tr> 
  );

  return content.length > 0 ?(
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