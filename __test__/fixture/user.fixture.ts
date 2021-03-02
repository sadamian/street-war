import { IUser } from "../../src/module/user/user.interface";
import mongoose from "mongoose";

const userOne: IUser = {
  _id: mongoose.Types.ObjectId(),
  name: "Proutios",
  secret: "jesaispass",
  password: "pipi",
};

const userTwo: IUser = {
  _id: mongoose.Types.ObjectId(),
  name: "Proutini",
  secret: "lol",
  password: "lol",
};

const userThree: IUser = {
  _id: mongoose.Types.ObjectId(),
  name: "Proutalop",
  secret: "loli",
  password: "lol",
};

const userFour: IUser = {
  _id: mongoose.Types.ObjectId(),
  name: "Daolika",
  secret: "lols",
  password: "lol",
};

const userFive: IUser = {
  _id: mongoose.Types.ObjectId(),
  name: "Ronuni",
  secret: "lolqae",
  password: "lol",
};

const userSix: IUser = {
  _id: mongoose.Types.ObjectId(),
  name: "Louika",
  secret: "lolaaaa",
  password: "lol",
};

export const users: IUser[] = [
  userOne,
  userTwo,
  userThree,
  userFour,
  userFive,
  userSix,
];

export const adminUser: IUser = {
  _id: mongoose.Types.ObjectId(),
  password: "lol",
  secret: "pipu",
  name: "cacatos_admin",
  admin: true,
};
