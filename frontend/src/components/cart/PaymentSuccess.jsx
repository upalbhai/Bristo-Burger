import "../../styles/paymentsuccess.scss"
import { Link } from "react-router-dom"
export default function PaymentSuccess(){

    return(
        <>
            <section className="payment-success" >
                <main>
                    <h1>Order Confirm</h1>
                    <p>Order Placed Successfully, you can check ypur order status</p>
                    <Link to="/myorders" >Check Status</Link>
                </main>
            </section>
        </>
    )
}