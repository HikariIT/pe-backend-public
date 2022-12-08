import Ajv, {JTDSchemaType} from 'ajv/dist/jtd'
import {SignUpRequestBody} from "../types/requests";

export const signUpValidator = (ajv: Ajv) => {
    const schema: JTDSchemaType<SignUpRequestBody> = {
        properties: {
            name: { type: 'string' },
            surname: { type: 'string' },
            password: { type: 'string' },
            faculty: { type: 'string' },
            group_type: { type: 'string' },
            email: { type: 'string' },
        },
        optionalProperties: {
            isTeacher: { type: 'boolean' },
        }
    };

    return ajv.compile(schema);
}