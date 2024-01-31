import {FC, useState} from "react";
import {SelectType} from "../../types/types";
import {fetchDataBy} from "../api/apiCaller";
import {formatDateToMMDDYYYYFormat} from "../../utils/dateUtils";
import Select, {SingleValue} from "react-select";
import {SelectContainer} from "./ChartStyles";
import {BarChart} from "./BarChart";
import {dataTypes, filterRepeatedValues} from "../../utils/chartUtils";
import {DatePickerNormal} from "./DatePicker";

type Props = {
    schools: string[];
};
export const SchoolChart: FC<Props> = ({schools}) => {
    const schoolOptions =
        schools &&
        schools.filter(filterRepeatedValues).map((it, index) => {
            return {label: it, value: index};
        });

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedType, setSelectedType] = useState(dataTypes[0]);
    const [selectedOption, setSelectedOption] = useState<
        SelectType<string, number>
    >({label: schools[0], value: 0});

    const {data, isLoading, error} = fetchDataBy(
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
    }

    const maxLength = Math.max(...schoolOptions.map((option) => option.label.length));

    const customStyles = {
        // Set the minimum width based on the length of the longest city name
        control: (provided) => ({ ...provided, minWidth: `${maxLength}px` }), // You may adjust the multiplier based on your needs
    };
    return (
        <>
            <SelectContainer>
                <Select
                    options={schoolOptions}
                    onChange={handleSelectSchool}
                    defaultValue={schoolOptions[0]}
                    styles={customStyles}
                />
                <Select
                    options={dataTypes}
                    defaultValue={dataTypes[0]}
                    onChange={handleSelectType}
                />
                <DatePickerNormal selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
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
