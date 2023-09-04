import {writable} from "svelte/store";

export let photoStore = writable([]);

export async function fetchPhotos() {
    const rawResponse = await fetch('/api/photos', {
       method: 'GET',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       }
    });

    let content = await rawResponse.json();
    photoStore.set(content.photos)
}

export async function storePhoto(photo) {
    const rawResponse = await fetch('/api/photos/' + photo.id, {
        method: 'PUT',
        body: JSON.stringify(photo),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    let content = await rawResponse.json();

    photoStore.set(content.photos);
}