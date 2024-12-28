import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || '';
let cachedConnection: mongoose.Connection | null = null;

export async function connectToDatabase() {
 
 

  // If cachedConnection exists and its readyState is 1 (which means it's connected), 
  //the function simply returns the cached connection.
  // This avoids creating new database connections if one is already active.
  if (cachedConnection && cachedConnection.readyState === 1) {
    return { db: cachedConnection };
  }

  try {
    // Establish a new connection if not cached(there's no cached connection).
    const connection = await mongoose.connect(uri, {
    });
       // After a successful connection, the connection.connection object is stored in cachedConnection,
       // so future requests can reuse this connection.
    cachedConnection = connection.connection;
    console.log('Connected to MongoDB');
    return { db: cachedConnection };
  } catch (error) {
    console.error('Failed to connect to MongoDB with Mongoose:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}