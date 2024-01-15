import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Book from "./views/Books/Book";
import Profile from "./views/Profile/Profile";
import { useContext } from "react";
import { Context } from "./CONTEXT_API/ContextApi";
import BookFavoris from "./views/Books/BookFavoris";
import BookDeatil from "./views/Books/BookDeatil";

function App() {
  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      <Routes>
        <Route to="/home" index element={user ? <Book /> : <Home />} />
        <Route path="/book" element={user ? <Book /> : <Home />} />
        <Route path="/books/:id" element={user ? <BookDeatil /> : <Home />} />
        <Route
          path="/book/favories/:id"
          element={user ? <BookFavoris /> : <Home />}
        />
        <Route path="/profile/:id" element={user ? <Profile /> : <Home />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
