import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isDateFormatValid } from '../lib/date';

@ValidatorConstraint()
export class IsDateFormatValid implements ValidatorConstraintInterface {
  validate(input: string | string[], args: ValidationArguments) {
    const format = args.constraints?.[0] ?? 'YYYY-MM-DD';

    if (Array.isArray(input)) {
      return input.every((date) => isDateFormatValid(date, format));
    }
    return isDateFormatValid(input, format);
  }

  defaultMessage(args: ValidationArguments) {
    return `날짜 형식이 ${args.constraints?.[0] ?? 'YYYY-MM-DD'}이어야 합니다. 현재 값: ${args.value}`;
  }
}
