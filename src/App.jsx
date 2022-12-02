import { Routes, Route } from "react-router-dom";
import apiHandler from "./api/apiHandler";
import React, { useEffect, useState } from "react";
import NavSearch from "./components/Nav/NavSearch";
import NavBar from "./components/Navbar/NavBar";
import HomePage from "./pages/Home/HomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute";
import LoggedOut from "./components/LoggedOut/LoggedOut";
import Cart from "./pages/Cart/Cart";
import ArtistsList from "./pages/ArtistsList/ArtistsList";
import OneArtist from "./pages/OneArtist/OneArtist";
import CreationsList from "./pages/CreationsList/CreationsList";
import OneCreation from "./pages/OneCreation/OneCreation";
import NotFound from "./pages/NotFound/NotFound";
import OrderValidation from "./pages/OrderValidation/OrderValidation";
import Footer from "./components/Footer/Footer";
import FormCreateArtist from "./components/Forms/FormCreateArtist";
import FormCreateObject from "./components/Forms/FormCreateObject";

function App() {
  const [creations, setCreations] = useState([]);
  const [artists, setArtists] = useState([]);
  const [orderCart, setOrderCart] = useState(null);

  useEffect(() => {
    apiHandler.getAllCreations().then((res) => {
      console.log(res);
      setCreations(res);
    });

    apiHandler.getAllArtists().then((data) => {
      console.log(data);
      setArtists(data);
    });
  }, []);

  if (!creations.length) {
    return <div className="loading">Loading...</div>;
  }

  if (!artists.length) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <NavSearch></NavSearch>

      <Routes>
        {/* Routes for all*/}
        <Route path="/" element={<HomePage artists={artists} />} />
        <Route
          path="/artist/:id"
          element={<OneArtist artists={artists} creations={creations} />}
        />
        <Route
          path="/creations"
          element={<CreationsList creations={creations} />}
        />
        <Route path="/artists" element={<ArtistsList artists={artists} />} />
        <Route path="*" element={<NotFound />} />

        {/* LoggedOut routes */}
        <Route element={<LoggedOut />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* LoggedIn routes */}

        <Route path="/profile" element={<Profile creations={creations} />} />
        <Route
          path="/cart"
          element={
            <Cart
              creations={creations}
              orderCart={orderCart}
              setOrderCart={setOrderCart}
            />
          }
        />
        <Route path="/order/validation" element={<OrderValidation />} />

        {/* <Route path="/creations"> */}
        <Route path="/creation" element={<CreationsList />} />
        <Route
          path="/creations/:id"
          element={<OneCreation creations={creations} />}
        />
        <Route
          path="/artist/:id"
          element={<OneArtist artists={artists} creations={creations} />}
        />
        <Route path="/artists/create" element={<FormCreateArtist />} />
        <Route path="/creations/create" element={<FormCreateObject />} />

        {/* <Route path={`/${object.categorie}`} element={<OneCreation />} /> */}
        {/* </Route> */}
        {/* </Route> */}

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
