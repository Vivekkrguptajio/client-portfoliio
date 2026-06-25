const mongoose = require('mongoose');
require('dotenv').config();
const Setting = require('./models/Setting');

mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI).then(async () => {
  const tools = await Setting.findOne({ key: 'designTools' });
  console.log("DB TOOLS:", JSON.stringify(tools, null, 2));
  process.exit(0);
});
