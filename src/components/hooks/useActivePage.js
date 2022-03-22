import { useContext } from "react";
import { ActivePageContext } from "../context/ActivePageProvider";


export default function useActivePage() {
    return useContext(ActivePageContext);
}