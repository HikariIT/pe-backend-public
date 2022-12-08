import { ParamsDictionary} from 'express-serve-static-core'

export interface UserParams extends ParamsDictionary {
    user_id: string;
}

export interface TeacherParams extends ParamsDictionary {
    teacher_id: string;
}

export interface StudentParams extends ParamsDictionary {
    student_id: string;
}

export interface ClassParams extends ParamsDictionary {
    class_id: string;
}

export interface OpinionParams extends ParamsDictionary {
    opinion_id: string;
}
