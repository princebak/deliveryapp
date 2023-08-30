export function generatePassword() {
  let generatedCode = "";
  let letters = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
  let numbers = "0123456789";

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
