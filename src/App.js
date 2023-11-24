import { createContext, useState } from "react";
import SearchField from "./components/SearchField";

// Create Context
export const ImageContext = createContext();

function App() {
  const [searchImage, setSearchImage] = useState([]);

  const value = {
    searchImage,
    setSearchImage
  }

  return (
    <ImageContext.Provider value={value}>
        <SearchField />
        <div className="grid grid-cols-4">
        {searchImage}
        </div>
    </ImageContext.Provider>
  );
}

export default App;
