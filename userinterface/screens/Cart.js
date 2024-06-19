import { Grid } from "@mui/material"
import { serverurl } from "../../services/fetchnodeservices";
import { FormControl, InputLabel, Select, MenuItem, } from "@mui/material";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {Divider} from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { flexbox } from "@mui/system";
import PaymentCardComponent from "../components/PaymentCardComponent";
import CartDetailComponent from "../components/CartDetailComponent";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import FooterComponent from "../components/FooterComponent";
import { footerStyle } from "../CSS/FooterComponentCss";
export default function Cart() {
    var classes = footerStyle()

    const [pageRefresh,setPageRefresh]=useState(false)
    var productsFromRedux=useSelector((state)=>state.Cart)
    var data=Object.values(productsFromRedux)

    let userdata=Object.values(useSelector((state)=>state.User))[0]
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa",userdata)

    const theme = useTheme();
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(450))

    return (
        <div>
        <Header />
        <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop: matches1?'125.5px':'65.5px',marginBottom:'2%'}}>

            <div style={{width:matches1?'98%':'80%',display:'flex',justifyContent:matches1?'start':'center',flexDirection: matches1 ?'column':'row'}}>

        <div style={{width:matches1?'100%':'65%',display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'center',marginTop:'1%'}}>

        <div style={{width:'98%',display:'flex',justifyContent:'space-between',alignItems:'center',background:'#fff',padding:'1%',marginBottom:'1%',marginTop:'1%',boxShadow:matches3?'':'0px 0px 3px black'}}>
        <div style={{fontWeight:'bolder',fontSize:'1.3rem',marginLeft:'4%'}}>MY BAG</div>
        <div style={{fontSize:'.7rem',color:'grey',marginRight:'4%'}}>Items are reserved for 60 minutes</div>
        
        </div>
        
        {userdata?.item? <div style={{width:'100%',background:'#fff',marginBottom:'.5%',boxSizing:'border-box',padding:'2%',boxShadow:matches3?'':'0px 0px 3px black',marginBottom:'1%'}}>
            <div style={{fontWeight:'bold', fontSize:'1rem'}}>Shipping Address</div>
            <div>
            <span style={{color:'gray',margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.80rem',letterSpacing: '0.5px', lineHeight: 1}} >{userdata?.item?.address}</span>
            </div>

            <div><span style={{color:'gray', margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.80rem',letterSpacing: '0.5px', lineHeight: 1}}>{userdata?.item?.city}, {userdata?.item?.state}, {userdata?.item?.pincode} </span></div>
            
            <div style={{fontSize:'.9rem',fontWeight:600}}>Landmark: 
            <span style={{color:'gray',margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.80rem',letterSpacing: '0.5px', lineHeight: 1}} >{userdata?.item?.landmark}</span>
            </div>

            <div style={{fontSize:'.9rem',fontWeight:600}}> mobileno:
            <span style={{color:'gray',margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.80rem',letterSpacing: '0.5px', lineHeight: 1}}>{userdata?.item?.mobileno}</span>
            </div>
        </div>:<></>}
       

      
        <CartDetailComponent data={data} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />       

        </div>

        <div style={{width:matches1?'100%':'35%',marginTop:'1.65%',marginLeft:matches1?'':'1%'}}>
            <PaymentCardComponent data={data} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
        </div>

            </div>

        </div> 

        <Divider />

        <div className={classes.root} style={{marginTop:matches3?'8%':'2%'}}>
            <FooterComponent />
        </div>

        </div>
    )
}
