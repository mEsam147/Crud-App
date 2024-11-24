import { useEffect } from "react";
import { useAuthStore } from "../Store/UseAuthStore";

const useCheckAuth = () => {
    const {  getCurrentUser } = useAuthStore();

    useEffect(() => {
      getCurrentUser();
    }, [getCurrentUser]);
 
}

export default useCheckAuth
