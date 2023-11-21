import { FC, useState } from "react";
import Select, { SingleValue } from "react-select";
import { BarChart } from "./BarChart";
import { fetchDataBy } from "../../apiCaller";
import { SelectContainer } from "./ChartStyles";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import { dataTypes } from "./chartUtils";
registerLocale("pl", pl);

type props = {
  cities: string[];
};

export const ChartContent: FC<props> = ({ cities }) => {
  const cityOptions =
    cities &&
    cities.map((it, index) => {
      return { label: it, value: index };
    });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: number;
  }>({ label: cities[0], value: 0 });
  const [selectedType, setSelectedType] = useState(dataTypes[0]);

  const { data, isLoading, error } = fetchDataBy(
    "city",
    selectedOption.label,
    [selectedOption.label, selectedDate ?? new Date()],
    selectedDate?.toISOString().slice(0, 10),
  );

  const handleSelectCity = (
    newValue: SingleValue<{ value: number; label: string }>,
  ) => {
    if (newValue) {
      setSelectedOption(newValue);
    }
  };

  const handleSelectType = (
    newValue: SingleValue<{ value: string; label: string }>,
  ) => {
    if (newValue) {
      setSelectedType(newValue);
    }
  };

  return (
    <>
      <SelectContainer>
        <Select
          options={cityOptions}
          onChange={handleSelectCity}
          defaultValue={cityOptions[0]}
        />
        <Select
          options={dataTypes}
          defaultValue={dataTypes[0]}
          onChange={handleSelectType}
        />
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          dateFormat="yyyy/MM/dd"
          placeholderText="Wybierz datę"
          maxDate={new Date()}
          locale="pl"
          todayButton="Dziś"
          showMonthDropdown
          showYearDropdown
          dropdownMode="scroll"
        />
      </SelectContainer>
      {data && (
        <BarChart
          data={data}
          dataType={selectedType}
          isLoading={isLoading}
          error={error}
        />
      )}
    </>
  );
};
