import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const isDateFormatValid = (date: string, format = 'YYYY-MM-DD') => dayjs(date, format, true).isValid();
