
import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Category from './pages/CategoryPage';
import Login from './pages/Login'
import Analytics from './pages/Analytics';
import CustemerReview from './pages/CustemerReview';
import ProductList from './pages/ProductList';

import './App.css'
import SignUpForm from './pages/SignUpForm';
import ForgotPassword from './pages/ForgetPassword';
// import ContactPage from './pages/Contact';
import RolesPage from './pages/Rolles';
// import PermissionPage from './pages/Permisstion';
import PermissionTable from './components/PermissionTable';
// import RoleTable from './components/RoleTable';
import UserPage from './pages/UserPage';
import ShopPage from './pages/ShopPage';



type SaleData = {
  date: string;
  amount: number;
};

type RevenueData = {
  month: string;
  revenue: number;
};



const App: React.FC = () => {

  const saleData: SaleData[] = [
    { date: '2022-01-01', amount: 100 },
    { date: '2022-01-02', amount: 150 },
    { date: '2022-01-03', amount: 200 },
    { date: '2022-01-04', amount: 120 },
    { date: '2022-01-05', amount: 180 },
    { date: '2022-01-06', amount: 90 },
    { date: '2022-01-07', amount: 110 },
    { date: '2022-01-08', amount: 130 },
    { date: '2022-01-09', amount: 170 },
    { date: '2022-01-10', amount: 160 },
  ];

  const revenueData: RevenueData[] = [
    { month: 'January', revenue: 500 },
    { month: 'February', revenue: 700 },
    { month: 'March', revenue: 600 },
    { month: 'April', revenue: 800 },
    { month: 'May', revenue: 900 },
    { month: 'June', revenue: 750 },
    { month: 'July', revenue: 850 },
    { month: 'August', revenue: 950 },
    { month: 'September', revenue: 700 },
    { month: 'October', revenue: 850 },
  ];
 
  
  return (
    <div >
    <BrowserRouter>
    <Sidebar>
      <Routes>
        <Route path="/" element={<Dashboard saleData={saleData} revenueData={revenueData}  />} />
        <Route path="/dashboard" element={<Dashboard saleData={saleData} revenueData={revenueData}  />} />
       <Route path="/login" element={<Login/>}/>
       <Route path='/forget-password' element={<ForgotPassword/>}/>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/review"element={<CustemerReview  />}/>
        <Route path="/analytics" element={<Analytics  />} />
        <Route path="/product" element={<ProductList />}/>
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/orders" element={<Orders/> }/>
       
        <Route path="/category" element={<Category />} />
        {/* <Route path='/contact' element={<ContactPage/>}/> */}
        <Route path='/roles' element={<RolesPage/>}/>
        {/* <Route path='/permission' element={<PermissionPage/>}/> */}
        {/* <Route path='/roles' element={<RoleTable/>}/> */}
        <Route path='/permission' element={<PermissionTable/>}/>
        <Route path='/user' element={<UserPage/>}/>
      
      </Routes>
    </Sidebar>
  </BrowserRouter>
  </div>
  );
};

export default App;
