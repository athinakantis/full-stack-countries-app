import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TestData } from './components/TestData';
import { AuthProvider } from './context/AuthContext';
import { Login } from './components/Auth/Login';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Navigation } from './components/Navigation';
import { ProtectedTestData } from './components/Auth/ProtectedTestData';
import { AuthRedirect } from './components/Auth/AuthRedirect';
import { CountriesList } from './components/CountriesList';
import { SingleCountry } from './components/CountryDetail';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navigation />
                <main>
                    <Routes>
                        <Route
                            path='/login'
                            element={
                                <>
                                    <AuthRedirect />
                                    <Login />
                                </>
                            }
                        />
                        <Route path='/countries' element={<CountriesList />}/> 
                        <Route path='/countries/:name' element={<SingleCountry />}/>,
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
