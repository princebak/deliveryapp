import { CREATED } from "./status";

export const pack = {
  items: [Item],
  status: (String = CREATED),
  beneficiaryPhone: String,
  beneficiaryAddress: String,
  beneficiaryEmail: String,
  note: String,
};

const Item = {
  name: String,
  quantity: Number,
  note: String,
};
