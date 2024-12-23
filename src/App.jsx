import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Screen2 from './components/Screen2';
import Screen3 from './components/Screen3';
import Screen4 from './components/Screen4';
import Screen5 from './components/Screen5';
import Screen6 from './components/Screen6';
import Screen7 from './components/Screen7';
import Screen8 from './components/Screen8';
import Search from './components/Search';

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar/>
      {/* <Home />
      <Screen2/>
      <Screen3/>
      <Screen4/>
      <Screen5/>
      <Screen6/>
      <Screen7/>
      <Screen8/> */}
      <Search/>
      <Footer/>
    </div>
  );
}

export default App;
