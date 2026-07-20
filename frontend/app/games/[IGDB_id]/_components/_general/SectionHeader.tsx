import './../tab_panels/_styles/tabContent.css';

interface SectionHeaderProps {
    title: string
}

export default function SectionHeader(props: SectionHeaderProps) {
    return (
        <>
            <h1 className="text-primaryText h1 mb-4"> {/* Formerly had text-white */}
                {props.title}
            </h1>
            <hr className="mb-4" />
        </>
    )
}