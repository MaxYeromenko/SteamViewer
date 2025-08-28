// Other libraries
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

// Components
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Games from "./pages/Games/Games";
import Inventory from "./pages/Inventory/Inventory";

// Contexts
import { UserProvider } from "./context/UserContext";

export default function App() {
    return (
        <UserProvider>
            <Router>
                <Header />
                <Main>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/home" replace />}
                        />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/games" element={<Games />} />
                        <Route path="/inventory" element={<Inventory />} />
                    </Routes>
                </Main>
                <Footer />
            </Router>
        </UserProvider>
    );
}
