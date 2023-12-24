import { useQuery } from "react-query";
import { openPixService } from "../services/open-pix-service";

export const useGetOnePixCharge = (id: string) => {
  const { data, isLoading, error } = useQuery("getOnePixCharge", () =>
    openPixService.getOnePixCharge(id).then((res) => res.data)
  );

  return {
    data,
    isLoading,
    error,
  };
};
