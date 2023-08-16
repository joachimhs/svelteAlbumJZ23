<script>
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    onMount(() => {
        if ($page.params.albumid && data.album.image && !$page.params.photoid) {
            //We have not selected a photo from the album, select the albums image
            goto('/album/' + $page.params.albumid + '/photo/' + data.album.image);
        }

    });
    export let data;
</script>

<a href="/">
    <div class="back-button">&lt;- Tilbake</div>
</a>

<slot></slot>

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
    .back-button {
        position: absolute;
        top: 14px;
        left: 14px;
        background: #000;
        color: #fff;
        padding: 9px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 10px;
        border: 2px solid #fff;
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