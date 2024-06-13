import { z } from 'zod';

const createRentalValidationSchema = z.object({
    body: z.object({
        bikeId: z.string({required_error: "Bike ID is required"}),
        startTime: z.string({ required_error: "Start Time is required" })
            .refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" })
    }),
});

export const rentalValidation = {
    createRentalValidationSchema
};
