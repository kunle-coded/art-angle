import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Artworks from "./pages/Artworks";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: "",
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/artworks",
        element: <Artworks />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
