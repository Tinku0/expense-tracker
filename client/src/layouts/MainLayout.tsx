import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet, useNavigate } from 'react-router-dom';

interface MainLayoutProps {
}

const MainLayout: React.FC<MainLayoutProps> = () => {

  const userDetails = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || '');

  const user = {
    name: userDetails && userDetails.name || '',
    email: userDetails && userDetails.email || ''
  }

  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/login')
    localStorage.clear()
  }

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <main className='m-5 md:m-10'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;