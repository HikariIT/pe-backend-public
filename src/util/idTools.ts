import {IUserOutput} from "../types/models";
import db from "../database";

const teacherModel = db.teachers;
const studentModel = db.students;

/**
 * Get either student_id or teacher_id for given user_id
 * @param user sequelize User model returned by .findOne()
 */
export const getSecondaryId = async (user: IUserOutput): Promise<number> => {

    if (user.isTeacher) {
        const teacher = await teacherModel.findOne({ where: { user_id: user.user_id } });
        if (!teacher)
            return -1;
        else return teacher.teacher_id!;
    }
    else {
        const student = await studentModel.findOne({ where: { user_id: user.user_id } });
        if (!student)
            return -1;
        else return student.student_id!;
    }
}

