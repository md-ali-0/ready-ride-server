import { Schema, model } from 'mongoose';
import { IRental } from './rental.interface';

const rentalSchema = new Schema<IRental>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
        startTime: { type: Date, required: true },
        returnTime: { type: Date, default: null },
        totalCost: { type: Number, required: true, default: 0 },
        isReturned: { type: Boolean, required: true, default: false },
        bookingPayment: { type: String, enum: ['paid' , 'unpaid'], required: true, default: 'unpaid' },
    },
    { timestamps: true },
);

export const Rental = model<IRental>('Rental', rentalSchema);
