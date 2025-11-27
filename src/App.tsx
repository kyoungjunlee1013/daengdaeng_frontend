// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header'; 
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ReviewPage from './pages/ReviewPage/ReviewPage';

function App() {
  return (
    <BrowserRouter>
    <div className="app-container">
      <Header />
      <main>
        <Routes>
         <Route path='/' element={<MainPage/>} />
         <Route path='/Login' element={<LoginPage/>}/>
         <Route path='/Signup' element={<SignupPage/>}/>
         <Route path='/Reivew' element={<ReviewPage/>}/>
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;