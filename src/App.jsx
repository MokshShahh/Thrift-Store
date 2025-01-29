import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import MyApp from "./pages/test"
function App() {
    return (
      <html>
        <body>
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="100%" appearance="dark">
	        <MyApp />
        </Theme>

        </body>
      </html>
    );
}

export default App
