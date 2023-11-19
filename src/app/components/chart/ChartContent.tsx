import { FC, useState } from "react";
import Select, { SingleValue } from "react-select";
import { BarChart } from "./BarChart";
import { fetchDataBy } from "../../apiCaller";

type props = {
  cities: string[];
};

export const ChartContent: FC<props> = ({ cities }) => {
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: number;
  }>({ label: cities[0], value: 0 });

  const { data, isLoading, error, refetch } = fetchDataBy(
    "city",
    selectedOption.label,
    selectedOption.label,
  );

  const options =
    cities &&
    cities.map((it, index) => {
      return { label: it, value: index };
    });

  const handleSelectChange = (
    newValue: SingleValue<{ value: number; label: string }>,
  ) => {
    if (newValue) {
      setSelectedOption(newValue);
      refetch();
    }
  };

  return (
    <>
      <Select options={options} onChange={handleSelectChange} />
      {data && (
        <BarChart data={data ?? []} isLoading={isLoading} error={error} />
      )}
    </>
  );
};
