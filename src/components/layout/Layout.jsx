import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">İçeriğe geç</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow min-w-0 overflow-x-clip">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
