const app = require('./app');
const config = require('./config/config');

// const Port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 3000;
app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000, () => {
  
  console.log("Server Started")
})
