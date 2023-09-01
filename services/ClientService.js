import ClientModel from "models/Client";
import UserModel from "models/User";
import { dbConnector } from "utils/dbConnector";
import { generatePassword } from "utils/passwordGenerator";
import { ACTIVE, REMOVED } from "utils/status";
import { CLIENT } from "utils/userType";

export const create = async (client) => {
  console.log("creating client >> ", client);
  // create client on the database
  if (!client.password) {
    return { msg: "the password is mandatory." };
  }
  await dbConnector();
  const clientModel = new ClientModel(client);
  const savedClient = await clientModel.save();

  if (savedClient) {
    const user = {
      username: savedClient.phone,
      password: await hash(client.password, 10),
      type: CLIENT,
    };
    const userModel = new UserModel(user);
    await userModel.save();
  }

  return savedClient;
};

export const findAll = async () => {
  // find clients from database
  console.log("finding all clients");
  await dbConnector();

  const clients = await ClientModel.find({
    status: { $not: { $eq: REMOVED } },
  });
  return clients;
};

export const findById = async (id) => {
  // find client by id from database
  console.log("finding client by id >> ", id);
  await dbConnector();
  const client = await ClientModel.findOne({
    _id: id,
    status: { $not: { $eq: REMOVED } },
  });
  console.log("Found client >> ", client);
  return client;
};

export const update = async (client) => {
  // update client on the database
  console.log("updating client >> ", client);
  await dbConnector();

  await ClientModel.findOneAndUpdate({ _id: client._id }, client);
  console.log("Client updated >> ", client);

  return client;
};

export const remove = async (id) => {
  console.log("removing client with id >> ", id);
  // set status to removed on the database
  await dbConnector();

  await ClientModel.findOneAndUpdate({ _id: id }, { status: REMOVED });
};

export const block = async (id) => {
  console.log("blocking client with id >> ", id);
  // set status to blocked on the database
  await dbConnector();

  await ClientModel.findOneAndUpdate({ _id: id }, { status: REMOVED });
};

export const unblock = async (id) => {
  console.log("unblocking client with id >> ", id);
  // set status to blocked on the database
  await dbConnector();

  await ClientModel.findOneAndUpdate({ _id: id }, { status: ACTIVE });
};
