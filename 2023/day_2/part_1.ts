import fs from "node:fs";

const CONSTRAINTS = {
  red: 12,
  green: 13,
  blue: 14,
} as const;

class Subset {
  red: number = 0;
  green: number = 0;
  blue: number = 0;

  constructor(private input: string) {
    const colors = this.input.split(", ");

    for (const color of colors) {
      const [value, name] = color.split(" ");

      switch (name) {
        case "red":
          this.red = parseInt(value);
          break;
        case "green":
          this.green = parseInt(value);
          break;
        case "blue":
          this.blue = parseInt(value);
          break;
      }
    }
  }
}

class Game {
  id: number;
  subsets: Subset[];

  constructor(private input: string) {
    const [key, value] = this.input.trim().split(":");

    this.id = parseInt(key.replace("Game ", ""));
    this.subsets = value
      .trim()
      .split(";")
      .map((subset) => new Subset(subset.trim()));
  }

  colorFitsConstraint(color: "red" | "green" | "blue") {
    return (
      this.subsets.sort((a, b) => a[color] - b[color])[this.subsets.length - 1][
      color
      ] <= CONSTRAINTS[color]
    );
  }

  gameFitsConstraint() {
    return (
      this.colorFitsConstraint("red") &&
      this.colorFitsConstraint("green") &&
      this.colorFitsConstraint("blue")
    );
  }
}

const inputLines = fs
  .readFileSync(`${__dirname}/input.txt`, "utf8")
  .toString()
  .trim()
  .split("\n");

const games: Game[] = inputLines.map((inputLine) => new Game(inputLine));

const sumOfValidGameIds = games
  .filter((game) => game.gameFitsConstraint())
  .map((game) => game.id)
  .reduce((acc, id) => acc + id, 0);

console.log(sumOfValidGameIds);
