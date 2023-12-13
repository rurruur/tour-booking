import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const isDateFormatValid = (date: string, format = 'YYYY-MM-DD') => dayjs(date, format, true).isValid();

export const getDayOfWeek = (date: string, format = 'YYYY-MM-DD') => week[dayjs(date, format).day()];
