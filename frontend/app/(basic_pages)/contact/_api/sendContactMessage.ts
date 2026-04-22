'use server'

import { z } from 'zod';
import type { ContactFormState } from '../_types/ContactFormState';

const schema = z.object({
    name: z.string({
        error: 'Invalid name'
    }).refine((name) => name.trim() != ""),

    email: z.email({
        error: 'Invalid email address'
    }),

    subject: z.string({
        error: 'Invalid subject line'
    }).refine((subject) => subject.trim() != ""),

    message: z.string({
        error: 'Invalid message body'
    }).refine((message) => message.trim() != ""),
    
    agree: z.stringbool().refine((agree) => agree == true, {
        error: 'You must indicate you agree'
    })
})

const validateTextInput = (input: string | null, errorMessage: string, errorArray: string[]) => {
    if (input == null || input == undefined || input?.trim() == "") {
        errorArray.push(errorMessage);
    }
}

export default async function sendContactMessage(initialState: ContactFormState, formData: FormData) {
    //console.log(formData.get('name'))

    const validatedFields = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        agree: formData.get('agree')
    })

    //console.log(validatedFields)

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Your submission has errors. Please fix them and then re-submit.',
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const name: string | null = formData.get('name') ? String(formData.get('name')) : null;
    const email: string | null = formData.get('email') ? String(formData.get('email')) : null;
    const subject: string | null = formData.get('subject') ? String(formData.get('subject')) : null;
    const body: string | null = formData.get('message') ? String(formData.get('message')) : null;
    const agree: string | null = formData.get('agree') ? String(formData.get('agree')) : null;
    
    //console.log(formData.get('altcha'))

    const errors: string[] = [];

    validateTextInput(name, "Name was not provided.", errors);
    validateTextInput(subject, "Subject was not provided.", errors);
    validateTextInput(body, "Message body was not provided.", errors);

    if (agree !== "true") {
        errors.push("You did not indicate that you agree to Savefile's guidelines and Privacy Policy.");
    }

    if (errors.length > 0) {
        //return { error: 'Failed to send message.' };
        const errorMessage = `Your submission has the following errors:\n${errors.join("\n")}`;
        //alert(errorMessage);
        //console.log(errorMessage)
        //return;
    }

    const payload = {
        name: name,
        email: email,
        subject: subject,
        message: body,
        agree: agree,

        altcha: formData.get('altcha')
    };

    //console.log(payload)

    try {
        const res = await fetch(`${process.env.BACKEND_URL}/send_contact_message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        //console.log(res)

        const data = await res.json()
        //console.log(data)
    
        //return res;
        //console.log("message sent successfully.")

        /*return {
            success: {message: 'Message sent successfully.'}
        }*/
        return {
            success: true,
            message: 'Message sent successfully.'
        }
    } catch (error) {
        //console.log(`Error sending message: ${error}`)
        return {
            success: false,
            message: `Error sending message: ${error} Please try again.`
        }
    }
}