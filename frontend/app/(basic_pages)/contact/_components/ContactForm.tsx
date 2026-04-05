"use client"
import Form from 'next/form';
import Altcha from '@/app/components/Altcha';
import sendContactMessage from '../_api/sendContactMessage';
import '@/app/styles/Form.css';
import Link from 'next/link';
import '@/app/styles/General.css';

import { useRef } from 'react';

export default function ContactForm() {
    const altchaRef = useRef<HTMLInputElement>(null)

    return (
        <div className="form">
            <h2 className="form-header">
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
                action={sendContactMessage}
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
                    />
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
                    />
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
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message<span className="required">*</span></label>
                    <textarea
                        name="message"
                        id="message"
                        className="form-field"
                        placeholder="Enter message..."
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <input
                        name="agree"
                        id="agree"
                        type="checkbox"
                        value="true"
                        required
                    /> <label htmlFor="agree">
                        By sending a message using the contact form, 
                        I agree to Savefile&apos;s <Link className="link" href="/guidelines">guidelines</Link> and <Link className="link" href="/privacy_policy">Privacy Policy</Link>.
                        <span className="required">*</span>
                    </label>
                </div>

                {/*<Altcha ref={altchaRef} />*/}

                <div>
                    <button 
                        type="submit"
                        className="form-submit-btn"
                    >
                        Submit
                    </button>
                </div>
            </Form>
        </div>
    )
}