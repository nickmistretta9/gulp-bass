# README #

1. Create directory and CD into it
2. Clone repo into folder 
3. Run start script 
```
#!bash

./start.sh
```
 to initialize gulp file structure 
   * Runs through npm init, which creates package.json file, and installs all necessary gulp plugins to use this structure
4. Edit plugins.sh file as necessary to whatever plugins are needed for project
   * Can remove any, need to find npm install version of any additional plugins 
5. Run plugins script 
```
#!bash

./plugins.sh
```
 to install all jquery plugins 
6. Run 
```
#!bash

gulp
```
to start server, pre-processor, live-reload, browser sync, watch, etc
   * Must use ctrl+c to end live-reload, or it will cause errors to re-start server
7. Edit/add/delete files as necessary, terminal will run a bunch of commands each time something is saved
8. End the live reload (ctrl+c) and run 
```
#!bash

gulp build
```
to run the build part of the file structure 
   * These files will now be placed into the Dist folder, which is concatenated and minified. These files are now ready for production