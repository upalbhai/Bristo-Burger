import '../../styles/contact.scss';
import {motion} from "framer-motion";
import burger2 from "../../assets/burger2.png";
import { useState } from "react";
import { server } from "../../redux/store";
import axios from "axios";

export default function Contact(){

    // const [email, setEmail] = useState("");
    // const [name, setName] = useState("");
    // const [message, setMessage] = useState("");
    // const sendMail = () => {
    //     axios
    //         .post(`${server}/sendmail`, {
    //             email,
    //             name,
    //             message,
    //         })
    //         .then(() => {
    //             // Success
    //             console.log("Email sent successfully");
    //         })
    //         .catch((error) => {
    //             // Error handling
    //             console.error("Failed to send email:", error);
    //         });
    // };
    
    return(
    <>
        <section className='contact'>
            <motion.form id="contactForm"
            
                initial={{
                    x:"-100vw",
                    opacity: 0,
                }}
                animate={{
                    x : 0,
                    opacity: 1,
                    transition:{
                        duration: .3,
                    }
                }}

            >
                {/* <h2>Contact Us</h2>
                <input type='text' name="name" id="name" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                <input type='email' name="email" id="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <textarea cols="30" id='message' name='message' rows="10" placeholder='Message ..' onChange={(e) => setMessage(e.target.value)} > */}
                <h2>Contact Us</h2>
                <input type='text' name="name" id="name" placeholder='Name' />
                <input type='email' name="email" id="email" placeholder='Email'  />
                <textarea cols="30" id='message' name='message' rows="10" placeholder='Message ..' >

                </textarea>

                <button  >Send</button>
            </motion.form>
            <motion.div className='form-border' initial={{
                    x:"100vw",
                    opacity: 0,
                }}
                animate={{
                    x : 0,
                    opacity: 1,
                    transition:{
                        duration: .3
                    }
                }} >
                <motion.div
                initial={{
                    x:"100vw",
                    opacity: 0,
                }}
                animate={{
                    x : "50%",
                    y : "-50%",
                    opacity: 1,
                    transition:{
                        duration: .8,
                        delayChildren: .3
                    }
                }}> 
                    <img src={burger2} alt="" /> </motion.div>
            </motion.div>
        </section>
    </>
    )
}