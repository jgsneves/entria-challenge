import { Environment, Network, RecordSource, Store } from "relay-runtime";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fetchQuery(operation: any, variables: unknown) {
  return fetch("http://127.0.0.1:8000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
}

// const wsClient = createClient({
//   url: "ws://127.0.0.1:4000/graphql",
// });

// const subscribe = (
//   operation: RequestParameters,
//   variables: Variables
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// ): Observable<any> => {
//   return Observable.create((sink) => {
//     if (!operation.text) {
//       return sink.error(new Error("Operation text cannot be empty"));
//     }

//     return wsClient.subscribe(
//       {
//         operationName: operation.name,
//         query: operation.text,
//         variables,
//       },
//       sink
//     );
//   });
// };

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
