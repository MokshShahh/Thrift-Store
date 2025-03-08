import "@radix-ui/themes/styles.css";
import { Theme, Flex } from "@radix-ui/themes";
import NavBar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";  
import Cart from "./pages/cart.jsx"
import More from "./pages/more.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [currentProduct, setcurrentProduct] = useState({});
    return (
        <Router>
            <Theme accentColor="cyan" grayColor="sand" radius="large" scaling="100%" appearance="dark">
                <Flex direction="column">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home cart={cart} setCart={setCart} setcurrentProduct={setcurrentProduct} />} />
                        <Route path="/cart" element={<Cart cart={cart}/>} />
                        <Route path="/more" element={<More currentProduct={currentProduct}/>} />
                    </Routes>
                </Flex>
            </Theme>
        </Router>
    );
}

export default App;
