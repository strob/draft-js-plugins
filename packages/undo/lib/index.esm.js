import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
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

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var UndoButton = /*#__PURE__*/function (_Component) {
  _inheritsLoose(UndoButton, _Component);

  function UndoButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.onClick = function (event) {
      event.stopPropagation();

      _this.props.store.setEditorState(EditorState.undo(_this.props.store.getEditorState()));
    };

    return _this;
  }

  var _proto = UndoButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$theme = _this$props.theme,
        theme = _this$props$theme === void 0 ? {} : _this$props$theme,
        children = _this$props.children,
        className = _this$props.className;
    var combinedClassName = clsx(theme.undo, className);
    return /*#__PURE__*/React.createElement("button", {
      disabled: !this.props.store || !this.props.store.getEditorState || this.props.store.getEditorState().getUndoStack().isEmpty(),
      type: "button",
      onClick: this.onClick,
      className: combinedClassName
    }, children);
  };

  return UndoButton;
}(Component);

UndoButton.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.any
};

var RedoButton = /*#__PURE__*/function (_Component) {
  _inheritsLoose(RedoButton, _Component);

  function RedoButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.onClick = function (event) {
      event.stopPropagation();

      _this.props.store.setEditorState(EditorState.redo(_this.props.store.getEditorState()));
    };

    return _this;
  }

  var _proto = RedoButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$theme = _this$props.theme,
        theme = _this$props$theme === void 0 ? {} : _this$props$theme,
        children = _this$props.children,
        className = _this$props.className;
    var combinedClassName = clsx(theme.redo, className);
    return /*#__PURE__*/React.createElement("button", {
      disabled: !this.props.store || !this.props.store.getEditorState || this.props.store.getEditorState().getRedoStack().isEmpty(),
      type: "button",
      onClick: this.onClick,
      className: combinedClassName
    }, children);
  };

  return RedoButton;
}(Component);

RedoButton.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.any
};

var button = "b1lh9taq";
var defaultTheme = {
  redo: button,
  undo: button
};

var index = (function (config) {
  if (config === void 0) {
    config = {};
  }

  var undoContent = config.undoContent ? config.undoContent : '↺';
  var redoContent = config.redoContent ? config.redoContent : '↻';
  var store = {
    getEditorState: undefined,
    setEditorState: undefined
  }; // Styles are overwritten instead of merged as merging causes a lot of confusion.
  //
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.

  var theme = config.theme ? config.theme : defaultTheme;

  var DecoratedUndoButton = function DecoratedUndoButton(props) {
    return /*#__PURE__*/React.createElement(UndoButton, _extends({}, props, {
      theme: theme,
      store: store
    }), undoContent);
  };

  var DecoratedRedoButton = function DecoratedRedoButton(props) {
    return /*#__PURE__*/React.createElement(RedoButton, _extends({}, props, {
      theme: theme,
      store: store
    }), redoContent);
  };

  return {
    UndoButton: DecoratedUndoButton,
    RedoButton: DecoratedRedoButton,
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    }
  };
});

export default index;
