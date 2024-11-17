import {  Suspense } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import Homepage from './Homepage/Homepage';
import Profile from './Profile/Profile';
import SearchPerson from './SearchPerson/SearchPerson';
import Cookies from 'js-cookie';
import { notification } from 'antd';



const LazyLoadingWrapper = ({ Component }) => {

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Component />
    </Suspense>
  )
}

function App() {

  const token = Cookies.get('userDetail')

  console.log(token)
  const navigate = useNavigate()

  if(token === undefined){
    notification.warning({
      message:"please login first"
    })
    navigate('/Login')
  }


  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<LazyLoadingWrapper Component={Homepage} />} />
        <Route path='/Login' element={<LazyLoadingWrapper Component={LoginPage} />} />
        <Route path='/profile' element={<LazyLoadingWrapper Component={Profile} />} />
        <Route path='/search' element={<LazyLoadingWrapper Component={SearchPerson} />} />
      </Routes>
    </div>
  );
}

export default App;
