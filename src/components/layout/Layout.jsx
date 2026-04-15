import Navbar from './Navbar';
import Footer from './Footer';
import TopBar from './TopBar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
