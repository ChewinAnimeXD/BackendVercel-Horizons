import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { getCourse, getCourses, createCourse, updateCourse, deleteCourse, deleteStudentFromCourse } from "../controllers/course.controller.js";
import { createCourseSchema } from '../schemas/course.schema.js';

const router = Router();

router.get('/courses', authRequired, getCourses);
router.get('/courses/:id', authRequired, getCourse);
router.post('/courses', authRequired, validateSchema(createCourseSchema), createCourse);
router.delete('/courses/:id', authRequired, deleteCourse);
router.put('/courses/:id', authRequired, updateCourse);
router.delete('/courses/:courseId/students/:studentId', authRequired, deleteStudentFromCourse);

export default router;
