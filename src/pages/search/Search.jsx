import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./search.css";
import { CaffeData } from "../../data/data";
import { TextHeader } from "../../staticComponent/headerText";
import handleSubmit from "../../data/handleApi";
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <>
      <Navbar />
      <SearchBody />
    </>
  );
};
function SearchBody() {
  const [searchCategorie, setSearchCategorie] = useState("");
  const [CoffesData, setCoffeData] = useState([]);
  const [notFound, setnotFound] = useState("");
  return (
    <section className="searchNow">
      <div className="container">
        <TextHeader>Search</TextHeader>
        <FindNow
          searchCategorie={searchCategorie}
          setSearchCategorie={setSearchCategorie}
          CoffesData={CoffesData}
          setCoffeData={setCoffeData}
          notFound={notFound}
          setnotFound={setnotFound}
        />
        <Item
          searchCategorie={searchCategorie}
          CoffesData={CoffesData}
          notFound={notFound}
        />
      </div>
    </section>
  );
}

function FindNow({
  searchCategorie,
  setSearchCategorie,
  setCoffeData,
  setnotFound,
}) {
  const [searchIn, setSearchIn] = useState("");

  function handleEvent(e) {
    e.preventDefault();
    handleSubmit(searchIn, setSearchIn, setCoffeData, setnotFound);
  }
  return (
    <form onSubmit={handleEvent}>
      <div className="form-group">
        <SearchInput searchIn={searchIn} setSearchIn={setSearchIn} />
        <button type="submit">Submit</button>
        <Categories
          searchCategorie={searchCategorie}
          onChange={setSearchCategorie}
          setCoffeData={setCoffeData}
          setSearchIn={setSearchIn}
        />
      </div>
    </form>
  );
}
function SearchInput({ setSearchIn, searchIn }) {
  return (
    <input
      type="text"
      name="cafeName"
      onChange={(e) => setSearchIn(e.target.value)}
      value={searchIn}
      placeholder="Cafe...."
    ></input>
  );
}
function Categories({ searchCategorie, onChange, setCoffeData, setSearchIn }) {
  function handleCategories(value) {
    onChange(value);
    setCoffeData([]);
    setSearchIn("");
  }
  return (
    <select
      value={searchCategorie}
      onChange={(e) => handleCategories(e.target.value)}
    >
      <option>Select</option>
      <option value="cafe">Cafe </option>
      <option value="playstation">Cafe & Playstation</option>
      <option value="food">Cafe & Food</option>
      <option value="study">Cafe & Study</option>
      <option value="conference">Conference Room</option>
    </select>
  );
}
function Item({ searchCategorie, CoffesData, notFound }) {
  if (CoffesData.length > 0) {
    return (
      <ItemList>
        {CoffesData.map((data) => {
          return <ItemDetails data={data} key={data.name} />;
        })}
      </ItemList>
    );
  }

  if (notFound) return <ItemList>{notFound}</ItemList>;
  if (searchCategorie === "cafe") {
    return (
      <ItemList>
        {CaffeData[0].Coffe.map((data) => {
          return <ItemDetails data={data} key={data.name} />;
        })}
      </ItemList>
    );
  }

  if (searchCategorie === "playstation") {
    return (
      <ItemList>
        {CaffeData[0].CoffeAndPlaystation.map((data) => {
          return <ItemDetails data={data} key={data.name} />;
        })}
      </ItemList>
    );
  }
  if (searchCategorie === "food") {
    return (
      <ItemList>
        {CaffeData[0].CoffeAndFood.map((data) => {
          return <ItemDetails data={data} key={data.name} />;
        })}
      </ItemList>
    );
  }
  if (searchCategorie === "study") {
    return (
      <ItemList>
        {CaffeData[0].CoffeAndStudy.map((data) => {
          return <ItemDetails data={data} key={data.name} />;
        })}
      </ItemList>
    );
  }
  if (searchCategorie === "conference") {
    return (
      <ItemList>
        {CaffeData[0].ConferenceRoom.map((data) => {
          return <ItemDetails data={data} key={data.name} />;
        })}
      </ItemList>
    );
  }
}
export function ItemDetails({ data }) {
  return (
    <li className="search-box">
      <div className="img-box">
        <img src={data.img.one} alt={data.name} />
      </div>
      <div className="details">
        <span>{data.name}</span>
        <Star />
      </div>
      <Link to={`/cafes/${data.name}`}>See More</Link>
    </li>
  );
}
export function Star() {
  return (
    <ul>
      <li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          id="star"
        >
          <path
            fill="#ff7900"
            d="M10.975 18.847a2 2 0 0 1 2.049.002l3.34 1.997c.8.478 1.778-.229 1.568-1.123l-.877-3.72a2 2 0 0 1 .646-1.978l2.934-2.513c.705-.603.326-1.746-.6-1.819l-3.882-.325a2 2 0 0 1-1.671-1.205L12.968 4.63c-.358-.841-1.578-.841-1.936 0L9.52 8.154a2 2 0 0 1-1.67 1.203l-3.885.326c-.925.073-1.304 1.216-.6 1.819L6.3 14.015a2 2 0 0 1 .645 1.978l-.877 3.72c-.21.894.768 1.6 1.567 1.122l3.34-1.988Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          id="star"
        >
          <path
            fill="#ff7900"
            d="M10.975 18.847a2 2 0 0 1 2.049.002l3.34 1.997c.8.478 1.778-.229 1.568-1.123l-.877-3.72a2 2 0 0 1 .646-1.978l2.934-2.513c.705-.603.326-1.746-.6-1.819l-3.882-.325a2 2 0 0 1-1.671-1.205L12.968 4.63c-.358-.841-1.578-.841-1.936 0L9.52 8.154a2 2 0 0 1-1.67 1.203l-3.885.326c-.925.073-1.304 1.216-.6 1.819L6.3 14.015a2 2 0 0 1 .645 1.978l-.877 3.72c-.21.894.768 1.6 1.567 1.122l3.34-1.988Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          id="star"
        >
          <path
            fill="#ff7900"
            d="M10.975 18.847a2 2 0 0 1 2.049.002l3.34 1.997c.8.478 1.778-.229 1.568-1.123l-.877-3.72a2 2 0 0 1 .646-1.978l2.934-2.513c.705-.603.326-1.746-.6-1.819l-3.882-.325a2 2 0 0 1-1.671-1.205L12.968 4.63c-.358-.841-1.578-.841-1.936 0L9.52 8.154a2 2 0 0 1-1.67 1.203l-3.885.326c-.925.073-1.304 1.216-.6 1.819L6.3 14.015a2 2 0 0 1 .645 1.978l-.877 3.72c-.21.894.768 1.6 1.567 1.122l3.34-1.988Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          id="star"
        >
          <path
            fill="#ff7900"
            d="M10.975 18.847a2 2 0 0 1 2.049.002l3.34 1.997c.8.478 1.778-.229 1.568-1.123l-.877-3.72a2 2 0 0 1 .646-1.978l2.934-2.513c.705-.603.326-1.746-.6-1.819l-3.882-.325a2 2 0 0 1-1.671-1.205L12.968 4.63c-.358-.841-1.578-.841-1.936 0L9.52 8.154a2 2 0 0 1-1.67 1.203l-3.885.326c-.925.073-1.304 1.216-.6 1.819L6.3 14.015a2 2 0 0 1 .645 1.978l-.877 3.72c-.21.894.768 1.6 1.567 1.122l3.34-1.988Z"
          ></path>
        </svg>
      </li>
    </ul>
  );
}

export function ItemList({ children }) {
  return (
    <div className="container">
      <ul className="itemList">{children}</ul>
    </div>
  );
}
export default Search;