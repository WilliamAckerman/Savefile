'use client'

import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
    text: string
    style: string
}

export default function SubmitButton(props: SubmitButtonProps) {
    const { pending } = useFormStatus();
    const text = props.text;
    const style = props.style;

    return (
        <button 
            disabled={pending} 
            type="submit"
            className={`${style}`}
        >
            {text}
        </button>
    )
}