import {AiFillInstagram,AiFillYoutube,AiFillGithub} from "react-icons/ai"
import "../../styles/footer.scss";
export default function Footer(){
    return(
        <>
            <footer>
                <div>
                    <h2>Bristo Burger</h2>
                    <p>Give yourself a tasty treat</p>
                    <br />
                    <em>We give attention to genuine feedback</em>
                    <strong>All rights received @patelburgerwala</strong>
                </div>
                <aside>
                    <h4>Follow Us</h4>
                    <a href=""><AiFillInstagram/></a>
                    <a href=""><AiFillYoutube /></a>
                    <a href=""><AiFillGithub /></a>
                </aside>
            </footer>
        </>
    )
}