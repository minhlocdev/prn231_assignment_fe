import dayjs from "dayjs";

export const convertDateToDateOnlyString = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const convertDateToTimeOnlyString = (date) => {
  return dayjs(date).format("HH:mm:ss");
};

export const roundToNearestHalfHour = (time) => {
  const minutes = time.minute();
  const roundedMinutes = Math.round(minutes / 30) * 30;
  return time.minute(roundedMinutes).second(0); // Round to nearest half hour and reset seconds
};
