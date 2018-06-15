<template>
    <div class="info_footer">
        <div class="footer_content">
            我的错题本&copy;2018 / <a>关于本站</a> / All Rights Reserved.
        </div>

    </div>
</template>

<script>
    import ICol from "iview/src/components/grid/col";

    export default {
        components: {ICol},
        name: "footer"
    }
</script>

<style scoped>

    .info_footer {
        color: #495060;
        border-top: #dddee1 solid 1px;

    }

    .footer_content {

        margin: 20px auto 0;

        max-width: 1000px;
        min-width: 1000px;
    }
</style>
