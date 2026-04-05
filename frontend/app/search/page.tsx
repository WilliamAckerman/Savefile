import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchForm from "./_components/SearchForm";

import { Suspense } from 'react';

import SearchResults from "./_components/SearchResults";

import getSearchResults from "./_lib/getSearchResults";

export default async function Search(
    props: {
        searchParams?: Promise<{
            search?: string;
            page?: string;
            limit?: string;

            xbsx?: boolean;
            xbo?: boolean;
            ps5?: boolean;
            ps4?: boolean;
            ns2?: boolean;
            ns?: boolean;
            windows?: boolean;
            mac?: boolean;
            linux?: boolean;

            standard?: boolean;
            remake?: boolean;
            remaster?: boolean;
            expanded_game?: boolean;
            port?: boolean;
            expansion?: boolean;
            standalone_expansion?: boolean;
            dlc?: boolean;
        }>;
    }
) {
    const searchParams = await props.searchParams;

    const search = String(searchParams?.search).trim() !== "" ? searchParams?.search : '';
    const currentPage = Number(searchParams?.page) || 1;

    const xbsx = searchParams?.xbsx || false;
    const xbo = searchParams?.xbo || false;
    const ps5 = searchParams?.ps5 || false;
    const ps4 = searchParams?.ps4 || false;
    const ns2 = searchParams?.ns2 || false;
    const ns = searchParams?.ns || false;
    const windows = searchParams?.windows || false;
    const mac = searchParams?.mac || false;
    const linux = searchParams?.linux || false;

    const standard = searchParams?.standard || false;
    const remake = searchParams?.remake || false;
    const remaster = searchParams?.remaster || false;
    const expanded_game = searchParams?.expanded_game || false;
    const port = searchParams?.port || false;
    const expansion = searchParams?.expansion || false;
    const standalone_expansion = searchParams?.standalone_expansion || false;
    const dlc = searchParams?.dlc || false;

    const data = await getSearchResults(searchParams);
    const gameData = await data.json();

    return (
        <div>
            <Header />
            <main className="bg-slate-900">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex items-center lg:w-[40%]">
                        <SearchForm 
                        />
                    </div>

                    <div className="flex items-center lg:w-[60%]">
                        <Suspense fallback={<p>Loading search results...</p>}>
                            <SearchResults 
                                searchParams={searchParams}
                                games={gameData}
                                currentPage={currentPage}
                            />
                        </Suspense>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}