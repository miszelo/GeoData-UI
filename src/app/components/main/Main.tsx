import { Chart } from "../chart/Chart";
import { Map } from "../map/Map";
import { useQuery } from "@tanstack/react-query";

export const Main = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["currentData"],
    queryFn: () =>
      fetch("http://localhost:8080/api/v1/smog-data").then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
  });
  return (
    <div>
      <Map data={data} isLoading={isLoading} error={error} />
      <Chart />
    </div>
  );
};
