import DraftsIcon from "@mui/icons-material/Drafts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {Routes , Route} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import { serverurl } from "../../services/fetchnodeservices";
import { adminStyle } from "../css/AdminDashboardCss";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Grid, Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CategoryIcon from '@mui/icons-material/Category';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import LogoutIcon from '@mui/icons-material/Logout';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BoltIcon from '@mui/icons-material/Bolt';
import Brands from './Brands';
import DisplayAllBrands from './DisplayAllBrands';
import Category from './Category';
import DisplayAllCategory from './DisplayAllCategory';
import SubCategory from './SubCategory';
import DisplayAllSubCategory from './DisplayAllSubCategory';
import Products from './Products';
import DisplayAllProducts from './DisplayAllProducts';
import ProductDetails from './ProductDetails';
import DisplayAllProductDetails from './DisplayAllProductDetails';
import AdminLogin from './AdminLogin';
import Banners from "./Banners";



export default function AdminDashboard(props) {
    var classes=adminStyle()
    var navigate=useNavigate()

    var admin = JSON.parse(localStorage.getItem('ADMIN'))

    return (<div>

        <AppBar position='static' style={{ background: '#488A99' }}>
            <Toolbar variant="dense">
                <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
                   
                </IconButton>
                <Typography variant="h6" component="div">
                    <div style={{ color: '#FFF' }}> SolarBuddy </div>
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
            <Grid item xs={2.3}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <img src={`${serverurl}/images/${admin?.picture}`} style={{ width: 80, marginTop:10,marginLeft:80 }} />
                    <Paper elevation={4} style={{ width: 220, height: 80, margin: 20, backgroundColor: '#dfe6e9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <img src={`${serverurl}/images/adminIcon.png`} style={{ width: 50,height:50, borderRadius: 25, marginLeft: 20 }} />
                        <div>
                        <div style={{ fontWeight: 'bold', fontFamily: 'Poppins', marginRight: 30 ,fontSize:20}} >{admin?.adminname}</div>
                        <div style={{  fontFamily: 'Poppins', marginRight: 30,fontSize:15 }} >{admin?.emailid}</div>
                        <div style={{  fontFamily: 'Poppins', marginRight: 30 ,fontSize:15}} >+91{admin?.mobileno}</div>
                        </div>
                        
                    </Paper>

                    {/* list */}
                    <div style={{ width: 220, margin: 20, }}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItemButton
                              onClick={()=>navigate('displayallbrands')}
                            >
                                <ListItemIcon>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>Brand List</span>} />
                            </ListItemButton>
                             
                        <Divider />

                            <ListItemButton
                              onClick={()=>navigate('displayallcategory')}
                            >
                                <ListItemIcon>
                                    <AddShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>Category List</span>} />
                            </ListItemButton>

                            <Divider />

                            <ListItemButton
                             onClick={()=>navigate('displayallsubcategory')}
                            >
                                <ListItemIcon>
                                    <AddPhotoAlternateIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>SubCategory List</span>} />
                            </ListItemButton>

                            <Divider />

                            <ListItemButton
                             onClick={()=>navigate('displayallproducts')}
                            >
                                <ListItemIcon>
                                    <ViewCarouselIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>Products List</span>} />
                            </ListItemButton>

                            <Divider />

                            <ListItemButton
                             onClick={()=>navigate('displayallproductdetails')}
                            >
                                <ListItemIcon>
                                    <ProductionQuantityLimitsIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>Products Details</span>} />
                            </ListItemButton>

                            <Divider />

                            <ListItemButton
                             onClick={()=>navigate('banners')}
                            >
                                <ListItemIcon>
                                    <BoltIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>Banners</span>} />
                            </ListItemButton>

                            <Divider />

                            <ListItemButton
                             onClick={()=>navigate("/adminlogin")}
                            >
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>Logout</span>} />
                            </ListItemButton>

                        </List>
                    </div>
                </div>
            </Grid>
            <Grid item xs={9.7} >
                <Routes>
                <Route element={<Banners />} path="/banners" />
            <Route element={<Brands />} path="/brands" />
          <Route element={<DisplayAllBrands />} path="/displayallbrands" />
          <Route element={<Category/>} path="/category" />
          <Route element={<DisplayAllCategory/>} path="/displayallcategory" />
          <Route element={<SubCategory/>} path="/subcategory" />
          <Route element={<DisplayAllSubCategory/>} path="/displayallsubcategory" />
          <Route element ={<Products />} path="/products" />
          <Route element={<DisplayAllProducts />} path="/displayallproducts" />
          <Route element={<ProductDetails />} path="/productdetails" />
          <Route element={<DisplayAllProductDetails />} path="/displayallproductdetails" />
          </Routes>
            </Grid>

        </Grid>

    </div>
    )
}