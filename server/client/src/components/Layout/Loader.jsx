import { IoFastFoodOutline } from "react-icons/io5";
import { motion } from "framer-motion";

export default function Loader() {
    const options = {
        initial: { 
            opacity: 0 
        },
        animate: { 
            opacity: 1,
        },
        transition:{
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
        } 
        
    };

    return (
        <div className="loader">
            <IoFastFoodOutline />

            <div>
                <motion.p {...options}>Loading...</motion.p>
            </div>
        </div>
    );
}
