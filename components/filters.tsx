import AccountFilter from "./account-filter"
import DateFilter from "./date-filter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const Filters = () => {
    return(
        <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-x-2">
            <AccountFilter />
            <DateFilter />
        </div>
    )
}