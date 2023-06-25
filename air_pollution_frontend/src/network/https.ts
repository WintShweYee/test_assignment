export const getapi = async (url:string) => {
    try {
        const data = await fetch(url, {
            method: "GET"
        });

        return data.json();
    } catch(error) {
        return "error";
    }
}