interface CheckboxButtonProps {
    setter: (check: boolean, setters: React.Dispatch<React.SetStateAction<boolean>>[]) => void
    setters: React.Dispatch<React.SetStateAction<boolean>>[]
    text?: string
    check?: boolean
}

export default function CheckboxButton(props: CheckboxButtonProps) {
    return (
        <div className="flex flex-col md:flex-row mt-2 mb-2">
            <div className="md:mr-4">
                <button
                    type="button"
                    className="bg-gray-500 text-white p-1 rounded-sm cursor-pointer hover:bg-gray-600 mb-1"
                    onClick={() => {
                        props.setter(true, props.setters)
                    }}
                >
                    Select All
                </button>
            </div>

            <div>
                <button
                    type="button"
                    className="bg-gray-500 text-white p-1 rounded-sm cursor-pointer hover:bg-gray-600 mb-1"
                    onClick={() => {
                        props.setter(false, props.setters)
                    }}
                >
                    De-Select All
                </button>
            </div>

        </div>
    )
}