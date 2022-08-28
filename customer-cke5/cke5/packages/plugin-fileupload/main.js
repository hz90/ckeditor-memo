import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileToolbarUI from './toolbar-ui';
import FileEditing from './editing';
import { COMMAND_NAME__FILE } from './constant';
//使用这个时候因为上传完文件需要显示连接，所以需要引入ckeditor5-link 包
//默认使用的是simpleUpload，如果不想使用默认的上传适配器可以自己配置
export default class MyFilePlug extends Plugin {
  static get requires() {
    return [ FileEditing, FileToolbarUI ];
  }
  static get pluginName() {
   return COMMAND_NAME__FILE;
  }
}
