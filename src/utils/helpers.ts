import dayjs from "dayjs";

export const formatDate = (date: string | Date, format = "YYYY-MM-DD") => {
  if (!date) return "";

  return dayjs(date).format(format);
};
