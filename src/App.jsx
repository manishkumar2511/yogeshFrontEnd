import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AppLayout from './component/AppLayout'
import Shop from './pages/Shop'
import ContactUs from './pages/ContactUs'
import Dashboard from './pages/Dashboard'
import Login from "./pages/Login"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />

        {/*  <Route path="/*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App
