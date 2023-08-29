import {json} from "@sveltejs/kit";
import {getPhotos} from "$lib/data/appData.js";


export async function GET({ url, setHeaders, request }) {
    let photos = await getPhotos();

    return json( {
        photos: photos
    });
}