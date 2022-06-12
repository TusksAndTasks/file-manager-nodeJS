import { dividePath } from '../helpers/dividePaths.js';
import * as fs from "fs";
import path from 'path';

export function copyFile(input, printError, printDir){
   const [prevName, newName] = dividePath(input);
   const fileName = path.parse(prevName).base;

   const readingStream = fs.createReadStream(prevName);
   const writeStream = fs.createWriteStream(path.resolve(newName, fileName), {flags: 'a'});

   readingStream.on('error',() => { 
    readingStream.destroy();
    printError();
    printDir();
});
  
  writeStream.on('error',() => { 
    readingStream.destroy();
    printError();
    printDir();
});

  writeStream.on('finish', () => {
    console.log('Copy successful!')
    printDir();
})
  
  readingStream.pipe(writeStream);
  
}