import dayjs from "dayjs";
import "dayjs/locale/ru";

export function dateHelper(dates, mode) {
  dayjs.locale("ru");
  const result = [];
  if (mode === "disp") {
    let formattedDates = dates.map((date, index, arr) => {
      return {
        start_date: dayjs(date.start_date).format("DD.MMM"),
        end_date: dayjs(date.end_date).format("DD.MMM"),
      };
    });

    return formattedDates;
  } else if (mode === "diff") {
    const today = dayjs().format("YYYY-MM-DD");

    dates.forEach((date) => {
      result.push({
        startDiff: dayjs(date.start_date).diff(today, "day"),
        endDiff: dayjs(date.end_date).diff(today, "day"),
      });
    });

    return result;
  }
}
