import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import MyApp from "./pages/navbar"
function App() {
    return (
      <>
        
        <Theme accentColor="cyan" grayColor="sand" radius="large" scaling="100%" appearance="dark">
	        <MyApp />
        </Theme>
      </>
    );
}

export default App
