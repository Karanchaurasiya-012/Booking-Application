import { useState } from "react";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return user ? (
    <BookingPage />
  ) : (
    <LoginPage onLogin={(u) => setUser(u)} />
  );
}

export default App;
