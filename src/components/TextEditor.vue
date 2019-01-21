<template>
  <div class="editor editor-selectable-field">
    <editor-menu-bar :editor="editor">
      <div
        class="editor-menu editor-menu-hidden"
        :class="{ 'focused': focused }"
        slot-scope="{ commands, focused }"
      >
        <button
          type="button"
          @click="commands.bold"
        >
          <i class="fas fa-bold"></i>
        </button>
        <button
          type="button"
          @click="commands.italic"
        >
          <i class="fas fa-italic"></i>
        </button>
        <button
          type="button"
          @click="commands.strike"
        >
          <i class="fas fa-strikethrough"></i>
        </button>
        <button
          type="button"
          @click="commands.code"
        >
          <i class="fas fa-code"></i>
        </button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor"></editor-content>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { Bold, Italic, Strike, Code } from 'tiptap-extensions';

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: ['content', 'label'],
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.content,
      extensions: [
        new Bold(),
        new Italic(),
        new Strike(),
        new Code()
      ],
      onUpdate: (updateData) => {
        this.updateValue(updateData.getHTML());
        this.$emit('inputEvent');
      }
    })
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    updateValue(value){ 
      this.$emit('input', value);
    }
  }
};
</script>