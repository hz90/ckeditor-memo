// editing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import FileCommand from "./command";
import { COMMAND_NAME__FILE, SCHEMA_NAME__FILE } from "./constant";
import { createImageViewElement, createImageModel } from './utils';
export default class BoldEditing extends Plugin {
  static get pluginName() {
    return "FileEditing";
  }
  init() {
    const editor = this.editor;

    this._defineSchema();
    this._defineConverters();

    // 注册一个 BoldCommand 命令
    editor.commands.add(COMMAND_NAME__FILE, new FileCommand(editor));
  }

  // 注册 schema
  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('section', {
      allowAttributes: ['class']
    });
    schema.register('a', {
      allowAttributes: ['class', 'href', 'target', 'download']
    });
    // schema.extend("$text", { allowAttributes: SCHEMA_NAME__FILE });
  }

  // 定义转换器
  _defineConverters() {
    const conversion = this.editor.conversion;
  }
}
