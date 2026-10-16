import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoWeHelp from "./components/WhoWeHelp";
import Services from "./components/Services";
import About from "./components/About";
import Process from "./components/Process";
import WhyUs from "./components/WhyUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Hero />
        <WhoWeHelp />
        <Services />
        <About />
        <Process />
        <WhyUs />
        <Contact />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
