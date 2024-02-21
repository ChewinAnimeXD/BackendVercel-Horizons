import { z } from 'zod';

export const createCourseSchema = z.object({
    name: z.string({
        required_error: 'El nombre es requerido',
    }),
    teacher: z.string({
        required_error: 'El profesor es requerido',
    }),
    students: z.array(
        z.object({
            username: z.string(),
            idstudent: z.string(),
            email: z.string().email(),
            phone: z.number(),
        })
    ),
});

