import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import VideoToolbarUI from './toolbar-ui';
import MyVideoEditing from './editing';
import { COMMAND_NAME__FILE_VIDEO } from './constant';
//使用这个时候因为上传完文件需要显示连接，所以需要引入ckeditor5-link 包
//默认使用的是simpleUpload，如果不想使用默认的上传适配器可以自己配置
export default class MyFileVideoPlug extends Plugin {
  static get requires() {
    return [ MyVideoEditing, VideoToolbarUI ];
  }
  static get pluginName() {
   return COMMAND_NAME__FILE_VIDEO;
  }
}
