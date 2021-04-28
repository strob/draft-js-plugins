import React, { Component } from 'react';
import { createStore } from '@draft-js-plugins/utils';
import PropTypes from 'prop-types';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import { HeadlineOneButton, HeadlineTwoButton, BlockquoteButton, CodeBlockButton, UnorderedListButton, OrderedListButton } from '@draft-js-plugins/buttons';

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

var BlockTypeSelect = /*#__PURE__*/function (_Component) {
  _inheritsLoose(BlockTypeSelect, _Component);

  function BlockTypeSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      style: {
        transform: 'translate(-50%) scale(0)'
      }
    };

    _this.onMouseEnter = function () {
      _this.setState({
        style: {
          transform: 'translate(-50%) scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)'
        }
      });
    };

    _this.onMouseLeave = function () {
      _this.setState({
        style: {
          transform: 'translate(-50%) scale(0)'
        }
      });
    };

    _this.onMouseDown = function (clickEvent) {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
    };

    return _this;
  }

  var _proto = BlockTypeSelect.prototype;

  _proto.render = function render() {
    var _theme$blockTypeSelec, _theme$blockTypeSelec2, _theme$blockTypeSelec3;

    var _this$props = this.props,
        theme = _this$props.theme,
        getEditorState = _this$props.getEditorState,
        setEditorState = _this$props.setEditorState;
    return /*#__PURE__*/React.createElement("div", {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onMouseDown: this.onMouseDown
    }, /*#__PURE__*/React.createElement("div", {
      className: (_theme$blockTypeSelec = theme.blockTypeSelectStyles) == null ? void 0 : _theme$blockTypeSelec.blockType
    }, /*#__PURE__*/React.createElement("svg", {
      height: "24",
      viewBox: "0 0 24 24",
      width: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
    }))), /*#__PURE__*/React.createElement("div", {
      className: (_theme$blockTypeSelec2 = theme.blockTypeSelectStyles) == null ? void 0 : _theme$blockTypeSelec2.spacer
    }), /*#__PURE__*/React.createElement("div", {
      className: (_theme$blockTypeSelec3 = theme.blockTypeSelectStyles) == null ? void 0 : _theme$blockTypeSelec3.popup,
      style: this.state.style
    }, this.props.childNodes({
      getEditorState: getEditorState,
      setEditorState: setEditorState,
      theme: theme.buttonStyles
    })));
  };

  return BlockTypeSelect;
}(Component);

BlockTypeSelect.propTypes = {
  childNodes: PropTypes.func
};

var Toolbar = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Toolbar, _React$Component);

  function Toolbar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      position: {
        transform: 'scale(0)'
      }
    };

    _this.onEditorStateChange = function (editorState) {
      var selection = editorState.getSelection();

      if (!selection.getHasFocus()) {
        _this.setState({
          position: {
            transform: 'scale(0)'
          }
        });

        return;
      }

      var currentContent = editorState.getCurrentContent();
      var currentBlock = currentContent.getBlockForKey(selection.getStartKey()); // TODO verify that always a key-0-0 exists

      var offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0); // Note: need to wait on tick to make sure the DOM node has been create by Draft.js

      setTimeout(function () {
        var node = document.querySelectorAll("[data-offset-key=\"" + offsetKey + "\"]")[0]; // The editor root should be two levels above the node from
        // `getEditorRef`. In case this changes in the future, we
        // attempt to find the node dynamically by traversing upwards.

        var editorRef = _this.props.store.getItem('getEditorRef')();

        if (!editorRef) return; // this keeps backwards-compatibility with react 15

        var editorRoot = editorRef.refs && editorRef.refs.editor ? editorRef.refs.editor : editorRef.editor;

        while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
          editorRoot = editorRoot.parentNode;
        }

        var position = {
          top: node.offsetTop + editorRoot.offsetTop,
          transform: 'scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)'
        }; // TODO: remove the hard code(width for the hover element)

        if (_this.props.position === 'right') {
          // eslint-disable-next-line no-mixed-operators
          position.left = editorRoot.offsetLeft + editorRoot.offsetWidth + 80 - 36;
        } else {
          position.left = editorRoot.offsetLeft - 80;
        }

        _this.setState({
          position: position
        });
      }, 0);
    };

    return _this;
  }

  var _proto = Toolbar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.store.subscribeToItem('editorState', this.onEditorStateChange);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.props.store.unsubscribeFromItem('editorState', this.onEditorStateChange);
  };

  _proto.render = function render() {
    var _theme$toolbarStyles;

    var _this$props = this.props,
        theme = _this$props.theme,
        store = _this$props.store;
    return /*#__PURE__*/React.createElement("div", {
      className: (_theme$toolbarStyles = theme.toolbarStyles) == null ? void 0 : _theme$toolbarStyles.wrapper,
      style: this.state.position
    }, /*#__PURE__*/React.createElement(BlockTypeSelect, {
      getEditorState: store.getItem('getEditorState'),
      setEditorState: store.getItem('setEditorState'),
      theme: theme,
      childNodes: this.props.children
    }));
  };

  return Toolbar;
}(React.Component);

Toolbar.defaultProps = {
  children: function children(externalProps) {
    return (
      /*#__PURE__*/
      // may be use React.Fragment instead of div to improve perfomance after React 16
      React.createElement("div", null, /*#__PURE__*/React.createElement(HeadlineOneButton, externalProps), /*#__PURE__*/React.createElement(HeadlineTwoButton, externalProps), /*#__PURE__*/React.createElement(BlockquoteButton, externalProps), /*#__PURE__*/React.createElement(CodeBlockButton, externalProps), /*#__PURE__*/React.createElement(UnorderedListButton, externalProps), /*#__PURE__*/React.createElement(OrderedListButton, externalProps))
    );
  }
};
Toolbar.propTypes = {
  children: PropTypes.func
};

var buttonStyles = {
  buttonWrapper: "b1x6qj4x",
  button: "b1vm70k4",
  active: "ah6tpgz"
};
var blockTypeSelectStyles = {
  blockType: "bloz0n9",
  spacer: "s98xzql",
  popup: "p1sbsapy"
};
var toolbarStyles = {
  wrapper: "w1f9fdzj"
};
var defaultTheme = {
  buttonStyles: buttonStyles,
  blockTypeSelectStyles: blockTypeSelectStyles,
  toolbarStyles: toolbarStyles
};

var index = (function (config) {
  if (config === void 0) {
    config = {};
  }

  var defaultPostion = 'left';
  var store = createStore({
    isVisible: false
  });
  var _config = config,
      _config$position = _config.position,
      position = _config$position === void 0 ? defaultPostion : _config$position,
      _config$theme = _config.theme,
      theme = _config$theme === void 0 ? defaultTheme : _config$theme;

  var SideToolbar = function SideToolbar(props) {
    return /*#__PURE__*/React.createElement(Toolbar, _extends({}, props, {
      store: store,
      theme: theme,
      position: position
    }));
  };

  return {
    initialize: function initialize(_ref) {
      var setEditorState = _ref.setEditorState,
          getEditorState = _ref.getEditorState,
          getEditorRef = _ref.getEditorRef;
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('getEditorRef', getEditorRef);
    },
    // Re-Render the toolbar on every change
    onChange: function onChange(editorState) {
      store.updateItem('editorState', editorState);
      return editorState;
    },
    SideToolbar: SideToolbar
  };
});

export default index;
