import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TestData } from './components/TestData';
import { AuthProvider } from './context/AuthContext';
import { Login } from './components/Auth/Login';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { ProtectedTestData } from './components/Auth/ProtectedTestData';
import { Navigation } from './components/Navigation';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <main>
                    <Navigation />

                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/test' element={<TestData />} />
                        <Route
                            path='/protected'
                            element={
                                <ProtectedRoute>
                                    <ProtectedTestData />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
