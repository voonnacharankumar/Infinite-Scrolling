import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './header';
import Home from './pages/Home';
import Footer from './footer';
function App() {
  return (
    <div >
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
