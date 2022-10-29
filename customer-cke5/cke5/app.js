//版本基于稳定版cke5 @34.2.0进行二次开发

// 调试器
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Bold from '@plugin/plugin-blod/main';
//----------上传文件相关的插件
import Link from '@ckeditor/ckeditor5-link/src/link';
import MyFilePlug from '@plugin/plugin-fileupload/main';
import FileUploadProgress from '@plugin/plugin-fileupload/process/fileuploadprogress';
// import MySimpleFileUploadAdapter from '@plugin/plugin-fileupload/myuploadAdapter/mysimplefileuploadadapter';
//---------------文件上传使用的插件
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
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar';
import VideoUpload from '@plugin/plugin-videoupload/videoupload';
import Video from '@plugin/plugin-videoupload/video';
import VideoResize from '@plugin/plugin-videoupload/videoresize';
import VideoToolbar from '@plugin/plugin-videoupload/videotoolbar';
import VideoStyle from '@plugin/plugin-videoupload/videostyle';
import MyFileVideoPlug from '@plugin/plugin-myvideoupload/main';

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
  Link,
  SimpleUploadAdapter,
  ImageUpload,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  PictureEditing,
  ImageInsert,
  ImageResize,
  MyFilePlug,
  FileUploadProgress,
  MediaEmbed,
  MediaEmbedToolbar,
  // MySimpleFileUploadAdapter,
  VideoToolbar, Video, VideoUpload, VideoResize, VideoStyle,
  MyFileVideoPlug
];
//工具栏要显示的东西
const toolbarConf=[
  "undo",
  "redo",
  "|",
  Bold.pluginName,
  "Italic",
  "link",
  'uploadImage',
  'mediaEmbed',
  MyFilePlug.pluginName,
  'videoUpload',
  MyFileVideoPlug.pluginName
];

class VideoUploadAdapter {
  constructor( loader ) {
      this.loader = loader;
  }

  upload() {
      const uploadVideo = async (file) => {
          this.loader.uploaded = false;
          return new Promise((resolve) => {
              setTimeout(() => {
                  this.loader.uploaded = true;
                  resolve({ default: 'http://127.0.0.1:8080/20220829-4c32c87cf9b848b0bd730b0eae68d4d1.mp4' });
              }, 2000);
          });
      };

      return this.loader.file.then((file) => uploadVideo(file));
  }

  abort() {
      return Promise.reject();
  }
}
function VideoUploadAdapterPlugin( editor ) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new VideoUploadAdapter(loader);
  };
}
//视频上传插件C:\Users\admin\Downloads\ckeditor-video-master  https://github.com/yunfqueen/ckeditor-video
//文件上传； https://github.com/eMAGTechLabs/ckeditor5-file-upload
//视频上传  https://gitee.com/xccjh/ckeditor5-xccjh/tree/master/src
//https://vuejscomponent.com/xccjhxccjh-ckeditor5-video-file-upload
//http://xccjh.gitee.io/vuebloger/timeLine/
//https://github.com/xccjh/ckeditor5-xccjh
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
         extraPlugins: [VideoUploadAdapterPlugin],
        toolbar: toolbarConf,
        //图片，文件，视频上传分为不同的url，需要重写UploadAdapter 
        //https://stackoverflow.com/questions/53168438/ckeditor-5-register-more-than-one-upload-adapter
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl: 'http://localhost:8080/upload/image',
  
          // Enable the XMLHttpRequest.withCredentials property.
          // withCredentials: true,
  
          // Headers sent along with the XMLHttpRequest to the upload server.
          // headers: {
          // 	'X-CSRF-TOKEN': 'CSRF-Token',
          // 	Authorization: 'Bearer <JSON Web Token>'
          // }
        },
        mySimpleFileUpload: {
          url: 'http://localhost:8080/upload/file',
        // withCredentials: true,
        // headers: {
        // 	'X-CSRF-TOKEN': 'CSRF_TOKEN',
        // 	Authorization: 'Bearer <JSON Web Token>',
        // },
          fileTypes: [
            '.pdf',
            '.doc',
            '.docx',
            '.xls',
            '.xlsx'
          ]
        },
        mySimpleFileVideoUpload: {
          url: 'http://localhost:8080/upload/video',
        // withCredentials: true,
        // headers: {
        // 	'X-CSRF-TOKEN': 'CSRF_TOKEN',
        // 	Authorization: 'Bearer <JSON Web Token>',
        // },
          fileTypes: [
            '.mp4'
          ]
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
        // mediaEmbed: {   // 视频配置
        //   providers: [
        //     {
    		// 			name: 'myprovider',
    		// 			url: [
    		// 				/^lizzy.*\.com.*\/media\/(\w+)/,
    		// 				/^www\.lizzy.*/,
    		// 				/(http|https):\/\/([\w.]+\/?)\S*/
    		// 			],
    		// 			html: match => {
    		// 				//获取媒体url
        //         const input = match['input'];
    		// 				return (
    		// 					'<div style="position: relative; padding-bottom: 50%; height: 0; padding-bottom: 50%;">' +
    		// 						`<iframe src="${input}" ` +
    		// 							'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
    		// 							'frameborder="0" allowtransparency="true" allow="encrypted-media">' +
    		// 						'</iframe>' +
    		// 					'</div>'
    		// 				);
    		// 			}
    		// 		}
        //   ]
        // }
        mediaEmbed: {
          extraProviders: [
              {
                  name: 'zdy',
                  url: [
                      /(.*?)/,
                  ],
                  html: match => {
                      const src = match.input;
                      return (
                          '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;pointer-events: auto;">' +
                          '<video controls style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" src="' + src + '">' +
                          '</video>' +
                          '</div>'
                      );
                  }
              },
          ]
      },
      video: {
        upload: {
            types: ['mp4'],
            allowMultipleFiles: false,
        },
        styles: [
            'alignLeft', 'alignCenter', 'alignRight'
        ],

        // Configure the available video resize options.
        resizeOptions: [
            {
                name: 'videoResize:original',
                label: 'Original',
                icon: 'original'
            },
            {
                name: 'videoResize:50',
                label: '50',
                icon: 'medium'
            },
            {
                name: 'videoResize:75',
                label: '75',
                icon: 'large'
            }
        ],

        // You need to configure the video toolbar, too, so it shows the new style
        // buttons as well as the resize buttons.
        toolbar: [
            'videoStyle:alignLeft', 'videoStyle:alignCenter', 'videoStyle:alignRight',
            '|',
            'videoResize:50',
            'videoResize:75',
            'videoResize:original'
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
