let photos =  [
    {
        id: 'IMGP4117.jpg',
        title: 'Valmue'
    },
    {
        id: 'background1.jpg',
        title: 'Tyttebær'
    },
    {
        id: 'IMGP4642.jpg',
        title: 'Tyttebær 2'
    },
    {
        id: 'IMGP6801.jpg',
        title: 'Sommerfugl'
    },
    {
        id: 'IMGP3329.jpg',
        title: 'Hvitveis'
    }
];

let albums = [
    {
        id: 'makro',
        image: 'IMGP4117.jpg',
        caption: 'makro',
        images: ['IMGP4117.jpg', 'background1.jpg', 'IMGP4642.jpg', 'IMGP6801.jpg', 'IMGP3329.jpg']
    },
    {
        id: 'norge2020',
        image: 'background1.jpg',
        caption: 'Norge 2020',
        images: ['IMGP4117.jpg', 'background1.jpg']
    }
];

export const wait = async amount => new Promise(res => setTimeout(res, amount ?? 100));

export async function getAlbums() {
    await wait();

    return albums;
}

export async function getPhotos() {
    await wait();

    return photos;
}