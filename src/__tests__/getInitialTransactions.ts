import { getInitialTransactions } from "../App";
import { IConstants } from "../utils/constants";

const constants: IConstants = {
  publicAddress: "0xb701FdCc9Db05d5AD0d7B6aAbb42DBf09ec28Ad0",
  accountBalance: 3.405,
  ethPrice: 1700,
  pastTransactions: {
    0: {
      date: "06-01-2021 19:00",
      amount: "3",
      recipient: "0xb19181c403D451A1e161b305eb08DfD422ffd6DD",
    },
    1: {
      date: "06-01-2021 20:00",
      amount: "2",
      recipient: "0xb19181c403D451A1e161b305eb08DfD422ffd6DD",
    },
    2: {
      date: "06-01-2021 21:00",
      amount: "3",
      recipient: "0xb19181c403D451A1e161b305eb08DfD422ffd6DD",
    },
  },
};

test("generate the correct amount of transactions", () => {
  const transactions = getInitialTransactions(constants);

  expect(transactions).toHaveLength(3);
});

test("create the dates objects correctly", () => {
  const transactions = getInitialTransactions(constants);

  expect(transactions[0].date).toBeInstanceOf(Date);
});
