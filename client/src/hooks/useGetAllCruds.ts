import { useEffect } from "react";
import { useCrudStore } from "../Store/UseCrudStore";

const useGetAllCruds = () => {
  const { getAllCruds } = useCrudStore();

  useEffect(() => {
    getAllCruds();
  }, [getAllCruds]);

 
};

export default useGetAllCruds;
