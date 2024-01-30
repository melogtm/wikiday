import ReactDOM from 'react-dom/client';
import HomePage from './pages/home/Home';
import AboutPage from './pages/about/About';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage /> 
  }, 
  {
    path: "/about", 
    element: <AboutPage /> 
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} /> 
);
