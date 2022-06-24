import { Catch, ArgumentsHost} from "@nestjs/common";
import { Response } from 'express';
import { QueryFailedError } from "typeorm";
import { PG_UNIQUE_VIOLATION } from '@drdgvhbh/postgres-error-codes';
import { BaseExceptionFilter } from "@nestjs/core";

@Catch(QueryFailedError)
export class UniqueEntityDuplicatedExceptionFilter extends BaseExceptionFilter {
  public catch(exception: QueryFailedError, host: ArgumentsHost) {

    const code = (exception as any)?.code;
    if (code === PG_UNIQUE_VIOLATION) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      return response.status(409).json({
        message: {
          statusCode: 409,
          error: 'Object already exists'
        }
      });
    }

    return super.catch(exception, host);
  }
}