/**
 * @generated SignedSource<<1c6a9f81a67b1d03e99c1b6abdcc9ff5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChargeState = "CREDIT_CARD_PAYMENT" | "INITIAL" | "PAID" | "PIX_PAYMENT" | "%future added value";
export type InitialStageMutation$variables = {
  id: string;
  installments?: number | null | undefined;
  pixChargeId?: string | null | undefined;
  state?: ChargeState | null | undefined;
  valueWithCredit?: number | null | undefined;
};
export type InitialStageMutation$data = {
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
export type InitialStageMutation = {
  response: InitialStageMutation$data;
  variables: InitialStageMutation$variables;
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
    "name": "InitialStageMutation",
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
    "name": "InitialStageMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "6aa02e24c8b7c274009926352e95bc06",
    "id": null,
    "metadata": {},
    "name": "InitialStageMutation",
    "operationKind": "mutation",
    "text": "mutation InitialStageMutation(\n  $state: ChargeState\n  $installments: Float\n  $id: String!\n  $valueWithCredit: Float\n  $pixChargeId: String\n) {\n  updateCharge(state: $state, installments: $installments, id: $id, valueWithCredit: $valueWithCredit, pixChargeId: $pixChargeId) {\n    _id\n    installments\n    state\n    value\n    correlationId\n    valueWithCredit\n    pixChargeId\n  }\n}\n"
  }
};
})();

(node as any).hash = "09b66d61ec374508b29916d0aaa9c412";

export default node;
