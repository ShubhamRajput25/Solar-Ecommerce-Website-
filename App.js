import Brand from './admin/screen/Brands'
import Category from './admin/screen/Category';
import DisplayAllBrands from './admin/screen/DisplayAllBrands';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import DisplayAllCategory from './admin/screen/DisplayAllCategory';
import SubCategory from './admin/screen/SubCategory';
import Products from './admin/screen/Products';
import DisplayAllProducts from './admin/screen/DisplayAllProducts';
import ProductDetails from './admin/screen/ProductDetails';
import DisplayAllProductDetails from './admin/screen/DisplayAllProductDetails';
import Banners from './admin/screen/Banners';
import DispalyAllSubCategory from './admin/screen/DisplayAllSubCategory';
import AdminLogin from './admin/screen/AdminLogin';
import AdminDashboards from './admin/screen/AdminDashboards';
import Home from './userinterface/screens/Home';
import ShowProductsByCategory from './userinterface/screens/ShowProductsByCategory';
import ShowProductDetails from './userinterface/screens/ShowProductDetails';
import Cart from './userinterface/screens/Cart';
import SignIn from "./userinterface/screens/SignIn"
import NotVerified from "./userinterface/screens/NotVerified"
import VerifyOtp from "./userinterface/screens/VerifyOtp"
import PaymentCardComponent from './userinterface/components/PaymentCardComponent';

function App() {
  return (
    
    <div >
    <Router>
      <Routes>
      <Route element={<Home />} path='/home'/>
      <Route element={<Cart />} path='/cart'/>
      <Route element={<ShowProductDetails />} path='/showproductdetails'/>
      <Route element={<ShowProductsByCategory />} path='/showproductsbycategory/:pattern'/>
        <Route element={<AdminLogin />} path='/adminlogin'/>
        <Route element={<AdminDashboards />} path='/admindashboards/*'/>
        <Route element={<SignIn/>} path="/signin"/>
      <Route element={<VerifyOtp/>} path="/verifyotp"/>
      <Route element={<NotVerified/>} path="/notverified"/>
      </Routes>
    </Router>

    </div>
  );
}

export default App;
