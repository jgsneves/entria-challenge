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

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
