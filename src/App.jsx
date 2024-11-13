import LoginPage from "./pages/login/loginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./utils/contexts/authProvider";
import HomePage from "./pages/homePage";
import NotFoundPage from "./pages/error/notFoundPage";
import ErrorPage from "./pages/error/errorPage";
import PlayerLayout from "./components/layouts/playerLayout";
import OwnerLayout from "./components/layouts/ownerLayout";
import BookingPage from "./pages/player/book-field/bookingPage";
import SignUpPage from "./pages/register/signUpPage";
import ProtectedRoute from "./components/hoc/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/sign-up"
            element={<SignUpPage />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/player/"
            element={<PlayerLayout />}
            errorElement={<ErrorPage />}
          >
            <Route
              path="/player/book-field"
              element={
                <ProtectedRoute requiredRole="user">
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route path="/player/activities/pending" element={<HomePage />} />
            <Route path="/player/activities/ongoing" element={<HomePage />} />
            <Route path="/player/activities/done" element={<HomePage />} />
            <Route path="/player/teams" element={<HomePage />} />
            <Route path="/player/payments" element={<HomePage />} />
            <Route path="/player/billings" element={<HomePage />} />
          </Route>
          <Route
            path="/owner/"
            element={
              // <ProtectedRoute requiredRole="owner">
              <OwnerLayout />
              // </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          >
            <Route path="/owner/home" element={<HomePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
