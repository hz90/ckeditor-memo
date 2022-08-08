// 调试器
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Bold from '@plugin/plugin-blod/main';


// export function MyEditor1(){
//     console.log("hello MyEditor");
// }

export class MyEditor {
    constructor(props) {
      Object.assign(
        this,
        {
          id: "editor",
        },
        props
      );
      this.render();
    }
  
    render() {
      ClassicEditor.create(document.querySelector(`#${this.id}`), {
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          // Link,
          // Image,
        ],
        toolbar: [
          "undo",
          "redo",
          "|",
          Bold.pluginName,
          "Italic"
        ],
       initialData: this.content,
        // 'imageConfig' --> IMAGE_CONFIG
        imageConfig: {
          className: 'hzhao'
        }
      })
        .then((editor) => {
          CKEditorInspector.attach( editor );
          this.editor = editor;
        })
        .catch((error) => {
          console.error(error.stack);
        });
    }
  }

// export class myClassicEditor {
//     constructor(name) {
//         this.name = name;
//     }
   
// }
// // Plugins to include in the build.
// ClassicEditor.builtinPlugins = [
//     Essentials,
//     Paragraph,
//     Bold,
//     Italic,
// ];

// // Editor configuration.
// ClassicEditor.defaultConfig = {
// 	toolbar: {
// 		items: [
// 			Bold.pluginName, 'italic'
// 		]
// 	},
// 	// This value must be kept in sync with the language defined in webpack.config.js.
// 	language: 'zh-cn'
// };

// ClassicEditor
//     .create( document.querySelector( '#editor' ), {
//         plugins: [ Essentials, Paragraph, Bold, Italic ],
//         toolbar: [ Bold.pluginName, 'italic' ]
//     } )
//     .then( editor => {
//         console.log( 'Editor was initialized', editor );
//         Window.myeditor=editor;
//     } )
//     .catch( error => {
//         console.error( error.stack );
//     } );
