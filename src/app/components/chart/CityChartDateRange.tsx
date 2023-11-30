import {FC, useState} from "react";
import Select, {SingleValue} from "react-select";
import {BarChart} from "./BarChart";
import {fetchDataByDateRange} from "../api/apiCaller";
import {SelectContainer} from "./ChartStyles";
import {registerLocale} from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import {dataTypes} from "../../utils/chartUtils";
import {SelectType} from "../../types/types";
import {formatDateToMMDDYYYYFormat} from "../../utils/dateUtils";
import {DatePickerRange} from "./DatePickerRange";

registerLocale("pl", pl);

type Props = {
    cities: string[];
};

export const CityChartByDateRange: FC<Props> = ({cities}) => {
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
    >({label: cities[0], value: 0});

    const cityOptions =
        cities &&
        cities.map((it, index) => {
            return {label: it, value: index};
        });

    const {data, isLoading, error} = fetchDataByDateRange(
        "city",
        selectedOption.label,
        [selectedOption.label, startDate ?? new Date(), endDate ?? new Date()],
        formatDateToMMDDYYYYFormat(startDate ?? new Date()),
        formatDateToMMDDYYYYFormat(endDate ?? new Date()),
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

