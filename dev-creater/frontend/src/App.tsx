import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";

import { store } from "./store/store";

import { CookiesProvider } from 'react-cookie';

import Home from "./screens/home/Home";
import Game from "./screens/game/game";

const App = () => {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider >
            <Routes>
              <Route index element={<Home />} />
              <Route path="game" element={<Game />} />
            </Routes>          
          </AuthProvider>
        </BrowserRouter>      
      </Provider>      
    </CookiesProvider>
  );
}

export default App;
