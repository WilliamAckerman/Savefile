export default function GridGameSkeleton() {
    return (
        <div className="max-w-[200px] p-4 mx-auto animate-pulse lg:m-0 bg-secondaryBg">
            <div className="bg-secondaryBg">
                <div className="min-h-[112px] md:min-h-[220px] flex items-center justify-center"></div>
                <div className="bg-secondaryBg p-1"></div>
            </div>
        </div>
    )
}