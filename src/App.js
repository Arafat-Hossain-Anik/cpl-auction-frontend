import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import More from './Pages/More/More';
import AuthProvider from './context/AuthProvider';
import AddPlayers from './components/AddPlayersToDB/AddPlayers';
import DashBoardBody from './components/DashBoard/Body/DashBoardBody';
import Login from './Pages/Login/Login';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import MyBooking from './Pages/MyOrder/MyBooking';
import AdminRoute from './components/AdminRoute/AdminRoute';
import ManageOrder from './components/DashBoard/ManageOrder/ManageOrder';
import ManageProduct from './components/DashBoard/ManageProduct/ManageProduct';
import MakeAdmin from './components/DashBoard/MakeAdmin/MakeAdmin';
import AvailablePlayers from './components/DashBoard/AvailablePlayers/AvailablePlayers';
function App() {
  const [query, setQuery] = useState([]);
  return (
    <div className="">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />}>
            </Route>
            <Route path='/home' element={<Home />}>
            </Route>

            <Route path='/addplayer' element={<PrivateRoute>
              <AddPlayers />
            </PrivateRoute>}>
            </Route>

            <Route path='/dashboard' element={
              <PrivateRoute>
                <DashBoardBody />
              </PrivateRoute>}>

              <Route path="/dashboard" element={
                <div className="cover-body mb-0">
                  <div className="hero-image-2">
                    <div className="hero-text d-flex flex-column align-items-center">
                      <h1 className="cover-header">WELCOME TO</h1>
                      <h1 className="cover-header">CPL AUCTION DashBoard</h1>
                      <p className="fs-4 fs-md-5">Select Your Player and Make Team</p>
                    </div>
                  </div>
                </div>
              }>
              </Route>
              <Route path="/dashboard/myTeam" element={<MyBooking />}>
              </Route>
              <Route path="/dashboard/available-players" element={<AvailablePlayers query={query} />}>
              </Route>
              <Route path="/dashboard/addplayer" element={
                <AdminRoute>
                  <AddPlayers />
                </AdminRoute>}>
              </Route>

              <Route path="/dashboard/register" element={
                <AdminRoute>
                  <SignUpPage />
                </AdminRoute>}>
              </Route>

              <Route path={`/dashboard/allteams`} element={<AdminRoute>
                <ManageOrder />
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/players`} element={<AdminRoute>
                <ManageProduct setQuery={setQuery} />
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/makeAdmin`} element={<AdminRoute>
                <MakeAdmin />
              </AdminRoute>}>
              </Route>
            </Route>
            <Route path='/more/:id' element={<PrivateRoute>
              <More />
            </PrivateRoute>}>
            </Route>
            <Route path='/login' element={<Login />}>
            </Route>
            <Route path="*" element={<NotFound />}>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
