function BikoOrderQuantity(props) {

    function handleChange(e){
        const value = e.target.value;
        value < 100 && value > -1 ? (
        props.setQuantity((prev) => ({...prev, [props.item.name] : value}))) : " ";
    }

    /*function addItem() {
        !(props.item.name in props.quantity) ? (
            props.setQuantity((prev) => ({...prev, [props.item.name] : 1})) ) : 
        ( props.quantity[props.item.name] < 99 ? 
            ( props.setQuantity((prev) => ({...prev, [props.item.name] : parseInt((prev[props.item.name] || 0)) + 1})) ) : 0
        )
    }

    function subtractItem() {
        props.item.name in props.quantity && props.quantity[props.item.name] > 0 ? (
            props.setQuantity((prev) => ({...prev, [props.item.name] : parseInt((prev[props.item.name] || 1)) - 1})) ) : ''
    }*/

    return props.isLoggedIn ? (
        <>    
        <input type='number' value={!props.quantity ? 0 : props.quantity[props.item.name]} onChange={handleChange}/>
        </>
        /*<>
            <button onClick={addItem}>+</button>*/
        /*    <button onClick={subtractItem}>-</button>
        </>*/
        
    ) : null;
}

export default BikoOrderQuantity;