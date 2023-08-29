import {browser} from "$app/environment";

export async function load({parent, params}) {
    if (browser) {
        const data = await parent();
        let album = await data.albums.find((album) => album.id === params.albumid);
        let photo = await data.photos.find((photo) => photo.id === params.photoid);

        return {album: album, photo: photo};
    }
}