import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview';
// import boldIcon from "@ckeditor/ckeditor5-basic-styles/theme/icons/bold.svg";
//加载本地路径图标
import video from "@plugin/plugin-myvideoupload/video.svg";
import { COMMAND_NAME__FILE_VIDEO, COMMAND_LABEL__FILE_VIDEO,} from "./constant";
import MySimpleFileVideoUploadAdapter from "@plugin/plugin-myvideoupload/myuploadAdapter/mysimplefileuploadadapter";


export default class VideoToolbarUI extends Plugin {
  init() {
    this._createToolbarButton();
  }

  _createToolbarButton() {
    const editor = this.editor;
    editor.ui.componentFactory.add(COMMAND_NAME__FILE_VIDEO , (locale) => {
      const command = editor.commands.get( COMMAND_NAME__FILE_VIDEO );
      const view = new FileDialogButtonView(locale);
      let fileTypes = editor.config.get( 'mySimpleFileVideoUpload.fileTypes' );
      if(!fileTypes){
          fileTypes=['*'];
      }
      view.set( {
        acceptedType: fileTypes.map(type => `${ type }`).join(','),
        allowMultipleFiles: false
      } );
      view.buttonView.set({
        label: COMMAND_LABEL__FILE_VIDEO,
        tooltip: true,
        icon: video,
        // withText: true, // 在按钮上展示 label
        // class: "toolbar_button_bold",
      });
      view.buttonView.bind( 'isEnabled' ).to( command );

      view.on( 'done', ( evt, files ) => {
        new MySimpleFileVideoUploadAdapter(editor).init();
        for ( const file of Array.from( files ) ) {
          console.log( 'Selected file', file );
          editor.execute(COMMAND_NAME__FILE_VIDEO, { files: file });
        }
        new SimpleUploadAdapter(editor).init();
      });

      return view;
    });
  }
}
