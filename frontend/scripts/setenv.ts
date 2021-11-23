const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const env = argv.environment;
const isProd:boolean = env === 'prod';
const targetPath = isProd
   ? './src/environments/environment.prod.ts'
   : './src/environments/environment.ts';
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
   export const environment = { 
      production: ${isProd}, 
      API_URL: "http://${process.env.API_URL}",
};` ;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err:any) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
}
	 );
