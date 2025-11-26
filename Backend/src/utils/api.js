export async function fetchAPI(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed fetching: ${url}`);
    }
    return res.json();
}
