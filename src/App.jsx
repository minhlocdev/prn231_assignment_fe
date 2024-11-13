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
import PaymentPage from "./pages/payment/paymentPage";
import PaymentSuccess from "./pages/payment/paymentSuccess";
import PaymentCancelled from "./pages/payment/paymentCancelled";
import PendingPage from "./pages/player/bookings/pendingPage";
import OnGoingPage from "./pages/player/bookings/onGoingPage";
import DonePage from "./pages/player/bookings/donePage";
import ProfilePage from "./pages/player/profile/profilePage";
import BookingDetail from "./pages/player/bookings/bookingDetail";
import CancelledPage from "./pages/player/bookings/cancelPage";

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

            <Route
              path="/player/payment/:bookingId"
              element={<PaymentPage />}
            />
            <Route
              path="/player/bookings/:bookingId"
              element={<BookingDetail />}
            />
            <Route
              path="/player/payment/success"
              element={<PaymentSuccess />}
            />
            <Route
              path="/player/payment/cancelled"
              element={<PaymentCancelled />}
            />
            <Route
              path="/player/activities/pending"
              element={<PendingPage />}
            />
            <Route
              path="/player/activities/ongoing"
              element={<OnGoingPage />}
            />
            <Route path="/player/activities/done" element={<DonePage />} />
            <Route
              path="/player/activities/cancelled"
              element={<CancelledPage />}
            />
            <Route path="/player/teams" element={<HomePage />} />
            <Route path="/player/payments" element={<HomePage />} />
            <Route path="/player/billings" element={<HomePage />} />
            <Route path="/player/profile" element={<ProfilePage />} />
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
