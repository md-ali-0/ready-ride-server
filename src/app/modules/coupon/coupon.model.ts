import { Schema, model } from 'mongoose';
import { ICoupon } from './coupon.interface';

const couponSchema = new Schema<ICoupon>({
    code: { type: String, required: true, unique: true, trim: true },
    color: { type: String, required: true, unique: true, trim: true },
    discountValue: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    expirationDate: { type: Date },
}, {
    timestamps: true,
});

export const Coupon = model<ICoupon>('Coupon', couponSchema);
