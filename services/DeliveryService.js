import DeliveryModel from "models/Delivery";
import DriverModel from "models/Driver";
import { generateDeliveryCode, generatePackCode } from "utils/codeGenerator";
import { dbConnector } from "utils/dbConnector";
import { CREATED, DELIVERED, ON_THE_WAY, PENDING, REMOVED } from "utils/status";

export const create = async (delivery) => {
  console.log("creating delivery >> ", delivery);
  // create delivery on the database
  await dbConnector();

  const validatePacks = [];
  for (let pack of delivery.packs) {
    pack.code = await generatePackCode();
    validatePacks.push(pack);
  }

  delivery.packs = validatePacks;
  delivery.code = await generateDeliveryCode();
  const deliveryModel = new DeliveryModel(delivery);

  const savedDelivery = deliveryModel.save();
  console.log("savedDelivery >> ", savedDelivery);

  return savedDelivery;
};

export const findAll = async () => {
  // find deliveries from database
  console.log("finding all deliveries");
  await dbConnector();

  const deliveries = await DeliveryModel.find({
    status: { $not: { $eq: REMOVED } },
  }); //.populate(["client", "driver"]);
  return deliveries;
};

export const findById = async (id) => {
  // find delivery by id from database
  console.log("finding delivery by id >> ", id);
  await dbConnector();
  const delivery = await DeliveryModel.findOne({
    _id: id,
    status: { $not: { $eq: REMOVED } },
  }); //.populate("client", "driver");
  console.log("Found delivery >> ", delivery);
  return delivery;
};

export const update = async (delivery) => {
  // update delivery on the database
  console.log("updating delivery >> ", delivery);
  await dbConnector();

  await DeliveryModel.findOneAndUpdate({ _id: delivery._id }, delivery);
  console.log("Delivery updated >> ", delivery);

  return delivery;
};

export const remove = async (id) => {
  console.log("removing delivery with id >> ", id);
  // set status to removed on the database
  await dbConnector();

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
  await dbConnector();

  const driver = await DriverModel.findOne({ _id: driverId });
  const delivery = await DeliveryModel.findOne({ _id: deliveryId });

  if (driver && (delivery.status === CREATED || delivery.status === PENDING)) {
    await DeliveryModel.findByIdAndUpdate(
      { _id: deliveryId },
      { driver: driverId, status: PENDING }
    );
    return {
      message: "the driver successfully affected to the delivery.",
      status: 200,
    };
  } else {
    return {
      message:
        "the driver doesn't exist, or the delivery status is not on CREATED.",
      status: 400,
    };
  }
};

export const removeFromDriver = async ({ deliveryId, driverId }) => {
  // update delivery on the database
  console.log(`assign To Driver ${driverId} to Delivery ${deliveryId}`);
  await dbConnector();

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
    return {
      message:
        "the driver doesn't exist or th delivery status is not on PENDING.",
      status: 400,
    };
  }
};

export const pickUpByDriver = async ({ deliveryId }) => {
  // update delivery on the database
  console.log(`pickup delivery ${driverId}`);
  await dbConnector();

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

export const deliver = async (validationCode) => {
  // update delivery on the database
  console.log(`deliver pack with validationCode >> ${validationCode}`);
  await dbConnector();

  const delivery = await DeliveryModel.findOne({
    packs: [{ code: validationCode }],
  });

  if (delivery.status === ON_THE_WAY) {
    let allPacksAreDelivered = true;
    let validationCodeMatched = false;
    for (let pack of delivery.packs) {
      if (pack.code === validationCode) {
        pack.status === DELIVERED;
        validationCodeMatched = true;
      }
      if (pack.status != DELIVERED) {
        allPacksAreDelivered = false;
      }
    }
    if (validationCodeMatched) {
      await DeliveryModel.findByIdAndUpdate(
        { _id: delivery._id },
        { status: DELIVERED }
      );
      return {
        message: "the delivery is delivered successfully.",
        status: 200,
      };
    } else {
      return {
        message:
          "the delivery pack can not be delivered, because the validation code didn't match.",
        status: 400,
      };
    }
  } else {
    return {
      message:
        "the delivery can not be delivered, because it's status is not ON_THE_WAY, which means no Driver has picked it up.",
      status: 400,
    };
  }
};
