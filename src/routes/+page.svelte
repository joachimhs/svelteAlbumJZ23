<script>
    import '../app.css';
    import Slideshow from "$lib/components/Slideshow.svelte";
    import PhotoAlbumIndex from "$lib/components/PhotoAlbumIndex.svelte";

    export let data;
</script>

<Slideshow photos={data.photos}></Slideshow>
<PhotoAlbumIndex albums={data.albums}></PhotoAlbumIndex>

<style>

</style>