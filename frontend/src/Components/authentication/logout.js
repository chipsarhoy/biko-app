export default async function logout(setIsLoggedIn, statuscode) {

    if(statuscode === 401){setIsLoggedIn(false)}
    
    else{ 
        try{
            await fetch('http://localhost:8000/logout/', {method: 'POST', headers: {'Content-Type': 'application/json'},
            credentials: "include"})
            .then(setIsLoggedIn(false))
            .then(console.log("Logged Out Successfully"))
            .catch(error => console.log("Something went wrong" + error));
        } catch (error) {
            console.log(error);
        }
    }
}