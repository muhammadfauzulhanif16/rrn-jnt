import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/id";

dayjs.extend(localizedFormat);
dayjs.locale("id");

export const DateTimeFormatter = (dateTime) => {
    return dayjs(dateTime).format("dddd, D MMMM YYYY. HH:mm:ss");
};
