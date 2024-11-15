import { Route, Routes } from "react-router-dom";
import Header from "./components/Navbar/Header";
import VideoList from "./components/Video/VideoList";
import Video from "./components/Video/Video";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

// eslint-disable-next-line react/prop-types
const Routing = ({ isLoggedIn, setLoggedIn }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <Routes>
          <Route
            path="/video"
            element={<VideoList setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/video/:id"
            element={<Video setLoggedIn={setLoggedIn} />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <SignIn isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }
          />
          <Route
            path="/signup"
            element={<SignUp setLoggedIn={setLoggedIn} />}
          />
        </Routes>
      )}
    </div>
  );
};

export default Routing;
