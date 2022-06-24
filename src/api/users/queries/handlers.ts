import { FindUserByIdHandler } from "./find-user-by-id.handler";
import { FindUserByEmailHandler } from "./find-user-by-email.handler";

export const QueryHandlers = [FindUserByIdHandler, FindUserByEmailHandler];