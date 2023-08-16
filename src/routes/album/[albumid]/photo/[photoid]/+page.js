export async function load({parent, params}) {
    const data = await parent();
    let album = await data.albums.find((album) => album.caption === params.albumid);
    let photo = await data.photos.find((photo) => photo.id = params.photoid);

    return { album: album, photo: photo};
}