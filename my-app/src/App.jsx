import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import ChildPage from "./pages/ChildPage";
import UserPage from "../pages/UserPage";
import FinacialPage from "./pages/FinancialPage";
import ConfigPage from "./pages/ConfigPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashBoardPage />
          </PrivateRoute>
        } />
        <Route path="/criancas" element={
          <PrivateRoute>
            <ChildPage />
          </PrivateRoute>
        } />
        <Route path="/usuarios" element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        } />
        <Route path="/financeiro" element={
          <PrivateRoute>
            <FinacialPage />
          </PrivateRoute>
        } />
        <Route path="/configuracoes" element={
          <PrivateRoute>
            <ConfigPage />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;