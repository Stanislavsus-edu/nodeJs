import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .command("current", "get a current date", {
    year: { type: "number", alias: "y", default: null },
    month: { type: "number", alias: "m", default: null },
    date: { type: "number", alias: "d", default: null },
  })
  .command("add", "get a future date", {
    year: { type: "number", alias: "y", default: 0 },
    month: { type: "number", alias: "m", default: 0 },
    date: { type: "number", alias: "d", default: 0 },
  })
  .command("sub", "get a past date", {
    year: { type: "number", alias: "y", default: 0 },
    month: { type: "number", alias: "m", default: 0 },
    date: { type: "number", alias: "d", default: 0 },
  })
  .parseSync();

const command = argv._[0];

const date = new Date();

switch (command) {
  case "current": {
    if (argv.year === 0) {
      console.log(date.getFullYear());
      break;
    }
    if (argv.month === 0) {
      console.log(date.getMonth());
      break;
    }
    if (argv.date === 0) {
      console.log(date.getDate());
      break;
    }
    console.log(date.toISOString());
    break;
  }
  case "add": {
    if (argv.year) {
      date.setFullYear(date.getFullYear() + Number(argv.year));
    } else if (argv.month) {
      date.setMonth(date.getMonth() + Number(argv.month));
    } else if (argv.date) {
      date.setDate(date.getDate() + Number(argv.date));
    }
    console.log(date.toISOString());
    break;
  }
  case "sub": {
    if (argv.year) {
      date.setFullYear(date.getFullYear() - Number(argv.year));
    } else if (argv.month) {
      date.setMonth(date.getMonth() - Number(argv.month));
    } else if (argv.date) {
      date.setDate(date.getDate() - Number(argv.date));
    }
    console.log(date.toISOString());
  }
}