# README #

## Global Dependencies
1. Node & NPM
	* Mac - `brew install nodejs`, `brew install npm`
	* Windows - Use the package installer from http://nodejs.org/
2. Gulp
	* `npm install -g gulp-cli`
3. Npm Check Updates
	* `npm i -g npm-check-updates`
4. Bower
	* `npm install -g bower`
5. Yarn
	* Mac - `brew install yarn`
	* Windows - Download installer from https://yarnpkg.com/lang/en/docs/install/#windows-tab

## Project Specific Dependencies
1. Create directory and CD into it
2. Clone repo into folder 
3. Remove old Git folder & create new repo for the project
	* `rm -rf .git`, `git init`
4. Run `yarn install` to install necessary dependencies from package.json
5. Edit plugins.sh file as necessary to add/remove any plugins that are needed for project, installed with bower
6. Run plugins script by using `./plugins.sh`
7. Run `gulp` to start all tasks necessary for development
	* Must use ctrl+c to end live-reload, or it will cause errors to re-start server
8. Edit/add/delete files as necessary, terminal will run a bunch of commands each time something is saved
9. End the live reload (ctrl+c) when finished developing
10. Run `gulp build` command to run build file
	* These files will now be placed into the Dist folder, which is concatenated and minified. These files are now ready for production (compiled, minified, etc)