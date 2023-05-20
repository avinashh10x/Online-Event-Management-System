const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const BookingSchema = new Schema(
  {
    start_time: {
      type: Date,
      required: [true, 'Booking date is required.'],
    },
    end_time: {
      type: Date,
      required: [true, 'Booking end time is required.'],
    },
    duration: {
      type: Number,
      required: [true, 'Booking duration is required.'],
    },
    booking_status: {
      type: String,
      enum: ['pending', 'rejected', 'approved'],
      default: 'pending',
      required: [true, 'Booking status is required.'],
    },
    payment_status: {
      type: String,
      enum: ['pending', 'available', 'completed', 'unavailable'],
      default: 'pending',
      required: [true, 'Booking payment status is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Booking price is required.'],
    },
    venue: {
      type: Schema.Types.ObjectId,
      ref: 'Venue',
      required: true,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    review: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

BookingSchema.plugin(mongoosePaginate);

BookingSchema.index({ createdAt: 1 });

const Booking = model('Booking', BookingSchema);

Booking.syncIndexes();

module.exports = Booking;
