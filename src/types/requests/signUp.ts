export interface SignUpRequestBody {
    name: string;
    surname: string;
    password: string;
    faculty: string;
    group_type: string;
    isTeacher?: boolean;
    email: string;
}


