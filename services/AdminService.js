import AdminModel from "models/Admin";
import { dbConnector } from "utils/dbConnector";
import { ACTIVE, BLOCKED, REMOVED } from "utils/status";

export const create = async (admin) => {
  console.log("creating admin >> ", admin);
  // create admin on the database
  await dbConnector();
  const adminModel = new AdminModel(admin);
  return await adminModel.save();
};

export const findAll = async () => {
  // find admins from database
  console.log("finding all admins");
  await dbConnector();

  const admins = await AdminModel.find({ status: { $not: { $eq: REMOVED } } });
  return admins;
};

export const findById = async (id) => {
  // find admin by id from database
  console.log("finding admin by id >> ", id);
  await dbConnector();
  const admin = await AdminModel.findOne({
    _id: id,
    status: { $not: { $eq: REMOVED } },
  });
  console.log("Found admin >> ", admin);
  return admin;
};

export const update = async (admin) => {
  // update admin on the database
  console.log("updating admin >> ", admin);
  await dbConnector();

  await AdminModel.findOneAndUpdate({ _id: admin._id }, admin);
  console.log("Admin updated >> ", admin);

  return admin;
};

export const remove = async (id) => {
  console.log("removing admin with id >> ", id);
  // set status to removed on the database
  await dbConnector();

  await AdminModel.findOneAndUpdate({ _id: id }, { status: REMOVED });
};

export const block = async (id) => {
  console.log("blocking admin with id >> ", id);
  // set status to blocked on the database
  await dbConnector();

  await AdminModel.findOneAndUpdate({ _id: id }, { status: BLOCKED });
};

export const unblock = async (id) => {
  console.log("unblocking admin with id >> ", id);
  // set status to active on the database
  await dbConnector();

  await AdminModel.findOneAndUpdate({ _id: id }, { status: ACTIVE });
};
