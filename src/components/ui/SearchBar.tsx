import { useContext, useState } from "react";
import { AddressContext } from "../../context/AddressContext";
import { getCoordsFromAddress } from "../../utils/geoUtils";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const {setAddress } = useContext(AddressContext)!;

  const handleSearch = async (city: string) => {
    if(!city.trim()) return;
    const data = await getCoordsFromAddress(city);
    if (data) {
      setAddress(data);
    }else{
        //TODO: jakiś kolorek nie wiem, random item dla przypominajki
        console.log("Wynik = 323221xd");
    }
  };
  return (
    <form onSubmit={(e)=>{
        e.preventDefault();
        handleSearch(inputValue);
    }}>
      <input
        type="text"
        name="searchInput"
        placeholder="Sprawdź pogode w"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button>Sprawdż</button>
    </form>
  );
};
