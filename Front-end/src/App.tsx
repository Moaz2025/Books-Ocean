// import Home from "./pages/home/Home";
// function App() {
//   return (
//     <Home />
//   );
// }
// import Home from "./pages/home/Home";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      {/* ... etc. */}
    </Route>
  )
);

const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      {/* <RouterProvider router={router} /> */}
    </div>
  )
}

export default App
