const mongoose = require('mongoose');

const ticketDetailSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },

   email: {
      type: String,
      required: true,
      unique: true
   },

   gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], 
      required: true
   },

   eventname: {
      type: String,
      required: true
   },

   eventdate: {
      type: Date,
      required: true
   },

   eventtime: {
      type: String,
      required: true
   },

   ticketprice: {
      type: Number,
      required: true
   },

   qr: {
      type: String,
      required: true,
      unique: true
   },

   eventType: {
      type: String,
      enum: ['Birthday', 'Anniversary', 'Concert', 'Conference', 'Wedding', 'Other'],   // Enum for event types
      required: true
   },

   phoneNumber: {
      type: String,
      required: true   
   },

   setNumber: {
      type: String     
   },

   specialRequests: {
      type: String     
   }
});

const ticketSchema = new mongoose.Schema({
   userid: {
      type: String,
      required: true
   },

   eventid: {
      type: String,
      required: true
   },

   ticketDetails: [ticketDetailSchema],   

   count: {
      type: Number,
      default: 0
   },
});

const TicketModel = mongoose.model('Ticket', ticketSchema);
module.exports = TicketModel;