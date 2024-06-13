import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { startSession } from 'mongoose';
import AppError from '../../error/AppError';
import { Bike } from '../bike/bike.model';
import { User } from '../user/user.model';
import { IRental } from './rental.interface';
import { Rental } from './rental.model';

const createRental = async (user: JwtPayload, payload: IRental) => {
    const { bikeId, startTime } = payload;

    // checking if user exists
    const authUser = await User.findOne({ email: user.email });
    if (!authUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
    }

    // checking if bike exists
    const requestedBike = await Bike.findById(bikeId);
    if (!requestedBike) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bike Not Found');
    }

    const rentalData = {
        userId: authUser._id,
        bikeId,
        startTime,
    };

    // creating session
    const session = await startSession();

    try {
        // starting transaction session
        session.startTransaction();

        const createRental = await Rental.create([rentalData], { session });

        if (!createRental.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to create Rental',
            );
        }

        await Bike.findByIdAndUpdate(
            bikeId,
            {
                isAvailable: false,
            },
            { session },
        );

        await session.commitTransaction();
        return createRental;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }

    
};

export const RentalService = {
    createRental,
};
