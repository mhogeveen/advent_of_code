import { readFileSync } from "node:fs";

const getFileContentsAsArray = (path: string): string[] => {
  const file = readFileSync(path);
  return file.toString().trim().split("\n");
};

const run = () => {
  const fileLines = getFileContentsAsArray(`${__dirname}/input.txt`);

  const calibrationValue = fileLines.reduce((acc, line) => {
    const numbers = line.split("").filter((char) => Number(char));

    const firstNumber = numbers.at(0);
    const lastNumber = numbers.at(-1);

    return acc + Number(`${firstNumber}${lastNumber}`);
  }, 0);

  console.log(calibrationValue);
};

run();
