import "..//../styles/about.scss";
import me from "../../assets/founder.jpg";
import {RiFindReplaceLine} from "react-icons/ri"
import { Link } from "react-router-dom";
export default function About(){
    return (
        <section className="about">
            <main>
                <h1>About Us</h1>
                <article>
                    <h4>Bristo Burger</h4>
                    <p>Give yourself a tasty  treat!</p>
                    <p>Explore various types of burger, Click below to see menu</p>
                    <Link  ><RiFindReplaceLine /></Link>
                </article>
                <div>
                    <h2>Founder</h2>
                    <article>
                        <div>
                            <img src={me} alt="" />
                            <h3>Upal Patel</h3>
                        </div>
                        <p>I am Upal patel, founder of Bristo Burger, find good taste...</p>
                    </article>
                </div>
            </main>
        </section>
    )
}