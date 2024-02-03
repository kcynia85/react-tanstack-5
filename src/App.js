import React, { useEffect, useMemo, useState } from "react";
import {
  useQuery,
  useIsFetching,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import fetchContributors from "./fetchContributors";

function App() {
  const perPage = 5;
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const isGlobalFetching = useIsFetching();

  const queryKey = ["repoData", { per_page: perPage, page }];
  const prefetchKey = useMemo(
    () => ["repoData", { per_page: perPage, page: page + 1 }],
    [perPage, page]
  );

  useEffect(() => {
    const prefetchNextPage = async () => {
      await queryClient.prefetchQuery({
        queryKey: prefetchKey,
        queryFn: () => fetchContributors(perPage, page + 1),
      });
    };

    prefetchNextPage();
  }, [queryClient, page, perPage, prefetchKey]);

  const { isPaused, isPending, error, data, isPlaceholderData } = useQuery({
    queryKey,
    queryFn: () => fetchContributors(perPage, page),
    placeholderData: keepPreviousData,
  });

  if (data) {
    return (
      <>
        <p>
          Fetching: {isGlobalFetching ? "Aktualizuję obecny stan" : "Gotowe"}
        </p>
        <p>Current page: {page}</p>

        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Contributions</th>
            </tr>
          </thead>
          <tbody
            style={{
              opacity: isPlaceholderData ? 0.5 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            {data.map(({ login, contributions }) => (
              <tr key={login}>
                <td>{login}</td>
                <td>{contributions}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => {
            setPage((page) => page + 1);
          }}
        >
          Next page
        </button>
      </>
    );
  }

  // Handle errors and loading states
  if (isPaused)
    return "Brak dostępu do sieci. Sprawdź połączenie z internetem.";

  if (isPending) return "Trwa ładowanie...";

  if (error) {
    console.log(data);
    return `An error has occurred: ${error}`;
  }
  console.log(data);
}

export default App;
