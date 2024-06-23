import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index.jsx"
import Login from "./pages/login/index.jsx";
import Register from "./pages/register";
import ProtectedPage from "./components/ProtectedPage.jsx";
import Profile from "./pages/profile/index.jsx";
import Spinner from "./components/Spinner.jsx";
import { useSelector } from "react-redux";
import Admin from "./pages/admin/index.jsx";
import MovieForm from "./pages/admin/movies/MovieForm.jsx";
import MovieInfo from "./pages/MovieInfo/index.jsx";
import ArtistInfo from "./pages/Artists/index.jsx";
function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedPage>
                <MovieInfo />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin/movies/add"
            element={
              <ProtectedPage>
                <MovieForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin/movies/edit/:id"
            element={
              <ProtectedPage>
                <MovieForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/artist/:id"
            element={
              <ProtectedPage>
                <ArtistInfo />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
