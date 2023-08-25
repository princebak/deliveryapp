import DeliveryModel from "models/Delivery";
import DriverModel from "models/Driver";
import { dbConnector } from "utils/dbConnector";
import { CREATED, DELIVERED, ON_THE_WAY, PENDING, REMOVED } from "utils/status";

export const create = async (delivery) => {
  console.log("creating delivery >> ", delivery);
  // create delivery on the database
  await dbConnector();
  const deliveryModel = new DeliveryModel(delivery);
  return await deliveryModel.save();
};

export const findAll = async () => {
  // find deliveries from database
  console.log("finding all deliveries");
  const deliveries = await DeliveryModel.find({ status: $not(REMOVED) });
  return deliveries;
};

export const findById = async (id) => {
  // find delivery by id from database
  console.log("finding delivery by id >> ", id);
  await dbConnector();
  const delivery = await DeliveryModel.findOne({ _id: id });
  console.log("Found delivery >> ", delivery);
  return delivery;
};

export const update = async (delivery) => {
  // update delivery on the database
  console.log("updating delivery >> ", delivery);
  await DeliveryModel.findOneAndUpdate({ _id: delivery._id }, delivery);
  console.log("Delivery updated >> ", delivery);

  return delivery;
};

export const remove = async (id) => {
  console.log("removing delivery with id >> ", id);
  // set status to removed on the database
  const delivery = await DeliveryModel.findOne({ _id: id });
  if (delivery.status === CREATED) {
    await DeliveryModel.findOneAndUpdate({ _id: id }, { status: REMOVED });
    return {
      message: "The delivery was successfully removed.",
      status: 200,
    };
  } else {
    return {
      message:
        "The delivery status should be on CREATED to be removed, which means not affected to any Driver.",
      status: 400,
    };
  }
};

export const assignToDriver = async ({ deliveryId, driverId }) => {
  // update delivery on the database
  console.log(`assign To Driver ${driverId} to Delivery ${deliveryId}`);
  const driver = await DriverModel.findOne({ _id: driverId });
  const delivery = await DeliveryModel.findOne({ _id: deliveryId });

  if (driver && delivery.status === CREATED) {
    await DeliveryModel.findByIdAndUpdate(
      { _id: deliveryId },
      { driver: driverId, status: PENDING }
    );
    return {
      message: "the driver successfully affected to the delivery.",
      status: 200,
    };
  } else {
    return { message: "the driver doesn't exist.", status: 400 };
  }
};

export const removeFromDriver = async ({ deliveryId, driverId }) => {
  // update delivery on the database
  console.log(`assign To Driver ${driverId} to Delivery ${deliveryId}`);
  const driver = await DriverModel.findOne({ _id: driverId });
  const delivery = await DeliveryModel.findOne({ _id: deliveryId });

  if (driver && delivery.status === PENDING) {
    await DeliveryModel.findByIdAndUpdate(
      { _id: deliveryId },
      { driver: null, status: CREATED }
    );
    return {
      message: "the driver successfully removed from the delivery.",
      status: 200,
    };
  } else {
    return { message: "the driver doesn't exist.", status: 400 };
  }
};

export const pickUpByDriver = async ({ deliveryId }) => {
  // update delivery on the database
  console.log(`pickup delivery ${driverId}`);
  const delivery = await DeliveryModel.findOne({ _id: deliveryId });

  if (delivery.status === PENDING) {
    await DeliveryModel.findByIdAndUpdate(
      { _id: deliveryId },
      { status: ON_THE_WAY }
    );
    return { message: "the delivery successfully picked up.", status: 200 };
  } else {
    return {
      message:
        "the delivery can not be picked up, because it's status is not on PENDING, which means it is not yet affected to a Driver.",
      status: 400,
    };
  }
};

export const deliver = async ({ deliveryId, validationCode }) => {
  // update delivery on the database
  console.log(`deliver delivery ${deliveryId}`);
  const delivery = await DeliveryModel.findOne({ _id: deliveryId });

  if (delivery.status === ON_THE_WAY) {
    await DeliveryModel.findByIdAndUpdate(
      { _id: deliveryId },
      { status: DELIVERED }
    );
    return {
      message: "the delivery is delivered successfully.",
      status: 200,
    };
  } else {
    return {
      message:
        "the delivery can not be delivered, because it's status is not ON_THE_WAY, which means no Driver has picked it up.",
      status: 400,
    };
  }
};
