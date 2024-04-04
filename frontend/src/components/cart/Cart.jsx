import "../../styles/cart.scss"
import CartItem from "./CartItem"
import burger1 from "../../assets/burger1.png"
import burger2 from "../../assets/burger2.png"
import burger3 from "../../assets/burger3.png"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
export default function Cart(){

    const {
        cartItems: {
            cheeseBurger: { quantity: cheeseBurger },
            vegCheeseBurger: { quantity: vegCheeseBurger },
            burgerWithFries: { quantity: burgerWithFries },
        },
        subTotal,
        tax,
        shippingCharges,
        total,
    } = useSelector((state) => state.cart);
    const { cartItems: orderItems } = useSelector((state) => state.cart);
    const dispatch=useDispatch()

    const increment=(item)=>{
        switch(item){
            case 1:
                dispatch({type:"cheeseBurgerIncrement"});
                dispatch({type:"calculatePrice"});
                break;
            case 2:
                dispatch({type:"vegCheeseBurgerIncrement"});
                dispatch({type:"calculatePrice"});
                break;
            case 3:
                dispatch({type:"burgerWithFriesIncrement"});
                dispatch({type:"calculatePrice"});
                break;
            default:
                dispatch({type:"burgerWithFriesIncrement"});
                dispatch({type:"calculatePrice"});
                break;
        }
    }
    const decrement=(item)=>{
        switch(item){
            case 1:
                if(cheeseBurger===0) break;
                dispatch({type:"cheeseBurgerDecrement"});
                dispatch({type:"calculatePrice"});
                break;
            case 2:
                if(vegCheeseBurger===0)break;
                dispatch({type:"vegCheeseBurgerDecrement"});
                dispatch({type:"calculatePrice"});
                break;
            case 3:
                if(burgerWithFries===0) break;
                dispatch({type:"burgerWithFriesDecrement"});
                dispatch({type:"calculatePrice"});
                break;
            default: 
            dispatch({type:"burgerWithFriesIncrement"});
            dispatch({type:"calculatePrice"});
            break;
        }
    }
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(orderItems));
        localStorage.setItem(
          "cartPrices",
          JSON.stringify({
            subTotal,
            tax,
            shippingCharges,
            total,
          })
        );
      }, [orderItems, subTotal, tax, shippingCharges, total]);
    


    return(
        <>
            <section className="cart">
                <main>

                    <CartItem 
                    title={"cheese burger"} 
                    img={burger1} 
                    value={cheeseBurger} 
                    increment={()=>increment(1)}  
                    decrement={()=>decrement(1)}
                    />
                   
                    <CartItem 
                    title={"cheese burger"} 
                    img={burger2} 
                    value={vegCheeseBurger} 
                    increment={()=>increment(2)}  
                    decrement={()=>decrement(2)}
                   />
                    <CartItem 
                    title={"cheese burger"} 
                    img={burger3} 
                    value={burgerWithFries}
                    increment={()=>increment(3)}  
                    decrement={()=>decrement(3)} 
                  />
                  <article>
                    <div>
                        <h4>Sub Total</h4>
                        <p>&#8377;{subTotal}</p>
                    </div>
                    <div>
                        <h4>Tax</h4>
                        <p>&#8377;{tax}</p>
                    </div>
                    <div>
                        <h4>Shipping Charges</h4>
                        <p>&#8377;{shippingCharges}</p>
                    </div>
                    <div>
                        <h4>Total</h4>
                        <p>&#8377;{total}</p>
                    </div>
                    <Link to="/shipping" >Check out</Link>
                </article>
                </main>
            </section>
        </>
    )
}