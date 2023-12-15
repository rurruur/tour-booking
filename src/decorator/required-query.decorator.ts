import { BadRequestException, ExecutionContext, createParamDecorator } from '@nestjs/common';

export const RequiredQuery = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const value = request.query[key];
  if (value === undefined) {
    throw new BadRequestException(`쿼리스트링이 누락되었습니다: '${key}'`);
  }

  return value;
});
