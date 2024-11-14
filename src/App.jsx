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
import { ManageCourtPage } from "./pages/owner/courts/manageCourtPage";
import CourtDetail from "./pages/owner/courts/courtDetail";
import CreateCourt from "./pages/owner/courts/createCourt";
import EditCourt from "./pages/owner/courts/editCourt";

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
              path="/player/book-field/:bookingId"
              element={
                <ProtectedRoute requiredRole="user">
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/player/payment/:bookingId"
              element={
                <ProtectedRoute requiredRole="user">
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/player/bookings/:bookingId"
              element={
                <ProtectedRoute requiredRole="user">
                  <BookingDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/player/payment/success"
              element={
                <ProtectedRoute requiredRole="user">
                  <PaymentSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/player/payment/cancelled"
              element={
                <ProtectedRoute requiredRole="user">
                  <PaymentCancelled />
                </ProtectedRoute>
              }
            />
            <Route
              path="/player/activities/pending"
              element={
                <ProtectedRoute requiredRole="user">
                  <PendingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/player/activities/ongoing"
              element={
                <ProtectedRoute requiredRole="user">
                  <OnGoingPage />
                </ProtectedRoute>
              }
            />
            <Route path="/player/activities/done" element={<DonePage />} />
            <Route
              path="/player/activities/cancelled"
              element={
                <ProtectedRoute requiredRole="user">
                  <CancelledPage />
                </ProtectedRoute>
              }
            />
            <Route path="/player/teams" element={<HomePage />} />
            <Route path="/player/payments" element={<HomePage />} />
            <Route path="/player/billings" element={<HomePage />} />
            <Route
              path="/player/profile"
              element={
                <ProtectedRoute requiredRole="user">
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/owner/"
            element={<OwnerLayout />}
            errorElement={<ErrorPage />}
          >
            <Route path="/owner/courts" element={<ManageCourtPage />} />
            <Route path="/owner/create-court" element={<CreateCourt />} />
            <Route path="/owner/courts/edit/:courtId" element={<EditCourt />} />
            <Route path="/owner/courts/:courtId" element={<CourtDetail />} />
            <Route path="/owner/bookings" element={<HomePage />} />
            <Route path="/owner/payments" element={<HomePage />} />
            <Route path="/owner/billings" element={<HomePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
