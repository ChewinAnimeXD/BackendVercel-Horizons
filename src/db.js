import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://chewin:camilo97@employee.nu6vrnf.mongodb.net/register?retryWrites=true&w=majority');
        console.log(">>> Conectado con la base de datos");
    } catch (error) {
        console.log(error);
    }
};

