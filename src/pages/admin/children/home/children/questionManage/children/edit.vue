<template>
    <div>
        <Button type="text" @click="back">返回上一页</Button>

        <edit-part></edit-part>
    </div>

</template>

<script>
    import EditPart from "../../../../../../../components/editPart";

    export default {
        components: {EditPart},
        name: "edit",

        methods: {
            back: function () {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>
