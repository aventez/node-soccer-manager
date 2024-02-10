import { FindAllTransfersHandler } from "./find-all-transfers.handler";
import { FindTransferByIdHandler } from "./find-transfer-by-id.handler";
import { FindTransferByPlayerIdHandler } from "./find-transfer-by-player-id.handler";

export const QueryHandlers = [
  FindAllTransfersHandler,
  FindTransferByIdHandler,
  FindTransferByPlayerIdHandler,
];