'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var draftJs = require('draft-js');
var utils = require('@draft-js-plugins/utils');
var ReactDOM = require('react-dom');
var buttons = require('@draft-js-plugins/buttons');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var getDisplayName = function getDisplayName(WrappedComponent) {
  var component = WrappedComponent.WrappedComponent || WrappedComponent;
  return component.displayName || component.name || 'Component';
};

var createDecorator = (function (_ref) {
  var store = _ref.store;
  return function (WrappedComponent) {
    var _class, _temp;

    return _temp = _class = /*#__PURE__*/function (_Component) {
      _inheritsLoose(BlockAlignmentDecorator, _Component);

      function BlockAlignmentDecorator() {
        var _this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _Component.call.apply(_Component, [this].concat(args)) || this;

        _this.componentDidUpdate = function () {
          if (_this.props.blockProps.isFocused && _this.props.blockProps.isCollapsedSelection) {
            // TODO figure out if and how to achieve this without fetching the DOM node
            // eslint-disable-next-line react/no-find-dom-node
            var blockNode = ReactDOM__default['default'].findDOMNode(_assertThisInitialized(_this));
            var boundingRect = blockNode.getBoundingClientRect();
            store.updateItem('setAlignment', _this.props.blockProps.setAlignment);
            store.updateItem('alignment', _this.props.blockProps.alignment);
            store.updateItem('boundingRect', boundingRect);
            store.updateItem('visibleBlock', _this.props.block.getKey()); // Only set visibleBlock to null in case it's the current one. This is important
            // in case the focus directly switches from one block to the other. Then the
            // Alignment tool should not be hidden, but just moved.
          } else if (store.getItem('visibleBlock') === _this.props.block.getKey()) {
            store.updateItem('visibleBlock', null);
          }
        };

        return _this;
      }

      var _proto = BlockAlignmentDecorator.prototype;

      _proto.componentWillUnmount = function componentWillUnmount() {
        // Set visibleBlock to null if the block is deleted
        store.updateItem('visibleBlock', null);
      };

      _proto.render = function render() {
        var _this$props = this.props,
            blockProps = _this$props.blockProps,
            style = _this$props.style,
            elementProps = _objectWithoutPropertiesLoose(_this$props, ["blockProps", "style"]);

        var alignment = blockProps.alignment;
        var newStyle = style;

        if (alignment === 'left') {
          newStyle = _extends({}, style, {
            "float": 'left'
          });
        } else if (alignment === 'right') {
          newStyle = _extends({}, style, {
            "float": 'right'
          });
        } else if (alignment === 'center') {
          newStyle = _extends({}, style, {
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block'
          });
        }

        return /*#__PURE__*/React__default['default'].createElement(WrappedComponent, _extends({}, elementProps, {
          blockProps: blockProps,
          style: newStyle
        }));
      };

      return BlockAlignmentDecorator;
    }(React.Component), _class.displayName = "Alignment(" + getDisplayName(WrappedComponent) + ")", _class.WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent, _temp;
  };
});

/* eslint-disable react/no-array-index-key */

function getRelativeParent(element) {
  if (!element) {
    return null;
  }

  var position = window.getComputedStyle(element).getPropertyValue('position');

  if (position !== 'static') {
    return element;
  }

  return getRelativeParent(element.parentElement);
}

function AlignmentTool(props) {
  var _useState = React.useState({}),
      position = _useState[0],
      setPosition = _useState[1];

  var _useState2 = React.useState(null),
      alignment = _useState2[0],
      setAlignment = _useState2[1];

  var toolbar = React.useRef(null);
  var ref = React.useRef();
  var onVisibilityChanged = React.useCallback(function (visibleBlock) {
    var clear = setTimeout(function () {
      var newPosition;
      var boundingRect = props.store.getItem('boundingRect');

      if (visibleBlock && boundingRect) {
        var relativeParent = getRelativeParent(toolbar.current.parentElement);
        var toolbarHeight = toolbar.current.clientHeight;
        var relativeRect = relativeParent ? relativeParent.getBoundingClientRect() : document.body.getBoundingClientRect();
        newPosition = {
          top: boundingRect.top - relativeRect.top - toolbarHeight,
          left: boundingRect.left - relativeRect.left + boundingRect.width / 2,
          transform: 'translate(-50%) scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)'
        };
      } else {
        newPosition = {
          transform: 'translate(-50%) scale(0)'
        };
      }

      var newAlignment = props.store.getItem('alignment') || 'default';
      setAlignment(newAlignment);
      setPosition(newPosition);
      ref.current = undefined;
    }, 0);
    ref.current = clear;
  }, []);
  var onAlignmentChange = React.useCallback(function (value) {
    if (value) {
      setAlignment(value);
    }
  }, []);
  React.useEffect(function () {
    return function () {
      //clear timeout on unmount
      if (ref.current) {
        clearTimeout(ref.current);
      }
    };
  }, []);
  React.useEffect(function () {
    props.store.subscribeToItem('visibleBlock', onVisibilityChanged);
    props.store.subscribeToItem('alignment', onAlignmentChange);
    return function () {
      props.store.unsubscribeFromItem('visibleBlock', onVisibilityChanged);
      props.store.unsubscribeFromItem('alignment', onAlignmentChange);
    };
  }, [onVisibilityChanged, onAlignmentChange]);
  var defaultButtons = [buttons.AlignBlockDefaultButton, buttons.AlignBlockLeftButton, buttons.AlignBlockCenterButton, buttons.AlignBlockRightButton];
  var theme = props.theme;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: theme.alignmentToolStyles.alignmentTool,
    style: position,
    ref: toolbar
  }, defaultButtons.map(function (Button, index) {
    return /*#__PURE__*/React__default['default'].createElement(Button
    /* the index can be used here as the buttons list won't change */
    , {
      key: index,
      alignment: alignment,
      setAlignment: props.store.getItem('setAlignment'),
      theme: theme.buttonStyles
    });
  }));
}

var buttonStyles = {
  buttonWrapper: "b1qfpj3o",
  button: "bgspekh",
  active: "autuw9p"
};
var alignmentToolStyles = {
  alignmentTool: "awlhfjh"
};
var defaultTheme = {
  buttonStyles: buttonStyles,
  alignmentToolStyles: alignmentToolStyles
};

var createSetAlignment = function createSetAlignment(contentBlock, _ref) {
  var getEditorState = _ref.getEditorState,
      setEditorState = _ref.setEditorState;
  return function (data) {
    var entityKey = contentBlock.getEntityAt(0);

    if (entityKey) {
      var _editorState = getEditorState();

      var contentState = _editorState.getCurrentContent();

      contentState.mergeEntityData(entityKey, _extends({}, data));
      setEditorState(draftJs.EditorState.forceSelection(_editorState, _editorState.getSelection()));
    }
  };
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

  var DecoratedAlignmentTool = function DecoratedAlignmentTool() {
    return /*#__PURE__*/React__default['default'].createElement(AlignmentTool, {
      store: store,
      theme: theme
    });
  };

  return {
    initialize: function initialize(_ref2) {
      var getReadOnly = _ref2.getReadOnly,
          getEditorState = _ref2.getEditorState,
          setEditorState = _ref2.setEditorState;
      store.updateItem('getReadOnly', getReadOnly);
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    decorator: createDecorator({
      store: store
    }),
    blockRendererFn: function blockRendererFn(contentBlock, _ref3) {
      var getEditorState = _ref3.getEditorState,
          setEditorState = _ref3.setEditorState;
      var entityKey = contentBlock.getEntityAt(0);
      var contentState = getEditorState().getCurrentContent();
      var alignmentData = entityKey ? contentState.getEntity(entityKey).getData() : {};
      return {
        props: {
          alignment: alignmentData.alignment || 'default',
          setAlignment: createSetAlignment(contentBlock, {
            getEditorState: getEditorState,
            setEditorState: setEditorState
          })
        }
      };
    },
    AlignmentTool: DecoratedAlignmentTool
  };
});

exports.default = index;
