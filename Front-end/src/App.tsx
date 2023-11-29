import Root from "./pages/Root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/signUp/SignUp";
import PageNotFound from "./pages/not-found/NotFound";
import Admin from "./pages/dashboard/admin";
import { ThemeTogglerProvider } from "./pages/ThemeTogglerProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="admin" element={<Admin />} />

      {/* Set default routing as log in page*/}
      <Route path="/" element={<Login />} />
      
      {/* 404 page - render this when no other routes match */}
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <ThemeTogglerProvider>
      <RouterProvider router={router}></RouterProvider>
      {/* <RouterProvider router={router} /> */}
    </ThemeTogglerProvider>
  )
}

export default App
