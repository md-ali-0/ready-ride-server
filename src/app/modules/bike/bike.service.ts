import { IBike } from './bike.interface';
import { Bike } from './bike.model';

const createBike = async (payload: IBike): Promise<IBike | null> => {
    const result = await Bike.create(payload);
    return result;
};

const updateBike = async (
    id: string,
    payload: IBike,
): Promise<IBike | null> => {
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

const getAllBikes = async (): Promise<IBike[] | null> => {
    const result = await Bike.find();
    return result;
};

export const BikeService = {
    createBike,
    updateBike,
    deleteBike,
    getAllBikes,
};
