import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Artworks from "./pages/Artworks";
import Category from "./pages/Category";
import Artists from "./pages/Artists";
import AppLayout from "./pages/AppLayout";
import Error from "./ui/Error";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import AccountArtists from "./pages/AccountArtists";
import UserCollections from "./pages/UserCollections";
import ArtworkUpload from "./pages/ArtworkUpload";
import ArtworksArtists from "./pages/ArtworksArtists";

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
        element: <Profile />,
      },
      {
        path: "/user/:id/:list",
        element: <UserCollections />,
      },
      {
        path: "/accounts/:feature",
        element: <Account />,
      },
      {
        path: "/artists/accounts/:feature",
        element: <AccountArtists />,
      },
      {
        path: "/user/artist/:artistId/artworks",
        element: <ArtworksArtists />,
      },
      {
        path: "/artworks/upload",
        element: <ArtworkUpload />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
