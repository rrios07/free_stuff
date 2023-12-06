# free Stuff SLO App
This is a simple web app to allow students and non-students in the SLO area to post any free items they would like to give away for free. 
Our app only allows students to claim free items, but allows anyone to give items away. The goal of this app is to help college students
find the essentials they need for free to remove stress from their lives, and to allow anyone to give back to the SLO community in a tractable
and fulfilling way. This app is a work in progress, but this repo represents it's current state. 

A link to our continuously deployed application can be found here: https://nice-pebble-0c243501e.4.azurestaticapps.net/

The draw.io link to our UML diagram is here: https://app.diagrams.net/#Hrrios07%2Ffree_stuff%2Fmain%2Ffree_stuff.drawio

Additionally, the UML diagram with some notes about it can be found in the 'UML.md' file in the top-level of this repository.

The link to our Figma project can be found here: https://www.figma.com/file/2etrsDlyBIzF1vAnrhIN9W/Figma-to-HTML-(Community)?type=design&mode=design

# Future Dev Info
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
2. Go into the VSCode settings (CMD + , on Mac) and search for "Formatter"
3. Set prettier as the default formatter, and check the box allowing format on save
4. Restart VSCode

The editor should now format the file on save using the preferences stored in the .prettierrc file
