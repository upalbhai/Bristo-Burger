import {motion} from "framer-motion";
import "../../styles/menu.scss";
export default function MenuCard({itemNum,burgerSrc,price,title,handler,delay}){


    return (
        <motion.div className="menucard"
        
        initial={{
            x:"-100%",
            opacity:0
        }}
        whileInView={{
            x:0,
            opacity:1
        }}
        transition={{delay,}}
        >
            <div>Item {itemNum}</div>
            <main>
                <img src={burgerSrc} alt={itemNum} />
                <h5>&#8377;{price}</h5>
                <p>{title}</p>
                <button onClick={()=>handler(itemNum)} >Add to cart</button>
            </main>
        </motion.div>
    )
}