import "@radix-ui/themes/styles.css";
import { Theme,Flex } from "@radix-ui/themes";

import Filters from "../components/filters.jsx";
import Products from "../components/products.jsx";
function Home({cart,setCart,setcurrentProduct}) {
    
    return (
      <>
        
        <Theme accentColor="cyan" grayColor="sand" radius="large" scaling="100%" appearance="dark">
        <Flex direction="column">
	        
          <Flex align="start">
          <Filters/>
          <Products cart={cart} setCart={setCart} setcurrentProduct={setcurrentProduct}/>
          </Flex>
        </Flex>
        </Theme>
      </>
    );
}

export default Home
