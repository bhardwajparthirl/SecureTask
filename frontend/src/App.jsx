import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import { AuthProvider } from "./context/AuthContext";

function App() {

    return (
        <BrowserRouter>

            <AuthProvider>

                <Routes>

                    {/* PUBLIC ROUTES */}

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />


                    {/* PROTECTED ROUTES */}

                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/tasks"
                            element={<Tasks />}
                        />

                        <Route
                            path="/Profile"
                            element={<Profile />}
                        />

                    </Route>


                    {/* DEFAULT ROUTE */}

                    <Route
                        path="/"
                        element={
                            <Navigate to="/dashboard" />
                        }
                    />

                </Routes>

            </AuthProvider>

        </BrowserRouter>
    );
}

export default App;