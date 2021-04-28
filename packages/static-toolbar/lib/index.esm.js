import React from 'react';
import { createStore } from '@draft-js-plugins/utils';
import { ItalicButton, BoldButton, UnderlineButton, CodeButton } from '@draft-js-plugins/buttons';
import PropTypes from 'prop-types';

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
      /**
       * If this is set, the toolbar will render this instead of the regular
       * structure and will also be shown when the editor loses focus.
       * @type {Component}
       */
      overrideContent: undefined
    };

    _this.onOverrideContent = function (overrideContent) {
      return _this.setState({
        overrideContent: overrideContent
      });
    };

    _this.renderDefaultButtons = function (externalProps) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ItalicButton, externalProps), /*#__PURE__*/React.createElement(BoldButton, externalProps), /*#__PURE__*/React.createElement(UnderlineButton, externalProps), /*#__PURE__*/React.createElement(CodeButton, externalProps));
    };

    return _this;
  }

  var _proto = Toolbar.prototype;

  _proto.render = function render() {
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
    return /*#__PURE__*/React.createElement("div", {
      className: theme.toolbarStyles.toolbar
    }, OverrideContent ? /*#__PURE__*/React.createElement(OverrideContent, childrenProps) : (this.props.children || this.renderDefaultButtons)(childrenProps));
  };

  return Toolbar;
}(React.Component);

Toolbar.propTypes = {
  children: PropTypes.func
};

var separator = "s6m29i4";
function Seperator(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? separator : _ref$className;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  });
}

var buttonStyles = {
  buttonWrapper: "bi09khh",
  button: "bc4rxid",
  active: "akzb7t5"
};
var toolbarStyles = {
  toolbar: "t16lpgj"
};
var defaultTheme = {
  buttonStyles: buttonStyles,
  toolbarStyles: toolbarStyles
};

var index = (function (config) {
  if (config === void 0) {
    config = {};
  }

  var store = createStore();
  var _config = config,
      _config$theme = _config.theme,
      theme = _config$theme === void 0 ? defaultTheme : _config$theme;

  var StaticToolbar = function StaticToolbar(props) {
    return /*#__PURE__*/React.createElement(Toolbar, _extends({}, props, {
      store: store,
      theme: theme
    }));
  };

  return {
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    // Re-Render the text-toolbar on selection change
    onChange: function onChange(editorState) {
      store.updateItem('selection', editorState.getSelection());
      return editorState;
    },
    Toolbar: StaticToolbar
  };
});

export default index;
export { Seperator as Separator };
