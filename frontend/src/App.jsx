import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Artworks from "./pages/Artworks";
import Category from "./pages/Category";
import Artists from "./pages/Artists";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
