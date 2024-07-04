import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Artworks from "./pages/Artworks";
import Category from "./pages/Category";
import Artists from "./pages/Artists";
import AppLayout from "./pages/AppLayout";
import Error from "./ui/Error";
import Sell from "./pages/Sell";
import ArtworkOverview from "./pages/ArtworkOverview";
import ArtistsArtworks from "./pages/ArtistsArtworks";
import UploadArtwork from "./pages/UploadArtwork";
import ArtistsAccount from "./pages/ArtistsAccount";
import UserArtworks from "./pages/UserArtworks";
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
        path: "/user/:id/:list",
        element: <UserArtworks />,
      },
      {
        path: "/accounts/:feature",
        element: <UserAccount />,
      },
      {
        path: "/artists/accounts/:feature",
        element: <ArtistsAccount />,
      },
      {
        path: "/artist/:artistId/artworks",
        element: <ArtistsArtworks />,
      },
      {
        path: "/artworks/upload",
        element: <UploadArtwork />,
      },
      {
        path: "/artist/:artistId/artworks/:artworkId",
        element: <ArtworkOverview />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
