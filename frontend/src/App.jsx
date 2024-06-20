import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Artworks from "./pages/Artworks";
import Category from "./pages/Category";
import Artists from "./pages/Artists";
import AppLayout from "./pages/AppLayout";
import Error from "./ui/Error";
import Sell from "./pages/Sell";
import UserProfile from "./pages/UserProfile";
import UserAccount from "./pages/UserAccount";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/artworks",
        element: <Artworks />,
      },
      {
        path: "/paintings",
        element: <Category />,
      },
      {
        path: "/artists",
        element: <Artists />,
      },
      {
        path: "/selling",
        element: <Sell />,
      },
      {
        path: "/user/:id",
        element: <UserProfile />,
      },
      {
        path: "/accounts/:feature",
        element: <UserAccount />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
