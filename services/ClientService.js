import ClientModel from "models/Client";
import { dbConnector } from "utils/dbConnector";
import { ACTIVE, REMOVED } from "utils/status";

export const create = async (client) => {
  console.log("creating client >> ", client);
  // create client on the database
  await dbConnector();
  const clientModel = new ClientModel(client);
  return await clientModel.save();
};

export const findAll = async () => {
  // find clients from database
  console.log("finding all clients");
  const clients = await ClientModel.find({ status: ACTIVE });
  return clients;
};

export const findById = async (id) => {
  // find client by id from database
  console.log("finding client by id >> ", id);
  await dbConnector();
  const client = await ClientModel.findOne({ _id: id, status: ACTIVE });
  console.log("Found client >> ", client);
  return client;
};

export const update = async (client) => {
  // update client on the database
  console.log("updating client >> ", client);
  await ClientModel.findOneAndUpdate({ _id: client._id }, client);
  console.log("Client updated >> ", client);

  return client;
};

export const remove = async (id) => {
  console.log("removing client with id >> ", id);
  // set status to removed on the database
  await ClientModel.findOneAndUpdate({ _id: id }, { status: REMOVED });
};

export const block = async (id) => {
  console.log("blocking client with id >> ", id);
  // set status to blocked on the database
  await ClientModel.findOneAndUpdate({ _id: id }, { status: REMOVED });
};

export const unblock = async (id) => {
  console.log("unblocking client with id >> ", id);
  // set status to blocked on the database
  await ClientModel.findOneAndUpdate({ _id: id }, { status: ACTIVE });
};
