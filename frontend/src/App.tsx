import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/layout/header'
import HomePage from './pages/homePage'
import PartAPage from './pages/partAPage'
import PartBPage from './pages/partBPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { socket } from './config/socket';



function App() {
  console.log(process.env.REACT_APP_BACKEND_URL)
  useEffect(() => {
    socket.on('connect', () => { });

    return () => {
      socket.off('connect');
    }
  }, []);

  const MainLayout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    )
  }

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/a' element={<PartAPage />} />
          <Route path='/b' element={<PartBPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
