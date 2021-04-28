import React from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import clsx from 'clsx';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var addImage = (function (editorState, url, extraData) {
  var urlType = 'IMAGE';
  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', _extends({}, extraData, {
    src: url
  }));
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  var newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
  return EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter());
});

var ImageComponent = /*#__PURE__*/React.forwardRef( // eslint-disable-next-line prefer-arrow-callback
function Image(props, ref) {
  var block = props.block,
      className = props.className,
      _props$theme = props.theme,
      theme = _props$theme === void 0 ? {} : _props$theme,
      otherProps = _objectWithoutPropertiesLoose(props, ["block", "className", "theme"]); // leveraging destructuring to omit certain properties from props


  otherProps.blockProps;
      otherProps.customStyleMap;
      otherProps.customStyleFn;
      otherProps.decorator;
      otherProps.forceSelection;
      otherProps.offsetKey;
      otherProps.selection;
      otherProps.tree;
      otherProps.blockStyleFn;
      otherProps.preventScroll;
      var contentState = otherProps.contentState,
      elementProps = _objectWithoutPropertiesLoose(otherProps, ["blockProps", "customStyleMap", "customStyleFn", "decorator", "forceSelection", "offsetKey", "selection", "tree", "blockStyleFn", "preventScroll", "contentState"]);

  var combinedClassName = clsx(theme.image, className);

  var _contentState$getEnti = contentState.getEntity(block.getEntityAt(0)).getData(),
      src = _contentState$getEnti.src;

  return /*#__PURE__*/React.createElement("img", _extends({}, elementProps, {
    ref: ref,
    src: src,
    role: "presentation",
    className: combinedClassName
  }));
});

var defaultTheme = {};
var index = (function (config) {
  if (config === void 0) {
    config = {};
  }

  var theme = config.theme ? config.theme : defaultTheme;
  var Image = config.imageComponent || ImageComponent;

  if (config.decorator) {
    Image = config.decorator(Image);
  }

  var ThemedImage = function ThemedImage(props) {
    return /*#__PURE__*/React.createElement(Image, _extends({}, props, {
      theme: theme
    }));
  };

  return {
    blockRendererFn: function blockRendererFn(block, _ref) {
      var getEditorState = _ref.getEditorState;

      if (block.getType() === 'atomic') {
        var contentState = getEditorState().getCurrentContent();
        var entity = block.getEntityAt(0);
        if (!entity) return null;
        var type = contentState.getEntity(entity).getType();

        if (type === 'IMAGE' || type === 'image') {
          return {
            component: ThemedImage,
            editable: false
          };
        }

        return null;
      }

      return null;
    },
    addImage: addImage
  };
});
var Image = ImageComponent;

export default index;
export { Image };
