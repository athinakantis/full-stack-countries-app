import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TestData } from './components/TestData';
import { AuthProvider } from './context/AuthContext';
import { Login } from './components/Auth/Login';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Navigation } from './components/Navigation';
import { AuthRedirect } from './components/Auth/AuthRedirect';
import { CountriesList } from './components/CountriesList';
import { SingleCountry } from './components/CountryDetail';
import { SearchProvider } from './context/SearchContext';
import Favorites from './components/Favorite';
import { Spinner } from './components/Spinner';
import { Home } from './components/Home';

function App() {
    return (
        <AuthProvider>
            <SearchProvider>
                <BrowserRouter>
                    <Navigation />
                    <main className='bg-blue-100 dark:bg-slate-900 text-slate-800'>
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
                            <Route path='/' element={<Home />} />
                            <Route path='/countries' element={<CountriesList />} />
                            <Route path='/countries/:name' element={<SingleCountry />} />,
                            <Route
                                path='/favorites'
                                element={
                                    <ProtectedRoute>
                                        <Favorites />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                </BrowserRouter>
            </SearchProvider>
        </AuthProvider>
    );
}

export default App;
