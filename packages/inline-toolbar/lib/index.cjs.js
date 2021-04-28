'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('@draft-js-plugins/utils');
var draftJs = require('draft-js');
var buttons = require('@draft-js-plugins/buttons');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

var Toolbar = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Toolbar, _React$Component);

  function Toolbar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      isVisible: false,
      position: undefined,

      /**
       * If this is set, the toolbar will render this instead of the children
       * prop and will also be shown when the editor loses focus.
       * @type {Component}
       */
      overrideContent: undefined
    };
    _this.toolbar = null;

    _this.onOverrideContent = function (overrideContent) {
      _this.setState({
        overrideContent: overrideContent
      });
    };

    _this.onSelectionChanged = function () {
      // need to wait a tick for window.getSelection() to be accurate
      // when focusing editor with already present selection
      setTimeout(function () {
        if (!_this.toolbar) return; // The editor root should be two levels above the node from
        // `getEditorRef`. In case this changes in the future, we
        // attempt to find the node dynamically by traversing upwards.

        var editorRef = _this.props.store.getItem('getEditorRef')();

        if (!editorRef) return; // This keeps backwards compatibility with React 15

        var editorRoot = editorRef.refs && editorRef.refs.editor ? editorRef.refs.editor : editorRef.editor;

        while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
          editorRoot = editorRoot.parentNode;
        }

        var editorRootRect = editorRoot.getBoundingClientRect();
        var parentWindow = editorRoot.ownerDocument && editorRoot.ownerDocument.defaultView;
        var selectionRect = draftJs.getVisibleSelectionRect(parentWindow || window);
        if (!selectionRect) return; // The toolbar shouldn't be positioned directly on top of the selected text,
        // but rather with a small offset so the caret doesn't overlap with the text.

        var extraTopOffset = -5;
        var position = {
          top: editorRoot.offsetTop - _this.toolbar.offsetHeight + (selectionRect.top - editorRootRect.top) + extraTopOffset,
          left: editorRoot.offsetLeft + (selectionRect.left - editorRootRect.left) + selectionRect.width / 2
        };

        _this.setState({
          position: position
        });
      });
    };

    return _this;
  }

  var _proto = Toolbar.prototype;

  _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
    this.props.store.subscribeToItem('selection', this.onSelectionChanged);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.props.store.unsubscribeFromItem('selection', this.onSelectionChanged);
  }
  /**
   * This can be called by a child in order to render custom content instead
   * of the children prop. It's the responsibility of the callee to call
   * this function again with `undefined` in order to reset `overrideContent`.
   * @param {Component} overrideContent
   */
  ;

  _proto.getStyle = function getStyle() {
    var store = this.props.store;
    var _this$state = this.state,
        overrideContent = _this$state.overrideContent,
        position = _this$state.position;
    var selection = store.getItem('getEditorState')().getSelection(); // overrideContent could for example contain a text input, hence we always show overrideContent
    // TODO: Test readonly mode and possibly set isVisible to false if the editor is readonly

    var isVisible = !selection.isCollapsed() && selection.getHasFocus() || overrideContent;

    var style = _extends({}, position);

    if (isVisible) {
      style.visibility = 'visible';
      style.transform = 'translate(-50%) scale(1)';
      style.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';
    } else {
      style.transform = 'translate(-50%) scale(0)';
      style.visibility = 'hidden';
    }

    return style;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        theme = _this$props.theme,
        store = _this$props.store;
    var OverrideContent = this.state.overrideContent;
    var childrenProps = {
      theme: theme.buttonStyles,
      getEditorState: store.getItem('getEditorState'),
      setEditorState: store.getItem('setEditorState'),
      onOverrideContent: this.onOverrideContent
    };
    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: theme.toolbarStyles.toolbar,
      style: this.getStyle(),
      ref: function ref(element) {
        _this2.toolbar = element;
      }
    }, OverrideContent ? /*#__PURE__*/React__default['default'].createElement(OverrideContent, childrenProps) : this.props.children(childrenProps));
  };

  return Toolbar;
}(React__default['default'].Component);

Toolbar.defaultProps = {
  children: function children(externalProps) {
    return (
      /*#__PURE__*/
      // may be use React.Fragment instead of div to improve perfomance after React 16
      React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement(buttons.ItalicButton, externalProps), /*#__PURE__*/React__default['default'].createElement(buttons.BoldButton, externalProps), /*#__PURE__*/React__default['default'].createElement(buttons.UnderlineButton, externalProps), /*#__PURE__*/React__default['default'].createElement(buttons.CodeButton, externalProps))
    );
  }
};

var separator = "s1o2cezu";
function Seperator(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? separator : _ref$className;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: className
  });
}

var buttonStyles = {
  buttonWrapper: "bpsgbes",
  button: "b181v2oy",
  active: "a9immln"
};
var toolbarStyles = {
  toolbar: "tukdd6b"
};
var defaultTheme = {
  buttonStyles: buttonStyles,
  toolbarStyles: toolbarStyles
};

var index = (function (config) {
  if (config === void 0) {
    config = {};
  }

  var store = utils.createStore({
    isVisible: false
  });
  var _config = config,
      _config$theme = _config.theme,
      theme = _config$theme === void 0 ? defaultTheme : _config$theme;

  var InlineToolbar = function InlineToolbar(props) {
    return /*#__PURE__*/React__default['default'].createElement(Toolbar, _extends({}, props, {
      store: store,
      theme: theme
    }));
  };

  return {
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState,
          getEditorRef = _ref.getEditorRef;
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('getEditorRef', getEditorRef);
    },
    // Re-Render the text-toolbar on selection change
    onChange: function onChange(editorState) {
      store.updateItem('selection', editorState.getSelection());
      return editorState;
    },
    InlineToolbar: InlineToolbar
  };
});

exports.Separator = Seperator;
exports.default = index;
