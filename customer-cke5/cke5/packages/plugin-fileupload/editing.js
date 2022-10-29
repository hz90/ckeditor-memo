// editing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import FileRepository from "@ckeditor/ckeditor5-upload/src/filerepository";
import Notification from '@ckeditor/ckeditor5-ui/src/notification/notification';
import FileCommand from "./command";
import { COMMAND_NAME__FILE, SCHEMA_NAME__FILE } from "./constant";
import { createImageViewElement, createImageModel } from './utils';
export default class FileEditing extends Plugin {
  static get requires() {
		return [ FileRepository, Notification ];
	}
  static get pluginName() {
    return "FileEditing";
  }
  init() {
    const editor = this.editor;
    const doc = editor.model.document;
    const schema = editor.model.schema;
    const conversion = editor.conversion;
    const fileRepository = editor.plugins.get(FileRepository);

    // Setup schema to allow uploadId and uploadStatus for files.
    //注册一个schema允许uploadId 和 uploadStatus 使用files 
    schema.extend('$text', {
      allowAttributes: [
        'uploadId',
        'uploadStatus'
      ]
    });

    // 注册一个 BoldCommand 命令
    editor.commands.add(COMMAND_NAME__FILE, new FileCommand(editor));


    // 注册一个转化器
    conversion.for('upcast')
      .attributeToAttribute({
        view: {
          name: 'a',
          key: 'uploadId'
        },
        model: 'uploadId'
      });

    // Upload placeholder files that appeared in the model.
    doc.on('change', () => {
      const changes = doc.differ.getChanges({ includeChangesInGraveyard: true });
      for (const entry of changes) {
        if (entry.type == 'insert') {
          const item = entry.position.nodeAfter;
          if (item) {
            if(item.name=='video'){
              continue;
            }
            const isInGraveyard = entry.position.root.rootName == '$graveyard';
            for (const file of getFileLinksFromChangeItem(editor, item)) {
              // Check if the file element still has upload id.
              const uploadId = file.getAttribute('uploadId');
              if (!uploadId) {
                continue;
              }

              // Check if the file is loaded on this client.
              const loader = fileRepository.loaders.get(uploadId);

              if (!loader) {
                continue;
              }

              if (isInGraveyard) {
                // If the file was inserted to the graveyard - abort the loading process.
                loader.abort();
              } else if (loader.status == 'idle') {
                // If the file was inserted into content and has not been loaded yet, start loading it.
                this._readAndUpload(loader, file);
              }
            }
          }

        }
      }
    });


  }
  /**
     * Reads and uploads a file.
     *
     * @protected
     * @param {module:upload/filerepository~FileLoader} loader
     * @param {module:engine/model/element~Element} fileElement
     * @returns {Promise}
     */
  _readAndUpload(loader, fileElement) {
    const editor = this.editor;
    const model = editor.model;
    const t = editor.locale.t;
    const fileRepository = editor.plugins.get(FileRepository);
    const notification = editor.plugins.get(Notification);

    model.enqueueChange('transparent', writer => {
      writer.setAttribute('uploadStatus', 'reading', fileElement);
    });

    return loader.read()
      .then(() => {
        const promise = loader.upload();

        model.enqueueChange('transparent', writer => {
          writer.setAttribute('uploadStatus', 'uploading', fileElement);
        });

        return promise;
      })
      .then(data => {
        model.enqueueChange('transparent', writer => {
          writer.setAttributes({ uploadStatus: 'complete', linkHref: data.url }, fileElement);
        });

        clean();
      })
      .catch(error => {
        // If status is not 'error' nor 'aborted' - throw error because it means that something else went wrong,
        // it might be generic error and it would be real pain to find what is going on.
        if (loader.status !== 'error' && loader.status !== 'aborted') {
          throw error;
        }

        // Might be 'aborted'.
        if (loader.status == 'error' && error) {
          notification.showWarning(error, {
            title: t('Upload failed'),
            namespace: 'upload'
          });
        }

        clean();

        // Permanently remove file from insertion batch.
        model.enqueueChange('transparent', writer => {
          writer.remove(fileElement);
        });
      });

    function clean() {
      model.enqueueChange('transparent', writer => {
        writer.removeAttribute('uploadId', fileElement);
        writer.removeAttribute('uploadStatus', fileElement);
      });

      fileRepository.destroyLoader(loader);
    }
  }
}
function getFileLinksFromChangeItem( editor, item ) {
	return Array.from( editor.model.createRangeOn( item ) )
		// .filter( value => value.item.hasAttribute('linkHref'))
		.map( value => value.item );
}