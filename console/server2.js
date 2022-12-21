import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const digit = Math.round((Math.random() * 10))
console.log(`Число в диапазоне от ${digit-5} до ${digit+5}`)

rl.on('line', (input) => {
  if(input == digit) {
    console.log('Верно')
    rl.close();
  } else if (input > digit) {
    console.log('Меньше')
  } else if (input < digit) {
    console.log('Больше')
  }
});