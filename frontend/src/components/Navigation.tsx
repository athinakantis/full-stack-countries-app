import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navigation = () => {
    const { user, signOut } = useAuth();

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/test'>Test Data</NavLink>
                </li>

                {user ? (
                    <li>
                        <button onClick={signOut}>Sign out</button>
                    </li>
                ) : (
                    <li>
                        <NavLink to='/login'>Log in</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};
