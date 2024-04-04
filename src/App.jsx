import {Outlet, Navigate, Route, Routes, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Test from "./pages/Test";


function Layout(){
  const { user } = useSelector((state) => state.user);
  const location = useLocation()

  return user?.token ?(
    <Outlet/>
  ):(
    <Navigate to ="/login" state={{from: location}} replace/>
  );
}

function App() {


  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:id?' element={<Profile />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </div>
  )
}

export default App
