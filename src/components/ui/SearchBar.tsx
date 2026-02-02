import { useContext, useState } from "react";
import { AddressContext } from "../../context/AddressContext";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const {address, setAddress } = useContext(AddressContext)!;

  const getCoordsFromAddres = async (city: string): Promise<AddressData | null>=> {
    try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) return null;
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    };
    } catch (error) {
        console.error("Błąd połączenia", error);
        return null;
    }
  };
  const handleSearch = async (city: string) => {
    if(!city.trim()) return;
    const data = await getCoordsFromAddres(city);
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
        console.log(address);
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
