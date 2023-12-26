import { graphql } from "relay-runtime";

export const changeChargeMutation = graphql`
  mutation changeChargeMutation(
    $state: ChargeState
    $installments: Float
    $id: String!
    $valueWithCredit: Float
    $pixChargeId: String
  ) {
    updateCharge(
      state: $state
      installments: $installments
      id: $id
      valueWithCredit: $valueWithCredit
      pixChargeId: $pixChargeId
    ) {
      _id
      installments
      state
      value
      correlationId
      valueWithCredit
      pixChargeId
    }
  }
`;
