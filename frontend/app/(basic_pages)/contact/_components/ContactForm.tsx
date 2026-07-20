"use client"
import Link from 'next/link';
import Form from 'next/form';

import Altcha from '@/app/components/Altcha';
import SubmitButton from '@/app/components/SubmitButton';

import sendContactMessage from '../_api/sendContactMessage';

import '@/app/styles/Form.css';
import '@/app/styles/General.css';

import { useRef } from 'react';
import { useActionState } from 'react';

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
        <div className="form bg-secondaryBg text-secondaryText"> {/* Originally had bg-violet-950 class */}
            <h2 className="form-header">
                Contact Form
            </h2>
            <p>
                Please fill out this form to send a message.
            </p>

            <p>
                An asterisk (<span className="text-required">*</span>) indicates a required field.
            </p>
            <hr className="mt-2 mb-2" />

            <Form
                action={formAction}
            >
                <div className="form-group">
                    <label htmlFor="name">Name<span className="text-required">*</span></label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        className="form-field bg-formFieldBg text-formFieldText"
                        placeholder="Enter name..."
                        required

                        disabled={pending}
                    />

                    <p 
                        aria-live="polite"
                        className="text-required"
                    >
                        {state?.errors?.name}
                    </p>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email<span className="text-required">*</span></label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        className="form-field bg-formFieldBg text-formFieldText"
                        placeholder="Enter email address..."
                        required

                        disabled={pending}
                    />
                    <p 
                        aria-live="polite"
                        className="text-required"
                    >
                        {state?.errors?.email}
                    </p>
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Subject<span className="text-required">*</span></label>
                    <input
                        name="subject"
                        id="subject"
                        type="text"
                        className="form-field bg-formFieldBg text-formFieldText"
                        placeholder="Enter subject..."
                        required

                        disabled={pending}
                    />
                    <p 
                        aria-live="polite"
                        className="text-required"
                    >
                        {state?.errors?.subject}
                    </p>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message<span className="text-required">*</span></label>
                    <textarea
                        name="message"
                        id="message"
                        className="form-field bg-formFieldBg text-formFieldText"
                        placeholder="Enter message..."
                        required

                        disabled={pending}
                    ></textarea>
                    <p 
                        aria-live="polite"
                        className="text-required"
                    >
                        {state?.errors?.message}
                    </p>
                </div>

                <div className="form-group">
                    <Altcha ref={altchaRef} />
                </div>

                <div className="form-group">
                    <label>
                        <input
                            name="agree"
                            id="agree"
                            type="checkbox"
                            value="true"
                            required

                            disabled={pending}
                        
                            className="disabled:cursor-not-allowed"
                        /> {/*<label htmlFor="agree">*/}
                            By sending a message using the contact form, 
                            I agree to Savefile&apos;s <Link className="link text-primaryLink" href="/guidelines">guidelines</Link> and <Link className="link text-primaryLink" href="/privacy_policy">Privacy Policy</Link>.
                            <span className="text-required">*</span>
                        {/*</label>*/}
                    </label>
                    <p 
                        aria-live="polite"
                        className="text-required"
                    >
                        {state?.errors?.agree}
                    </p>
                </div>

                {
                    state?.message &&
                    <div className="form-group">
                        <p
                            className={`${state?.success == true ? "text-success" : "text-required"}`}
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
                        style="form-submit-btn bg-button active:bg-buttonDarkened hover:bg-buttonDarkened disabled:bg-buttonLightened"
                        text="Submit"
                    />
                </div>
            </Form>
        </div>
    )
}