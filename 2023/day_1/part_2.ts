import { readFileSync } from "node:fs";

const getFileContentsAsArray = (path: string): string[] => {
  const file = readFileSync(path);
  return file.toString().trim().split("\n");
};

const run = () => {
  const fileLines = getFileContentsAsArray(`${__dirname}/input.txt`);

  const calibrationValue = fileLines.reduce((acc, line) => {
    const numbers = line
      .replace(/one/g, "one1one")
      .replace(/two/g, "two2two")
      .replace(/three/g, "three3three")
      .replace(/four/g, "four4four")
      .replace(/five/g, "five5five")
      .replace(/six/g, "six6six")
      .replace(/seven/g, "seven7seven")
      .replace(/eight/g, "eight8eight")
      .replace(/nine/g, "nine9nine")
      .split("")
      .filter((char: string) => Number(char));

    const firstNumber = numbers.at(0);
    const lastNumber = numbers.at(-1);

    return acc + Number(`${firstNumber}${lastNumber}`);
  }, 0);

  console.log(calibrationValue);
};

run();
