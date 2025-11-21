import BikoMenuDisplay from './BikoMenuDisplay.jsx';
import BikoPriceCalculate from './BikoPriceCalculate.jsx';
import { useState } from 'react';
import { refresh } from '../auth.js';
import { submitOrder } from '../services/orderService.js';

function BikoOrderForm(props) {

    const [quantity, setQuantity] = useState({});
    const [orderStatus, setOrderStatus] = useState("In Progress");

    function orderStatusReset(){
        setQuantity({});
        setOrderStatus("In Progress")
    }

    async function submitHandler(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const firstName = formData.get('first_name');
        const lastName = formData.get('last_name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        
        try{
            await submitOrder(firstName, lastName, email, phone, quantity)
            .then(async (response) => {
                if(response.status === 200) { 
                    setOrderStatus("Success")
                    return;
                }
            
                await refresh().then(async (response) => {                    
                    response.status === 401 ? props.setIsLoggedIn(false) : await submitOrder(firstName, lastName, email, phone, quantity)
                    .then(response => response.status === 200 ? setOrderStatus("Success") : setOrderStatus("Failed"))                
                })                                          
            })
        } catch(e){
            console.error(e);
        }
    }
    
    switch(orderStatus) {
    case "In Progress":
        return(
        <>
        <BikoMenuDisplay quantity={quantity} setQuantity={setQuantity} isLoggedIn={props.isLoggedIn}/>
        <form onSubmit={submitHandler}>
            <input name='first_name' type='text' maxLength='30' placeholder='First Name'></input>
            <input name='last_name' type='text' maxLength='30' placeholder='Last Name'></input>
            <input name='email' type='email' maxLength='50' placeholder='Email'></input>
            <input name='phone' type='tel' maxLength='10' placeholder='Phone Number'></input>
            <BikoPriceCalculate quantity={quantity}/>
            <button>Submit</button>
        </form>
        </>
        );
    case "Failed":
        return (
            <>
            <h1>Something Went Wrong</h1>
            <button onClick={orderStatusReset}>Try Again</button>
            </>
        )
    case "Success":
        return (
            <>
            <h1>Order Submitted @ {new Date().getTime()}</h1>
            <button onClick={orderStatusReset}>Place Another Order</button>
            </>
        );   
    }
}
export default BikoOrderForm;