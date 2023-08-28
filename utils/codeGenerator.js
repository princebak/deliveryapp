import DeliveryModel from "models/Delivery";

export const generatePackCode = async () => {
  let generatedCode = "";
  try {
    while (generatedCode == "") {
      generatedCode = generate();
      let existingCode = await DeliveryModel.findOne(
        { packs: [{ code: generatedCode }] },
        { code }
      );
      if (existingCode) {
        generatedCode = "";
      }
    }
  } catch (error) {
    console.log("generateCode error >> " + error);
  }

  return generatedCode;
};

export const generateDeliveryCode = async () => {
  let generatedCode = "";
  try {
    while (generatedCode == "") {
      generatedCode = generate();
      let existingCode = await DeliveryModel.findOne(
        { code: generatedCode },
        { code }
      );
      if (existingCode) {
        generatedCode = "";
      }
    }
  } catch (error) {
    console.log("generateCode error >> " + error);
  }

  return generatedCode;
};

function generate() {
  let generatedCode = "";
  let letters =
    "ABCDEFGHIJKLMNPQRSTUVWXYZABCDEFGHIJKLMNPQRSTUVWXYZABCDEFGHIJKLMNPQRSTUVWXYZ";
  let numbers = "012345678901234567890123456789";

  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * letters.length);
    generatedCode += letters.charAt(randomIndex);
  }

  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * numbers.length);
    generatedCode += numbers.charAt(randomIndex);
  }

  return generatedCode;
}
