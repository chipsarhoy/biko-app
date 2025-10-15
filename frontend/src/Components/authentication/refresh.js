export default async function refresh(){
    return await fetch('http://localhost:8000/authentication/refresh/', {
        method: 'POST',
        credentials: 'include'});
}