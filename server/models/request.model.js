import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  request_type: {
    type: String,
    enum: ['User', 'Loan'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Hold', 'Rejected', 'Issued', 'Borrowed', 'Returned', "Unreturned"],
    required: true,
  },
  selected_stock_with_count: [{
    stock_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stock'
    },
    count: {
      type: Number,
      required: true
    }
  }],
  reason: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  start_date: {
    type: Date,
    
  },
  end_date: {
    type: Date,
  },
  approved_by: {
    type: String,
    ref: 'User',
  },
  issued_by: {
    type: String,
    ref: 'User',
  },
  
  returned_status: {
    type: String,
    enum: ['Good', 'Damaged', 'Lost'],
  },
  damaged_lost_stock_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock'
  },
  damaged_lost_count: {
    type: Number,
  },
  damaged_lost_description: {
    type: String,
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true,
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

export default Request;
