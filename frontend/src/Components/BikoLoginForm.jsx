import { useState } from 'react';
function BikoLoginForm(props) {

    async function login(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
 
        try{
            await fetch('http://localhost:8000/authentication/', {method: "POST", headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}), credentials: 'include'})
                .then(response => response.status === 200 ? props.setIsLoggedIn(true) : console.log('Credentials Invalid'))
                .catch(error => console.error("Oof, sorry", error));
        } catch (error) {
            console.log(error);
        }
    };
    return(
    <>
    <h2>Login</h2>
    <form onSubmit={login}>
        <input name="username" placeholder="Username"/>
        <input type="Password" placeholder="Password" name="password"/>
        <button>Submit</button>
    </form>
    </>
    );
}

export default BikoLoginForm;