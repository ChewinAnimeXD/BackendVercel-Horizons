import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://horizons:74182391@cluster0.l0gx2hi.mongodb.net/register?retryWrites=true&w=majority&appName=Cluster0');
        console.log(">>> Conectado con la base de datos");
    } catch (error) {
        console.log(error);
    }
};

//mongodb+srv://horizons:74182391@cluster0.l0gx2hi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0