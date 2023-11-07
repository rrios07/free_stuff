# free_stuff

Setting Up Prettier:

1. npm install prettier in the root directory of the project
2. add the following script to the scripts section of the top level package.json file:
  "format": "prettier --write './packages/**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
3. make sure that the .prettierrc file exists in the top level directory!

Code Style Guide:

The coding style enforced by prettier is as follows:
  1. Trailing commas are allowed following the es5 formatting rules
  2. The tab width is 4 spaces
  3. Semi-colons are NOT inherently required
  4. Single quotes are used over double quotes

To Use Prettier with VSCode:

1. Download the Prettier VSCode extension
2. Go into the VSCode settings (CMD + , on Mac) and search for "Format on save" and check the corresponding box
3. Restart VSCode

The editor should now format the file on save using the preferences stored in the .prettierrc file
