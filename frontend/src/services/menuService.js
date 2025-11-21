export default async function menuService() {
    try{
        return await fetch("http://localhost:8000/")
            .then((response) => response.json())
            .catch((error) => console.error("Something went wrong: " + error))
    } catch (error) {
        return "Error";
    }
}