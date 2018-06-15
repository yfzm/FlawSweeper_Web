<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
        <!--<Button v-on:click="getContent">查看内容</Button>-->
        <!--<textarea>{{ xss_content }}</textarea>-->
        <!--<textarea>{{ editorContent }}</textarea>-->
    </div>
</template>

<script>
    import E from 'wangeditor'
    // import XSS from 'xss'

    // TODO: Filter XSS Attack

    export default {
        name: 'editor',
        props: ['html-data'],
        data() {
            return {
                editor: null,
                editorContent: '',

                // xss_options: {
                //     whiteList: {
                //         p: ['style'],
                //         span: ['style'],
                //         blockquote: [],
                //         img: ['src', 'alt'],
                //         pre: [],
                //         code: [],
                //         ol: [],
                //         ul: [],
                //         br: [],
                //     }
                // },
            }
        },
        methods: {
            getContent: function () {
                alert(this.editorContent)

            }
        },
        computed: {
            // xss_content: function () {
            //     return XSS(this.editorContent, this.xss_options)
            //     // return this.editorContent
            // }

        },

        mounted() {
            this.editor = new E(this.$refs.editor);
            this.editor.customConfig.uploadImgShowBase64 = true;  // 使用 base64 保存图片

            this.editor.customConfig.zIndex = 20;

            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html;
                this.$emit("textChange", html);
            };
            this.editor.create();

            console.log("> wangEditor:" + this.htmlData);
            this.editor.cmd.do('insertHTML', this.htmlData);

        },

        watch: {
            htmlData(curVal, oldVal) {
                if (curVal) {
                    console.log("> wangEditor_change_to: " + this.htmlData);
                    this.editor.txt.html(curVal);
                }
            },
        }
    }
</script>

<style scoped>
</style>
