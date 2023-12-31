/**
 * @generated SignedSource<<fe15688f334c0078f994ab559e29a07d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ChargeState = "CREDIT_CARD_PAYMENT" | "INITIAL" | "PAID" | "PIX_PAYMENT" | "%future added value";
export type ChargeByIdQuery$variables = {
  chargeId: string;
};
export type ChargeByIdQuery$data = {
  readonly getChargeById: {
    readonly _id: string;
    readonly correlationId: string | null | undefined;
    readonly installments: number | null | undefined;
    readonly pixChargeId: string | null | undefined;
    readonly state: ChargeState;
    readonly value: number;
    readonly valueWithCredit: number | null | undefined;
  };
};
export type ChargeByIdQuery = {
  response: ChargeByIdQuery$data;
  variables: ChargeByIdQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "chargeId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "chargeId"
      }
    ],
    "concreteType": "ChargeModel",
    "kind": "LinkedField",
    "name": "getChargeById",
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
        "name": "valueWithCredit",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "pixChargeId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "correlationId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChargeByIdQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChargeByIdQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bf84f0f7c3301f1a21b31e71ce5347dd",
    "id": null,
    "metadata": {},
    "name": "ChargeByIdQuery",
    "operationKind": "query",
    "text": "query ChargeByIdQuery(\n  $chargeId: String!\n) {\n  getChargeById(id: $chargeId) {\n    _id\n    installments\n    state\n    value\n    valueWithCredit\n    pixChargeId\n    correlationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "de84dda4349f7fb20b07791841a8d71e";

export default node;
