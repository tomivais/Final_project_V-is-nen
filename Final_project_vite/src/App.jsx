import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Table_view from './Table_view'; // Oletetaan, että Table_view on samassa hakemistossa.
import { ToastContainer } from 'react-bootstrap'

function App() {

  return (
    <>
      <div className='App'>
        <ToastContainer theme='colored'></ToastContainer>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/table_view' element={<Table_view/>}></Route>

       </Routes>

       </BrowserRouter>
      </div>
     
      
    </>
  )
}

export default App
