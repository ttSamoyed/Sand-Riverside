<template>
    <VueMarkdownEditor v-model="content" style="height: 300px;" />
</template>
  
  <script>
  import { defineComponent } from 'vue';
  import VueMarkdownEditor from '@kangc/v-md-editor';
  import '@kangc/v-md-editor/lib/style/base-editor.css';
  import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
  import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
  import Prism from 'prismjs';

  VueMarkdownEditor.use(vuepressTheme, {
    Prism,
  });

  
  export default defineComponent({
    name: 'MdtextEditor',
    components: {
      VueMarkdownEditor,
    },
    data() {
      return {
        text: '',
      };
    },
  });
  </script>