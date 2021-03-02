import { ContractStatus, IContract } from "../contract/contract.interface";
import { IWar } from "./war.interface";
import { IUser } from "../user/user.interface";

export function createContracts(war: IWar, users: IUser[]): IContract[] {
  const contracts: IContract[] = users.map((user: IUser, index) => {
    const target =
      index + 1 === users.length ? users[0]._id : users[index + 1]._id;
    return {
      hitman: user._id,
      target,
      war: war._id,
      code: "stringos",
      createdAt: Date.now(),
      status: "PENDING",
    };
  });
  return contracts;
}
