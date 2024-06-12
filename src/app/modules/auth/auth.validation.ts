import { z } from 'zod'
import { UserRole } from '../user/user.constant'

const signUpValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is Required' }).trim(),
        email: z.string().email({ message: 'Email must be valid' }),
        password: z
            .string({ invalid_type_error: 'Password must be string' })
            .max(20, { message: "Password Can't be more then 20 characters" }),
        phone: z.string({ required_error: 'Phone Number is Required' }),
        address: z.string({ required_error: 'Address is Required' }).trim(),
        role: z.enum(UserRole, { message: 'Role must be admin or user' }),
    }),
})

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().email({ message: 'Email must be valid' }),
        password: z
            .string({ invalid_type_error: 'Password must be string' })
            .max(20, { message: "Password Can't be more then 20 characters" }),
    }),
})

export const AuthValidation = {
    signUpValidationSchema,
    loginValidationSchema,
}
