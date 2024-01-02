import { LokaliseApi } from "@lokalise/node-api";

export async function GET(request: Request) {
    const lokaliseApi = new LokaliseApi({ apiKey: process.env.LOKALISE_API_TOKEN });
    const translationFiles = await lokaliseApi.files().list({
        project_id: "2364858461aa19edc84af2.96176513"
    });

    console.log(translationFiles);

    return Response.json("done");
}