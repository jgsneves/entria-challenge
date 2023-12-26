/**
 * @generated SignedSource<<9d207a99b70b49c257b09e72e92d5e39>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChargeState = "CREDIT_CARD_PAYMENT" | "INITIAL" | "PAID" | "PIX_PAYMENT" | "%future added value";
export type changeChargeMutation$variables = {
  id: string;
  installments?: number | null | undefined;
  pixChargeId?: string | null | undefined;
  state?: ChargeState | null | undefined;
  valueWithCredit?: number | null | undefined;
};
export type changeChargeMutation$data = {
  readonly updateCharge: {
    readonly _id: string;
    readonly correlationId: string | null | undefined;
    readonly installments: number | null | undefined;
    readonly pixChargeId: string | null | undefined;
    readonly state: ChargeState;
    readonly value: number;
    readonly valueWithCredit: number | null | undefined;
  };
};
export type changeChargeMutation = {
  response: changeChargeMutation$data;
  variables: changeChargeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "installments"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pixChargeId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "state"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "valueWithCredit"
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "installments",
        "variableName": "installments"
      },
      {
        "kind": "Variable",
        "name": "pixChargeId",
        "variableName": "pixChargeId"
      },
      {
        "kind": "Variable",
        "name": "state",
        "variableName": "state"
      },
      {
        "kind": "Variable",
        "name": "valueWithCredit",
        "variableName": "valueWithCredit"
      }
    ],
    "concreteType": "ChargeModel",
    "kind": "LinkedField",
    "name": "updateCharge",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "_id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "installments",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "state",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "value",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "correlationId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "valueWithCredit",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "pixChargeId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "changeChargeMutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "changeChargeMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "d109968de6aa1ddcc94bbc8c7c72a240",
    "id": null,
    "metadata": {},
    "name": "changeChargeMutation",
    "operationKind": "mutation",
    "text": "mutation changeChargeMutation(\n  $state: ChargeState\n  $installments: Float\n  $id: String!\n  $valueWithCredit: Float\n  $pixChargeId: String\n) {\n  updateCharge(state: $state, installments: $installments, id: $id, valueWithCredit: $valueWithCredit, pixChargeId: $pixChargeId) {\n    _id\n    installments\n    state\n    value\n    correlationId\n    valueWithCredit\n    pixChargeId\n  }\n}\n"
  }
};
})();

(node as any).hash = "455904e15b2d8d3d1549b2f01d1c8d3b";

export default node;
