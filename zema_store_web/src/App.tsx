import * as React from "react";
import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import SubscriptionsPage from "./pages/subscriptions";
import UsersPage from "./pages/users";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./common/Route/ProtectedRoute";
import SongsIndexPage from "./pages/songs";
import SongsPage from "./pages/songs/songs";
import SongDetail from "./pages/songs/song_detail";

function App() {
  return (
    <div className="App">
      <ToastContainer
        progressClassName="w-10 h-10"
        bodyClassName="w-10 h-10"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route
          path="/users"
          element={
            <ProtectedRoute redirectPath="/users" children={<UsersPage />} />
          }
        />
        <Route
          path="artists"
          element={
            <ProtectedRoute
              redirectPath="/artists"
              children={<ArtistsIndexPage />}
            />
          }
        >
          <Route index element={<ArtistsPage />} />
          <Route path=":id" element={<SongsIndexPage />}>
            <Route index element={<AlbumsPage from="artists" />} />
            <Route path="songs" element={<SongsPage from="artists" />} />
            <Route path="songs/:id" element={<SongDetail from="artists" />} />
          </Route>
        </Route>
        <Route
          path="albums"
          element={
            <ProtectedRoute
              redirectPath="/albums"
              children={<AlbumsIndexPage />}
            />
          }
        >
          <Route index element={<AlbumsPage />} />

          <Route path=":id" element={<SongsIndexPage />}>
            <Route index element={<SongsPage from="albums" />} />
            <Route path=":id" element={<SongDetail from="albums" />} />
          </Route>
        </Route>

        <Route
          path="/events"
          element={
            <ProtectedRoute redirectPath="/events" children={<EventsPage />} />
          }
        />
        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute
              redirectPath="/subscriptions"
              children={<SubscriptionsPage />}
            ></ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute
              redirectPath="/settings"
              children={<SettingsPage />}
            />
          }
        />
        <Route
          path="/me"
          element={
            <ProtectedRoute redirectPath="/me" children={<UserProfilePage />} />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              redirectPath="/dashboard"
              children={<DashboardPage />}
            />
          }
        />

        <Route path="/signin" element={<SigninPage />} />

        <Route path="/" element={<Navigate to={"dashboard"} />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
