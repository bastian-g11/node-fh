import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('BD is online');
  } catch (error) {
    console.log(error);
    throw new Error('Error initializing the database');
  }
};

export { dbConnection };
