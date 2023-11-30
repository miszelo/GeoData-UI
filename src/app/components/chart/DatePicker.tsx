import DatePicker from "react-datepicker";
import {FC} from "react";

type Props = {
    selectedDate: Date | null,
    setSelectedDate: (value: (((prevState: (Date | null)) => (Date | null)) | Date | null)) => void
}
export const DatePickerNormal: FC<Props> = ({selectedDate, setSelectedDate}) => {
    return <DatePicker
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
        wrapperClassName="datePicker"
    />;
}