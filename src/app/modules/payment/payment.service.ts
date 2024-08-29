import httpStatus from "http-status";
import Stripe from "stripe";
import config from "../../config";
import AppError from "../../error/AppError";

const createPaymentIntent = async (payload: { amount: number; currency: string; }) => {
    const { amount, currency } = payload;

    const stripe = new Stripe(config.stripe_secret as string, {
        apiVersion: '2024-06-20',
    });

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: currency,
        });
        return paymentIntent.client_secret
    } catch (error) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Faild to create payment intent')
    }
};

export const PaymentService = {
    createPaymentIntent
};
