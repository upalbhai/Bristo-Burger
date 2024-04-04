import me from "../../assets/founder.webp";
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
                <h3>Mr. Xyz</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus tenetur facilis<br/> eum accusamus aperiam. Non doloribus veritatis nam iure dolorum alias, voluptate, deleniti sequi accusamus incidunt natus similique, repellat illum.</p>
            </motion.div>
        </section>
)}