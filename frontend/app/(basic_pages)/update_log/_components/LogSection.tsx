interface LogSectionProps {
    title: string
    listItems: string[]
}

export default function LogSection(props: LogSectionProps) {
    const title = props.title
    const listItems = props.listItems

    return (
        <div>
            <h5 className="text-md lg:text-lg xl:text-xl">
                {title}
            </h5>

            <ul className="list-inside list-disc mb-2">
                {
                    listItems.map((item) => {
                        return (
                            <li key={`${title}_${item}`}>{item}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}