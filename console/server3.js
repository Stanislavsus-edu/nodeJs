import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs';
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv._.join(' ')

const rl = readline.createInterface({ input, output });
const wrstream = fs.createWriteStream('logs.log', {flags: 'a'})
const rdstream = fs.createReadStream('logs.log')
const statistics = {'Выигрыш!': 0,'Проигрыш!': 0}

const print = (string, rec=false) => {
  rec ? console.log(string) : null;
  wrstream.write(`${string}\n`,)
}

const game  = () => {
  const digit = Math.round((Math.random() * 10))
  let attempt = 3
  print(`Число в диапазоне от ${digit-5} до ${digit+5}`, true)

  rl.on('line', (input) => {
    print(`${input}\n`)
    if(input == digit) {
      print('Выигрыш!\n', true)
      rl.close();
      return ;
    } else if (input > digit) {
      print('Меньше', true)
    } else if (input < digit) {
      print('Больше', true)
    }
    attempt -= 1
    print(`Осталось ${attempt} попыток\n`, true)
    if(attempt == 0){
      print('Проигрыш!\n', true)
      rl.close();
    }
  });
}

const countChunk = (result, str) => {
  let count = 0, pos = 0
  while(true){
    let res = str.indexOf(result, pos)
    if(res == -1) break
    pos += res + 1
    count += 1
  }
  statistics[`${result}`] += count
}

const data = () => {
  rdstream.on('data', (chunk) => {
    const str = chunk.toString()
    countChunk('Выигрыш!', str)
    countChunk('Проигрыш!', str)
  })

  rdstream.on('end', () => {
    argv == 'Количество игр' ? console.log(`Игр - ${statistics['Выигрыш!']+statistics['Проигрыш!']}`) : null
    argv == 'Количество побед' ? console.log(`Побед - ${statistics['Выигрыш!']}`) : null
    argv == 'Количество поражений' ? console.log(`Поражений - ${statistics['Проигрыш!']}`) : null
    argv == 'Процент побед' ? console.log(`Процент побед - ${Math.round(statistics['Выигрыш!']/(statistics['Проигрыш!']+statistics['Выигрыш!'])*100)}%`) : null
    rl.close()
  })
}

argv ? data() : game()