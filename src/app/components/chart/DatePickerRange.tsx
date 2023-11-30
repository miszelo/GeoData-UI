import DatePicker from "react-datepicker";
import {addDays} from "date-fns";
import {FC} from "react";

type Props = {
    startDate: Date, onChange: (dates: [(Date | null), (Date | null)]) => void, endDate: Date
}
export const DatePickerRange: FC<Props> = ({startDate, onChange, endDate}) => {
    return <DatePicker
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
        wrapperClassName="datePicker"
    />;
}