import "../../styles/profile.scss";
import { Link } from "react-router-dom";
import me from "../../assets/founder.webp";
import {MdDashboard} from "react-icons/md"
import {motion} from "framer-motion";
import { useDispatch,useSelector } from "react-redux";
import {logout} from "../../redux/actions/user"
import Loader from "../Layout/Loader";
export default function Profile(){

    const dispatch=useDispatch();
    const {loading, user = {}} = useSelector(state => state.auth);

    const logoutHandler=()=>{
        dispatch(logout())
    };
    const options = {
        initial:{
            y:"-100%",
            opacity:0
        },
        animate:{
            y:0,
            opacity:1
        }
    }
    
    return(
        <>
            <section className="profile">
                {
                    loading===false?
                    <main>
                    <motion.img  src={user.photo} {...options} />
                    <motion.h5 {...options} transition={{delay:0.3}} >{user.name}</motion.h5>
                    
                    {
                        user.role==="admin" &&(
                            <motion.div {...options} transition={{delay:0.5 }}
                        style={{borderRadius:0,backgroundColor:"rgb(40,40,40)"}}
                    >
                        <Link to="/admin/dashboard"><MdDashboard/>Dashboard</Link>
                    </motion.div>
                        )
                    }

                    <motion.div 
                    initial={{x:"-100vw",opacity:0}}
                    animate= {{ x :"0%" , opacity :  1}}>
                        <Link to="/myorders">Orders</Link>
                    </motion.div>
                    <motion.button 
                    initial={{x:"-100vw",opacity:0}}
                    animate= {{ x :"0%" , opacity :  1}}
                    transition={{delay:0.5 }} 
                    onClick={logoutHandler}
                    >
                        Logout
                    </motion.button>
                </main> :<Loader/>
                }
            </section>
        </>
    )
}