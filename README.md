# Movie Wars Front end app
Here you can wind app on which you can see what is your favourite movie. After installing frontend, and it's backend app you will be able to choose between two movies at a time. You will do it until there will be only one movie left. YOUR FAVOURITE MOVIE.

# Tech stack
Backend is built on Express. It communicates with frontend via API. This app also communicates with OMDB API, to get information abut movies.

# Installing app
* You need to get all files and from github
* Before running you need to prepare DataBase to be useful. You can use either Empty structure, or filled db with movies, second choice will let you escape need to create account on OMDB API.
* If You chose empty DataBase, you need to create yourself account on OMDB API, and get **apikey** from there. *If You chose filled db, you can skip this and next step.* 
* on file **/config/configExample.ts** change every variable but **omdbAPIURL** and **servPort** into those used by your database and server app, and rename file into **config.ts**
* In console run command **"npm i"**
* In console run **"npm run start"**
* If You choose **filled database** you are ready to use app. Get on frontend app, and check what's your favourite movie. 
* If You choose empty database you need to do one more thing get on this link, and will your database with first 500 best movies od all time http://<yourhost>:3001/send-movies-to-database/updateMovies

That's it, it should be working fine with frontend app (you need to install it separately).

###IMPORTANT NOTICE
It works only with backend available under the LINKS hash

#----------LINKS---------
I might also create a replit working app. The link will be here. Until then, you can get two apps here.
##[Frontend](https://github.com/iwomipl/Movie-Wars-Front)

##[Backend](https://github.com/iwomipl/Movie-Wars-Back)