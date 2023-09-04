<script>
    import ExifDetails from "$lib/components/ExifDetails.svelte";
    import {browser} from "$app/environment";

    export let data;
</script>

{#if browser}
    <a href="/album/{data.album.id}/photo/{data.photo.id}/edit">
        <div class="edit-button">Rediger</div>
    </a>

    <div class="full-image">
        <img id="photoAlbumImage" src="/images/{data.photo.id}" />
    </div>

    <ExifDetails photoElementId="photoAlbumImage" photo={data.photo}></ExifDetails>
{/if}

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

    .edit-button {
        position: absolute;
        top: 14px;
        left: 120px;
        background: #000;
        color: #fff;
        padding: 9px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 10px;
        border: 2px solid #fff;
    }
</style>