# Movie Wars Front end app
Here you can wind app on which you can see what is your favourite movie. After installing frontend, and it's backend app you will be able to choose between two movies at a time. You will do it until there will be only one movie left. YOUR FAVOURITE MOVIE.

# Tech stack
Backend is built on Express. It communicates with frontend via API. This app also communicates with OMDB API, to get information abut movies. To get updated list of Movies I created Browser snippet, so it can be easily updated if needed. 500 movies is enough to choose from, so update is not first choice feature for the app.    

#----------------WORKING DEMO ------------- Until end of August, maybe a little longer ----------------
##[MOVIE WARS](https://iwomi.networkmanager.pl/)

# Installing app
* You need to get all files and from github
* Before running you need to prepare DataBase to be useful. You can use either Empty structure, or filled db with movies, second choice will let you escape need to create account on OMDB API. Files are named **DBstructure.sql** and **DBstuctureAndData.sql** and are in main folder of app.
* If You chose empty DataBase, you need to create yourself account on OMDB API, and get **apikey** from there. *If You chose filled db, you can skip this and next step.* 
* on file **/config/configExample.ts** change every variable but **omdbAPIURL** and **servPort** into those used by your database and server app, and rename file into **config.ts**
* In console run command **"npm i"**
* In console run **"npm run start"**
* If You choose **filled database** you are ready to use app. Get on frontend app, and check what's your favourite movie. 
* If You choose empty database you need to do one more thing get on this link, and will your database with first 500 best (watch out, it will take 15 seconds to fill the db because of throttling, movies, that could not be stored will ve on file badMovies.txt) movies od all time **http://<yourhost>:3001/send-movies-to-database/updateMovies**
* Un added movies should be listed in file '.utils/badMovies.txt'

That's it, it should be working fine with frontend app (you need to install it separately).

###IMPORTANT NOTICE
It works only with backend available under the LINKS hash

#----------LINKS---------
I might also create a replit working app. The link will be here. Until then, you can get two apps here.
##[Frontend](https://github.com/iwomipl/Movie-Wars-Front)

##[Backend](https://github.com/iwomipl/Movie-Wars-Back)

#Browser Snippet
I have created a Browser snippet to get fresh data with current list of best movies out of a website. Its main goal is to extract the data from HTML. If You want to use it by yourself you need to adjust the code to extract proper variables from website, and change backendAddress domain to the one, you are using . After staring the snippet will connect to this server and update the list of movies in your database.    

#Planned updates
I want to add another features to frontend app, so backend would have to deal with it, those are:
* choosing from movies of one director
* choosing from movies in range of years they were released - DONE
* choosing from movies of one genre - DONE
* choosing from movies of one rating - DONE
* winning movie screen will show similar movies to the winning one by director or by genre

#Endpoints

## update movies
```bash
  @GET
  '//send-movies-to-database/updateMovies' - update movielist from a file
  @POST
  '//send-movies-to-database' - update movies list with a snippet
```
`File to update movie from should be a JSON File with array of objects having following structure:
{
"position":"number",
"origTitle":"original title",
"polTitle":"polish title",
"year":"number, year of release",
"imgOfMovie":"url to poster",
"genres":["array of strings with name of genre"]
}`
Name of file and folder in which file is located should be: './utils/topMoviesFromFile.ts'
Name of variable with array of objects should be: "topMoviesFromFile"

## update movies
```bash
  @GET
  '///get-list' - get list of genres of movies - frontend uses it to know how many movies of each genre are there 
  '/get-number' - get number of mvies that fit to data sent via body
  @POST
  '///get-list' - get list of exact number of movies of given genre
```
