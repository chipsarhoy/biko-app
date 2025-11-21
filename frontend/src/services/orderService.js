export async function submitOrder(firstName, lastName, email, phone, quantity){
    return await fetch('http://localhost:8000/newOrder/', 
        {method: "POST", headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'customer': {'first_name' : firstName, 'last_name' : lastName, 'email' : email, 'phone' : phone},
        'order_items' : quantity}), credentials: 'include'})
    
}