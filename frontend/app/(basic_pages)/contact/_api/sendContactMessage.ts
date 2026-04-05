'use server'

const validateTextInput = (input: string | null, errorMessage: string, errorArray: string[]) => {
    if (input == null || input == undefined || input?.trim() == "") {
        errorArray.push(errorMessage);
    }
}

export default async function sendContactMessage(formData: FormData) {
    console.log(formData.get('name'))

    const name: string | null = formData.get('name') ? String(formData.get('name')) : null;
    const email: string | null = formData.get('email') ? String(formData.get('email')) : null;
    const subject: string | null = formData.get('subject') ? String(formData.get('subject')) : null;
    const body: string | null = formData.get('message') ? String(formData.get('message')) : null;
    const agree: string | null = formData.get('agree') ? String(formData.get('agree')) : null;

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
        console.log(errorMessage)
        return;
    }

    const payload = {
        name: name,
        email: email,
        subject: subject,
        message: body,
        agree: agree
    };

    try {
        const res = await fetch(`${process.env.BACKEND_URL}/send_contact_message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    
        //return res;
        console.log("message sent successfully.")
    } catch (error) {
        console.log(`Error sending message: ${error}`)
    }
}