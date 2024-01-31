import {FC, useState} from "react";
import {SelectType} from "../../types/types";
import {fetchDataByDateRange} from "../api/apiCaller";
import {formatDateToMMDDYYYYFormat} from "../../utils/dateUtils";
import Select, {SingleValue} from "react-select";
import {SelectContainer} from "./ChartStyles";
import {BarChart} from "./BarChart";
import {dataTypes, filterRepeatedValues} from "../../utils/chartUtils";
import {DatePickerRange} from "./DatePickerRange";

type Props = {
    schools: string[];
};
export const SchoolChartByDateRange: FC<Props> = ({schools}) => {
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
        schools.filter(filterRepeatedValues).map((it, index) => {
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
    const maxLength = Math.max(...schoolOptions.map((option) => option.label.length));

    const customStyles = {
        // Set the minimum width based on the length of the longest city name
        control: (provided) => ({ ...provided, minWidth: `${maxLength}px` }), // You may adjust the multiplier based on your needs
    };
    return (
        <>
            <SelectContainer>
                <Select
                    styles={customStyles}
                    options={schoolOptions}
                    onChange={handleSelectSchool}
                    defaultValue={schoolOptions[0]}
                />
                <Select
                    options={dataTypes}
                    defaultValue={dataTypes[0]}
                    onChange={handleSelectType}
                />
                <DatePickerRange startDate={startDate} endDate={endDate} onChange={onChange}/>
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
