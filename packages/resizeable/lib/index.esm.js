import { EditorState } from 'draft-js';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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

var round = function round(x, steps) {
  return Math.ceil(x / steps) * steps;
};

var createDecorator = (function (_ref) {
  var config = _ref.config,
      store = _ref.store;
  return function (WrappedComponent) {
    var _class, _temp;

    return _temp = _class = /*#__PURE__*/function (_Component) {
      _inheritsLoose(BlockResizeableDecorator, _Component);

      function BlockResizeableDecorator() {
        var _this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _Component.call.apply(_Component, [this].concat(args)) || this;
        _this.state = {
          hoverPosition: {},
          clicked: false
        };
        _this.wrapper = void 0;

        _this.setEntityData = function (data) {
          _this.props.blockProps.setResizeData(data);
        };

        _this.mouseLeave = function () {
          if (!_this.state.clicked) {
            _this.setState({
              hoverPosition: {}
            });
          }
        };

        _this.mouseMove = function (evt) {
          var _this$props = _this.props,
              vertical = _this$props.vertical,
              horizontal = _this$props.horizontal,
              isResizable = _this$props.isResizable;
          var hoverPosition = _this.state.hoverPosition;
          var tolerance = 6; // TODO figure out if and how to achieve this without fetching the DOM node
          // eslint-disable-next-line react/no-find-dom-node

          var pane = ReactDOM.findDOMNode(_assertThisInitialized(_this));
          var b = pane.getBoundingClientRect();
          var x = evt.clientX - b.left;
          var y = evt.clientY - b.top;
          var isTop = vertical && vertical !== 'auto' ? y < tolerance : false;
          var isLeft = horizontal ? x < tolerance : false;
          var isRight = horizontal ? x >= b.width - tolerance : false;
          var isBottom = vertical && vertical !== 'auto' ? y >= b.height - tolerance && y < b.height : false;
          var canResize = (isTop || isLeft || isRight || isBottom) && isResizable;
          var newHoverPosition = {
            isTop: isTop,
            isLeft: isLeft,
            isRight: isRight,
            isBottom: isBottom,
            canResize: canResize
          };
          var hasNewHoverPositions = Object.keys(newHoverPosition).filter(function (key) {
            return hoverPosition[key] !== newHoverPosition[key];
          });

          if (hasNewHoverPositions.length) {
            _this.setState({
              hoverPosition: newHoverPosition
            });
          }
        };

        _this.mouseDown = function (event) {
          // No mouse-hover-position data? Nothing to resize!
          if (!_this.state.hoverPosition.canResize) {
            return;
          }

          event.preventDefault();
          var _this$props2 = _this.props,
              resizeSteps = _this$props2.resizeSteps,
              vertical = _this$props2.vertical,
              horizontal = _this$props2.horizontal;
          var hoverPosition = _this.state.hoverPosition;
          var isTop = hoverPosition.isTop,
              isLeft = hoverPosition.isLeft,
              isRight = hoverPosition.isRight,
              isBottom = hoverPosition.isBottom; // TODO figure out how to achieve this without fetching the DOM node
          // eslint-disable-next-line react/no-find-dom-node

          var pane = ReactDOM.findDOMNode(_assertThisInitialized(_this));
          var startX = event.clientX;
          var startY = event.clientY;
          var startWidth = parseInt(document.defaultView.getComputedStyle(pane).width, 10);
          var startHeight = parseInt(document.defaultView.getComputedStyle(pane).height, 10); // Do the actual drag operation

          var doDrag = function doDrag(dragEvent) {
            var width = startWidth + (isLeft ? startX - dragEvent.clientX : dragEvent.clientX - startX);
            var height = startHeight + dragEvent.clientY - startY;
            var editorComp = store.getEditorRef(); // this keeps backwards-compatibility with react 15

            var editorNode = editorComp.refs && editorComp.refs.editor ? editorComp.refs.editor : editorComp.editor;
            width = Math.min(editorNode.clientWidth, width);
            height = Math.min(editorNode.clientHeight, height);
            var widthPerc = 100 / editorNode.clientWidth * width;
            var heightPerc = 100 / editorNode.clientHeight * height;
            var newState = {};

            if ((isLeft || isRight) && horizontal === 'relative') {
              newState.width = resizeSteps ? round(widthPerc, resizeSteps) : widthPerc;
            } else if ((isLeft || isRight) && horizontal === 'absolute') {
              newState.width = resizeSteps ? round(width, resizeSteps) : width;
            }

            if ((isTop || isBottom) && vertical === 'relative') {
              newState.height = resizeSteps ? round(heightPerc, resizeSteps) : heightPerc;
            } else if ((isTop || isBottom) && vertical === 'absolute') {
              newState.height = resizeSteps ? round(height, resizeSteps) : height;
            }

            dragEvent.preventDefault();

            _this.setState(newState);
          }; // Finished dragging


          var stopDrag = function stopDrag() {
            // TODO clean up event listeners
            document.removeEventListener('mousemove', doDrag, false);
            document.removeEventListener('mouseup', stopDrag, false);
            var _this$state = _this.state,
                width = _this$state.width,
                height = _this$state.height;

            _this.setState({
              clicked: false
            });

            _this.setEntityData({
              width: width,
              height: height
            });
          }; // TODO clean up event listeners


          document.addEventListener('mousemove', doDrag, false);
          document.addEventListener('mouseup', stopDrag, false);

          _this.setState({
            clicked: true
          });
        };

        return _this;
      }

      var _proto = BlockResizeableDecorator.prototype;

      _proto.render = function render() {
        var _this2 = this;

        var _this$props3 = this.props,
            blockProps = _this$props3.blockProps,
            vertical = _this$props3.vertical,
            horizontal = _this$props3.horizontal,
            initialWidth = _this$props3.initialWidth,
            initialHeight = _this$props3.initialHeight,
            style = _this$props3.style,
            isResizable = _this$props3.isResizable;
            _this$props3.resizeSteps;
            var elementProps = _objectWithoutPropertiesLoose(_this$props3, ["blockProps", "vertical", "horizontal", "initialWidth", "initialHeight", "style", "isResizable", "resizeSteps"]);

        var _this$state2 = this.state,
            width = _this$state2.width,
            height = _this$state2.height,
            hoverPosition = _this$state2.hoverPosition;
        var isTop = hoverPosition.isTop,
            isLeft = hoverPosition.isLeft,
            isRight = hoverPosition.isRight,
            isBottom = hoverPosition.isBottom;

        var styles = _extends({
          position: 'relative'
        }, style);

        if (horizontal === 'auto') {
          styles.width = 'auto';
        } else if (horizontal === 'relative') {
          var value = width || blockProps.resizeData.width;

          if (!value && initialWidth) {
            styles.width = initialWidth;
          } else {
            styles.width = (value || 40) + "%";
          }
        } else if (horizontal === 'absolute') {
          var _value = width || blockProps.resizeData.width;

          if (!_value && initialWidth) {
            styles.width = initialWidth;
          } else {
            styles.width = (_value || 40) + "px";
          }
        }

        if (vertical === 'auto') {
          styles.height = 'auto';
        } else if (vertical === 'relative') {
          var _value2 = height || blockProps.resizeData.height;

          if (!_value2 && initialHeight) {
            styles.height = initialHeight;
          } else {
            styles.height = (_value2 || 40) + "%";
          }
        } else if (vertical === 'absolute') {
          var _value3 = height || blockProps.resizeData.height;

          if (!_value3 && initialHeight) {
            styles.height = initialHeight;
          } else {
            styles.height = (_value3 || 40) + "%";
          }
        } // Handle cursor


        if (!isResizable) {
          styles.cursor = 'default';
        } else if (isRight && isBottom || isLeft && isTop) {
          styles.cursor = 'nwse-resize';
        } else if (isRight && isTop || isBottom && isLeft) {
          styles.cursor = 'nesw-resize';
        } else if (isRight || isLeft) {
          styles.cursor = 'ew-resize';
        } else if (isBottom || isTop) {
          styles.cursor = 'ns-resize';
        } else {
          styles.cursor = 'default';
        }

        var interactionProps = !store.getReadOnly || store.getReadOnly() ? {} : {
          onMouseDown: this.mouseDown,
          onMouseMove: this.mouseMove,
          onMouseLeave: this.mouseLeave
        };
        return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, elementProps, interactionProps, {
          blockProps: blockProps,
          ref: function ref(element) {
            _this2.wrapper = element;
          },
          style: styles
        }));
      };

      return BlockResizeableDecorator;
    }(Component), _class.displayName = "Resizable(" + getDisplayName(WrappedComponent) + ")", _class.WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent, _class.defaultProps = _extends({
      horizontal: 'relative',
      vertical: false,
      resizeSteps: 1,
      isResizable: true
    }, config), _temp;
  };
});

var createSetResizeData = function createSetResizeData(contentBlock, _ref) {
  var getEditorState = _ref.getEditorState,
      setEditorState = _ref.setEditorState;
  return function (data) {
    var entityKey = contentBlock.getEntityAt(0);

    if (entityKey) {
      var editorState = getEditorState();
      var contentState = editorState.getCurrentContent();
      contentState.mergeEntityData(entityKey, _extends({}, data));
      setEditorState(EditorState.forceSelection(editorState, editorState.getSelection()));
    }
  };
};

var index = (function (config) {
  var store = {
    getEditorRef: undefined,
    getReadOnly: undefined,
    getEditorState: undefined,
    setEditorState: undefined
  };
  return {
    initialize: function initialize(_ref2) {
      var getEditorRef = _ref2.getEditorRef,
          getReadOnly = _ref2.getReadOnly,
          getEditorState = _ref2.getEditorState,
          setEditorState = _ref2.setEditorState;
      store.getReadOnly = getReadOnly;
      store.getEditorRef = getEditorRef;
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
    decorator: createDecorator({
      config: config,
      store: store
    }),
    blockRendererFn: function blockRendererFn(contentBlock, _ref3) {
      var getEditorState = _ref3.getEditorState,
          setEditorState = _ref3.setEditorState;
      var entityKey = contentBlock.getEntityAt(0);
      var contentState = getEditorState().getCurrentContent();
      var resizeData = entityKey ? contentState.getEntity(entityKey).getData() : {};
      return {
        props: {
          resizeData: resizeData,
          setResizeData: createSetResizeData(contentBlock, {
            getEditorState: getEditorState,
            setEditorState: setEditorState
          })
        }
      };
    }
  };
});

export default index;
