const app = require('./app');
const config = require('./config/config');

// const Port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 3000;
app.listen(3000, () => {
  
  console.log("Server Started")
})
