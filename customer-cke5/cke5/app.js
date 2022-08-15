//版本基于稳定版cke5 @34.2.0进行二次开发

// 调试器
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Bold from '@plugin/plugin-blod/main';

import MyFilePlug from '@plugin/plugin-fileupload/main';

//文件上传使用的插件
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
//图片相关
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
//视频相关
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';


//图片相关的配置
import imageConf from  './config/image_config';
// export function MyEditor1(){
//     console.log("hello MyEditor");
// }
//需要的插件
const pluginsConf=[
  Essentials,
  Paragraph,
  Bold,
  Italic,
  SimpleUploadAdapter,
  ImageUpload,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  PictureEditing,
  ImageInsert,
  ImageResize,
  MediaEmbed,
  MyFilePlug,
]
//工具栏要显示的东西
const toolbarConf=[
  "undo",
  "redo",
  "|",
  Bold.pluginName,
  "Italic",
  'uploadImage',
  'cKFinder',
  'mediaEmbed',
  MyFilePlug.pluginName,
]



class MyUploadAdapter {
  constructor( loader ) {
      // The file loader instance to use during the upload.
      this.loader = loader;
  }

  // Starts the upload process.
  upload() {
      return this.loader.file
          .then( file => new Promise( ( resolve, reject ) => {
              this._initRequest();
              this._initListeners( resolve, reject, file );
              this._sendRequest( file );
          } ) );
  }

  // Aborts the upload process.
  abort() {
      if ( this.xhr ) {
          this.xhr.abort();
      }
  }
  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
      const xhr = this.xhr = new XMLHttpRequest();
      xhr.open( 'POST', 'http://localhost:8080/upload/file', true );
      xhr.responseType = 'json';
  }
  // Initializes XMLHttpRequest listeners.
  _initListeners( resolve, reject, file ) {
      const xhr = this.xhr;
      const loader = this.loader;
      const genericErrorText = `Couldn't upload file: ${ file.name }.`;
      xhr.addEventListener( 'error', () => reject( genericErrorText ) );
      xhr.addEventListener( 'abort', () => reject() );
      xhr.addEventListener( 'load', () => {
          const response = xhr.response;
          if ( !response || response.error ) {
              return reject( response && response.error ? response.error.message : genericErrorText );
          }
          resolve( {
              default: response.url
          } );
      } );
      if ( xhr.upload ) {
          xhr.upload.addEventListener( 'progress', evt => {
              if ( evt.lengthComputable ) {
                  loader.uploadTotal = evt.total;
                  loader.uploaded = evt.loaded;
              }
          } );
      }
  }
  _sendRequest( file ) {
      const data = new FormData();
      data.append( 'upload', file );
      this.xhr.send( data );
  }
}

function MyCustomUploadAdapterPlugin( editor ) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      // Configure the URL to the upload script in your back-end here!
      return new MyUploadAdapter( loader );
  };
}
//文件上传； https://github.com/eMAGTechLabs/ckeditor5-file-upload

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
        plugins: pluginsConf,
        extraPlugins: [MyCustomUploadAdapterPlugin],
        toolbar: toolbarConf,
        //图片，文件，视频上传分为不同的url，需要重写UploadAdapter 
        //https://stackoverflow.com/questions/53168438/ckeditor-5-register-more-than-one-upload-adapter
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl: 'http://localhost:8080/upload/file',
  
          // Enable the XMLHttpRequest.withCredentials property.
          // withCredentials: true,
  
          // Headers sent along with the XMLHttpRequest to the upload server.
          // headers: {
          // 	'X-CSRF-TOKEN': 'CSRF-Token',
          // 	Authorization: 'Bearer <JSON Web Token>'
          // }
        },
        image: imageConf,
       initialData: this.content,
        // 'imageConfig' --> IMAGE_CONFIG
        imageConfig: {
          className: 'hzhao'
        },
        // This value must be kept in sync with the language defined in webpack.config.js.
        language: 'zh-cn',
        //https://blog.csdn.net/qq_40121308/article/details/110470149
        //https://ckeditor.com/cke4/addon/html5video
        //https://github.com/Technologie-Visao/ckeditor5-video
        //https://github.com/ckeditor/ckeditor5/issues/7873
        //https://github.com/akilli/ckeditor5-media
        //https://github.com/Technologie-Visao/ckeditor5-video
        mediaEmbed: {   // 视频配置
          providers: [
            {
    					name: 'myprovider',
    					url: [
    						/^lizzy.*\.com.*\/media\/(\w+)/,
    						/^www\.lizzy.*/,
    						/(http|https):\/\/([\w.]+\/?)\S*/
    					],
    					html: match => {
    						//获取媒体url
                const input = match['input'];
    						return (
    							'<div style="position: relative; padding-bottom: 50%; height: 0; padding-bottom: 50%;">' +
    								`<iframe src="${input}" ` +
    									'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
    									'frameborder="0" allowtransparency="true" allow="encrypted-media">' +
    								'</iframe>' +
    							'</div>'
    						);
    					}
    				}
          ]
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
