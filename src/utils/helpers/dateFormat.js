import { format } from 'date-fns';

export const convertDateToDateOnlyString = (date) => {
  return format(date, 'yyyy-MM-dd'); 
};

export const convertDateToTimeOnlyString = (date) => {
  return format(date, 'HH:mm:ss'); 
};