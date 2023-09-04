import {browser} from "$app/environment";

export async function load({parent, params}) {
    if (browser) {
        const data = await parent();
        let photo = await data.photos.find((photo) => photo.id === params.photoid);

        return {photo: photo};
    }
}