// App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import HomeDefault from './pages/home/HomeDefault';
import Login from './pages/Login/Login';
import SignUp from './pages/signUp/SignUp';
import PageNotFound from './pages/not-found/NotFound';
import Admin from './pages/dashboard/admin';
import { ThemeTogglerProvider } from './pages/ThemeTogglerProvider';
import BooksEdit from './pages/dashboard/BooksEdit';
import BooksAdd from './pages/dashboard/BooksAdd';
import Profile from './pages/profile/Profile';
import About from './pages/about/About';
import DefaultAdmin from './pages/dashboard/DefaultAdmin';

const App = () => {
  return (
    <ThemeTogglerProvider>
      <Router>
        <Routes>
          {/* Home Route */}
          <Route path="home" element={<Home />}>
            <Route index element={<HomeDefault selectedBook={null} />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin Route */}
          <Route path="admin" element={<Admin />}>
            <Route index element={<DefaultAdmin />} />
            <Route path="edit" element={<BooksEdit />} />
            <Route path="add" element={<BooksAdd />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Other Routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          {/* Set default routing as log in page */}
          <Route path="/" element={<Login />} />

          {/* 404 page - render this when no other routes match */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ThemeTogglerProvider>
  );
};

export default App;
