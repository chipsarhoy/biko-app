import { useMenuData } from '../contexts/BikoMenuContext.jsx';
import { useState, useEffect } from 'react';
function BikoPriceCalculate(props) {
    const { menuData } = useMenuData();
    const [subtotal, setSubtotal] = useState(0);
    
    const prices = Object.fromEntries(menuData.map(item =>
        [item.name, item.price]
    ));
    
    useEffect(() => {
        let x = 0;
        if(Object.keys(props.quantity).length > 0 ) { 
            const intersectedItems = Object.keys(props.quantity).filter(k => k in prices);
            for(let i of intersectedItems) {
                x = x + props.quantity[i] * prices[i];
            }                      
        }
    
        setSubtotal(x.toFixed(2));
    }, [props.quantity])
    
    //const intersected = Object.keys(props.quantity).filter(k => k in prices);
    
    return (
        <>
        <h3>Subtotal: {subtotal}</h3>
        </>
    );
}
export default BikoPriceCalculate;