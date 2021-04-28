'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var clsx = require('clsx');
var linkifyIt = require('linkify-it');
var tlds = require('tlds');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var clsx__default = /*#__PURE__*/_interopDefaultLegacy(clsx);
var linkifyIt__default = /*#__PURE__*/_interopDefaultLegacy(linkifyIt);
var tlds__default = /*#__PURE__*/_interopDefaultLegacy(tlds);

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

var linkify$1 = linkifyIt__default['default']();
linkify$1.tlds(tlds__default['default']);
// The component we render when we encounter a hyperlink in the text
function Link(props) {
  var _props$decoratedText = props.decoratedText,
      decoratedText = _props$decoratedText === void 0 ? '' : _props$decoratedText,
      _props$theme = props.theme,
      theme = _props$theme === void 0 ? {} : _props$theme,
      _props$target = props.target,
      target = _props$target === void 0 ? '_self' : _props$target,
      _props$rel = props.rel,
      rel = _props$rel === void 0 ? 'noreferrer noopener' : _props$rel,
      className = props.className,
      component = props.component;
      props.dir;
      props.entityKey;
      props.getEditorState;
      props.offsetKey;
      props.setEditorState;
      props.contentState;
      props.blockKey;
      props.start;
      props.end;
      var otherProps = _objectWithoutPropertiesLoose(props, ["decoratedText", "theme", "target", "rel", "className", "component", "dir", "entityKey", "getEditorState", "offsetKey", "setEditorState", "contentState", "blockKey", "start", "end"]);

  var combinedClassName = clsx__default['default'](theme == null ? void 0 : theme.link, className);
  var links = linkify$1.match(decoratedText);
  var href = links && links[0] ? links[0].url : '';

  var linkProps = _extends({}, otherProps, {
    href: href,
    target: target,
    rel: rel,
    className: combinedClassName
  });

  return component ? /*#__PURE__*/React__default['default'].createElement(component, linkProps) :
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  React__default['default'].createElement("a", linkProps);
}

var linkify = linkifyIt__default['default']();
linkify.tlds(tlds__default['default']);
function extractLinks(text) {
  return linkify.match(text);
}

var linkStrategy = function linkStrategy(contentBlock, callback) {
  var links = extractLinks(contentBlock.getText());

  if (links) {
    for (var _iterator = _createForOfIteratorHelperLoose(links), _step; !(_step = _iterator()).done;) {
      var link = _step.value;
      callback(link.index, link.lastIndex);
    }
  }
};

var defaultTheme = {
  link: "lxvs42t"
};

var index = (function (config) {
  if (config === void 0) {
    config = {};
  }

  // Styles are overwritten instead of merged as merging causes a lot of confusion.
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.
  var _config = config,
      component = _config.component,
      _config$theme = _config.theme,
      theme = _config$theme === void 0 ? defaultTheme : _config$theme,
      _config$target = _config.target,
      target = _config$target === void 0 ? '_self' : _config$target,
      _config$rel = _config.rel,
      rel = _config$rel === void 0 ? 'noreferrer noopener' : _config$rel;

  var DecoratedLink = function DecoratedLink(props) {
    return /*#__PURE__*/React__default['default'].createElement(Link, _extends({}, props, {
      theme: theme,
      target: target,
      rel: rel,
      component: component
    }));
  };

  return {
    decorators: [{
      strategy: linkStrategy,
      component: DecoratedLink
    }]
  };
});

exports.default = index;
exports.extractLinks = extractLinks;
