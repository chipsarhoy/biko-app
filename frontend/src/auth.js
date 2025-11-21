export async function register(e) {

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const email = formData.get('email');

    try{
        return await fetch('http://localhost:8000/register/', 
        {method: "POST", headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, email})})
    } catch(error) {
        console.error(error);
    }
}

export async function login(e) {

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try{
        return await fetch('http://localhost:8000/authentication/', {method: "POST", headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}), credentials: 'include'})
    } catch (error) {
        console.error(error);
    }
};

export async function logout(setIsLoggedIn, statuscode) {

    if(statuscode === 401){setIsLoggedIn(false)}
    
    else{ 
        try{
            await fetch('http://localhost:8000/logout/', {method: 'POST', headers: {'Content-Type': 'application/json'},
            credentials: "include"})
            .then(setIsLoggedIn(false))
            .then(console.log("Logged Out Successfully"))
            .catch(error => console.log("Something went wrong" + error));
        } catch (error) {
            console.error(error);
        }
    }
}

export async function refresh(){
    return await fetch('http://localhost:8000/authentication/refresh/', {
        method: 'POST',
        credentials: 'include'});
}