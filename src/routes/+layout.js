import {browser} from "$app/environment";
import {get} from "svelte/store";
import {albumStore, fetchAlbums} from "$lib/stores/albumStore.js";
import {fetchPhotos, photoStore} from "$lib/stores/photoStore.js";

export async function load({ params }) {
    if (browser) {
        await fetchAlbums();
        await fetchPhotos();

        return {
            photos: get(photoStore),
            albums: get(albumStore)
        };
    }
}