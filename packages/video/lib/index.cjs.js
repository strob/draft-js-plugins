'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var draftJs = require('draft-js');
var PropTypes = require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

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

var VIDEOTYPE = 'draft-js-video-plugin-video';
var ATOMIC = 'atomic';

var types = /*#__PURE__*/Object.freeze({
  __proto__: null,
  VIDEOTYPE: VIDEOTYPE,
  ATOMIC: ATOMIC
});

function addVideo(editorState, _ref) {
  var src = _ref.src;

  if (draftJs.RichUtils.getCurrentBlockType(editorState) === ATOMIC) {
    return editorState;
  }

  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity(VIDEOTYPE, 'IMMUTABLE', {
    src: src
  });
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  return draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
}

var YOUTUBEMATCH_URL = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
var VIMEOMATCH_URL = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/; // eslint-disable-line no-useless-escape

function isYoutube(url) {
  return YOUTUBEMATCH_URL.test(url);
}
function isVimeo(url) {
  return VIMEOMATCH_URL.test(url);
}
function getYoutubeSrc(url) {
  var id = url && url.match(YOUTUBEMATCH_URL)[1];
  return {
    srcID: id,
    srcType: 'youtube',
    url: url
  };
}
function getVimeoSrc(url) {
  var id = url.match(VIMEOMATCH_URL)[3];
  return {
    srcID: id,
    srcType: 'vimeo',
    url: url
  };
}

var YOUTUBE_PREFIX = 'https://www.youtube.com/embed/';
var VIMEO_PREFIX = 'https://player.vimeo.com/video/';

var getSrc = function getSrc(_ref) {
  var src = _ref.src;

  if (isYoutube(src)) {
    var _getYoutubeSrc = getYoutubeSrc(src),
        srcID = _getYoutubeSrc.srcID;

    return "" + YOUTUBE_PREFIX + srcID;
  }

  if (isVimeo(src)) {
    var _getVimeoSrc = getVimeoSrc(src),
        _srcID = _getVimeoSrc.srcID;

    return "" + VIMEO_PREFIX + _srcID;
  }

  return undefined;
};

var DefaultVideoComponent = function DefaultVideoComponent(_ref2) {
  var blockProps = _ref2.blockProps,
      _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? '' : _ref2$className,
      style = _ref2.style,
      theme = _ref2.theme,
      otherProps = _objectWithoutPropertiesLoose(_ref2, ["blockProps", "className", "style", "theme"]);

  var src = getSrc(blockProps);

  if (src) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      style: style
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: theme.iframeContainer + " " + className
    }, /*#__PURE__*/React__default['default'].createElement("iframe", {
      className: theme.iframe,
      src: src,
      frameBorder: "0",
      allowFullScreen: true
    })));
  }

  otherProps.block;
      otherProps.customStyleMap;
      otherProps.customStyleFn;
      otherProps.decorator;
      otherProps.forceSelection;
      otherProps.offsetKey;
      otherProps.selection;
      otherProps.tree;
      otherProps.contentState;
      otherProps.blockStyleFn;
      var elementProps = _objectWithoutPropertiesLoose(otherProps, ["block", "customStyleMap", "customStyleFn", "decorator", "forceSelection", "offsetKey", "selection", "tree", "contentState", "blockStyleFn"]);

  return /*#__PURE__*/React__default['default'].createElement("video", _extends({
    src: blockProps.src,
    className: theme.video,
    style: style
  }, elementProps, {
    controls: true
  }));
};

DefaultVideoComponent.propTypes = {
  blockProps: PropTypes__default['default'].object.isRequired,
  className: PropTypes__default['default'].string,
  style: PropTypes__default['default'].object,
  theme: PropTypes__default['default'].object.isRequired
};

var defaultTheme = {
  iframeContainer: "ifi492u",
  iframe: "i1hzzm9j",
  invalidVideoSrc: "ikyzbpi",
  video: "vlyzuw8"
};

function videoPlugin(config) {
  if (config === void 0) {
    config = {};
  }

  var theme = config.theme ? config.theme : defaultTheme;
  var Video = config.videoComponent || DefaultVideoComponent;

  if (config.decorator) {
    Video = config.decorator(Video);
  }

  var ThemedVideo = function ThemedVideo(props) {
    return /*#__PURE__*/React__default['default'].createElement(Video, _extends({}, props, {
      theme: theme
    }));
  };

  return {
    blockRendererFn: function blockRendererFn(block, _ref) {
      var getEditorState = _ref.getEditorState;

      if (block.getType() === ATOMIC) {
        // TODO subject to change for draft-js next release
        var contentState = getEditorState().getCurrentContent();
        var entityKey = block.getEntityAt(0);
        if (!entityKey) return null;
        var entity = contentState.getEntity(entityKey);
        var type = entity.getType();

        var _entity$getData = entity.getData(),
            src = _entity$getData.src;

        if (type === VIDEOTYPE) {
          return {
            component: ThemedVideo,
            editable: false,
            props: {
              src: src
            }
          };
        }
      }

      return null;
    },
    addVideo: addVideo,
    types: types
  };
}

exports.default = videoPlugin;
