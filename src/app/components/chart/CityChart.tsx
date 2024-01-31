import {FC, useState} from "react";
import Select, {SingleValue} from "react-select";
import {BarChart} from "./BarChart";
import {fetchDataBy} from "../api/apiCaller";
import {SelectContainer} from "./ChartStyles";
import {registerLocale} from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import {dataTypes, filterRepeatedValues} from "../../utils/chartUtils";
import {SelectType} from "../../types/types";
import {formatDateToMMDDYYYYFormat} from "../../utils/dateUtils";
import {DatePickerNormal} from "./DatePicker";

registerLocale("pl", pl);

type Props = {
    cities: string[];
};

export const CityChart: FC<Props> = ({cities}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedType, setSelectedType] = useState(dataTypes[0]);
    const [selectedOption, setSelectedOption] = useState<
        SelectType<string, number>
    >({label: cities[0], value: 0});

    const cityOptions =
        cities &&
        cities.filter(filterRepeatedValues).map((it, index) => {
            return {label: it, value: index};
        });

    const {data, isLoading, error} = fetchDataBy(
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
    const maxLength = Math.max(...cityOptions.map((option) => option.label.length));

    const customStyles = {
        // Set the minimum width based on the length of the longest city name
        control: (provided) => ({ ...provided, minWidth: `${maxLength * 8}px` }), // You may adjust the multiplier based on your needs
    };
    return (
        <>
            <SelectContainer>
                <Select
                    styles={customStyles}
                    options={cityOptions}
                    onChange={handleSelectCity}
                    defaultValue={cityOptions[0]}
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
