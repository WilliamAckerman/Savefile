import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"

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
        <Field orientation="horizontal">
            <Checkbox
                name={checkboxName}
                id={checkboxName}
                value="true"
                checked={checkbox}
                onCheckedChange={() => setCheckbox(!checkbox)}
            />
            <FieldLabel htmlFor={checkboxName}>
                {displayName}
            </FieldLabel>

        {/*<div>
            <label>
                <input
                    name={checkboxName}
                    id={checkboxName}
                    type="checkbox"
                    value="true"
                    checked={checkbox}
                    onChange={() => setCheckbox(!checkbox)}
                /> {/*<label htmlFor={checkboxName}>*/}{/*displayName}{/*</label>*/}
            {/*</label>
        </div>*/}
        </Field>
    )
}