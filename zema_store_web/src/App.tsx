import * as React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./pages/404";
import AlbumsIndexPage from "./pages/albums";
import AlbumsPage from "./pages/albums/albums";
import ArtistsIndexPage from "./pages/artists";
import ArtistsPage from "./pages/artists/artists";
import SigninPage from "./pages/auth/signin";
import DashboardPage from "./pages/dashboard";
import EventsPage from "./pages/events";
import UserProfilePage from "./pages/profile";
import SettingsPage from "./pages/settings";
import SongsPage from "./pages/songs";
import SubscriptionsPage from "./pages/subscriptions";
import UsersPage from "./pages/users";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="artists" element={<ArtistsIndexPage />}>
          <Route index element={<ArtistsPage />} />
          <Route path=":id" element={<SongsPage from="artists" />} />
        </Route>
        <Route path="albums" element={<AlbumsIndexPage />}>
          <Route index element={<AlbumsPage />} />
          <Route path=":id" element={<SongsPage from="albums" />} />
        </Route>
        <Route path="events" element={<EventsPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="me" element={<UserProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
