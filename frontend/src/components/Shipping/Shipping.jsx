import { useState } from "react"
import "../../styles/shipping.scss"
import {Country,State} from "country-state-city"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Shipping (){
    const {shippingInfo} = useSelector((state)=>state.cart)
    const [hNo,setHNo] =useState(shippingInfo.hNo)
    const [city,setCity] =useState(shippingInfo.city)
    const [country,setCountry] =useState(shippingInfo.country)
    const [pinCode,setPinCode] =useState(shippingInfo.pinCode)
    const [state,setState] =useState(shippingInfo.state)
    const [phoneNo,setPhoneNo] =useState(shippingInfo.phoneNo);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(hNo,phoneNo,pinCode,city,country,state);
        dispatch({
            type:"addShippingInfo",
            payload:{
                hNo,
                phoneNo,
                pinCode,
                city,
                country,
                state,
            }
        });
        localStorage.setItem("shippingInfo",JSON.stringify({
            hNo,
            phoneNo,
            pinCode,
            city,
            country,
            state,
        }))
        navigate("/confirmorder")
    }
    return (
        <>
            <section className="shipping">
                <main>
                    <h1>Shipping Details</h1>
                    <form onSubmit={submitHandler}>
                        <div>   
                            <label htmlFor="">H.No.</label>
                            <input type="text" placeholder="Enter Complete House No." name="" id=""
                            value={hNo} onChange={(e)=>setHNo(e.target.value)} required/>
                            </div>
                        <div> 
                            <label>Country</label>
                            <select name="" id="" value={country} onChange={(e)=>setCountry(e.target.value)}required>
                                <option required>Country</option>
                                {
                                    Country && Country.getAllCountries().map((i)=><option value={i.isoCode} key={i.isoCode} >{i.name}</option>)
                                }
                            </select>
                            </div>
                            
                            {
                                country && (
                                <div>
                            <label>State</label><select name="" id=""value={state} onChange={(e)=>setState(e.target.value)} required>
                                <option value="">State</option>
                                {
                                    State && State.getStatesOfCountry(country).map((i)=><option key={i.isoCode} value={i.isoCode} >{i.name}</option>)
                                }
                            </select>
                            </div>)
                            }
                            
                        
                        <div>
                            <label htmlFor="">City</label>
                            <input type="text" placeholder="Enter City " name="" id=""
                            value={city} onChange={(e)=>setCity(e.target.value)}
                            required/>
                            </div>
                            
                        <div>
                            <label htmlFor="">Pincode</label>
                            <input type="number" placeholder="Enter Pincode " name="" id=""
                            value={pinCode} onChange={(e)=>setPinCode(e.target.value)} required/>
                            </div>
                            <div>
                            <label htmlFor="">Mo.No.</label>
                            <input type="number" placeholder="Enter Mobile Number " name="" id="" 
                            value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}required/>
                        </div>
                        <button type="submit" >Confirm Order</button>
                    </form>
                </main>
            </section>
        </>
    )
}