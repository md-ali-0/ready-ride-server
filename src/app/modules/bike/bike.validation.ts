import { z } from 'zod';

const createBikeValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string({ required_error: 'Name is Required' }),
        pricePerHour: z.number(),
        cc: z.number(),
        year: z.number({ required_error: 'Year is Required' }),
        model: z.string({ required_error: 'Model is Required' }),
        brand: z.string({ required_error: 'Bran is Required' }),
    }),
});

const updateBikeValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        pricePerHour: z.number().optional(),
        isAvailable: z.boolean().optional(),
        cc: z.number().optional(),
        year: z.number().optional(),
        model: z.string().optional(),
        brand: z.string().optional(),
    }),
});

export const BikeValidation = {
    createBikeValidationSchema,
    updateBikeValidationSchema,
};
