import DriverModel from "models/Driver";
import { dbConnector } from "utils/dbConnector";
import { ACTIVE, BLOCKED, REMOVED } from "utils/status";

export const create = async (driver) => {
  console.log("creating driver >> ", driver);
  // create driver on the database
  await dbConnector();
  const driverModel = new DriverModel(driver);
  return await driverModel.save();
};

export const findAll = async () => {
  // find drivers from database
  console.log("finding all drivers");
  await dbConnector();

  const drivers = await DriverModel.find({ status: $or(ACTIVE, BLOCKED) });
  return drivers;
};

export const findById = async (id) => {
  // find driver by id from database
  console.log("finding driver by id >> ", id);
  await dbConnector();
  const driver = await DriverModel.findOne({
    _id: id,
    status: $or(ACTIVE, BLOCKED),
  });
  console.log("Found driver >> ", driver);
  return driver;
};

export const update = async (driver) => {
  // update driver on the database
  console.log("updating driver >> ", driver);
  await dbConnector();

  await DriverModel.findOneAndUpdate({ _id: driver._id }, driver);
  console.log("Driver updated >> ", driver);

  return driver;
};

export const remove = async (id) => {
  console.log("removing driver with id >> ", id);
  // set status to removed on the database
  await dbConnector();

  await DriverModel.findOneAndUpdate({ _id: id }, { status: REMOVED });
};

export const block = async (id) => {
  console.log("blocking driver with id >> ", id);
  // set status to blocked on the database
  await dbConnector();

  await DriverModel.findOneAndUpdate({ _id: id }, { status: BLOCKED });
};

export const unblock = async (id) => {
  console.log("unblocking driver with id >> ", id);
  // set status to active on the database
  await dbConnector();

  await DriverModel.findOneAndUpdate({ _id: id }, { status: ACTIVE });
};

export const submitLocation = async (id, location) => {
  console.log("submitLocation driver with id >> ", id);
  // set status to active on the database
  await dbConnector();

  await DriverModel.findOneAndUpdate({ _id: id }, { location: location });
};
