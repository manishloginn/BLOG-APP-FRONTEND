import { Component, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import Navbar from './Navbar/Navbar';
import Homepage from './Homepage/Homepage';
import Profile from './Profile/Profile';



const LazyLoadingWrapper = ({ Component }) => {

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Component />
    </Suspense>
  )
}

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
      <Route path='/' element={<LazyLoadingWrapper Component={Homepage} />} />
        <Route path='/Login' element={<LazyLoadingWrapper Component={LoginPage} />} />
        <Route path='/profile' element={<LazyLoadingWrapper Component={Profile} />} />
      </Routes>
    </div>
  );
}

export default App;
