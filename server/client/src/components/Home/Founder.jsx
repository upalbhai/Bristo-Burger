import me from "../../assets/founder.jpg";
import {motion} from "framer-motion"
import "../../styles/founder.scss";

export default function Founder(){
const option = {
    initial:{
        x:"-100%",
        opacity:0
    },
    whileInView:{
        x:"0",
        opacity:1
    }
}
    return (
        <section className="founder">
            <motion.div {...option}>
                <img src={me} alt="founder" height={200} width={200} />
                <h3>Upal Patel</h3>
                <p>Welcome to Bristo Burger - Your Ultimate Burger Destination!
At Burger Haven, we are passionate about bringing you the juiciest, most delicious burgers right to your doorstep. Our online burger selling restaurant offers a mouth-watering selection of handcrafted burgers made with the freshest ingredients. Whether you're craving a classic cheeseburger, a spicy chicken burger, or a gourmet veggie delight, we've got something to satisfy every palate.</p>
            </motion.div>
        </section>
)}