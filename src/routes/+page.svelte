<script>
    import '../app.css';
    import Slideshow from "$lib/components/Slideshow.svelte";
    import PhotoAlbumIndex from "$lib/components/PhotoAlbumIndex.svelte";
    import {browser} from "$app/environment";

    export let data;

    console.log('******');
    console.log(data);
</script>

{#if browser}
    <Slideshow photos={data.photos}></Slideshow>
    <PhotoAlbumIndex albums={data.albums}></PhotoAlbumIndex>
{/if}

<style>

</style>