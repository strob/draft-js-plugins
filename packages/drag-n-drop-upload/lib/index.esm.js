import { EditorState } from 'draft-js';

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// Read file contents intelligently as plain text/json, image as dataUrl or
// anything else as binary
function readFile(file) {
  return new Promise(function (resolve) {
    var reader = new FileReader(); // This is called when finished reading

    reader.onload = function (event) {
      // Return an array with one image
      resolve({
        // These are attributes like size, name, type, ...
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        lastModifiedDate: file.lastModifiedDate,
        lastModified: file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,
        // This is the files content as base64
        src: event.target.result
      });
    };

    if (file.type.indexOf('text/') === 0 || file.type === 'application/json') {
      reader.readAsText(file);
    } else if (file.type.indexOf('image/') === 0) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsBinaryString(file);
    }
  });
} // Read multiple files using above function

function readFiles(files) {
  return Promise.all(files.map(readFile));
}

/* function defaultHandleBlock(state, selection, data, defaultBlockType) {
  return addBlock(state, selection, defaultBlockType, data);
} */

function onDropFile(config) {
  return function onDropFileInner(selection, files, _ref) {
    var getEditorState = _ref.getEditorState,
        setEditorState = _ref.setEditorState;
    // TODO need to make sure the correct image block is added
    // TODO -> addImage must be passed in. content type matching should happen
    // TODO make sure the Form building also works fine with S3 direct upload
    // Get upload function from config or editor props
    var handleUpload = config.handleUpload;

    if (handleUpload) {
      var formData = new FormData(); // Set data {files: [Array of files], formData: FormData}

      var data = {
        files: [],
        formData: formData
      };

      for (var _iterator = _createForOfIteratorHelperLoose(files), _step; !(_step = _iterator()).done;) {
        var file = _step.value;

        // eslint-disable-line no-restricted-syntax
        if (file && file instanceof File) {
          data.formData.append('files', file);
          data.files.push(file);
        }
      }

      setEditorState(EditorState.acceptSelection(getEditorState(), selection)); // Read files on client side

      readFiles(data.files).then(function (placeholders) {
        // Add blocks for each image before uploading
        var editorState = getEditorState();
        placeholders.forEach(function (placeholder) {
          if (config.addImage) {
            editorState = config.addImage(editorState, placeholder.src);
          }
        });
        setEditorState(editorState); // Perform upload
        // handleUpload(data, (uploadedFiles, { retainSrc }) => {
        //   // Success, remove 'progress' and 'src'
        //   let newEditorState = getEditorState();
        //   uploadedFiles.forEach((file) => {
        //     const blocks = getBlocksWhereEntityData(state, (block) => block.src === file.src && block.progress !== undefined);
        //     if (blocks.size) {
        //       const newEditorStateOrBlockType = handleBlock
        //         ? handleBlock(newEditorState, newEditorState.getSelection(), file)
        //         : defaultBlockType;
        //
        //       newEditorState = replaceBlock(
        //         modifyBlockData(
        //           newEditorState,
        //           blocks.first().get('key'),
        //           retainSrc ? { progress: undefined } : { progress: undefined, src: undefined }
        //         ),
        //         blocks.first().get('key'),
        //         newEditorStateOrBlockType
        //       );
        //     } /* else {
        //       const newEditorStateOrBlockType = handleBlock
        //         ? handleBlock(newEditorState, newEditorState.getSelection(), file)
        //         : defaultHandleBlock(newEditorState, newEditorState.getSelection(), file, defaultBlockType);
        //
        //       if (!newEditorStateOrBlockType) {
        //         newEditorState = defaultHandleBlock(newEditorState, selection, file, defaultBlockType);
        //       } else if (typeof newEditorStateOrBlockType === 'string') {
        //         newEditorState = defaultHandleBlock(newEditorState, selection, file, newEditorStateOrBlockType);
        //       } else {
        //         newEditorState = newEditorStateOrBlockType;
        //       }
        //     } */
        //   });
        //
        //   // Propagate progress
        //   if (handleProgress) handleProgress(null);
        //   setEditorState(newEditorState);
        // }, () => {
        //   // console.error(err);
        // }, (percent) => {
        //   // On progress, set entity data's progress field
        //   let newEditorState = getEditorState();
        //   placeholders.forEach((placeholder) => {
        //     const blocks = getBlocksWhereEntityData(newEditorState, (p) => p.src === placeholder.src && p.progress !== undefined);
        //     if (blocks.size) {
        //       newEditorState = modifyBlockData(newEditorState, blocks.first().get('key'), { progress: percent });
        //     }
        //   });
        //   setEditorState(newEditorState);
        //
        //   // Propagate progress
        //   if (handleProgress) {
        //     handleProgress(percent);
        //   }
        // });
      });
      return 'handled';
    }

    return 'not-handled';
  };
}

var createDndFileUploadPlugin = function createDndFileUploadPlugin(config) {
  if (config === void 0) {
    config = {};
  }

  return {
    // Handle file drops
    handleDroppedFiles: onDropFile(config)
  };
};

export default createDndFileUploadPlugin;
export { readFile, readFiles };
