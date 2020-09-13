import { pythagorasEquiRectangular } from "./location";
import * as path from "path";
import * as fs from "fs";

function resetDB(): void {
  console.log('"../db.json",', "../db.json");
  fs.writeFileSync("db.json", "");
}

export { pythagorasEquiRectangular, resetDB };
