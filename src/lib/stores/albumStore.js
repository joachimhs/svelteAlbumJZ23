import {writable} from "svelte/store";

export let albumStore = writable([]);

export async function fetchAlbums() {
    const rawResponse = await fetch('/api/albums', {
       method: 'GET',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       }
    });

    let content = await rawResponse.json();
    albumStore.set(content.albums)
}