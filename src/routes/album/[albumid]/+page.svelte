<script>
    import {page} from "$app/stores";
    import {onMount} from "svelte";

    let selectedImage = null;
    onMount(() => {
        selectedImage = data.album.image ? data.album.image : null;
    });
    export let data;
</script>

<h1>Velkommen til {$page.params.albumid} albumet!</h1>

<div class="full-image">
    <img src="/images/{selectedImage}" />
</div>

<div class="photo-albums-area in-album">
    <div class="grid-container">
        {#each data.album.images as image}
            <a href="/album/{data.album.id}/photo/{image}">
                <div class="grid-item">
                    <img class="grid-item-photo" src="/images/{image}">
                </div>
            </a>
        {/each}
    </div>
</div>

<style>
    .full-image {
        width: 100vw;
        height: 75vh;
        text-align: center;
        margin-bottom: 5vh;
    }

    .full-image img {
        max-width: 100%;
        height: clamp(10vh, 1000px, 75vh);
        object-fit: contain;
        transition: all 0.5s;
    }

    .in-album {
        width: 100vw;
        max-height: 20vh;
        overflow-y: scroll;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 30vw);
        grid-gap: 3%;
        margin-left: 1%;
    }

    .in-album .grid-container {
        grid-template-columns: repeat(6, 16vw);
        grid-gap: 1%;
    }

    .in-album .grid-item {
        max-height: 17vh;
        max-width: 16vw;
    }

    .in-album .grid-item img {
        max-height: 17vh;
        max-width: 16vw;
        object-fit: cover;
        object-position: center;
    }

    .grid-item img {
        width: 30vw;
        height: 20vh;
        object-fit: cover;
        transition: opacity 0.3s ease-in-out, transform 2s;
    }

    .grid-item {
        width: 30vw;
        height: 20vh;
        transition: opacity 0.3s ease-in-out, transform 0.5s;
        overflow: hidden;
    }

    .in-album .grid-item img {
        max-height: 17vh;
        max-width: 16vw;
        object-fit: cover;
        object-position: center;
    }


</style>