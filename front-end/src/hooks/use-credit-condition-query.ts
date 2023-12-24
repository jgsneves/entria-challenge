import { useQuery } from "react-query";
import { apiService } from "../services/api-service";
import { useUserData } from "./use-user-data";

export const useCreditConditionQuery = (creditValue: number) => {
  const { id, authToken } = useUserData();

  const { isLoading, error, data } = useQuery("creditCondition", () =>
    apiService
      .getCreditCondition({ userId: id, creditValue }, authToken)
      .then((response) => response.data)
  );

  return {
    isLoading,
    error,
    data,
  };
};
