'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var clsx = require('clsx');
var PropTypes = require('prop-types');
var draftJs = require('draft-js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var clsx__default = /*#__PURE__*/_interopDefaultLegacy(clsx);
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

function Divider(_ref) {
  _ref.block;
      var className = _ref.className,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? {} : _ref$theme,
      otherProps = _objectWithoutPropertiesLoose(_ref, ["block", "className", "theme"]);

  otherProps.blockProps;
      otherProps.customStyleMap;
      otherProps.customStyleFn;
      otherProps.decorator;
      otherProps.forceSelection;
      otherProps.offsetKey;
      otherProps.selection;
      otherProps.tree;
      otherProps.contentState;
      otherProps.blockStyleFn;
      otherProps.preventScroll;
      var elementProps = _objectWithoutPropertiesLoose(otherProps, ["blockProps", "customStyleMap", "customStyleFn", "decorator", "forceSelection", "offsetKey", "selection", "tree", "contentState", "blockStyleFn", "preventScroll"]);

  var combinedClassName = clsx__default['default'](theme.divider, className);
  return /*#__PURE__*/React__default['default'].createElement("hr", _extends({}, elementProps, {
    className: combinedClassName
  }));
}

var DividerButton = function DividerButton(props) {
  var onClick = function onClick(event) {
    event.preventDefault();
    var editorState = props.getEditorState();
    var newEditorState = props.addDivider(editorState);
    props.setEditorState(newEditorState);
  };

  var preventBubblingUp = function preventBubblingUp(event) {
    event.preventDefault();
  };

  var blockTypeIsActive = function blockTypeIsActive() {
    var editorState = props.getEditorState();
    var type = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType();
    return type === props.blockType;
  };

  var _props$theme = props.theme,
      theme = _props$theme === void 0 ? {} : _props$theme;
  var className = blockTypeIsActive() ? clsx__default['default'](theme.button, theme.active) : theme.button;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: theme.buttonWrapper,
    onMouseDown: preventBubblingUp
  }, /*#__PURE__*/React__default['default'].createElement("button", {
    className: className,
    onClick: onClick,
    type: "button"
  }, /*#__PURE__*/React__default['default'].createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  }))));
};

DividerButton.propTypes = {
  theme: PropTypes__default['default'].object,
  getEditorState: PropTypes__default['default'].func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  setEditorState: PropTypes__default['default'].func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  addDivider: PropTypes__default['default'].func.isRequired
};

function addDivider(entityType) {
  return function (editorState, data) {
    var contentState = editorState.getCurrentContent();
    var contentStateWithEntity = contentState.createEntity(entityType, 'IMMUTABLE', data);
    var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    var newEditorState = draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    return draftJs.EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter());
  };
}

var defaultTheme = {
  divider: "d6zlymw"
};

var createDividerPlugin = function createDividerPlugin(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$entityType = _ref.entityType,
      entityType = _ref$entityType === void 0 ? 'divider' : _ref$entityType,
      _ref$dividerComponent = _ref.dividerComponent,
      dividerComponent = _ref$dividerComponent === void 0 ? Divider : _ref$dividerComponent,
      _ref$buttonComponent = _ref.buttonComponent,
      buttonComponent = _ref$buttonComponent === void 0 ? DividerButton : _ref$buttonComponent,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? defaultTheme : _ref$theme,
      decorator = _ref.decorator;

  var Divider$1 = dividerComponent;

  if (typeof decorator === 'function') {
    Divider$1 = decorator(Divider$1);
  }

  var ThemedDivider = function ThemedDivider(props) {
    return /*#__PURE__*/React__default['default'].createElement(Divider$1, _extends({}, props, {
      theme: theme
    }));
  };

  var Button = buttonComponent;

  var DividerButton$1 = function DividerButton(props) {
    return /*#__PURE__*/React__default['default'].createElement(Button, _extends({}, props, {
      addDivider: addDivider(entityType)
    }));
  };

  return {
    blockRendererFn: function blockRendererFn(block, _ref2) {
      var getEditorState = _ref2.getEditorState;

      if (block.getType() === 'atomic') {
        var contentState = getEditorState().getCurrentContent();
        var entity = block.getEntityAt(0);
        if (!entity) return null;
        var type = contentState.getEntity(entity).getType();

        if (type === entityType) {
          return {
            component: ThemedDivider,
            editable: false
          };
        }
      }

      return null;
    },
    DividerButton: DividerButton$1,
    addDivider: addDivider(entityType)
  };
};

exports.default = createDividerPlugin;
