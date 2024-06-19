import Header from "../components/Header"
import Filtering from "../components/Filtering"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, Grid } from "@mui/material";
import ShowProductComponent from "../components/ShowProductComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData, postData } from "../../services/fetchnodeservices";
import SolarProduct from "../components/SolarProduct";
import { useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { FitScreen } from "@mui/icons-material";
export default function ShowProductsByCategory(){

    const [productList,setProductList]=useState([])
    const [pageRefesh, setPageRefesh] = useState(false)
    const [open,setOpen]=useState(false)
    const [categoryList,setCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [minPrice,setMinPrice]=useState('')
    const [maxPrice,setMaxPrice]=useState('')
    const [title,setTitle]=useState('')

    const theme = useTheme();
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(697))

    let param=useParams()
    let navigate = useNavigate()
    
    useEffect(function(){
        fetchAllProducts()
        setTitle(param.pattern)
    },[param.pattern])

    const fetchAllProducts= async()=>{
        var result= await postData('userinterface/fetch_all_products_pattern',{pattern:param.pattern})
        console.log("shubhammmmmmmmmmmmmmmmmm",result.data)
        setProductList(result.data)
    }

    var data=productList.sort(function(){return 0.5 - Math.random()})

   const showProducts=()=>{
    return data.map((item)=>{
        return <ShowProductComponent data={item} pageRefesh={pageRefesh} setPageRefesh={setPageRefesh}/>
    })
   }
   const handleClose=()=>{
     setOpen(false)
 }

 //-----------------------------------------------------------

 useEffect(function(){
    fetchAllBrands()
},[])

 const fetchAllBrands=async()=>{
    var result = await getData('brands/display_all_brands')
   
    setBrandList(result.data)
}

 const handleBrandList=(item)=>{
    // fetchAllCategory()
  navigate(`/ShowProductsByCategory/${item.brandname}`)
  }

  const showBrandList =(data)=>{

   return brandList.map((item)=>{
      if(item.brandname.includes('')){
            return <div> <label> 
            <input type="checkbox" />  
          {item.brandname}
        </label> 
        </div>
    }
    })

  }

   const filterDrawer=()=>{
    return <Drawer open={open} onClose={handleClose} anchor={'bottom'} style={{borderRadius:'20px',boxSizing:'border-box',padding:'0px',background:'transparent'}}>
        {/* <Filtering /> */}
        <div style={{width:'100%',height:'300px',display:'flex',}}>
        <div style={{padding:'0px 0px',fontWeight:650,fontSize:'1rem'}}>
        <div style={{padding:20,cursor:'pointer'}}>Brands</div>
        <div style={{padding:20}}>Category</div>
        <div style={{padding:20}}>SubCategory</div>
        <div style={{padding:20}}>Price</div>
        </div>

        <div id="result">
            {showBrandList()}
        </div>
        </div>
    </Drawer>
   }
    return(<div style={{fontFamily:'poppins',background:'#f1f2f6',height:'100%',width:'100%',background:'#fff'}}>
        <Header />
        <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center',marginTop:matches1?'130px':'85px'}} >
    <div style={{width:matches3?'100%':'90%'}}>
    <Grid container spacing={2} style={{width:'100%',background:'#fff'}}>

    <Grid item xs={12} style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
   <div   style={{marginTop:'1%',display:'flex',justifyContent:'center',fontSize:matches3?'1.5rem':'2rem',marginLeft:matches3?'2%':'23%'}}>Result Of {title}</div>
{matches3?<div style={{display:'flex',alignItems:'center',cursor:'pointer'}} onClick={()=>setOpen(true)}><TuneIcon />Filter</div>:<></>}
    </Grid>
{matches3?<></>:
<Grid xs={2.5} style={{marginTop:'1%',display:'flex',justifyContent:'center'}}>
<Filtering  setProductList={setProductList} pattern={param.pattern} setTitle={setTitle}/>

</Grid>
}
<Grid item xs={matches3?12:9.5} style={{display:'flex',flexWrap:'wrap',width:'100%',justifyContent:matches3?'center':'start'}}>
{/* <SolarProduct pageRefesh={pageRefesh} setPageRefesh={setPageRefesh} data={productList} /> */}
{showProducts()}
</Grid>

</Grid>
        </div>
        {filterDrawer()}
            </div>
    </div>)
}