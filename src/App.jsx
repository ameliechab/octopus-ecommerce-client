import { Routes, Route } from "react-router-dom";
import apiHandler from "./api/apiHandler";
import React, { useEffect, useState } from "react";
import NavMain from "./components/Nav/NavMain";
import NavBar from "./components/Navbar/NavBar";
import HomePage from "./pages/Home/HomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute";
import LoggedOut from "./components/LoggedOut/LoggedOut";
import Cart from "./pages/Cart/Cart";
import OneArtist from "./pages/OneArtist/OneArtist";
import CreationsList from "./pages/CreationsList/CreationsList";
import OneCreation from "./pages/OneCreation/OneCreation";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";

function App() {
  const [creations, setCreations] = useState([]);
  const [artists, setArtists] = useState([]);

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

      <Routes>
        {/* <Route element={<PrivateRoute />}> */}

        <Route path="/" element={<HomePage artists={artists} />} />
        {/* LoggedOut routes */}
        <Route element={<LoggedOut />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* LoggedIn routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />

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
