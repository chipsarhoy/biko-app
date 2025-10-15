import BikoMenuDisplay from './BikoMenuDisplay';
import { useState } from 'react';
import refresh from './authentication/refresh.js';
import logout from './authentication/logout.js';

async function submitOrder(firstName, lastName, email, phone, quantity){
    return await fetch('http://localhost:8000/newOrder/', 
        {method: "POST", headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'customer': {'first_name' : firstName, 'last_name' : lastName, 'email' : email, 'phone' : phone},
        'order_items' : quantity}), credentials: 'include'})
    
}

function BikoMenuSelect(props) {

    const [quantity, setQuantity] = useState({});

    async function submitHandler(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const firstName = formData.get('first_name');
        const lastName = formData.get('last_name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        
        try{
            await submitOrder(firstName, lastName, email, phone, quantity)
            .then(response => response.status === 401 ? 
                refresh().then(response => response.status === 200 ? 
                    submitOrder(firstName, lastName, email, phone, quantity)
                    : props.setIsLoggedIn(false))
                : console.log("Order Submitted Successfully")                
            )
        } catch(e){
            console.error(e);
        }
    }
    return (
        <>
        <BikoMenuDisplay quantity={quantity} setQuantity={setQuantity} isLoggedIn={props.isLoggedIn}/>
        <form onSubmit={submitHandler}>
            <input name='first_name' type='text' maxLength='30' placeholder='First Name'></input>
            <input name='last_name' type='text' maxLength='30' placeholder='Last Name'></input>
            <input name='email' type='email' maxLength='50' placeholder='Email'></input>
            <input name='phone' type='tel' maxLength='10' placeholder='Phone Number'></input>
            <button>Submit</button>
        </form>
        </>
    )
}
export default BikoMenuSelect;