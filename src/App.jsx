import React from 'react'
import CombineHomeSection from './Components/Client-Side/Home/CombineHomeSection'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CombineOurServices from './Components/Client-Side/OurServices/CombineOurServices'
import CombineAboutSection from './Components/Client-Side/About/CombineAboutSection'
import CombineContactSection from './Components/Client-Side/Contact/CombineContactSection'
import SignIn from './Components/Authentication/SignIn'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import AdminSidebar from './Components/Admin-Side/Sidebar/Sidebar'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Client Side Routes */}
          <Route path='/' element={<CombineHomeSection/>} />
          <Route path='/Services' element={<CombineOurServices/>} />
          <Route path='/About' element={<CombineAboutSection/>} />
          <Route path='/Contact' element={<CombineContactSection/>} />

          <Route path='/Admin' element={
            <ProtectedRoute>

            <AdminSidebar/>
            </ProtectedRoute>
            }/>
          <Route path='/signin' element={<SignIn/>}/>
          
           
           
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App