import "@radix-ui/themes/styles.css";
import { Theme,Flex } from "@radix-ui/themes";
import MyApp from "./pages/navbar"
import Filters from "./pages/filters";
import Products from "./pages/products";
function App() {
    return (
      <>
        
        <Theme accentColor="cyan" grayColor="sand" radius="large" scaling="100%" appearance="dark">
        <Flex direction="column">
	        <MyApp />
          <Flex align="start">
          <Filters/>
          <Products/>
          </Flex>
        </Flex>
        </Theme>
      </>
    );
}

export default App
