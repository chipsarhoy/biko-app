import { register } from '../auth.js';
import { useState } from 'react';
import { useToggleForm } from '../contexts/BikoAuthToggleContext.jsx';
import BikoLoginForm from './BikoLoginForm.jsx';
function BikoRegisterAccountForm(props) {

    const [inProgress, setInProgress] = useState(false);
    const [output, setOutput] = useState();
    const { setToggleForm } = useToggleForm();

    function reset() {
        setInProgress(false);
    }

    function toggleHandler() {
        setToggleForm(<BikoLoginForm setIsLoggedIn={props.setIsLoggedIn}/>)
    }

    async function handler(e) {
        inProgress === false ? setInProgress(true) : setInProgress(false);

        try{
            const response = await register(e);

            if(response.status===201) {
                setOutput(<><h3>Account Created Succesfully!</h3><button onClick={toggleHandler}>Login</button></>)
                return;
            }
            setOutput(<><h3>Account Creation Failed</h3><button onClick={reset}>Try Again</button></>)

        } catch(error) {

        }
    }


    if(!inProgress) {
        return(
        <>
        <h2>Create an Account</h2>
        <form onSubmit={handler}>
            <input name='username' placeholder='Create a username'/>
            <input type='password' name='password' placeholder='Create a password'/>
            <input name='email' placeholder='Email'/>
            <button>Submit</button>
        </form>
        <a style={{cursor: 'pointer'}} onClick={toggleHandler}>Go Back</a>
        </>
    )}

    return output;
}
export default BikoRegisterAccountForm;