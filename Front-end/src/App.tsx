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
import BooksEdit from "./pages/dashboard/BooksEdit";
import BooksAdd from "./pages/dashboard/BooksAdd";
import Profile from "./pages/profile/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="home" element={<Home />}></Route>
      
      <Route path="admin" element={<Admin />} >
        <Route path="edit" element={<BooksEdit />} />
        <Route path="add" element={<BooksAdd />} />
      </Route>

      <Route path="profile" element={<Profile />} />

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
