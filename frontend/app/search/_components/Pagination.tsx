"use client";

import { useRouter } from 'next/navigation';
import { useSearchParams, usePathname } from 'next/navigation';
import Form from 'next/form';

interface PaginationProps {
    pageCount: number
}

function Pagination(props: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleButtonClick = (value: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(value));

        router.push(pathname + "?" + params);
    }

    /*const handleButtonClick = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('page', )
        }
    )*/

    const pageCount = props.pageCount;
    //const currentPage = props.currentPage;
    const currentPage: number = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const router = useRouter();

    const button = "p-4 md:text-lg lg:text-xl";
    const hover = "hover:cursor-pointer hover:bg-neutral-100";
    const disabled = "bg-neutral-200 hover:cursor-not-allowed";

    return (
        <div className="mt-4 mx-auto">
            <div className="flex flex-row items-center">

                <button 
                    className={`
                        ${button}
                        rounded-l-sm
                        ${(currentPage != 1) ? hover : ""}
                        ${(currentPage == 1) ? disabled : "bg-white"}
                    `}
                    disabled={(currentPage == 1)}
                    onClick={() => handleButtonClick(1)}
                >
                    Start
                </button>

                <button
                    className={`
                        ${button} 
                        ${(currentPage - 1) > 0 ? hover : ""}
                        ${(currentPage - 1) <= 0 ? disabled : "bg-white"}
                    `}
                    disabled={(currentPage - 1) <= 0}
                    onClick={() => handleButtonClick(currentPage - 1)}
                >
                    Prev
                </button>

                { 
                    (currentPage - 2) > 0 &&
                    <button 
                        className={`${button} bg-white ${hover}`}
                        onClick={() => handleButtonClick(currentPage - 2)}
                    >
                        {currentPage - 2}
                    </button>
                }

                { 
                    (currentPage - 1) > 0 &&
                    <button 
                        className={`${button} bg-white ${hover}`}
                        onClick={() => handleButtonClick(currentPage - 1)}
                    >
                        {currentPage - 1}
                    </button>
                }

                <div className={`${button} bg-sky-200`}>
                    {currentPage}
                </div>

                { 
                    (currentPage + 1) <= pageCount &&
                    <button 
                        className={`${button} bg-white ${hover}`}
                        disabled={(currentPage + 1) > pageCount}
                        onClick={() => handleButtonClick(currentPage + 1)}
                    >
                        {currentPage + 1}
                    </button>
                }

                { 
                    (currentPage + 2) <= pageCount &&
                    <button 
                        className={`${button} bg-white ${hover}`}
                        disabled={(currentPage + 2) > pageCount}
                        onClick={() => handleButtonClick(currentPage + 2)}
                    >
                        {currentPage + 2}
                    </button>
                }

                <button
                    className={`
                        ${button} 
                        ${(currentPage + 1) <= pageCount ? hover : ""}
                        ${(currentPage + 1) > pageCount ? disabled : "bg-white"}
                    `}
                    disabled={(currentPage + 1) > pageCount}
                    onClick={() => handleButtonClick(currentPage + 1)}
                >
                    Next
                </button>

                <button 
                    className={`
                        ${button}
                        rounded-r-sm
                        ${(currentPage != pageCount) ? hover : ""}
                        ${(currentPage == pageCount) ? disabled : "bg-white"}
                    `}
                    disabled={(currentPage == pageCount)}
                    onClick={() => handleButtonClick(pageCount)}
                >
                    End
                </button>
            </div>
        </div>
    )
}

export default Pagination;