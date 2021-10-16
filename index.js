#!/usr/bin/env node
/**
 * cli apps convert file to JSON or Plaintext
 * @author Amran Tirtana
 **/
const cli = require('commander');
const fs = require("fs");
const path = require('path');

const program = new cli.Command();
program.version('0.0.1')
  .description('Cli command conversions to Plaintext or JSON\nDefault is Plaintext \n@author Amran Tirtana\ncontact +62823 2090 2008');

program
  .usage("Usage:-c")
  .option('-c, --c <type>', 'is target to convert')
  .option('-o, --o <type>', 'is target output')
  .option('-t, --t <type>', 'output extension is Plaintext or JSON')
  .option('-r, --r <type>', 'rename target output')
  .parse();

const options = program.opts();

if (options.c){
  createFile(options.c,options.o,options.t,options.r)
}
else{
  console.log('error: option -c, --c <type> argument missing')
}

function createFile(c,o,t,r) {
  let to = '';
  let name = '';
  let name1 = '';
  let ext1 = '';
  let nameWithoutExt1 = '';
  let reExt = '';
  let pathBefore = o === undefined ? path.dirname(c).split(c).pop() : path.dirname(o).split(o).pop();
  name1 = path.basename(pathBefore);
  ext1 = path.extname(pathBefore);
  nameWithoutExt1 = path.basename(name1, ext1);

  reExt = t !== undefined  && (t === 'json' || t === 'text' )? '.'+t : ext1 ? ext1 : '.text';

  name = r ? r + reExt : nameWithoutExt1 + reExt;
  to = pathBefore + '/' +name;

  fs.readFile(c, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return true
    }
    fs.writeFile(to, data, function (err) {
      if (err) console.error(err);
      console.log('Convert success!');
      console.log(`file from    : ${c}\nto directory : ${to}\nextension    : ${t}\nrename       : ${name}`);
    });

  })
}
