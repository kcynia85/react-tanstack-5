import React, { useEffect, useState } from "react";
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
  const queryKey = ["repoData", { per_page: perPage, page }];
  const isGlobalFetching = useIsFetching();
  const queryClient = useQueryClient();

  const { isPaused, isPending, error, data, isPlaceholderData } = useQuery({
    queryKey,
    queryFn: () => fetchContributors(perPage, page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    queryClient.prefetchQuery(queryKey);
  }, [page]);

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
