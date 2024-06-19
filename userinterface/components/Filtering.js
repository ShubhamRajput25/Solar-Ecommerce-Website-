import { useState, useEffect } from "react"
import { getData, postData } from "../../services/fetchnodeservices"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';
import FilteringCSS from '../CSS/FilteringCSS.css'
import { useNavigate } from "react-router-dom"
import Slider from '@mui/material/Slider';

export default function Filtering({ setProductList , pattern , setTitle}) {
  const [categoryList, setCategoryList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])
  const [brandId, setBrandId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [brandAccordionOpen, setBrandAccordionOpen] = useState(false)
  const [categoryAccordionOpen, setCategoryAccordionOpen] = useState(false)
  const [subcategoryAccordionOpen, setSubcategoryAccordionOpen] = useState(false)
  const [brandSearchPattern, setBrandSearchPattern] = useState('')
  const [categorySearchPattern, setCategorySearchPattern] = useState('')
  const [filterProductsByBrands, setFilterProductsByBrands] = useState([])
  const [filterProductsByCategory, setFilterProductsByCategory] = useState([])

  const [value, setValue] = useState([0, 387]);

  const navigate = useNavigate()

  console.log("row se id mili", brandId)

  useEffect(function () {
    fetchAllBrands()
    fetchAllCategory()
  }, [])

  const fetchAllCategory = async () => {
    var result = await getData('category/fetch_all_category')
    setCategoryList(result.data)
  }




  const showCatgeoryList = () => {
    return categoryList.map((item) => {
      if (item.categoryname.toLowerCase().includes(categorySearchPattern.toLowerCase())) {
        return <div style={{ margin: '10px 0px', fontSize: '1.1rem' }}> <label>
          <input type="checkbox" check onChange={handleSelectCategory} value={item.categoryname.toLowerCase()} />
          {item.categoryname}
        </label>
        </div>
      }
    })

  }


  const fetchAllBrands = async () => {
    var result = await getData('brands/display_all_brands')
    setBrandList(result.data)
  }

  const handleSelectBrands = async (e) => {
    let val = e.target.value
    const index = filterProductsByCategory.indexOf(val);

    if(e.target.checked){
      if(filterProductsByCategory.length >=1){
        setFilterProductsByBrands([...filterProductsByBrands,val])
        let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:filterProductsByCategory ,  brandlist: [...filterProductsByBrands,val] })
          setProductList(result.data)
      }else{
        setFilterProductsByBrands([...filterProductsByBrands, val ])
        let result = await postData('userinterface/fetch_products_by_brands', {  brandlist: [...filterProductsByBrands,val]  })
        setProductList(result.data)
        // setTitle(['Brands : ',...filterProductsByBrands,` ${val}`])
      }
    }else{
      if(filterProductsByCategory.length >=1){
        setFilterProductsByBrands( [...filterProductsByBrands.splice(index, 1)])
        if(filterProductsByBrands.length >1){
        let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:filterProductsByCategory ,  brandlist: filterProductsByBrands.splice(index, 1)})
        setProductList(result.data)
        }else{
          let result = await postData('userinterface/fetch_products_by_category', { categorylist:filterProductsByCategory })
          setProductList(result.data)
        }
      }else{
        setFilterProductsByBrands(filterProductsByBrands.toSpliced(index, 1))

        if(filterProductsByBrands.length >1){  
          let result = await postData('userinterface/fetch_products_by_brands', {bralist:filterProductsByBrands.toSpliced(index, 1)})
          setProductList(result.data)
        }else{
         
          let result= await postData('userinterface/fetch_all_products_pattern',{pattern:pattern})
          setProductList(result.data)
        }
       
      }
    }
  }

  const handleSelectCategory = async (e) => {
    let val = e.target.value
    const index = filterProductsByCategory.indexOf(val);
    if(e.target.checked){ 

        if(filterProductsByBrands.length >=1){
          setFilterProductsByCategory([...filterProductsByCategory, val])
          let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:[...filterProductsByCategory, val] ,  brandlist: filterProductsByBrands })
          setProductList(result.data)
        }else{
          setFilterProductsByCategory([...filterProductsByCategory, val])
          let result = await postData('userinterface/fetch_products_by_category', { categorylist:[...filterProductsByCategory, val] })
          setProductList(result.data)
        }

    }else{
     
      if(filterProductsByBrands.length >=1){
        setFilterProductsByCategory( [...filterProductsByCategory.splice(index, 1)])
        if(filterProductsByCategory.length >1){
        let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:filterProductsByCategory.splice(index, 1) ,  brandlist: filterProductsByBrands })
        setProductList(result.data)
        }else{
          let result = await postData('userinterface/fetch_products_by_brands', {  brandlist: filterProductsByBrands })
        setProductList(result.data)
        }
      }else{
        setFilterProductsByCategory(filterProductsByCategory.toSpliced(index, 1))

        if(filterProductsByCategory.length >1){
          let result = await postData('userinterface/fetch_products_by_category', {categorylist:filterProductsByCategory.toSpliced(index,1)})
          setProductList(result.data)
        }else{
          let result= await postData('userinterface/fetch_all_products_pattern',{pattern:pattern})
          setProductList(result.data)
        }
       
      }

     
    }

    
  }


  console.log(filterProductsByBrands)

  const showBrandList = () => {
    return brandList.map((item) => {
      if (item.brandname.toLowerCase().includes(brandSearchPattern.toLowerCase())) {
        return <div style={{ margin: '10px 0px', fontSize: '1.1rem' }}> <label>
          <input type="checkbox" check onChange={handleSelectBrands} value={item.brandname.toLowerCase()} />
          {item.brandname}
        </label>
        </div>
      }
    })
  }

  const handleBrandSearchPattern = (e) => {
    setBrandSearchPattern(e.target.value)
  }

  const handleBrandList = (item) => {
    fetchAllCategory()
    setBrandAccordionOpen(!brandAccordionOpen)
    navigate(`/ShowProductsByCategory/${item.brandname}`)
  }



  const fetchAllSubcategory = async () => {
    var result = await postData('subcategory/search_by_category', { categoryid: categoryId })
    setSubCategoryList(result.data)
  }


  const handleCategoryList = (item) => {
    fetchAllSubcategory()
    navigate(`/ShowProductsByCategory/${item.categoryname}`)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function AccordionExpandDefault() {
    return (
      <div>
        <div className="filter-scrollbar">
          <div style={{ fontWeight: 550, fontSize: '1.2rem', margin: '10px 0px' }}>Brands</div>
          <TextField fullWidth variant='outlined' size="small" label="Brands" onChange={(e) => setBrandSearchPattern(e.target.value)} />
          <div style={{ height: '200px', overflow: 'scroll' }} >
            {showBrandList()}
          </div>
        </div>

        <div className="filter-scrollbar">
          <div style={{ fontWeight: 550, fontSize: '1.2rem', margin: '10px 0px', marginTop: '20px' }}>Category</div>
          <TextField fullWidth variant='outlined' size="small" label="Category" onChange={(e) => setCategorySearchPattern(e.target.value)} />
          <div style={{ height: '200px', overflow: 'scroll' }} >
            {showCatgeoryList()}
          </div>
        </div>

{/* it is for filter by price  */}

        {/* <div>
          <div style={{ fontWeight: 550, fontSize: '1.2rem', margin: '10px 0px', marginTop: '20px' }}>Price</div>
          <Box >
            <Slider
              // getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              // getAriaValueText={valuetext}
              max={500}
              min={0}
            />
          </Box>

        </div> */}

      </div>
    );
  }
  return (<div style={{ width: '100%' }}>
    {AccordionExpandDefault()}
    {/* {showBrandList()}
<Divider />
{showCatgeoryList()} */}
  </div>)
}