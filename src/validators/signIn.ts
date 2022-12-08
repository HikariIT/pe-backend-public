import Ajv, {JTDSchemaType} from 'ajv/dist/jtd'
import { SignInRequestBody } from "../types/requests";

export const signInValidator = (ajv: Ajv) => {
    const schema: JTDSchemaType<SignInRequestBody> = {
        properties: {
            email: { type: 'string' },
            password: { type: 'string' },
        },
    };

    return ajv.compile(schema);
}