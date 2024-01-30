import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchContributors from "./fetchContributors";

function App() {
  const perPage = 10;
  const queryKey = ["repoData", { per_page: perPage }];

  const { isPaused, isPending, error, data } = useQuery({
    queryKey,
    queryFn: () => fetchContributors(perPage),
  });

  if (data) {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Contributions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ login, contributions }) => (
              <tr key={login}>
                <td>{login}</td>
                <td>{contributions}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
