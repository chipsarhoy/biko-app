import {useState} from 'react';

function BikoLoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    
    function login(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        setUsername(formData.get('username'));
        setPassword(formData.get('password'));
        try{
            fetch('http://localhost:8000/auth/jwt/create/', {method: "POST", headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
                }).then(response => response.json())
                .then(data => setToken(data))
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
        <button type="submit">Submit</button>
    </form>
    </>
    );
}

export default BikoLoginForm;