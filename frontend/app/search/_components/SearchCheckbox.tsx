interface SearchCheckboxProps {
    checkbox: boolean
    setter: (checkbox: boolean) => void
    checkboxName: string
    displayName: string
}

export default function SearchCheckbox(props: SearchCheckboxProps) {
    const [checkbox, setCheckbox] = [props.checkbox, props.setter];
    const checkboxName = props.checkboxName;
    const displayName = props.displayName;

    return (
        <div>
            <input
                name={checkboxName}
                id={checkboxName}
                type="checkbox"
                value="true"
                checked={checkbox}
                onChange={() => setCheckbox(!checkbox)}
            /> <label htmlFor={checkboxName}>{displayName}</label>
        </div>
    )
}