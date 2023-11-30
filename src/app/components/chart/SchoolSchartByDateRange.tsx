import {FC, useState} from "react";
import {SelectType} from "../../types/types";
import {fetchDataByDateRange} from "../../apiCaller";
import {formatDateToMMDDYYYYFormat} from "../../utils/dateUtils";
import Select, {SingleValue} from "react-select";
import {SelectContainer} from "./ChartStyles";
import DatePicker from "react-datepicker";
import {BarChart} from "./BarChart";
import {dataTypes} from "../../utils/chartUtils";
import {addDays} from "date-fns";

type props = {
    schools: string[];
};
export const SchoolChartByDateRange: FC<props> = ({schools}) => {
    const [startDate, setStartDate] = useState(() => {
        const defaultStartDate = new Date();
        defaultStartDate.setDate(defaultStartDate.getDate() - 30);
        return defaultStartDate;
    });
    const [endDate, setEndDate] = useState(new Date());

    const onChange = (dates: [(Date | null), (Date | null)]) => {
        const [start, end] = dates;
        setStartDate(start ?? new Date());
        setEndDate(end ?? new Date());
    }
    const [selectedType, setSelectedType] = useState(dataTypes[0]);
    const [selectedOption, setSelectedOption] = useState<
        SelectType<string, number>
    >({label: schools[0], value: 0});
    const schoolOptions =
        schools &&
        schools.map((it, index) => {
            return {label: it, value: index};
        });

    const {data, isLoading, error} = fetchDataByDateRange(
        "school",
        selectedOption.label,
        [selectedOption.label, startDate ?? new Date(), endDate ?? new Date()],
        formatDateToMMDDYYYYFormat(startDate ?? new Date()),
        formatDateToMMDDYYYYFormat(endDate ?? new Date()),
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
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
                    selectsRange
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
                    byDateRange
                />
            )}
        </>
    );
};
