
import "../../styles/cart.scss"
export default function CartItem({value,title, img,increment,decrement}){

    return(
        <>
            <div className="cart-item">
                <div>
                    <h4>{title}</h4>
                    <img src={img} alt="" />
                </div>
                <div>
                    <button onClick={decrement} >-</button>
                    <input type="number" readOnly value={value} />
                    <button onClick={increment} >+</button>
                </div>
                
            </div>
            
        </>
    )
}