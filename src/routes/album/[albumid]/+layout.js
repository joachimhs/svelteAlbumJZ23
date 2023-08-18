export async function load({parent, params}) {
    const data = await parent();
    let album = await data.albums.find((album) => album.id === params.albumid);

    return { album: album};
}