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

import GamesList from "views/Games/GamesList/GamesList";
import Game from "views/Games/Game/Game";

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
            <Route path="/test" element={<ApiTestView />} />

            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/library" element={<Library />} />
            <Route path="/account" element={<Account />} />
            <Route path="/games" element={<GamesList />} />
            <Route path="/games/:slug" element={<Game />} />
            <Route path="/movies" />
            <Route path="/shows" />
            <Route path="/music" />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Wrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
