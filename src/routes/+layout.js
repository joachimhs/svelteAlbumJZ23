export function load({ params }) {
    return {
        photos: [
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
            }
        ],
        albums: [
            {
                id: 'makro',
                image: 'IMGP4117.jpg',
                caption: 'makro',
                images: ['IMGP4117.jpg', 'background1.jpg', 'IMGP4642.jpg', 'IMGP6801.jpg']
            },
            {
                id: 'norge2020',
                image: 'background1.jpg',
                caption: 'Norge 2020',
                images: ['IMGP4117.jpg', 'background1.jpg']
            }
        ]
    };
}