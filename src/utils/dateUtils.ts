import { format } from "date-fns";

export const formatXAxis = (tickItem: string): string => {
  return format(new Date(tickItem), "MM/dd HH:mm"); // Formats date to "MM/DD HH:MM"
};
