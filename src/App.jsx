import Navbar from './components/Navbar';
import Nebula from "./components/Nebula";
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        background: "#1a0b2e",
      }}
    >
      <Nebula
        color1="#5efff4"
        color2="#763b65"
        color3="#1a0b2e"
        speed={1}
      />


      <div
        className="relative z-10 min-h-screen flex flex-col items-center px-5 pt-44 pb-36 box-border"
      >
        <div className="relative w-full max-w-[1600px] flex flex-col gap-2">
          <Navbar />
          <Main />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;