import { useState } from 'react'
// import './App.css'
import Navbar from './components/Navbar';
import Nebula from "./components/Nebula";
import Main from './components/Main';
// import Savedpasswords from './components/Savedpasswords';
import Footer from './components/Footer';


function App() {

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#1a0b2e",
        }}
      >
        <Nebula
          color1="#5efff4"
          color2="#763b65"
          color3="#1a0b2e"
          speed={2}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "70px",
              fontWeight: "bold",
              letterSpacing: "4px",
            }}
          >
          </h1>
          <div className="relative flex flex-col gap-2">
            <Navbar />
            <Main />
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
