// command.js

import Command from "@ckeditor/ckeditor5-core/src/command";
import FileRepository from "@ckeditor/ckeditor5-upload/src/filerepository";
import {
  findOptimalInsertionRange, isWidget, toWidget
} from "@ckeditor/ckeditor5-widget/src/utils";
import { SCHEMA_NAME__FILE_VIDEO } from "./constant";
import { toArray } from "./utils";

export default class FileCommand extends Command {
  constructor(editor) {
    super(editor);
    this.attributeKey = SCHEMA_NAME__FILE_VIDEO;
  }

  refresh() {
    //校验选中的 Schema 是否允许 该按钮可以执行execute 属性，若不允许则禁用按钮
    this.isEnabled = true;

  }

  execute(options) {
    console.log('execute file command');
    if (!options.file && !options.files) {
      return;
    }
    const editor = this.editor;
    const model = editor.model;

    const fileRepository = editor.plugins.get(FileRepository);
    //执行上传文件
    model.change(writer => {
      const filesToUpload = options.file ? toArray(options.file) : toArray(options.files);;
      for (const file of filesToUpload) {
        _uploadFile(writer, model, fileRepository, file);
      }
    });

  }
}
function _uploadFile(writer, model, fileRepository, file) {
  const loader = fileRepository.createLoader(file);

  if (!loader) {
    return;
  }
  //开始上传
  console.log("开始上传" + file);
  console.log("开始上传fileRepository" + fileRepository);
  console.log(fileRepository);
  console.log("开始上传loader" + loader);
  console.log(loader);
  _insertFile(writer, model, { linkHref: "x", uploadId: loader.id }, file);
}
function _insertFile(writer, model, attributes = {}, file) {
  const selection = model.document.selection;
  const insertAtSelection = findOptimalInsertionRange(selection, model);

  const linkedText = writer.createText(file.name, attributes);
  model.insertContent(linkedText, insertAtSelection);

  if (linkedText.parent) {
    writer.setSelection(linkedText, 'on');
  }
}