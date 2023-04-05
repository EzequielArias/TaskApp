import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getBearer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // Read the Headers and clean it, to get only the Token
    const Authorization_Bearer = request.get('Authorization').replace('bearer ','').trimm()
    return Authorization_Bearer
  },
);
