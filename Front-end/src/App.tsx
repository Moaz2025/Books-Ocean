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
import BookEdit from "./pages/dashboard/BooksEdit";
import BooksAdd from "./pages/dashboard/BooksAdd";
import Profile from "./pages/profile/Profile";
import About from "./pages/about/About";
import HomeDefault from "./pages/home/HomeDefault";
import DefaultAdmin from "./pages/dashboard/DefaultAdmin";
import BookUserPage from "./pages/home/BookUserPage";
import Promotion from "./pages/dashboard/Promotion";
import Cart from "./pages/cart/Cart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />

      {/* Home Route */}
      <Route path="home" element={<Home />}>
        <Route index element={<HomeDefault />} />
        <Route path=":id" element={<BookUserPage />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      {/* Admin Route */}
      <Route path="admin" element={<Admin />}>
        <Route index element={<DefaultAdmin />} />
        <Route path=":id" element={<BookEdit />} />
        <Route path="add" element={<BooksAdd />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<Profile />} />
        <Route path="promotion" element={<Promotion />} />
      </Route>

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
