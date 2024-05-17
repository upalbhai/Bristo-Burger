import "../../styles/menu.scss";
import MenuCard from "./MenuCard";
import burger1 from "../../assets/burger1.png"
import burger2 from "../../assets/burger2.png"
import burger3 from "../../assets/burger3.png"
import { useDispatch, useSelector } from "react-redux"
import toast,{Toaster} from "react-hot-toast"
export default function Menu(){

    const dispatch= useDispatch()
    const addToCartHandler=(itemNum)=>{
        switch(itemNum){
            case 1:
                dispatch({type:"cheeseBurgerIncrement"});
                dispatch({type:"calculatePrice"});
                toast.success("Added To Cart")
                break;
            case 2:
                dispatch({type:"vegCheeseBurgerIncrement"});
                dispatch({type:"calculatePrice"});
                toast.success("Added To Cart")
                break;
            case 3:
                dispatch({type:"burgerWithFriesIncrement"});
                dispatch({type:"calculatePrice"});
                toast.success("Added To Cart")
                break;
            default:
                dispatch({type:"burgerWithFriesIncrement"});
                dispatch({type:"calculatePrice"});
                toast.success("Added To Cart")
                break;
        }
    }

    return <>
        <section id="menu" >
            <h1>Menu</h1>
            <div>
                <MenuCard
                    itemNum={1}
                    burgerSrc={burger1}
                    price={200}
                    title="cheese burger"
                    handler={addToCartHandler}
                    delay={0.2}
                />
                <MenuCard
                    itemNum={2}
                    burgerSrc={burger2}
                    price={250}
                    title="Veg cheese burger"
                    handler={addToCartHandler}
                    delay={0.5}
                />
                <MenuCard
                    itemNum={3}
                    burgerSrc={burger3}
                    price={100}
                    title="Burger with Fries"
                    handler={addToCartHandler}
                    delay={0.8}
                />
            </div>
        </section>
    </>
}