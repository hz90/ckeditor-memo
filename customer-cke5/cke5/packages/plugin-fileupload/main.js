import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileToolbarUI from './toolbar-ui';
import FileEditing from './editing';
import { COMMAND_NAME__FILE } from './constant';

export default class MyFilePlug extends Plugin {
  static get requires() {
    return [ FileEditing, FileToolbarUI ];
  }
  static get pluginName() {
   return COMMAND_NAME__FILE;
  }
}
