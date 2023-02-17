import { format } from "date-fns";

const dateFormatter = (date, formatString) => {
  return format(date, formatString)
    .replace("Mon", "월")
    .replace("Tue", "화")
    .replace("Wed", "수")
    .replace("Thu", "목")
    .replace("Fri", "금")
    .replace("Sat", "토")
    .replace("Sun", "일");
};

export { dateFormatter };
