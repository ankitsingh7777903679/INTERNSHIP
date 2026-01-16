
import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, RouterProvider, Outlet, Navigate } from 'react-router-dom'
import Dimond from './Dimond'
import AddDimond from './components/AddDimond'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DiamondListTable from './components/DiamondListTable'
import Login from './components/Login'
import SignUp from './components/SignUp'
import UserListTable from './components/UserListTable'
import { checkSession } from './api/authServer'
import Home from './components/Home'

const DashboardLayout = () => {
  const token = localStorage.getItem("token");

  // On refresh, validate token version; interceptor will redirect on 401.
  useEffect(() => {
    if (!token) return;
    checkSession()
      .then((res) => {
        if (res?.user) {
          localStorage.setItem("user", JSON.stringify(res.user));
        }
      })
      .catch(() => {
        // 401/expired handled by axios interceptor (redirect to login)
      });
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

function App() {

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("User:", user);
  const userRole = user?.role || ''
  const userPermissions = user?.permissions || [];
  const hasStoneGroupEditPermission = userPermissions.includes('stoneGroupEdit') && (userRole === 'user') || (userRole === 'admin');
  const hasDiamondWritePermission = userPermissions.includes('Diamond_write') && (userRole === 'user') || (userRole === 'admin');
  const hasDiamondDiamond_readPermission = userPermissions.includes('Diamond_read') && (userRole === 'user') || (userRole === 'admin');
    const hasDiamondstoneGroup_readPermission = userPermissions.includes('stoneGroup_read') && (userRole === 'user') || (userRole === 'admin');


  return (
    <Router>

      {/* <Header /> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* --- AUTH ROUTES (No Header) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* --- DASHBOARD ROUTES (With Header) --- */}
        {/* All routes inside this wrapper will share the DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route path="/"  element={<Home />} />
          {/* {
            console.log(hasDiamondstoneGroup_readPermission)
          } */}
          {hasDiamondstoneGroup_readPermission ? (
          <Route path="/stoneGroup" element={<Dimond />} />
          ) : null}
          {/* {hasDiamondWritePermission && ( */}
          {hasDiamondWritePermission ? (
          <Route path="/add-dimond" element={<AddDimond />} />
          ) : null}
          {/* )} */}

          {hasStoneGroupEditPermission ? (
            <Route path="/user_list" element={<UserListTable />} />
          ) : null}



          {/* 1. Route for Adding New Diamond */}
          <Route path="/add-diamond" element={<AddDimond />} />

          {/* 2. Route for Editing (Accepts ID) */}
          <Route path="/add-diamond/:id" element={<AddDimond />} />

          {/* 3. Route for Viewing the List */}
          <Route path="/diamond-list" element={<DiamondListTable />} />
        </Route>

      </Routes>
    </Router>
    // <Routes>
    //   <Route path="/" element={<Dimond />} />
    //   <Route path="/login" element={<Login />} />
    // <Route path="/signup" element={<SignUp />} />
    //   <Route path="/stoneGroup" element={<Dimond />} />
    //   <Route path="/dimond-price" element={<AddDimond />} />

    // {/* 1. Route for Adding New Diamond */}
    // <Route path="/add-diamond" element={<AddDimond />} />

    // {/* 2. Route for Editing (Accepts ID) */}
    // <Route path="/add-diamond/:id" element={<AddDimond />} />

    // {/* 3. Route for Viewing the List */}
    // <Route path="/diamond-list" element={<DiamondListTable />} />
    // </Routes>
    // </Router>
  )
}

export default App
