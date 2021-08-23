"use strict";
const express = require('express');
const session = require('express-session');
const app = express();
const fs = require("fs");
const mysql = require('mysql2');
const {
  JSDOM
} = require('jsdom');
const cors = require('cors');
const {
  check,
  validationResult
} = require('express-validator');

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use('/html', express.static('html'));

app.use(cors());

app.use(session({
  secret: 'super secret password',
  name: '50Greener',
  resave: false,
  saveUninitialized: true
}));

// Required for Google OAuth
const {
  OAuth2Client
} = require('google-auth-library');
const CLIENT_ID = "757498049885-81jenot2i75onqm6uhrli9m6kv5dg3i8.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);
app.use(express.json());

app.get('/', function (req, res) {
  let doc = fs.readFileSync('./html/skeleton.html', "utf8");

  let dom = new JSDOM(doc);
  let $ = require("jquery")(dom.window);

  let index = fs.readFileSync('./html/index.html', "utf8");
  let indexDOM = new JSDOM(index);
  let $index = require("jquery")(indexDOM.window);

  $("#content-to-replace").empty();
  $("#content-to-replace").html($index("body"));
  $("#linkToCSS").attr("href", "css/index.css");


  let dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  let d = new Date().toLocaleDateString("en-US", dateOptions);

  initDB();

  res.set('Server', '50Greener Engine');
  res.set('X-Powered-By', '50Greener');
  res.send(dom.serialize());

});

async function initDB() {

  const mysql = require('mysql2/promise');

  // THIS IS FOR LOCAL TESTING / DEVELOPMENT
//   var connection = await mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '',
//     multipleStatements: true
//   });

  // THIS IS FOR LIVE SERVER
  var connection = await mysql.createConnection({
    host: 'remotemysql.com',
    port: 3306,
    user: '06OMmbjb33',
    password: 'OjmVt5SYvi',
    multipleStatements: true
  });

  const createDBAndTables = `CREATE DATABASE IF NOT EXISTS accounts;
        use accounts;
        CREATE TABLE IF NOT EXISTS user (
        ID int NOT NULL AUTO_INCREMENT,
        username varchar(30),
        firstName varchar(30),
        lastName varchar(30),
        password varchar(30),
        oldscore DECIMAL(7),
        currentscore DECIMAL(7),
        transportscore DECIMAL(7),
        waterscore DECIMAL(7),
        homescore DECIMAL(7),
        foodscore DECIMAL(7),
        goal DECIMAL(7),
        email varchar(50),
        PRIMARY KEY (ID));`;

  await connection.query(createDBAndTables);

  await connection.end();

}

app.get('/mainpage', function (req, res) {
  if (req.session.loggedIn) {

    let skeletonFile = fs.readFileSync('./html/skeleton.html', "utf8");
    let skeletonDOM = new JSDOM(skeletonFile);
    let $skeleton = require("jquery")(skeletonDOM.window);

    let content = fs.readFileSync('./html/mainpage.html', "utf8");
    let contentDOM = new JSDOM(content);
    let $content = require("jquery")(contentDOM.window);

    $skeleton("#content-to-replace").empty();
    $skeleton("#content-to-replace").html($content("body"));
    $skeleton("#linkToCSS").attr("href", "css/mainpage.css");
    $skeleton("#profile_name").html(req.session.name);

    $skeleton("#nav-login").replaceWith("<div id='nav-logout' class='options'>Log Out</div>");

    res.set('Server', '50Greener Engine');
    res.set('X-Powered-By', '50Greener');
    res.send(skeletonDOM.serialize());

  } else {
    res.redirect('/');
  }
});

app.get('/get-breakdown-transport', function (req, res) {
  connection.query('SELECT transportscore FROM user WHERE username = ?', [currentUser], function (error, transportscore) {
    if (error) {
      throw error;
    }
    res.send(transportscore);
  });
});

app.get('/get-breakdown-water', function (req, res) {
  connection.query('SELECT waterscore FROM user WHERE username = ?', [currentUser], function (error, waterscore) {
    if (error) {
      throw error;
    }
    res.send(waterscore);
  });
});

app.get('/get-breakdown-home', function (req, res) {
  connection.query('SELECT homescore FROM user WHERE username = ?', [currentUser], function (error, homescore) {
    if (error) {
      throw error;
    }
    res.send(homescore);
  });
});

app.get('/get-breakdown-food', function (req, res) {
  connection.query('SELECT foodscore FROM user WHERE username = ?', [currentUser], function (error, foodscore) {
    if (error) {
      throw error;
    }
    res.send(foodscore);
  });
});

app.get('/get-Average', function (req, res) {
  connection.query('SELECT AVG(currentscore) AS average FROM user', function (error, results) {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get('/get-Minimum', function (req, res) {
  connection.query('SELECT MIN(currentscore) AS minimum FROM user', function (error, results) {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get('/get-Maximum', function (req, res) {
  connection.query('SELECT MAX(currentscore) AS maximum FROM user', function (error, results) {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get('/signup', function (req, res) {
  let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
  let skeletonDOM = new JSDOM(skeleton);
  let $skeleton = require("jquery")(skeletonDOM.window);

  let signup = fs.readFileSync('./html/signup.html', "utf8");
  let signupDOM = new JSDOM(signup);
  let $signup = require("jquery")(signupDOM.window);

  $skeleton("#content-to-replace").empty();
  $skeleton("#content-to-replace").html($signup("body"));
  $skeleton("#linkToCSS").attr("href", "css/signup.css");

  res.set('Server', '50Greener Engine');
  res.set('X-Powered-By', '50Greener');
  res.send(skeletonDOM.serialize());
});

app.get('/login', function (req, res) {
  let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
  let skeletonDOM = new JSDOM(skeleton);
  let $skeleton = require("jquery")(skeletonDOM.window);

  let login = fs.readFileSync('./html/login.html', "utf8");
  let loginDOM = new JSDOM(login);
  let $login = require("jquery")(loginDOM.window);

  $skeleton("#content-to-replace").empty();
  $skeleton("#content-to-replace").html($login("body"));
  $skeleton("#linkToCSS").attr("href", "css/login.css");

  res.set('Server', '50Greener Engine');
  res.set('X-Powered-By', '50Greener');
  res.send(skeletonDOM.serialize());
});

app.get('/about', function (req, res) {
  if (req.session.loggedIn) {

    let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
    let skeletonDOM = new JSDOM(skeleton);
    let $skeleton = require("jquery")(skeletonDOM.window);

    let about = fs.readFileSync('./html/about.html', "utf8");
    let aboutDOM = new JSDOM(about);
    let $about = require("jquery")(aboutDOM.window);

    $skeleton("#content-to-replace").empty();
    $skeleton("#content-to-replace").html($about("body"));
    $skeleton("#linkToCSS").attr("href", "css/about.css");

    $skeleton("#nav-login").replaceWith("<div id='nav-logout' class='options'>Log Out</div>");

    res.set('Server', '50Greener Engine');
    res.set('X-Powered-By', '50Greener');
    res.send(skeletonDOM.serialize());
  } else {
    res.redirect('/');
  }
});

app.get('/challenges', function (req, res) {

  if (req.session.loggedIn) {
    let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
    let skeletonDOM = new JSDOM(skeleton);
    let $skeleton = require("jquery")(skeletonDOM.window);

    let challenges = fs.readFileSync('./html/challenges.html', "utf8");
    let challengesDOM = new JSDOM(challenges);
    let $challenges = require("jquery")(challengesDOM.window);

    $skeleton("#content-to-replace").empty();
    $skeleton("#content-to-replace").html($challenges("body"));
    $skeleton("#linkToCSS").attr("href", "css/challenges.css");

    $skeleton("#nav-login").replaceWith("<div id='nav-logout' class='options'>Log Out</div>");

    res.set('Server', '50Greener Engine');
    res.set('X-Powered-By', '50Greener');
    res.send(skeletonDOM.serialize());
  } else {
    res.redirect('/');
  }
});

app.get('/challenges-populate-water', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./json/water.json', (err, data) => {
    var jsonObj = JSON.parse(data);
    var numOfChallenges = 10 //Change here for number of challenges
    var challenges = [];
    while (challenges.length < 3) {
      var rng = Math.floor(Math.random() * numOfChallenges);
      var existFlag = false;
      if (challenges.length == 0) {
        challenges.push(rng);
      } else {
        for (let i = 0; i < challenges.length; i++) {
          if (rng == challenges[i]) {
            existFlag = true;
            break;
          };
        };
        if (existFlag == false) {
          challenges.push(rng);
        };
      };
    };
    var dataToSend = [];
    for (let i = 0; i < challenges.length; i++) {
      dataToSend.push(jsonObj[challenges[i]])
    };
    res.send(dataToSend);
  });
});

app.get('/challenges-populate-food', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./json/food.json', (err, data) => {
    var jsonObj = JSON.parse(data);
    var numOfChallenges = 10 //Change here for number of challenges
    var challenges = [];
    while (challenges.length < 3) {
      var rng = Math.floor(Math.random() * numOfChallenges);
      var existFlag = false;
      if (challenges.length == 0) {
        challenges.push(rng);
      } else {
        for (let i = 0; i < challenges.length; i++) {
          if (rng == challenges[i]) {
            existFlag = true;
            break;
          };
        };
        if (existFlag == false) {
          challenges.push(rng);
        };
      };
    };
    var dataToSend = [];
    for (let i = 0; i < challenges.length; i++) {
      dataToSend.push(jsonObj[challenges[i]])
    };
    res.send(dataToSend);
  });
});

app.get('/challenges-populate-commute', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./json/commute.json', (err, data) => {
    var jsonObj = JSON.parse(data);
    var numOfChallenges = 10 //Change here for number of challenges
    var challenges = [];
    while (challenges.length < 3) {
      var rng = Math.floor(Math.random() * numOfChallenges);
      var existFlag = false;
      if (challenges.length == 0) {
        challenges.push(rng);
      } else {
        for (let i = 0; i < challenges.length; i++) {
          if (rng == challenges[i]) {
            existFlag = true;
            break;
          };
        };
        if (existFlag == false) {
          challenges.push(rng);
        };
      };
    };
    var dataToSend = [];
    for (let i = 0; i < challenges.length; i++) {
      dataToSend.push(jsonObj[challenges[i]])
    };
    res.send(dataToSend);
  });
});

app.get('/challenges-populate-home', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./json/home.json', (err, data) => {
    var jsonObj = JSON.parse(data);
    var numOfChallenges = 10 //Change here for number of challenges
    var challenges = [];
    while (challenges.length < 3) {
      var rng = Math.floor(Math.random() * numOfChallenges);
      var existFlag = false;
      if (challenges.length == 0) {
        challenges.push(rng);
      } else {
        for (let i = 0; i < challenges.length; i++) {
          if (rng == challenges[i]) {
            existFlag = true;
            break;
          };
        };
        if (existFlag == false) {
          challenges.push(rng);
        };
      };
    };
    var dataToSend = [];
    for (let i = 0; i < challenges.length; i++) {
      dataToSend.push(jsonObj[challenges[i]])
    };
    res.send(dataToSend);
  });
});

app.get('/goals', function (req, res) {
  if (req.session.loggedIn) {

    let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
    let skeletonDOM = new JSDOM(skeleton);
    let $skeleton = require("jquery")(skeletonDOM.window);

    let goals = fs.readFileSync('./html/goals.html', "utf8");
    let goalsDOM = new JSDOM(goals);
    let $goals = require("jquery")(goalsDOM.window);

    $skeleton("#content-to-replace").empty();
    $skeleton("#content-to-replace").html($goals("body"));
    // $skeleton("#linkToCSS").attr("href", "css/challenges.css");
    // $skeleton("#linkToCSS2").attr("href", "css/barfiller.css");
    $skeleton("#linkToCSS3").attr("href", "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined");
    $skeleton("#linkToCSS4").attr("href", "css/goals.css");

    $skeleton("#nav-login").replaceWith("<div id='nav-logout' class='options'>Log Out</div>");

    res.set('Server', '50Greener Engine');
    res.set('X-Powered-By', '50Greener');
    res.send(skeletonDOM.serialize());
  } else {
    res.redirect('/');
  }
});

app.get('/information', function (req, res) {

  if (req.session.loggedIn) {
    let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
    let skeletonDOM = new JSDOM(skeleton);
    let $skeleton = require("jquery")(skeletonDOM.window);

    let information = fs.readFileSync('./html/information.html', "utf8");
    let informationDOM = new JSDOM(information);
    let $information = require("jquery")(informationDOM.window);

    $skeleton("#content-to-replace").empty();
    $skeleton("#content-to-replace").html($information("body"));
    $skeleton("#linkToCSS").attr("href", "css/information.css");
    $skeleton("#linkToCSS3").attr("href", "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined");

    $skeleton("#nav-login").replaceWith("<div id='nav-logout' class='options'>Log Out</div>");

    res.set('Server', '50Greener Engine');
    res.set('X-Powered-By', '50Greener');
    res.send(skeletonDOM.serialize());
  } else {
    res.redirect('/');
  }
});

app.get('/information-stuff', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  let flag = req.query['flag'];
  if (flag == "water information") {
    fs.readFile('./json/information-water.json', (err, data) => {
      var jsonObj = JSON.parse(data);
      res.send(jsonObj);
    });
  };
  if (flag == "food information") {
    fs.readFile('./json/information-food.json', (err, data) => {
      var jsonObj = JSON.parse(data);
      res.send(jsonObj);
    });
  };
  if (flag == "commute information") {
    fs.readFile('./json/information-commute.json', (err, data) => {
      var jsonObj = JSON.parse(data);
      res.send(jsonObj);
    });
  };
  if (flag == "home information") {
    fs.readFile('./json/information-home.json', (err, data) => {
      var jsonObj = JSON.parse(data);
      res.send(jsonObj);
    });
  };
  if (flag == "other information") {
    fs.readFile('./json/information-links.json', (err, data) => {
      var jsonObj = JSON.parse(data);
      res.send(jsonObj);
    });
  };
});

app.get('/settings', function (req, res) {
  if (req.session.loggedIn) {

    let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
    let skeletonDOM = new JSDOM(skeleton);
    let $skeleton = require("jquery")(skeletonDOM.window);

    let settings = fs.readFileSync('./html/settings.html', "utf8");
    let settingsDOM = new JSDOM(settings);
    let $settings = require("jquery")(settingsDOM.window);

    $skeleton("#content-to-replace").empty();
    $skeleton("#content-to-replace").html($settings("body"));
    $skeleton("#linkToCSS").attr("href", "css/settings.css");

    $skeleton("#nav-login").replaceWith("<div id='nav-logout' class='options'>Log Out</div>");

    res.set('Server', '50Greener Engine');
    res.set('X-Powered-By', '50Greener');
    res.send(skeletonDOM.serialize());
  } else {
    res.redirect('/');
  }
});

app.get('/survey-intro', function (req, res) {
  if (req.session.loggedIn) {

    let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
    let skeletonDOM = new JSDOM(skeleton);
    let $skeleton = require("jquery")(skeletonDOM.window);

    let survey = fs.readFileSync('./html/survey-intro.html', "utf8");
    let surveyDOM = new JSDOM(survey);
    let $survey = require("jquery")(surveyDOM.window);

    $skeleton("#content-to-replace").empty();
    $skeleton("#content-to-replace").html($survey("body"));
    $skeleton("#linkToCSS").attr("href", "css/survey.css");

    $skeleton("#nav-login").replaceWith("<div id='nav-logout' class='options'>Log Out</div>");

    res.set('Server', '50Greener Engine');
    res.set('X-Powered-By', '50Greener');
    res.send(skeletonDOM.serialize());
  } else {
    res.redirect('/');
  }
});

app.get('/survey-transport', function (req, res) {
  if (req.session.loggedIn) {

    let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
    let skeletonDOM = new JSDOM(skeleton);
    let $skeleton = require("jquery")(skeletonDOM.window);

    let survey = fs.readFileSync('./html/survey-transport.html', "utf8");
    let surveyDOM = new JSDOM(survey);
    let $survey = require("jquery")(surveyDOM.window);

    $skeleton("#content-to-replace").empty();
    $skeleton("#content-to-replace").html($survey("body"));
    $skeleton("#linkToCSS").attr("href", "css/survey.css");

    $skeleton("#nav-login").replaceWith("<div id='nav-logout' class='options'>Log Out</div>");

    res.set('Server', '50Greener Engine');
    res.set('X-Powered-By', '50Greener');
    res.send(skeletonDOM.serialize());
  } else {
    res.redirect('/');
  }
});

app.get('/survey-water', function (req, res) {
  if (req.session.loggedIn) {

    let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
    let skeletonDOM = new JSDOM(skeleton);
    let $skeleton = require("jquery")(skeletonDOM.window);

    let survey = fs.readFileSync('./html/survey-water.html', "utf8");
    let surveyDOM = new JSDOM(survey);
    let $survey = require("jquery")(surveyDOM.window);

    $skeleton("#content-to-replace").empty();
    $skeleton("#content-to-replace").html($survey("body"));
    $skeleton("#linkToCSS").attr("href", "css/survey.css");

    $skeleton("#nav-login").replaceWith("<div id='nav-logout' class='options'>Log Out</div>");

    res.set('Server', '50Greener Engine');
    res.set('X-Powered-By', '50Greener');
    res.send(skeletonDOM.serialize());
  } else {
    res.redirect('/');
  }
});

app.get('/survey-home', function (req, res) {
  if (req.session.loggedIn) {

    let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
    let skeletonDOM = new JSDOM(skeleton);
    let $skeleton = require("jquery")(skeletonDOM.window);

    let survey = fs.readFileSync('./html/survey-home.html', "utf8");
    let surveyDOM = new JSDOM(survey);
    let $survey = require("jquery")(surveyDOM.window);

    $skeleton("#content-to-replace").empty();
    $skeleton("#content-to-replace").html($survey("body"));
    $skeleton("#linkToCSS").attr("href", "css/survey.css");

    $skeleton("#nav-login").replaceWith("<div id='nav-logout' class='options'>Log Out</div>");

    res.set('Server', '50Greener Engine');
    res.set('X-Powered-By', '50Greener');
    res.send(skeletonDOM.serialize());
  } else {
    res.redirect('/');
  }
});

app.get('/survey-food', function (req, res) {
  if (req.session.loggedIn) {

    let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
    let skeletonDOM = new JSDOM(skeleton);
    let $skeleton = require("jquery")(skeletonDOM.window);

    let survey = fs.readFileSync('./html/survey-food.html', "utf8");
    let surveyDOM = new JSDOM(survey);
    let $survey = require("jquery")(surveyDOM.window);

    $skeleton("#content-to-replace").empty();
    $skeleton("#content-to-replace").html($survey("body"));
    $skeleton("#linkToCSS").attr("href", "css/survey.css");

    $skeleton("#nav-login").replaceWith("<div id='nav-logout' class='options'>Log Out</div>");

    res.set('Server', '50Greener Engine');
    res.set('X-Powered-By', '50Greener');
    res.send(skeletonDOM.serialize());
  } else {
    res.redirect('/');
  }
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

var currentUser;

app.post('/authenticate', [
    check('loginUsername').trim().escape().notEmpty().withMessage("Enter username"),
    check('loginPassword').trim().escape().notEmpty().withMessage("Enter password"),
  ],
  function (req, res) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      res.setHeader('Content-Type', 'application/json');
      let results = authenticate(req.body.loginUsername, req.body.loginPassword,
        function (rows) {
          if (rows == null) {
            res.send({
              status: "fail",
              msg: "User account not found."
            });
          } else {
            currentUser = req.body.loginUsername;
            req.session.loggedIn = true;
            req.session.name = rows.firstName;
            req.session.save(function (err) {})
            res.send({
              status: "success",
              msg: "Logged in."
            });
          }
        });
    }
  });

// THIS IS FOR LOCAL TESTING / DEVELOPMENT
// var connection = mysql.createPool({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '',
//   database: 'accounts',
//   connectionLimit: 10,
//   queueLimit: 0
// });

// THIS IS FOR LIVE SERVER
var connection = mysql.createPool({
  host: 'remotemysql.com',
  port: 3306,
  user: '06OMmbjb33',
  password: 'OjmVt5SYvi',
  database: '06OMmbjb33',
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/authenticategoogle', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let token = req.body.token;

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const email = payload['email'];
    const firstname = payload['given_name'];
    const lastname = payload['family_name'];

    let results = authenticate(email, userid,
      function (rows) {
        if (rows == null) {

          insertUser(email, firstname, lastname, userid,
            function () {
              currentUser = email;
              req.session.loggedIn = true;
              req.session.save(function (err) {});
            });
          res.send({
            status: "success",
            msg: "Added new user"
          });
        } else {
          currentUser = rows.username;
          req.session.loggedIn = true;
          req.session.name = rows.firstName;
          req.session.save(function (err) {})
          res.send({
            status: "success",
            msg: "Logged in"
          });
        }
      });
  }
  verify().catch(console.error);
});

function authenticate(username, pwd, callback) {
  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ?", [username, pwd],
    function (error, results) {
      if (error) {
        throw error;
      }

      if (results.length > 0) {
        return callback(results[0]);
      } else {
        return callback(null);
      }

    });

}

app.post('/newUser', [
    check('signupUsername').trim().escape().notEmpty().withMessage("Enter username").isLength({
      min: 3,
      max: 20
    }).withMessage("Username must be between 3-20 characters").isAlphanumeric().withMessage("Username can only contain letters/numbers"),
    check('signupFirstName').trim().escape().notEmpty().withMessage("Enter first name").isLength({
      min: 3,
      max: 20
    }).withMessage("First name must be between 3-20 characters").isAlpha().withMessage("First name can only contain letters"),
    check('signupLastName').trim().escape().notEmpty().withMessage("Enter last name").isLength({
      min: 3,
      max: 20
    }).withMessage("Last name must be between 3-20 characters").isAlpha().withMessage("Last name can only contain letters"),
    check('signupPassword').trim().escape().notEmpty().withMessage("Enter password").isLength({
      min: 6
    }).withMessage("Password must contain at least 6 characters"),
  ],
  function (req, res) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      res.setHeader('Content-Type', 'application/json');

      let results = insertUser(req.body.signupUsername, req.body.signupFirstName, req.body.signupLastName, req.body.signupPassword,
        function (rows) {
          if (rows == null) {
            res.send({
              status: "fail",
              msg: "This username already exists."
            });
          } else {
            currentUser = req.body.signupUsername;
            req.session.loggedIn = true;
            req.session.name = rows.firstName;
            req.session.save(function (err) {})
            res.send({
              status: "success",
              msg: "Signed up."
            });
          }
        });
    }
  });


function insertUser(username, firstName, lastName, pwd, callback) {

  connection.query(
    "SELECT * FROM user WHERE username = ?", [username],
    function (error, results) {
      if (error) {
        throw error;
      }

      if (results.length > 0) {
        return callback(null);

      } else {
        connection.query(
          "INSERT INTO user (username, firstName, lastName, password) values (?, ?, ?, ?)", [username, firstName, lastName, pwd],
          function (error, results) {
            if (error) {
              throw error;
            }
            connection.query(
              "SELECT * FROM user WHERE username = ? AND password = ?", [username, pwd],
              function (error, results) {
                if (error) {
                  throw error;
                }
                if (results.length > 0) {
                  return callback(results[0]);
                } else {
                  return callback(null);
                }
              });
          });
      }

    });

}

app.post('/set-old-score', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  connection.query('UPDATE user SET oldScore = ?, currentscore = ?, transportscore = ?, waterscore = ?, homescore = ?, foodscore = ? WHERE username = ?',
    [req.body.score, req.body.score, req.body.tScore, req.body.wScore, req.body.hScore, req.body.fScore, currentUser],
    function (error, results, fields) {
      if (error) {
        throw error;
      }

      res.send({
        status: "success",
        msg: "Score updated."
      });

    });
  // connection.end();

});

app.post('/update-water', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT currentscore, waterscore FROM user WHERE username = ?', [currentUser], function (error, results) {
    if (error) {
      throw error;
    }
    let newscore = parseInt(results[0].currentscore) + parseInt(req.body.wscore);
    let newwaterscore = parseInt(results[0].waterscore) + parseInt(req.body.wscore);

    connection.query('UPDATE user SET currentscore = ?, waterscore = ? WHERE username = ?',
      [newscore, newwaterscore, currentUser],
      function (error, results, fields) {
        if (error) {
          throw error;
        }

        res.send({
          status: "success",
          msg: "Score updated."
        });

      });
  });
});

app.post('/update-food', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT currentscore, foodscore FROM user WHERE username = ?', [currentUser], function (error, results) {
    if (error) {
      throw error;
    }
    let newscore = parseInt(results[0].currentscore) + parseInt(req.body.fscore);
    let newfoodscore = parseInt(results[0].foodscore) + parseInt(req.body.fscore);

    connection.query('UPDATE user SET currentscore = ?, foodscore = ? WHERE username = ?',
      [newscore, newfoodscore, currentUser],
      function (error, results, fields) {
        if (error) {
          throw error;
        }

        res.send({
          status: "success",
          msg: "Score updated."
        });

      });
  });
});

app.post('/update-transport', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT currentscore, transportscore FROM user WHERE username = ?', [currentUser], function (error, results) {
    if (error) {
      throw error;
    }
    let newscore = parseInt(results[0].currentscore) + parseInt(req.body.tscore);
    let newtransportscore = parseInt(results[0].transportscore) + parseInt(req.body.tscore);

    connection.query('UPDATE user SET currentscore = ?, transportscore = ? WHERE username = ?',
      [newscore, newtransportscore, currentUser],
      function (error, results, fields) {
        if (error) {
          throw error;
        }

        res.send({
          status: "success",
          msg: "Score updated."
        });

      });
  });
});

app.post('/update-home', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT currentscore, homescore FROM user WHERE username = ?', [currentUser], function (error, results) {
    if (error) {
      throw error;
    }
    let newscore = parseInt(results[0].currentscore) + parseInt(req.body.hscore);
    let newhomescore = parseInt(results[0].homescore) + parseInt(req.body.hscore);

    connection.query('UPDATE user SET currentscore = ?, homescore = ? WHERE username = ?',
      [newscore, newhomescore, currentUser],
      function (error, results, fields) {
        if (error) {
          throw error;
        }

        res.send({
          status: "success",
          msg: "Score updated."
        });

      });
  });
});


app.get('/get-old-score', function (req, res) {

  connection.query('SELECT oldscore FROM user WHERE username = ?', [currentUser], function (error, results) {
    if (error) {
      throw error;
    }
    res.send(results);
  });
  // connection.end();

});

app.post('/update-goal', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  connection.query('UPDATE user SET goal = ? WHERE username = ?',
    [req.body.userGoal, currentUser],
    function (error) {
      if (error) {
        throw error;
      }

      res.send({
        status: "success",
        msg: "Record updated."
      });

    });
  // connection.end();

});

app.post('/changeUsername', [
  check('changeUsername').trim().escape().notEmpty().withMessage("Enter username").isLength({
    min: 3,
    max: 20
  }).withMessage("Username must be between 3-20 characters").isAlphanumeric().withMessage("Username can only contain letters/numbers"),
], function (req, res) {

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {

    res.setHeader('Content-Type', 'application/json');

    let results = changeUser(req.body.changeUsername,
      function (rows) {
        if (rows == null) {
          res.send({
            status: "fail",
            msg: "This username already exists. Try another one"
          });
        } else {
          currentUser = req.body.changeUsername;

          res.send({
            status: "success",
            msg: "Username updated."
          });
        }
      });
  }
});


function changeUser(newUsername, callback) {

  connection.query(
    "SELECT * FROM user WHERE username = ?", [newUsername],
    function (error, results) {
      if (error) {
        throw error;
      }

      if (results.length > 0) {
        return callback(null);

      } else {
        connection.query('UPDATE user SET username = ? WHERE username = ?',
          [newUsername, currentUser],
          function (error, results) {
            if (error) {
              throw error;
            }
          });
        connection.query(
          "SELECT * FROM user WHERE username = ?", [newUsername],
          function (error, results) {
            if (error) {
              throw error;
            }

            if (results.length > 0) {
              return callback(results[0]);
            } else {
              return callback(null);
            }
          });
      }
    });

}

app.post('/changePassword', [
  check('changePassword').trim().escape().notEmpty().withMessage("Enter password").isLength({
    min: 6
  }).withMessage("Password must contain at least 6 characters"),
], function (req, res) {

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {

    res.setHeader('Content-Type', 'application/json');

    connection.query('UPDATE user SET password = ? WHERE username = ?',
      [req.body.changePassword, currentUser],
      function (error, results) {
        if (error) {
          throw error;
        }
        res.send({
          status: "success",
          msg: "Password updated."
        });
      });
  }
});

app.post('/deleteUser', function (req, res) {

  res.setHeader('Content-Type', 'application/json');

  let results = deleteUser(req.body.confirmUsername, req.body.confirmPassword,
    function (success) {
      if (success == null) {
        res.send({
          status: "fail",
          msg: "The username and password entered do not match our records."
        });
      } else {
        currentUser = req.body.changeUsername;

        res.send({
          status: "success",
          msg: "User deleted."
        });
      }
    });

});


function deleteUser(username, password, callback) {

  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ?", [username, password],
    function (error, results) {
      if (error) {
        throw error;
      }

      if (results.length == 0) {
        return callback(null);

      } else {
        connection.query('DELETE FROM user WHERE username = ?',
          [username],
          function (error, results) {
            if (error) {
              throw error;
            }
            return callback("success");
          });
      }
    });

}

app.get('/get-current-score', function (req, res) {

  connection.query('SELECT currentscore FROM user WHERE username = ?', [currentUser], function (error, results) {
    if (error) {
      throw error;
    }
    res.send(results);
  });
  // connection.end();

});

app.get('/get-goal', function (req, res) {

  connection.query('SELECT goal FROM user WHERE username = ?', [currentUser], function (error, results) {
    if (error) {
      throw error;
    }
    res.send(results);
  });
  // connection.end();

});

app.get('/logout', function (req, res) {
  req.session.destroy(function (error) {
    if (error) {
      console.log(error);
    }
  });

  let skeleton = fs.readFileSync('./html/skeleton.html', "utf8");
  let skeletonDOM = new JSDOM(skeleton);
  let $skeleton = require("jquery")(skeletonDOM.window);
  $skeleton("#nav-logout").replaceWith("<div id='nav-login' class='options'>Log In</div>");
  res.redirect("/");
})

const port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
})
