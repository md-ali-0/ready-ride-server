/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { searchableBikeield } from './bike.constant';
import { IBike } from './bike.interface';
import { Bike } from './bike.model';

const createBike = async (file: any, payload: IBike): Promise<IBike | null> => {
    if (file) {
        const imageName = `bike_${Math.random().toString().split('.')[1]}`;
        const path = file?.path;

        //send image to cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path);
        payload.image = secure_url as string;
    }
    const result = await Bike.create(payload);
    return result;
};

const updateBike = async (
    id: string,
    file: any,
    payload: IBike,
): Promise<IBike | null> => {
    if (file) {
        const imageName = `bike_${Math.random().toString().split('.')[1]}`;
        const path = file?.path;

        //send image to cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path);
        payload.image = secure_url as string;
    }
    const result = await Bike.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteBike = async (id: string): Promise<IBike | null> => {
    const result = await Bike.findByIdAndUpdate(
        id,
        { isAvailable: false },
        { new: true },
    );
    return result;
};

const getAllBikes = async (query: Record<string, unknown>) => {
    const BikeQuery = new QueryBuilder(Bike.find(), query)
        .search(searchableBikeield)
        .filter()
        .sort()
        .paginate()
        .fields();

        const meta = await BikeQuery.countTotal();
        const result = await BikeQuery.modelQuery;
    
    return {
        meta,
        result
    }
};

export const BikeService = {
    createBike,
    updateBike,
    deleteBike,
    getAllBikes,
};
