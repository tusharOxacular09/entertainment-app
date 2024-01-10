import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import NotFound from "./components/pages/NotFound";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import MoviePage from "./components/pages/MoviePage";
import TvSeriesPage from "./components/pages/TvSeriesePage";
import BookmarkPage from "./components/pages/BookmarkPage";
import RootPage from "./components/pages/RootPage";
import MovieDetailsPage from "./components/pages/MovieDetailsPage";

function App() {
  return (
    <div className="bg-[#10141E] h-screen overflow-y-scroll scrollbar-hide overflow-x-hidden">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="movie-details" element={<MovieDetailsPage />} />
        <Route path="root" element={<RootPage />}>
          <Route path="home" element={<HomePage />} />
          <Route path="movie" element={<MoviePage />} />
          <Route path="tv-series" element={<TvSeriesPage />} />
          <Route path="bookmarks" element={<BookmarkPage />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
