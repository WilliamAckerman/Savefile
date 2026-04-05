import type InvolvedCompany from '@/app/lib/types/involvedCompany';

/*function createArray(array, condition) {
    const returnArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i][condition]) {
            returnArray.push(array[i]);
        }
    }
    return returnArray;
}*/

function createSubtitle(company: InvolvedCompany) {
    const subtitleArray = [];
    if (company.developer) subtitleArray.push("Developer");
    if (company.publisher) subtitleArray.push("Publisher");
    if (company.supporting) subtitleArray.push("Supporting");
    if (company.porting) subtitleArray.push("Porting");

    const subtitle: string = subtitleArray.join(", ");
    return subtitle;
}

interface InvolvedCompaniesTabProps {
    involved_companies: InvolvedCompany[]
}

export default function InvolvedCompaniesTab(props: InvolvedCompaniesTabProps) {
    const involvedCompanies = props.involved_companies;

    return (
        <div className="w-full">
            <h1 className="mb-4 text-white text-xl md:text-2xl lg:text-4xl">
                Involved Companies
            </h1>

            <div className="flex flex-row flex-wrap p-4 mx-auto">
                {
                    involvedCompanies.map((company: InvolvedCompany) => {
                        const subtitle = createSubtitle(company);
                        console.log("Company:", company)
                        return (
                            <div key={"IC" + company.IGDB_involved_company_id} className="w-full md:w-1/2 lg:w-1/3 mx-auto p-4">
                                <h4 className="text-center mt-2 font-semibold text-xl md:text-2xl lg:text-3xl">{company.name}</h4>
                                <span className="block mt-2 text-center text-lg md:text-xl lg:text-2xl">{subtitle}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}