import {json} from "@sveltejs/kit";
import {getPhotos} from "$lib/data/appData.js";

export async function PUT({ params, request, cookies }) {
    let done = await request.json();

    let oldPhotos = await getPhotos();

    //Find photo and update title in one-stop
    await oldPhotos.find(photo => (photo.id === done.id) ? photo.title = done.title : null);

    const responseJson = json( {
        photos: oldPhotos
    });

    //Adding in a fake delay to see progress
    await new Promise(resolve => setTimeout(resolve, 1000));

    return responseJson;
}