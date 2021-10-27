const mongoose = require('mongoose');
//const config = require('config');
//const db = config.get('mongoURI');
const redis=require('redis')

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.connString,
      {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
      }
    );
    console.log('Mongo DB connected ...');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const redisClient = async () => {
  try {
    
    const port = process.env.port || 6379;
  return  await redis.createClient(port);
  } catch (error) {
    console.log(error)
    process.exit();
  }
}
module.exports ={ connectDB,redisClient};
