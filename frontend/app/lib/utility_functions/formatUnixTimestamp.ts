export default function formatUnixTimestamp(timestamp: number, timestampDateStyle: string) {
    //const validDateStyles = ['full']

    /*let dateStyle = "full"

    let dateStyle = "full"

    if (validDateStyles.includes(timestampDateStyle)) {
        dateStyl = timestampDateStyle
    } else {
        dateStyle = "full"
    }*/

    const formattedTimestamp = new Intl.DateTimeFormat("en-US", {
        dateStyle: timestampDateStyle == "short" ? "short" : "full",
        timeZone: 'UTC'
    }).format(timestamp * 1000);

    return formattedTimestamp;
}