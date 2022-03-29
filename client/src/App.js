import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";
import Symptoms from "./components/symptoms/Symptoms";
import Symptom from "./components/symptom/Symptom";
import Videos from "./components/videos/Videos";
import Video from "./components/video/Video";
import "./App.css";
import About from "./components/staticComponents/About";
import SuggestedVideos from "./components/videos/SuggestedVideos";
import TermsAndConditions from "./components/staticComponents/TermsAndConditions";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import ResetPassword from "./components/auth/ResetPassword";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password_reset" element={<ResetPassword />} />
            <Route path="/terms&conditions" element={<TermsAndConditions />} />
            <Route
              path="/symptoms"
              element={<PrivateRoute component={Symptoms} />}
            />
            <Route
              path="/symptoms/:id"
              element={<PrivateRoute component={Symptom} />}
            />
            <Route
              path="/videos"
              element={<PrivateRoute component={Videos} />}
            />
            <Route
              path="/videos/:id"
              element={<PrivateRoute component={Video} />}
            />
            <Route
              path="/suggested_videos"
              element={<PrivateRoute component={SuggestedVideos} />}
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
