import mongoose from 'mongoose';

const Client = mongoose.model('Client', { name: String, email: String, company: String });

export default Client;
