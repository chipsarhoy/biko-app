import {createContext, useContext, useState, useEffect} from 'react';
import menuService from '../services/menuService.js';

const MenuDataContext = createContext();

export function MenuDataProvider({ children }) {

    const [menuData, setMenuData] = useState([])

    useEffect(() => {(
        async () => {
        const data = await menuService();
        setMenuData(data);        
        })();
    }, [])

    return(
        <MenuDataContext.Provider value={{menuData}}>
            {children}
        </MenuDataContext.Provider>
    );
}

export const useMenuData = () => useContext(MenuDataContext);
