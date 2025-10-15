import logout from './authentication/logout.js';

function BikoLogout(props) {
        
        /*try{
            await fetch('http://localhost:8000/logout/', {method: 'POST', headers: {'Content-Type': 'application/json'},
            credentials: "include"})
            .then(props.setIsLoggedIn(false))
            .then(console.log("Logged Out Successfully"))
            .catch(error => console.log("Something went wrong" + error));
        } catch (error) {
            console.log(error);
        }
    }*/

    return (
        <>
        <button onClick={() => logout(props.setIsLoggedIn)}>Logout</button>
        </>
    );
};

export default BikoLogout;