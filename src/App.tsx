import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";

import Home from "./screens/home/Home";
import Game from "./screens/game/game";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="game" element={<Game />} />
        </Routes>
      </BrowserRouter>      
    </Provider>

  );
}

export default App;
