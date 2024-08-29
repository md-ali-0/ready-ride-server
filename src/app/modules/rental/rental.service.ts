import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { startSession } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
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
        return createRental[0];
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

const returnRental = async (id: string) => {
    const rental = await Rental.findById(id);

    if (!rental) {
        throw new AppError(httpStatus.NOT_FOUND, 'No Rental found');
    }

    const bikeId = rental.bikeId;
    const startTime: Date = new Date(rental.startTime);
    const currentTime: Date = new Date();

    const totalMilliseconds: number =
        currentTime.getTime() - startTime.getTime();
    const totalHours: number = totalMilliseconds / (1000 * 60 * 60);

    const roundedTotalHours: number = parseInt(totalHours.toFixed(0), 10);

    // creating session
    const session = await startSession();

    try {
        // starting transaction session
        session.startTransaction();

        const updateBike = await Bike.findByIdAndUpdate(
            bikeId,
            {
                isAvailable: true,
            },
            { session },
        );

        if (!updateBike) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Update Bike');
        }

        const updateRental = await Rental.findByIdAndUpdate(
            id,
            {
                returnTime: new Date(),
                totalCost: roundedTotalHours * updateBike?.pricePerHour,
                isReturned: true,
            },
            { new: true, session },
        );

        if (!updateRental) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to Update Rental',
            );
        }

        await session.commitTransaction();

        return updateRental;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

const getAllRentals = async (email: string, query: Record<string, unknown>) => {
    // checking if user exists
    const authUser = await User.findOne({ email });
    if (!authUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
    }

    const RentalQuery = new QueryBuilder(
        Rental.find({
            userId: authUser._id,
        }).populate('bikeId'),
        query,
    )
        .search(['bookingPayment'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await RentalQuery.countTotal();
    const data = await RentalQuery.modelQuery;

    return {
        meta,
        data,
    };
};

export const RentalService = {
    createRental,
    returnRental,
    getAllRentals,
};
