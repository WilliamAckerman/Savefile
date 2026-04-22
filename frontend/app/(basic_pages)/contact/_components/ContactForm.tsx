"use client"
import Form from 'next/form';
import Altcha from '@/app/components/Altcha';
import sendContactMessage from '../_api/sendContactMessage';
import '@/app/styles/Form.css';
import Link from 'next/link';
import '@/app/styles/General.css';

import { useRef } from 'react';
import { useActionState } from 'react';

import SubmitButton from '@/app/components/SubmitButton';

import type { ContactFormState } from '../_types/ContactFormState';

const initialState: ContactFormState = {
    /*name: '',
    email: '',
    subject: '',
    message: '',
    agree: false*/

    errors: {},
    success: null,
    message: null
}

export default function ContactForm() {
    const altchaRef = useRef<HTMLInputElement>(null)

    const [state, formAction, pending] = useActionState<ContactFormState, FormData>(sendContactMessage, initialState);

    return (
        <div className="form bg-violet-950 text-white">
            <h2 className="form-header text-white">
                Contact Form
            </h2>
            <p>
                Please fill out this form to send a message.
            </p>

            <p>
                An asterisk (<span className="required">*</span>) indicates a required field.
            </p>
            <hr className="mt-2 mb-2" />

            <Form
                //action={sendContactMessage}
                action={formAction}
            >
                <div className="form-group">
                    <label htmlFor="name">Name<span className="required">*</span></label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        className="form-field"
                        placeholder="Enter name..."
                        required

                        disabled={pending}
                    />

                    <p 
                        aria-live="polite"
                        className="required"
                    >
                        {state?.errors?.name}
                    </p>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email<span className="required">*</span></label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        className="form-field"
                        placeholder="Enter email address..."
                        required

                        disabled={pending}
                    />
                    <p 
                        aria-live="polite"
                        className="required"
                    >
                        {state?.errors?.email}
                    </p>
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Subject<span className="required">*</span></label>
                    <input
                        name="subject"
                        id="subject"
                        type="text"
                        className="form-field"
                        placeholder="Enter subject..."
                        required

                        disabled={pending}
                    />
                    <p 
                        aria-live="polite"
                        className="required"
                    >
                        {state?.errors?.subject}
                    </p>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message<span className="required">*</span></label>
                    <textarea
                        name="message"
                        id="message"
                        className="form-field"
                        placeholder="Enter message..."
                        required

                        disabled={pending}
                    ></textarea>
                    <p 
                        aria-live="polite"
                        className="required"
                    >
                        {state?.errors?.message}
                    </p>
                </div>

                <div className="form-group">
                    <Altcha ref={altchaRef} />
                </div>

                <div className="form-group">
                    <input
                        name="agree"
                        id="agree"
                        type="checkbox"
                        value="true"
                        required

                        disabled={pending}
                        
                        className="disabled:cursor-not-allowed"
                    /> <label htmlFor="agree">
                        By sending a message using the contact form, 
                        I agree to Savefile&apos;s <Link className="link" href="/guidelines">guidelines</Link> and <Link className="link" href="/privacy_policy">Privacy Policy</Link>.
                        <span className="required">*</span>
                    </label>
                    <p 
                        aria-live="polite"
                        className="required"
                    >
                        {state?.errors?.agree}
                    </p>
                </div>

                {
                    state?.message &&
                    <div className="form-group">
                        <p
                            className={`${state?.success == true ? "text-green-500" : "required"}`}
                        >
                            {state?.message}
                        </p>
                    </div>
                }

                <div>
                    {/*<button 
                        type="submit"
                        className="form-submit-btn"
                        disabled={pending}
                    >
                        Submit
                    </button>*/}
                    <SubmitButton
                        style="form-submit-btn"
                        text="Submit"
                    />
                </div>
            </Form>
        </div>
    )
}