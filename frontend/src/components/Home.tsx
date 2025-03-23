import { Earth, Heart, ScanFace } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { user } = useAuth();

  return (
    <section
      id='home-container'
      className='flex flex-wrap *:w-78 gap-6 justify-center pt-20 *:bg-blue-300 *:py-4 *:px-6 *:hover:cursor-pointer *:dark:bg-indigo-400 *:rounded-sm *:flex *:gap-8 *:items-center
      custom-hover-translate-y *:transition-all *:font-semibold **:[svg]:w-fit'
    >
      <Link to='/countries'>
        <Earth />
        <span>Explore the countries of the world</span>
      </Link>
      {user ? (
        <Link to='/favorites'>
          <Heart />
          <span>View favorites</span>
        </Link>
      ) : (
        <Link to='/login'>
          <ScanFace />
          <span>Log in to add favorites</span>
        </Link>
      )}
    </section>
  );
};
