import { useAuth } from '../../context/AuthContext';

export const ProtectedTestData = () => {
    const { user } = useAuth();
    console.log(user);
    return <p>Logged in as {user?.email} :)</p>;
};
