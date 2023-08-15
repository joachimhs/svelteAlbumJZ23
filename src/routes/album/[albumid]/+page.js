export async function load({parent, params}) {
    const data = await parent();
    let album = await data.albums.find((album) => album.caption === params.albumid);

    return { album: album};
}