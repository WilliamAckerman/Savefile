type Success = {
    message: string
}

type ContactFormErrors = {
    name?: string[] | undefined
    email?: string[] | undefined
    subject?: string[] | undefined
    message?: string[] | undefined
    agree?: string[] | undefined
}

export type ContactFormState = {
    errors?: {
        name?: string[] | undefined
        email?: string[] | undefined
        subject?: string[] | undefined
        message?: string[] | undefined
        agree?: string[] | undefined
        altcha?: string[] | undefined
    }
    /*success?: {
        message: string
    }*/
    success?: boolean | null
    message?: string | null
    //error?: string | null
}