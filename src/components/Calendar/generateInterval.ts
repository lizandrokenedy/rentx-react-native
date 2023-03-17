import { eachDayOfInterval, format } from "date-fns";

import { IDayProps, IMarkedDateProps } from ".";
import theme from "../../styles/theme";
import { getPlatformDate } from "../../ultils/getPlatformDate";

export function generateInterval(start: IDayProps, end: IDayProps) {
  let interval: IMarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getPlatformDate(item), "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,
        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
      },
    };
  });

  return interval;
}
