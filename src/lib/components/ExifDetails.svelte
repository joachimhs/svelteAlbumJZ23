<script>
    import ExifReader from 'exifreader';
    import {browser} from "$app/environment";
    import {onMount} from "svelte";

    export let photoElementId = null;
    export let photo = null
    let exifData = {};

    onMount(async () => {
        if (photoElementId) {
            let img = document.getElementById(photoElementId);
            const tags = await ExifReader.load(img.src, {includeUnknown: true});

            exifData.shutter = tags.ExposureTime?.description;
            exifData.exposureSetting = tags.ExposureBiasValue?.description;
            exifData.focalLength = tags.FocalLength?.description;
            exifData.iso = tags.ISOSpeedRatings?.description;
            exifData.lens = tags.Lens?.description;
            exifData.model = tags.Model?.description;
            exifData.date = tags.DateTime?.description;
            exifData.exposureMode = tags.ExposureMode?.description;
            exifData.fstop = tags.ApertureValue ? parseFloat(tags.ApertureValue.description) : '';
        }
    });
</script>

{#if browser}
    <div class="exif-info">
        <div class="exif-info-label">
            Vis Exif Info
        </div>
        <table>
            <tbody>
            <tr>
                <td>Tittel</td>
                <td>{photo.title}</td>
            </tr>
            <tr>
                <td>Beskrivelse</td>
                <td></td>
            </tr>
            <tr>
                <td>Model</td>
                <td>{exifData.model}</td>
            </tr>

            <tr>
                <td>Linse</td>
                <td>{exifData.lens}</td>
            </tr>

            <tr>
                <td>Brennvidde</td>
                <td>{exifData.focalLength}</td>
            </tr>

            <tr>
                <td>Eksponeringstype</td>
                <td>{exifData.exposureMode}</td>
            </tr>

            <tr>
                <td>Blender</td>
                <td>f/{exifData.fstop}</td>
            </tr>

            <tr>
                <td>Lukkertid</td>
                <td>{exifData.shutter}</td>
            </tr>

            <tr>
                <td>ISO</td>
                <td>{exifData.iso}</td>
            </tr>

            <tr>
                <td>Exponering</td>
                <td>{exifData.exposureSetting}</td>
            </tr>

            <tr>
                <td>Dato</td>
                <td>{exifData.date}</td>
            </tr>
            </tbody>
        </table>
    </div>
{/if}

<style>
    .exif-info {
        background: rgba(0,0,0, 0.65);
        position: absolute;
        top: 75px;
        left: -476px;
        color: white;
        padding: 10px;
        transition: all 0.5s;
    }

    .exif-info:hover {
        left: 0;
    }

    .exif-info-label {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        float: right;
        text-align: center;
        padding-left: 10px;
        height: fit-content;
        padding-top: 90px;
        letter-spacing: 1px;
        font-family: sans-serif;
    }

    .exif-info table {
        border: 1px solid rgba(255, 255, 255, 0.6);
        padding: 5px;
    }

    .exif-info table td:nth-child(1) {
        width: 50px;
        overflow: visible;
        padding-bottom: 10px;
        padding-right: 30px;
    }

    .exif-info table td:nth-child(2) {
        width: 300px;
        overflow: visible;
    }
</style>