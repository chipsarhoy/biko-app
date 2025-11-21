import { useState } from 'react';
import { login } from '../auth.js';
import { useToggleForm } from '../contexts/BikoAuthToggleContext.jsx';
import BikoRegisterAccountForm from './BikoRegisterAccountForm.jsx';

function BikoLoginForm(props) {
    const[errorMessage, setErrorMessage] = useState();
    const {setToggleForm} = useToggleForm();

    async function registerHandler() {
        setToggleForm(<BikoRegisterAccountForm setIsLoggedIn={props.setIsLoggedIn}/>)
    }
    async function handler(e) {
        e.preventDefault();

        try {
            const data = await login(e)
            if(data.status === 200) {
                props.setIsLoggedIn(true)
                errorMessage !== null ? setErrorMessage(null) : " "
             }
             
            setErrorMessage(<h3>Credentials Invalid</h3>);
        } catch (error) {
            setErrorMessage(error);
        }
    }
    
    return(
    <>
    {errorMessage}
    <h2>Login</h2>
    <form onSubmit={handler}>
        <input name="username" placeholder="Username"/>
        <input type="Password" placeholder="Password" name="password"/>
        <button>Submit</button>
    </form>
    <a style={{cursor: 'pointer'}} onClick={registerHandler}>No Account? Create one here</a>
    </>
    );
}

export default BikoLoginForm;