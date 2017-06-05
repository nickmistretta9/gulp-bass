# README #

1. Create directory and CD into it
2. Clone repo into folder 
3. Run `npm install` to install necessary dependencies from package.json
4. Edit plugins.sh file as necessary to add/remove any plugins that are needed for project, installed with bower
5. Run plugins script by typing `./plugins.sh`
6. Run `gulp` to start all tasks necessary for development
	* Must use ctrl+c to end live-reload, or it will cause errors to re-start server
7. Edit/add/delete files as necessary, terminal will run a bunch of commands each time something is saved
8. End the live reload (ctrl+c) when finished developing
9. Run `gulp build` command to run build file
	* These files will now be placed into the Dist folder, which is concatenated and minified. These files are now ready for production (compiled, minified, etc)