import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview';
// import boldIcon from "@ckeditor/ckeditor5-basic-styles/theme/icons/bold.svg";
//加载本地路径图标
import folderadd from "@plugin/plugin-fileupload/folderadd.svg";
import { COMMAND_NAME__FILE, COMMAND_LABEL__FILE,} from "./constant";
import MySimpleFileUploadAdapter from "@plugin/plugin-fileupload/myuploadAdapter/mysimplefileuploadadapter";


export default class FileToolbarUI extends Plugin {
  init() {
    this._createToolbarButton();
  }

  _createToolbarButton() {
    const editor = this.editor;
    editor.ui.componentFactory.add(COMMAND_NAME__FILE, (locale) => {
      const command = editor.commands.get( COMMAND_NAME__FILE );
      const view = new FileDialogButtonView(locale);
      let fileTypes = editor.config.get( 'mySimpleFileUpload.fileTypes' );
      if(!fileTypes){
          fileTypes=['*'];
      }
      view.set( {
        acceptedType: fileTypes.map(type => `${ type }`).join(','),
        allowMultipleFiles: false
      } );
      view.buttonView.set({
        label: COMMAND_LABEL__FILE,
        tooltip: true,
        icon: folderadd,
        // withText: true, // 在按钮上展示 label
        // class: "toolbar_button_bold",
      });
      view.buttonView.bind( 'isEnabled' ).to( command );

      view.on( 'done', ( evt, files ) => {
        new MySimpleFileUploadAdapter(editor).init();
        for ( const file of Array.from( files ) ) {
          console.log( 'Selected file', file );
          editor.execute(COMMAND_NAME__FILE, { files: file });
        }
        new SimpleUploadAdapter(editor).init();
      });

      return view;
    });
  }
}
