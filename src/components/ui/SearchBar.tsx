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
        console.log("Wynik = 323221xd");
    }
  };
  return (
    <form 
      className="flex gap-2"
      onSubmit={(e)=>{
        e.preventDefault();
        handleSearch(inputValue);
    }}>
      <input
        type="text"
        name="searchInput"
        placeholder="Sprawdź pogode w"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-xl 
                   px-4 py-3 pr-12 
                   placeholder:text-slate-500 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition-all duration-300 ease-in-out
                   hover:bg-slate-800/60"
      />
      <button className="text-blue-500 cursor-pointer hover:text-blue-400">Sprawdż</button>
    </form>
  );
};
