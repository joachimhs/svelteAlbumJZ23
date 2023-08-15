<script>
    import {page} from "$app/stores";

    export let data;
</script>

<h1>Velkommen til {$page.params.albumid} albumet!</h1>

<div>{data.album.caption}</div>