import {json} from "@sveltejs/kit";
import {getAlbums} from "$lib/data/appData.js";


export async function GET({ url, setHeaders, request }) {
    let albums =  await getAlbums();

    return json( {
        albums: albums
    });
}