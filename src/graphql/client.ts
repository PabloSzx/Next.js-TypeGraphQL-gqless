import { Client, QueryFetcher } from "gqless";
import { useCallback, useMemo, useState } from "react";

import { Mutation, Query, schema } from "./generated";

const endpoint = "http://localhost:3000/api/graphql";

const fetchQuery: QueryFetcher = async (query, variables) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    }),
    mode: "cors"
  });

  if (!response.ok) {
    throw new Error(`Network error, received status code ${response.status}`);
  }

  const json = await response.json();

  return json;
};

export const clientQuery = new Client<Query>(schema.Query, fetchQuery);

export const query = clientQuery.query;

type MutationState = "waiting" | "loading" | "error" | "done";

export const useMutation = <TData extends any>(
  mutationFn: (schema: Client<Mutation>["query"]) => TData
): [
  () => Promise<TData>,
  { state: MutationState; data: TData | undefined }
] => {
  const [n, setN] = useState(0);
  const [state, setState] = useState<MutationState>("waiting");

  const [data, setData] = useState<TData | undefined>(undefined);

  const fetchMutation = useCallback<QueryFetcher>(
    async (query, variables) => {
      setState("loading");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: "mutation" + query,
          variables
        }),
        mode: "cors"
      });

      if (!response.ok) {
        setState("error");
        throw new Error(
          `Network error, received status code ${response.status}`
        );
      }

      const json = await response.json();
      setState("done");

      return json;
    },
    [setState]
  );
  const mutationClient = useMemo<Client<Mutation>>(() => {
    return new Client<Mutation>(schema.Mutation, fetchMutation);
  }, [fetchMutation, n]);

  const mutationCallback = useCallback<() => Promise<TData>>(async () => {
    mutationFn(mutationClient.query);

    await new Promise(resolve => {
      mutationClient.scheduler.commit.onFetched(() => {
        resolve();
      });
    });

    const val = mutationFn(mutationClient.query);

    setData(val);
    setN(n => ++n);

    return val;
  }, [mutationClient, setData, setN]);

  return useMemo(() => [mutationCallback, { state, data }], [
    mutationCallback,
    state,
    data
  ]);
};
