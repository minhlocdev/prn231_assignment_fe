// validators.js
import dayjs from "dayjs";

// Validate future date
export const validateDate = (_, value) => {
  if (!value || dayjs().isSame(value, "D")) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Please select a future date!"));
};

// Validate minimum number of players
export const validateNumberOfPlayers = (_, value) => {
  if (value >= 2) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Number of players must be at least 2!"));
};

// Validate time difference (minimum of 1 hour)
export const validateTimeDifference = (getFieldValue) => (_, value) => {
  const startTime = getFieldValue("timeStart");
  const endTime = value;

  if (startTime && endTime) {
    const start = dayjs(startTime);
    const end = dayjs(endTime);
    if (end.diff(start, "hour") >= 1) {
      return Promise.resolve();
    }
  }

  return Promise.reject(
    new Error("End time must be at least 1 hour after start time!")
  );
};
