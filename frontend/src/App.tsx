import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "wrappers/AuthContext/AuthContext";

import ApiTestView from "views/ApiTestView/ApiTestView";

import Wrapper from "wrappers/Wrapper/Wrapper";
import Login from "views/Login/Login";
import Register from "views/Register/Register";
import Home from "views/Home/Home";

import Profile from "views/Profile/Profile";
import Account from "views/Account/Account";
import Library from "views/Library/Library";

import Search from "views/Search/Search";

import GamesList from "views/Games/GamesList/GamesList";
import Game from "views/Games/Game/Game";

import MoviesList from "views/Movies/MoviesList/MoviesList";
import Movie from "views/Movies/Movie/Movie";

import ShowsList from "views/Shows/ShowsList/ShowsList";
import Show from "views/Shows/Show/Show";

import SongsList from "views/Music/SongsList/SongsList";
import Song from "views/Music/Song/Song";

import useScrollManager from "./utils/useScrollManager";

const ScrollManager: React.FC = () => {
  useScrollManager();
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollManager />
        <Wrapper>
          <Routes>
            {/* <Route path="/test" element={<ApiTestView />} /> */}

            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/library" element={<Library />} />
            <Route path="/account" element={<Account />} />
            <Route path="/search" element={<Search />} />
            <Route path="/games" element={<GamesList />} />
            <Route path="/games/:slug" element={<Game />} />
            <Route path="/movies" element={<MoviesList />} />
            <Route path="/movies/:slug" element={<Movie />} />
            <Route path="/shows" element={<ShowsList />} />
            <Route path="/shows/:slug" element={<Show />} />
            <Route path="/songs" element={<SongsList />} />
            <Route path="/songs/:slug" element={<Song />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Wrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
