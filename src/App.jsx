import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <NavMain />
      <NavBar></NavBar>

      <Routes>
        {/* LoggedOut routes */}
        <Route element={<LoggedOut />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/artist" element={<OneArtist />} />
        </Route>

        {/* LoggedIn routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/creations" element={<NavBar />}>
            <Route index element={<CreationsList />} />
            {/* <Route path={`/${object.categorie}`} element={<OneCreation />} /> */}
            {/* <Route path="/:id" element={<OneCreation />} /> */}
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
