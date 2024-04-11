import {Outlet, Navigate, Route, Routes, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import GameCenter from "./pages/GameCenter";
import SparkmanGame from "./pages/SparkmanGame";
import RaceGame from "./pages/RaceGame";
import CryptoStore from "./pages/CryptoStore";
import ReactBullsAndCows from "./pages/ReactBullsAndCows"


function Layout(){
  const { user } = useSelector((state) => state.user);
  const location = useLocation()

  return user?.token?(
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
          <Route path='/cryptostore' element={<CryptoStore />}/>
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/gamecenter' element={<GameCenter/>}/>
        <Route path='/sparkmangame' element={<SparkmanGame/>} />
        <Route path='/racegame' element={<RaceGame/>} />
        <Route path='/bullsandcows' element={<ReactBullsAndCows/>} />
      </Routes>
    </div>
  )
}

export default App
