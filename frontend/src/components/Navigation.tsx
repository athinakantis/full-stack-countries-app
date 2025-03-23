import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ToolBar } from './ToolBar';
import { useTheme } from '../theme/useTheme';
import { Moon, Sun } from 'lucide-react';

export const Navigation = () => {
    const { user, signOut } = useAuth();
    const location = useLocation();
    const { currentTheme, handleThemeSwitch } = useTheme()

    return (
        <header className='w-full bg-blue-200 px-4 py-1 flex justify-center align-center dark:bg-slate-800'>
            <div className="header-content max-w-screen-2xl w-11/12 flex justify-between flex-wrap md:max-lg:text-sm">
                <nav>
                    <ul className='*:px-3 [&>li:has(a.active)]:dark:bg-indigo-700 [&>li:has(a.active)]:bg-blue-300 *:py-1 flex p-2 gap-4 *:text-sm *:hover:bg-blue-300 **:hover:cursor-pointer  *:rounded-full *:transition-colors *:dark:bg-slate-800 *:py-1 *:dark:hover:bg-indigo-700 *:dark:text-slate-200'>
                        <li><NavLink to='/'>Home</NavLink></li>
                        {user && <li><NavLink to='/favorites'>Favorites</NavLink></li>}
                        <li><NavLink to='/countries'>Countries</NavLink></li>

                        {user ? (
                            <li><button onClick={signOut}>Sign out</button></li>)
                            : (<li><NavLink to='/login'>Log in</NavLink></li>)}
                    </ul>
                </nav>

                <div className='flex items-center'>
                    {location.pathname === '/countries' && <ToolBar />}
                    <button onClick={handleThemeSwitch} id='themeToggle' className='hover:bg-blue-300 dark:hover:bg-indigo-700 p-1 h-fit rounded-full hover:cursor-pointer'>
                        {currentTheme === 'light' ?
                            <Sun color='#1d293d' />
                            : <Moon size='20' color='#e2e8f0' />}
                    </button>
                </div>
            </div>
        </header>
    );
};
