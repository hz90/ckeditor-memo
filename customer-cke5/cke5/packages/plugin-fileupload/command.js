// command.js

import Command from "@ckeditor/ckeditor5-core/src/command";
import FileRepository from "@ckeditor/ckeditor5-upload/src/filerepository";
import {
  findOptimalInsertionRange, isWidget, toWidget
} from "@ckeditor/ckeditor5-widget/src/utils";
import { SCHEMA_NAME__FILE } from "./constant";
import { toArray } from "./utils";

export default class FileCommand extends Command {
  constructor(editor) {
    super(editor);
    this.attributeKey = SCHEMA_NAME__FILE;
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    //校验选中的 Schema 是否允许 该按钮可以执行execute 属性，若不允许则禁用按钮
    this.isEnabled = true;
    // 如果选中的文本含有 bold 属性，设置 value 为 true，
    // 由于已在 toolbar-ui 中关联，当 value 为 true 时会高亮工具栏按钮
    // this.value = this._getValueFromFirstAllowedNode();

    // 校验选中的 Schema 是否允许 bold 属性，若不允许则禁用按钮
    // this.isEnabled = model.schema.checkAttributeInSelection(
    //   selection,
    //   this.attributeKey
    // );
  }

  execute(options) {
    console.log('execute file command');
    if (!options.file && !options.files) {
      return;
    }
    const files = options.file ? toArray(options.file) : toArray(options.files);
    const model = this.editor.model;
    const selection = model.document.selection;
    const selectionAttributes = Object.fromEntries(selection.getAttributes());
    const value = !this.value;
    //执行上传文件
    files.forEach((file, index) => {
      const selectedElement = selection.getSelectedElement();
      this._uploadFile(file, selectionAttributes);
    });
    // 对选中文本设置 bold 属性
    // model.change((writer) => {

    // });
  }
  _uploadFile(file, attributes, position) {
    const editor = this.editor;
    const fileRepository = editor.plugins.get(FileRepository);
    const loader = fileRepository.createLoader(file);
    // const videoUtils = editor.plugins.get('VideoUtils');

    if (!loader) {
      return;
    }
    //开始上传
    console.log("开始上传" + file);
    console.log("开始上传fileRepository" + fileRepository);
    console.log(fileRepository);
    console.log("开始上传loader" + loader);
    console.log(loader);

    this._insertFile({ ...attributes, uploadId: loader.id }, position);
  }
  _insertFile(attributes = {}, selectable = null, videoType = null) {
    const editor = this.editor;
    const model = editor.model;
    const selection = model.document.selection;

    // videoType = determineVideoTypeForInsertion(editor, selectable || selection, videoType);

    // attributes = {
    //   ...Object.fromEntries(selection.getAttributes()),
    //   ...attributes
    // };

    // for (const attributeName in attributes) {
    //   if (!model.schema.checkAttribute(videoType, attributeName)) {
    //     delete attributes[attributeName];
    //   }
    // }

    return model.change(writer => {
      const content = '<p>A paragraph with <a href="https://ckeditor.com">some link</a>.';
const viewFragment = editor.data.processor.toView( content );
const modelFragment = editor.data.toModel( viewFragment );
model.insertContent( modelFragment );
      // writer.insertText( 'foo', 'paragraph', 'end' );
      // const videoElement = writer.createElement('image', attributes);

      // if (!selectable && videoType !== 'videoInline') {
      //selectable = findOptimalInsertionRange(selection, model);
      // }
    //   const section = writer.createElement('section', {
    //     class: 'button'
    // });
    // const link = writer.createElement('a', {
    //     href: 'https://dominio.com/file.pdf',
    //     target: '_blank',
    //     download: 'file.pdf'
    // });
    // const link = writer.createText( "info.file_path" );

    // const link = writer.createElement('link', {
    //   href: info.file_path,
    // });
    // writer.setAttribute( 'linkHref', "info.file_path", link );
    // writer.appendText('DOWNLOAD', link);
    // model.insertContent(link, editor.model.document.selection);
    // writer.setSelection(link,'on');
      // model.insertContent(videoElement, selectable);
      // writer.setSelection(videoElement, 'on');
      // return videoElement;
      // if (videoElement.parent) {
      //   writer.setSelection(videoElement, 'on');

      //   return videoElement;
      // }

      // return null;
    });
  }

}
