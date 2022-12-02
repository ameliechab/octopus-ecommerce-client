import { Routes, Route } from "react-router-dom";
import apiHandler from "./api/apiHandler";
import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar/NavBar";
import HomePage from "./pages/Home/HomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProfileOrders from "./pages/ProfileOrders/ProfileOrders";
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
  const [searchCreationString, setSearchCreationString] = useState("");

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
    return <div className="middle-div-min">Loading...</div>;
  }

  if (!artists.length) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div className="App">
      <NavBar></NavBar>

      <Routes>
        {/* ROUTES FOR ALL*/}
        <Route path="/" element={<HomePage artists={artists} />} />
        {/* All artists */}
        <Route path="/artists" element={<ArtistsList artists={artists} />} />
        {/* All creations */}
        <Route
          path="/creations"
          element={
            <CreationsList
              creations={creations}
              setSearchCreationString={setSearchCreationString}
              searchCreationString={searchCreationString}
            />
          }
        />
        {/* One artist */}
        <Route
          path="/artist/:id"
          element={<OneArtist artists={artists} creations={creations} />}
        />
        {/* NotFound */}
        <Route path="*" element={<NotFound />} />

        {/* ROUTES FOR LOGGEDIN */}
        <Route element={<PrivateRoute />}>
          {/* Profile */}
          <Route path="/profile" element={<Profile creations={creations} />} />
          <Route
            path="/profile/orders"
            element={<ProfileOrders creations={creations} />}
          />
          <Route
            path="/profile/artists/createartist"
            element={<FormCreateArtist />}
          />
          <Route
            path="/profile/artists/createobject"
            element={<FormCreateObject />}
          />
          {/* Orders */}
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
          {/* Creations */}
          <Route path="/creations" element={<CreationsList />} />
          <Route
            path="/creations/:id"
            element={<OneCreation artists={artists} creations={creations} />}
          />
          {/* Artists */}
          <Route
            path="/artist/:id"
            element={<OneArtist artists={artists} creations={creations} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* ROUTES FOR LOGGEDOUT */}
        <Route element={<LoggedOut />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
