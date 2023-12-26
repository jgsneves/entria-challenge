import { useQuery } from "react-query";
import { apiService } from "../services/api-service";
import { useUserData } from "./use-user-data";
import { ChargeState } from "../components/Charge/__generated__/ChargeByIdQuery.graphql";

export const useCreditConditionQuery = (
  creditValue: number,
  chargeState: ChargeState
) => {
  const { id, authToken } = useUserData();

  const { isLoading, error, data } = useQuery(
    "creditCondition",
    () => {
      if (chargeState === "INITIAL") {
        return apiService
          .getCreditCondition({ userId: id, creditValue }, authToken)
          .then((response) => response.data);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    isLoading,
    error,
    data,
  };
};
