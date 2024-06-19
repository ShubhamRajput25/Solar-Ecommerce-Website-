
import * as React from 'react';
import Card from '@mui/material/Card';
import { Grid } from "@mui/material"

import { Button,  } from '@mui/material';
import { postData, serverurl } from '../../services/fetchnodeservices';
import {Divider} from "@mui/material"
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import CartDrawer from "./CartDrawer"
import AddNewAddress from './AddNewAddress';
import { useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import EditAddressComponent from './EditAddressComponent';

export default function PaymentCardComponent(props) {

    const [open,setOpen]=useState(false)
    const [address,setAddress]=useState([])
    const [addressBoxOpen,setAddressBoxOpen]=useState(false)
    const [labelPaymentButton,setLabelPaymentButton]=useState('CHECKOUT')
    

    let userkey=Object.keys(useSelector((state)=>state.User))
    let userdata=Object.values(useSelector((state)=>state.User))[0]
    console.log("userrrrrrrrrrrrrrr",userdata)
    console.log(userkey)
    let navigate=useNavigate()
    let productdata=props.data

    let totalAmt=productdata.reduce((p1,p2)=>{
      let amt=p1+(parseInt(p2.price)*p2.qty)
      return amt
    },0)

    let payout=productdata.reduce((p1,p2)=>{
        let amt=p1+(p2.offerprice>0?p2.offerprice*p2.qty:p2.price*p2.qty)
        return amt
    },0)

    const theme = useTheme();
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(450))

   

    ///********Payment Gateway********** */
const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: payout*100, //  = INR 1
    name: "SolarBuddy",
    description: 'some description',
    image:
      `${serverurl}/images/logo.png`,
    handler: function (response) {
       
        alert(response.razorpay_payment_id);
    },
    prefill: {
      name: '', 
      contact:'', 
      email:'' 
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const handlePayment = async() => {
    console.log("helooooo",userkey)
    if(userkey?.length==0){
      navigate('/signin')
     
    }else{
      var result = await postData('userinterface/check_useraddress_by_mobileno',{mobileno:userkey})

      if(result.data.length >=1){
        if(labelPaymentButton=='CHECKOUT'){ 
        setOpen(true)
        setAddress(result.data)
        }else{
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        }
      }else{
        setOpen(true)
      }
    
    }

   
  };
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);



  ////********************* */



    const showProducts = () => {

            return (   
         
<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',background:'#fff'}}>
    <div style={{width:'90%'}}>
        <div style={{ fontWeight: 'bolder', fontSize: '1.5rem', marginTop: '4%',marginBottom:'7%' }}>TOTAL</div>
        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Product Amount
            <span style={{ fontWeight: 'bold', fontSize: '1rem', float: 'right',color:'grey' }}>&#x20b9;{totalAmt}</span>
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Product Amount
            <span style={{ fontWeight: 'bold', fontSize: '1rem', float: 'right',color:'grey' }}>&#x20b9;{payout}</span>
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '1rem',marginTop:'2%'}}>Delivery
            <span style={{fontWeight: 'bold', fontSize: '1rem', float: 'right',color:'grey'  }}>&#x20b9;0</span>
        </div>
<Divider/>

        <div style={{ fontWeight: 'bold', fontSize: '1rem',marginTop:'2%'}}>Net Amount
            <span style={{fontWeight: 'bold', fontSize: '1rem', float: 'right',color:'grey'  }}>&#x20b9;{payout}</span>
        </div>

        <div style={{ fontWeight: 'bold', fontSize: '1rem',marginTop:'2%'}}>Savings
            <span style={{fontWeight: 'bold', fontSize: '1rem', float: 'right',color:'green'  }}>&#x20b9;{totalAmt-payout}</span>
        </div>
        <div style={{ marginTop: '20px', borderTop: '2px solid #fff' }}>
            <Button variant="contained" fullWidth style={{ marginTop: '10px',background:'#018849',borderRadius:0,fontWeight:'bolder',fontSize:'1rem' }} onClick={handlePayment}>{labelPaymentButton}
            </Button>
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '.9rem', marginTop:'3%'}}>WE ACCEPT :</div>

        <div style={{  boxSizing: "border-box", maxWidth: "50%", maxHeight: "20px", marginTop: "15px", marginBottom: "10px",}}>
        <img src={`${serverurl}/images/py.jpg`} style={{ width: '99%', height: '100%', display: 'flex', }} /> 
        </div>
        <div style={{letterSpacing:'0.4px',color:'grey',fontSize:'.8rem',marginBottom:'8%'}}>Got a discount code? Add it in the next step.</div>
    </div>
                    </div>

            );
    }



    return (
        <div style={{boxShadow:matches3?'':'0px 0px 3px black'}}>
            {showProducts()}
        <CartDrawer open={open} setOpen={setOpen} address={address} userData={userdata} setAddressBoxOpen={setAddressBoxOpen} setLabelPaymentButton={setLabelPaymentButton} pageRefresh={props.pageRefresh} setPageRefresh={props.setPageRefresh} />

        <AddNewAddress addressBoxOpen={addressBoxOpen}  setAddressBoxOpen={setAddressBoxOpen} userData={userdata} /> 

        </div>


    )
}

