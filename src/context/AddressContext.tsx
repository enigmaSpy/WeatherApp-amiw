import { createContext, useState, type ReactNode } from "react";
interface AddressContextType{
    address: AddressData|null;
    setAddress: (data: AddressData)=>void;
}
export const AddressContext = createContext<AddressContextType|null>(null);

export const AddressProvider = ({children}:{children:ReactNode})=>{
    const [address, setAddress] = useState<AddressData|null>(null);

    return(
        <AddressContext value={{address,setAddress}}>
            {children}
        </AddressContext>
    )
}