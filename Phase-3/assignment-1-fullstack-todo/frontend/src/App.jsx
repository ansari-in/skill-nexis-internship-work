import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/todo"
                    element={
                        <ProtectedRoute>
                            <Todo />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;