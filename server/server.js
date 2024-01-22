//server.js
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'communa_unity',
    keys: ['COOKIE_SECRET'],
    httpOnly: true,
  })
);

const db = require('./models');
const Role = db.role;

db.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((mongooseInstance) => {
    console.log('Successfully connect to MongoDB.');
    initial();
    return mongooseInstance.connection;
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        Promise.all([
          new Role({ name: 'user' }).save(),
          new Role({ name: 'moderator' }).save(),
          new Role({ name: 'admin' }).save(),
        ])
          .then(() => {
            console.log(
              "Added 'user', 'moderator', and 'admin' to roles collection."
            );
          })
          .catch((err) => {
            console.error('Error saving roles:', err);
          });
      }
    })
    .catch((err) => {
      console.error('Error estimating document count:', err);
    });
}

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/product.routes')(app);
require('./routes/order.routes')(app);
require('./routes/community.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
