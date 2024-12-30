import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Welcome from './pages/welcomepage'
import OrderManagement from './pages/ordermanagement';
import Cart from '../src/pages/cart'
import PaymentPage from './pages/paymentpage'
import OrderSummary from './pages/ordersummary'

function App() {
  return (
    <div>
  
    {/* ............................routes..................... */}
<Routes>
  {/* ..........doo page hai eisliye dooroute ........... */}
  
  <Route path="/" element={<Welcome/>}/>
  <Route path="/cart" element={<Cart/>}/>
  <Route path="/welcome" element={<Welcome/>}/>
  <Route path="/payment" element={<PaymentPage/>}/>
  <Route path="/order-summary" element={<OrderSummary/>}/>
  <Route path="/order" element={<OrderManagement/>}/>
 
</Routes>
     
    </div>
  );
}

export default App;