export function generatePassword() {
  let generatedCode = "PASS";
  let numbers = "0123456789";

  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * numbers.length);
    generatedCode += numbers.charAt(randomIndex);
  }

  return generatedCode;
}
