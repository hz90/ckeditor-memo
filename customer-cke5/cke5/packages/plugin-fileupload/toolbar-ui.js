import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview';
// import boldIcon from "@ckeditor/ckeditor5-basic-styles/theme/icons/bold.svg";
//加载本地路径图标
import folderadd from "@plugin/plugin-fileupload/folderadd.svg";
import { COMMAND_NAME__FILE, COMMAND_LABEL__FILE,} from "./constant";

export default class FileToolbarUI extends Plugin {
  init() {
    this._createToolbarButton();
  }

  _createToolbarButton() {
    const editor = this.editor;
    const command = editor.commands.get(COMMAND_NAME__FILE);
    editor.ui.componentFactory.add(COMMAND_NAME__FILE, (locale) => {
      const view = new FileDialogButtonView(locale);
      view.set( {
        acceptedType: '*',
        allowMultipleFiles: false
      } );
      view.buttonView.set({
        label: COMMAND_LABEL__FILE,
        tooltip: true,
        icon: folderadd,
        // withText: true, // 在按钮上展示 label
        // class: "toolbar_button_bold",
      });
      view.on( 'done', ( evt, files ) => {
        for ( const file of Array.from( files ) ) {
          console.log( 'Selected file', file );
          editor.execute('ck-myuploadfile', { files: file });
        }
      });
      // // 将按钮的状态关联到命令
      view.bind("isOn", "isEnabled").to(command, "value", "isEnabled");
      // // 点击按钮时触发相应命令
      // this.listenTo(view, "execute", () => editor.execute(COMMAND_NAME__FILE));
      return view;
    });
  }
}
