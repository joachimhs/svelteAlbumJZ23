<script>
    import ExifDetails from "$lib/components/ExifDetails.svelte";

    export let data;
</script>

<div class="full-image">
    <img id="photoAlbumImage" src="/images/{data.photo.id}" />
</div>

<ExifDetails photoElementId="photoAlbumImage" photo={data.photo}></ExifDetails>

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
</style>