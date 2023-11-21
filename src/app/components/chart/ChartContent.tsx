import { FC, useState } from "react";
import Select, { SingleValue } from "react-select";
import { BarChart } from "./BarChart";
import { fetchDataBy } from "../../apiCaller";
import { SelectContainer } from "./ChartStyles";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import { dataTypes } from "../../utils/chartUtils";
import { SelectType } from "../../types/types";
import { formatDateToMMDDYYYYFormat } from "../../utils/dateUtils";

registerLocale("pl", pl);

type props = {
  cities: string[];
};

export const ChartContent: FC<props> = ({ cities }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedType, setSelectedType] = useState(dataTypes[0]);
  const [selectedOption, setSelectedOption] = useState<
    SelectType<string, number>
  >({ label: cities[0], value: 0 });

  const cityOptions =
    cities &&
    cities.map((it, index) => {
      return { label: it, value: index };
    });

  const { data, isLoading, error } = fetchDataBy(
    "city",
    selectedOption.label,
    [selectedOption.label, selectedDate ?? new Date()],
    formatDateToMMDDYYYYFormat(selectedDate ?? new Date()),
  );

  const handleSelectCity = (
    newValue: SingleValue<SelectType<string, number>>,
  ) => {
    newValue && setSelectedOption(newValue);
  };

  const handleSelectType = (
    newValue: SingleValue<SelectType<string, string>>,
  ) => {
    newValue && setSelectedType(newValue);
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
