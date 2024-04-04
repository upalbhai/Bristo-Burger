import {IoFastFoodOutline} from "react-icons/io5";
import {FiLogIn,FiShoppingCart} from "react-icons/fi";
import {FaUser} from "react-icons/fa";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import "../../styles/header.scss";
export default function Header({isAuthenticated}){
    return (
        <nav>
            <motion.div initial={{x:"-100%"}} whileInView={{x:0}} >
                <IoFastFoodOutline />
            </motion.div>
            <div>
                <Link to="/" >Home</Link>
                <Link to="/Contact" >Contact</Link>
                <Link to="/about" >About</Link>
                <Link to="/cart"><FiShoppingCart /></Link>
                <Link to={isAuthenticated?"/me":"/login"} >
                    {isAuthenticated?<FaUser/>:<FiLogIn/>}
                </Link>
            </div>
        </nav>
    )
}