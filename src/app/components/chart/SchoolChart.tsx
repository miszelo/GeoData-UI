import { FC, useState } from "react";
import { SelectType } from "../../types/types";
import { fetchDataBy } from "../../apiCaller";
import { formatDateToMMDDYYYYFormat } from "../../utils/dateUtils";
import Select, { SingleValue } from "react-select";
import { SelectContainer } from "./ChartStyles";
import DatePicker from "react-datepicker";
import { BarChart } from "./BarChart";
import { dataTypes } from "../../utils/chartUtils";

type props = {
  schools: string[];
};
export const SchoolChart: FC<props> = ({ schools }) => {
  const schoolOptions =
    schools &&
    schools.map((it, index) => {
      return { label: it, value: index };
    });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedType, setSelectedType] = useState(dataTypes[0]);
  const [selectedOption, setSelectedOption] = useState<
    SelectType<string, number>
  >({ label: schools[0], value: 0 });

  const { data, isLoading, error } = fetchDataBy(
    "school",
    selectedOption.label,
    [selectedOption.label, selectedDate ?? new Date()],
    formatDateToMMDDYYYYFormat(selectedDate ?? new Date()),
  );

  const handleSelectSchool = (
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
          options={schoolOptions}
          onChange={handleSelectSchool}
          defaultValue={schoolOptions[0]}
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
