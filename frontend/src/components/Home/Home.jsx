import "../../styles/home.scss"
import {motion} from "framer-motion"
import Founder from "./Founder"
import Menu from "./Menu"
export default function Home(){

    const option={
            initial:{
                x:"-100%", 
                opacity:1, 
            },
            whileInView:{
                x:"0", 
                opacity:1, 
            }
    }

    return(
        <>
            <section className="home">
        <div>
            <motion.h1 {...option} >Bristo Burger</motion.h1>
            <motion.p {...option} transition={{delay:0.3}}>Give yourself a tasty  treat!</motion.p>
        </div>
        <a href="#menu">Explore Menu</a>
    </section>
    <Founder/>
    <Menu />
        </> 
    )
   
    
}