import "./App.css";
import { UserProvider } from "./components/Header/Header.context";
import { ThemeProvider } from "./components/ui/theme-provider";
import Navigator from "./viewports/Navigator/Navigator";
import { LoadingBarContainer } from "react-top-loading-bar";

function App() {
  return (
    <UserProvider>
      <LoadingBarContainer>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Navigator />
        </ThemeProvider>
      </LoadingBarContainer>
    </UserProvider>
  );
}

export default App;
