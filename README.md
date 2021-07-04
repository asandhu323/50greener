# 50% Greener
View web application: http://50percentgreener-env.eba-dmue6s88.us-west-2.elasticbeanstalk.com/
## Contributors: 

| First Name | Last Name | Student Number |
| ---------- | --------- | -------------- |
| Oliver     | Harrison  | A01224701      |
| Victor     | Ly        | A00982554      |
| Kyung Min  | Song      | A01240214      |
| Avneet     | Sandhu    | A01256644      |

Oliver Harrison, Victor Ly, Kyung Min Song & Avneet Sandhu


* [General info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Contents](#content)
* [Set-up details](#set-up-details)


## General Info
This is a single-page web application design to promote awareness of one's environmental impact and help them to reduce it.

Problem: Climate emergency plan needs involvement from the community to meet goals set by the City. People want to participate but don't know how and needs an easy way to visualize and track their own emission levels as well as city-wide goals.

Solution: 50% Greener allows users to measure their initial carbon emissions score and then set a goal for reducing their carbon emissions and lowering their score. Users can check off tasks relating to ways in which they reduce their environmental impact, thus lowering their carbon emissions score.


## Features
Features created for this project

*	Landing page, with information
*	Nav bar with logo
*	Hamburger menu with link to about us, settings and login page
*	Footer with link to home, challenges and information page
*	Sign up link and login link
*	Sign up page that uses SQL database to create an account with username, first name, last name and password (as well as data for their goal, score etc.)
*	Sign up has requirements for fields (ex. password must contain 6 characters)
*	Button to begin a survey and a button to skip survey to set goal after signing up
*	Survey with fields to answer for transportation, water, home and diet that are random and taken from a pool of questions
*	Goals page to set a goal based on user’s current score
*	Note: up until the user completes the goal and survey links to the other pages won’t work
*	Main page includes a button to retake the survey or skip it and set a new goal
*	Username and score are displayed at the top
*	A dial is displayed to compare one to the average user of the site
*	A pie chart is displayed to show how high the user’s score is for each category
*	A tweet button to create a tweet on twitter
*	A share button to share with Facebook
*	The about us page has the story of the 50% Greener team
*	Creator icons that can be flipped to display the name and term
*	The logo in the top right can be clicked on as the easter egg, with 10 clicks it becomes 50% greener
*	The settings page allows the user to change their username, password or delete their account from the database
*	The challenges page has the user’s goal and is completed by a percentage of what is left of the user’s goal is left and how much they have completed with challenges
*	Different tabs open up challenges that are randomly taken from a pool
*	Challenges can be completed with the click of a button and decrease the carbon score and bring one closer to the goal they set
*	The information page has different tabs that show links and blurbs on information to learn how to reduce one’s carbon footprint
*	The logout button on the hamburger will log you out (only displayed when logged in)
*	The login page lets a user login through their account and remembers information on the user
*	Ability to login through google, using the google API


## Technologies
Technologies used for this project:

* HTML, CSS
* JavaScript, JQueryUI
* Node.js + modules
* SQL
* Visual Studio Code IDE
* GitHub
* AWS Beanstalk
* AWS RDS


## Content
Content of the project folder:

```
 Top level of project folder:
├── .gitignore               # Git ignore file
├── app.js                   # server-side code that runs the application
├── package-lock.json        # needed for node functionality
├── package.json             # needed for node functionality
└── README.md                # information on our application

It has the following subfolders and files:
├── node_modules           # Folder for node modules
├── images                 # Folder for images
    /50GreenerLogo.png          # logo for our application
    /avneet.png                 # picture of Avneet for about us page
    /challengesicon.png         # icon for challenges page in navbar
    /favicon.png                # favicon for browser tabs
    /hamicon.png                # hamburger menu icon
    /homeicon.png               # icon for home page in navbar
    /informationicon.png        # icon for information page in navbar
    /kyung.png                  # picture of Kyung for about us page
    /oliver.png                 # picture of Oliver for about us page
    /victor.png                 # picture of Victor for about us page
├── js                     # Folder for scripts
    /about.js                   # functions for the about page
    /challenges-populate.js     # functions to populate the challenges page with random challenges sorted by category
    /client.js                  # client side functionality that contacts server side code to make app interactive
    /egg.js                     # functions for the easter egg challenge
    /goals.js                   # functions to set a goal
    /information-populate.js    # functions to populate the information page with information sorted by category
    /login.js                   # functions to login and perform user authentication
    /mainpage-pie-chart.js      # functions for the pie chart on the home page
    /mainpage-semi-circle.js    # functions for the semicircle chart on the home page
    /signup.js                  # functions to sign up as a new user
    /survey.js                  # functions for the survey
    /tabs-challenges.js         # functions for the tabs on the challenges page
    /tabs-information.js        # functions for the tabs on the information page
├── css                    # Folder for styles
    /about.css                  # styling of the about us page
    /challenges.css             # styling of the challenges page
    /goals.css                  # styling of the goals page
    /index.css                  # styling of the index/landing page
    /information.css            # styling of the information page
    /login.css                  # styling of the login page
    /mainpage.css               # styling of the home page, once signed in
    /settings.css               # styling of the settings page
    /signup.css                 # styling of the signup page
    /skeleton.css               # general styling applied to all pages
    /survey.css                 # styling of the survey pages
├── html                   # Folder for html template files
    /about.html                  # html template of the about us page
    /challenges.html             # html template of the challenges page
    /goals.html                  # html template of the goals page
    /index.html                  # html template of the index/landing page
    /information.html            # html template of the information page
    /login.html                  # html template of the login page
    /mainpage.html               # html template of the home page, once signed in
    /settings.html               # html template of the settings page
    /signup.html                 # html template of the signup page
    /skeleton.html               # general html into which the templates are inserted, includes the top and bottom navbars
    /survey-food.html            # html template of the survey diet page
    /survey-home.html            # html template of the survey home page
    /survey-intro.html           # html template of the survey introduction page
    /survey-transport.html       # html template of the survey transportation page
    /survey-water.html           # html template of the survey water page
├── json                   # Folder for json data files
    /commute.json                # json content for transportation challenges
    /food.json                   # json content for diet challenges
    /home.json                   # json content for home challenges
    /information-commute.json    # json content for tranportation information
    /information-food.json       # json content for diet information
    /information-home.json       # json content for home information
    /information-links.json      # json content for information links
    /information-water.json      # json content for water information
    /water.json                  # json content for water challenges
├── tests                  # Folder for testing files
    /50 Greener tests.side       # Selenium testing file

```


## Set-up Details
1. IDE
    * Default Visual Studio Code 
2. Languages Used
    * HTML
    * CSS
    * JavaScript
    * JSON
    * SQL
3. Libraries Used
    1. jQuery
        * https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
    2. progressbar.js
        * https://cdnjs.cloudflare.com/ajax/libs/progressbar.js/1.1.0/progressbar.min.js
    3. charts.js
        * https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.2.0/chart.min.js
    4. Twitter API
        * https://platform.twitter.com/widgets.js
    5. Google API
        * https://apis.google.com/js/platform.js
4. Node js Modules
    * To download nodejs go to: https://nodejs.org/en/download/
    * Follow the setup installer using default settings.
    * To install nodejs modules use "npm install <module name>" when you're in the root directory
    * Please have the following nodejs modules installed (order does not matter):
        1. Express
        2. Express-Sessions
        3. fs
        4. mysql2
        5. jsdom
        6. cors
        7. Express-Validator
5. To log into AWS RDS and Elasticbean please use the following:
    * Link: https://190569847245.signin.aws.amazon.com/console
    * ID: 190569847245
    * Username: aws-50greener
    * Password: Please contact for password (not going to put a password here for security reasons)
6. Testing Plan
    * https://docs.google.com/spreadsheets/d/1VBIV45flaIrAe_BNfFgKvq_Vk-MQdrXEbFtzpPqwCV4/edit
