import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import UploadPicture from "./components/file_upload/UploadPicture"
import ViewImages from "./components/file_upload/ViewImages"
import { authenticate } from "./services/auth";

function App() {
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const data = await authenticate();
      if (!data.errors) {
        setUser(data);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setUser={setUser} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            user={user}
            setUser={setUser}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm user={user} setUser={setUser} />
        </Route>
        <ProtectedRoute path="/users" exact={true} user={user}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/upload" exact={true} user={user}>
          <UploadPicture/>
        </ProtectedRoute>
        <Route path="/images" exact={true}>
          <ViewImages />
        </Route>
        <ProtectedRoute path="/users/:userId" exact={true} user={user}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} user={user}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
