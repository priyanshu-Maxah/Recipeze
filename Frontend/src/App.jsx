import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Intro from './pages/Intro';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AllRecipes from './pages/AllRecipes';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import FavoriteRecipesPage from './pages/FavoriteRecipesPage';

const App = () => (
  <IonApp>
    <BrowserRouter>
      <IonRouterOutlet>
        <Routes>
          <Route path="/" element={<Navigate to="/Intro" replace />} />
          <Route path="/Intro/*" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={ <ProtectedRoute> <Home /> </ProtectedRoute> }/>
          <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } />
          <Route path="/all-recipes" element={<ProtectedRoute><AllRecipes /></ProtectedRoute>} />
          <Route path="/favorite" element={<ProtectedRoute><FavoriteRecipesPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </IonRouterOutlet>
    </BrowserRouter>
  </IonApp>
);

export default App;