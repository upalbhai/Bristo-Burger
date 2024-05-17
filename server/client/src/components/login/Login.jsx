import "../../styles/login.scss"
import {motion} from "framer-motion";
import {FcGoogle} from "react-icons/fc"
import { server } from "../../redux/store";
export default function Login(){

    const loginHandler=()=>{
        window.open(`${server}/googlelogin`,"_self")
    }
    return (
        <>
            <section className="login">
                <motion.button
                    initial={{y:-"100vh"}}
                    animate={{y:0}}
                 onClick={loginHandler}
                 >
                    Login With Google
                    <FcGoogle />
                </motion.button>
            </section>
        </>
    )
}