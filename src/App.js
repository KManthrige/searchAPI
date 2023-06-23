import "./styles.css";
import { useState } from "react";

export default function App() {

  const [searchPics, setSearchPics] = useState([]);
  const [userSearched, setUserSearched] = useState("");
  const [color, setColor] = useState("");

  const searchItem = async () => {
    try {
      const apiKey = process.env.REACT_APP_SEARCH_PROJECT
      const response = await fetch(`https://api.pexels.com/v1/search?query=${userSearched}&color=${color}`, { headers: { Authorization: apiKey } })
      const data = await response.json();
      setSearchPics(data.photos)
    } catch (error) {
      console.log("Data not found")
    }
  }

  const handleSearchBar = (event) => {
    setUserSearched(event.target.value)
  }

  const handleColor = (event) => {
    setColor(event.target.value)
  }


  return (
    <div className="function">
      <h1>Image Search</h1>
      <div className="searchBarBtn">
      <input className="input" placeholder="Search for an image here" onChange={handleSearchBar}/>
      <input className="color" placeholder="color" onChange={handleColor}/>
      <button onClick={searchItem} >Search Pictures</button>
      </div>
      <div className="grid">
        {searchPics.map((item, index) => (
          <img src={item.src.medium} alt={item.alt} key={index} />
        ))}
      </div>
    </div>
  );
}

