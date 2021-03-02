import { UUID } from "../../common/type/uuid.type";

export type ContractStatus = "PENDING" | "DONE" | "FAIL";

export interface IContract {
  _id?: UUID;
  hitman: string;
  target: string;
  war: string;
  code: string; // code to confirm kill
  createdAt: number;
  status: ContractStatus;
}
