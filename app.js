const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;


app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');

const connection_string = process.env.CONNECTION_STRING;
const dataset_name = process.env.DATASET_NAME;
const COLLECTION_aimTrainer = process.env.COLLECTION_aimTrainer;
const COLLECTION_simonSays = process.env.COLLECTION_simonSays;
const COLLECTION_stratagemHero = process.env.COLLECTION_stratagemHero;
const COLLECTION_typingGame = process.env.COLLECTION_typingGame;

const client = new MongoClient(connection_string, {
    ssl: true
});


var userId = '0';
let user_count;
async function connectToDatabase() {
    try {
       await client.connect();
       console.log('Connected to MongoDB');
       db = client.db(dataset_name);
       user_count = await getUserCount();
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  }


app.use(express.static('public'));
app.get('/', (req, res) => {
 res.sendFile(__dirname + '/views/homepage.html');
});

app.get('/typing', (req, res) => {
 res.sendFile(__dirname + '/views/typing.html');
});

app.get('/StratagemHero', (req, res) => {
    res.sendFile(__dirname + '/views/StratagemHero.html');
});

app.get('/AimTrainer', (req, res) => {
    res.sendFile(__dirname + '/views/AimTrainer.html');
});

app.get('/SimonSays', (req, res) => {
    res.sendFile(__dirname + '/views/SimonSays.html');
});

app.get('/Profile', (req, res) => {
    res.sendFile(__dirname + '/views/Profile.html');
});

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});

app.get('/get-sentence', (req, res) => {
    let index = Math.floor(Math.random() * 100);
    res.send({sentence: fs.readFileSync('public/docs/texts.txt', 'utf8').split('\n')[index]});
})

// DataBase
connectToDatabase();

app.get('/get-aimTrainer', (req, res) => {
    res.send(db.collection(COLLECTION_aimTrainer).find());
})

app.post('/post-aimTrainer', (req, res) => {
  score = req.body.score;
  date = getDate();
  db.collection(COLLECTION_aimTrainer).insertOne({"_id":collection(COLLECTION_aimTrainer).countDocuments()+1,date, score, user_id: userId});
})

app.get('/get-simonSays', (req, res) => {
    res.send(db.collection(COLLECTION_simonSays).find());
})

app.post('/post-simonSays', (req, res) => {
  score = req.body.score;
  date = getDate();
  db.collection(COLLECTION_simonSays).insertOne({"_id":collection(COLLECTION_simonSays).countDocuments()+1,date, score, user_id: userId});
})

app.get('/get-typingGame', (req, res) => {
    res.send(db.collection(COLLECTION_typingGame).find());
})

app.post('/post-typingGame', (req, res) => {
  score = req.body.score;
  date = getDate();
  db.collection(COLLECTION_typingGame).insertOne({"_id":collection(COLLECTION_typingGame).countDocuments()+1,date, score, user_id: userId});
})

app.get('/get-stratagemHero', (req, res) => {
    res.send(db.collection(COLLECTION_stratagemHero).find());
})

app.post('/post-stratagemHero', (req, res) => {
  score = req.body.score;
  date = getDate();
  db.collection(COLLECTION_stratagemHero).insertOne({"_id":collection(COLLECTION_stratagemHero).countDocuments()+1,date, score, user_id: userId});
})


function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}

async function getUserCount() {
    try {
      const count = await db.collection('users').countDocuments();
      return count;
    } catch (error) {
        console.error("Error getting user count:", error);
    }
  }

  app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    console.log('register', username, password, email);
    if (await usernameExists(username)) {
      res.send("1");
    }else if (await emailExists(email)) {
      res.send("2");
    }else{
      const hashedPassword = await bcrypt.hash(password, 10);
      try{
          await db.collection('users').insertOne({ user_id : parseInt(user_count+1), username, password: hashedPassword, email });
        }
      catch{
        "-1"
      }
      console.log('User registered successfully');
      user_count++;
      res.send("0");
    }
  });
  

  async function getIdByUsername(username) {
    try {
       const user = await db.collection('users').findOne({ username });
       if (user) {
         return user.user_id.toString();
       } else { 
         return "User not found"; 
       }
    } catch (error) {
       console.error("Error getting user ID:", error);
       throw error; 
    }
   }

  async function usernameExists(username) {
    try {
       const user = await db.collection('users').findOne({ username });
       return user !== null;
    } catch (error) {
       console.error("Error checking username:", error);
       throw error;
    }
   }
   
   async function emailExists(email) {
    try {
       const user = await db.collection('users').findOne({ email });
       return user !== null;
    } catch (error) {
       console.error("Error checking email:", error);
       throw error;
    }
   }
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('login', username, password);
   
    if (!usernameExists(username)){
      return res.send("1");
    }
    const user = await db.collection('users').findOne({ username });
   try {
     
      const isMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result); 
          }
        });
      });
  
      if (isMatch) {
        userId = await getIdByUsername(username);
        console.log(userId, username);
      
        return res.send("0");
      } else {
        return res.send("1");
      }
   } catch (error) {
      console.error(error);
      return res.send("1");
   }
});
  
app.get('/check_login', (req, res) => {
    if (userId === "0") {
        res.send("0");
    }
    else {
        res.send(userId);
    }
   
})


app.get('/login', (req, res) => {
    res.send(fs.readFileSync('./views/login.html', 'utf8'));
});

app.get('/signup', (req, res) => {
    res.send(fs.readFileSync('./views/register.html', 'utf8'));
})

app.post('/logout', (req, res) => {
  userId = '0';
  res.sendStatus(200); 
});

app.get('/get_userInfo', (req, res) => {

  info = getUserNameAndEmail(userId);
  res.send(getUserNameAndEmail(userId));
})

async function getUserNameAndEmail(userId) {
  const user = await db.collection('users').findOne({user_id: parseInt(userId) });
  console.log(user);
  return { username: user.username, email: user.email };
}

