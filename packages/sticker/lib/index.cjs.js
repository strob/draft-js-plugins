'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var immutable = require('immutable');
var draftJs = require('draft-js');

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

/**
 * Adds a sticker to an editor state
 */
var addSticker = (function (editorState, stickerId) {
  var currentContentState = editorState.getCurrentContent();
  var currentSelectionState = editorState.getSelection(); // in case text is selected it is removed and then the sticker is appended

  var afterRemovalContentState = draftJs.Modifier.removeRange(currentContentState, currentSelectionState, 'backward'); // deciding on the postion to split the text

  var targetSelection = afterRemovalContentState.getSelectionAfter();
  var blockKeyForTarget = targetSelection.get('focusKey');
  var block = currentContentState.getBlockForKey(blockKeyForTarget);
  var insertionTargetSelection;
  var insertionTargetBlock; // In case there are no characters or entity or the selection is at the start it
  // is safe to insert the sticker in the current block.
  // Otherwise a new block is created (the sticker is always its own block)

  var isEmptyBlock = block.getLength() === 0 && block.getEntityAt(0) === null;
  var selectedFromStart = currentSelectionState.getStartOffset() === 0;

  if (isEmptyBlock || selectedFromStart) {
    insertionTargetSelection = targetSelection;
    insertionTargetBlock = afterRemovalContentState;
  } else {
    // the only way to insert a new seems to be by splitting an existing in to two
    insertionTargetBlock = draftJs.Modifier.splitBlock(afterRemovalContentState, targetSelection); // the position to insert our blocks

    insertionTargetSelection = insertionTargetBlock.getSelectionAfter();
  } // TODO not sure why we need it …


  var newContentStateAfterSplit = draftJs.Modifier.setBlockType(insertionTargetBlock, insertionTargetSelection, 'sticker'); // creating a new ContentBlock including the entity with data

  var contentStateWithEntity = newContentStateAfterSplit.createEntity('sticker', 'IMMUTABLE', {
    id: stickerId
  });
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  var charDataOfSticker = draftJs.CharacterMetadata.create({
    entity: entityKey
  });
  var fragmentArray = [new draftJs.ContentBlock({
    key: draftJs.genKey(),
    type: 'sticker',
    text: ' ',
    characterList: immutable.List(immutable.Repeat(charDataOfSticker, 1)) // eslint-disable-line new-cap

  }), // new contentblock so we can continue wrting right away after inserting the sticker
  new draftJs.ContentBlock({
    key: draftJs.genKey(),
    type: 'unstyled',
    text: '',
    characterList: immutable.List() // eslint-disable-line new-cap

  })]; // create fragment containing the two content blocks

  var fragment = draftJs.BlockMapBuilder.createFromArray(fragmentArray); // replace the contentblock we reserved for our insert

  var contentStateWithSticker = draftJs.Modifier.replaceWithFragment(newContentStateAfterSplit, insertionTargetSelection, fragment); // update editor state with our new state including the sticker

  var newState = draftJs.EditorState.push(editorState, contentStateWithSticker, 'insert-fragment');
  return draftJs.EditorState.forceSelection(newState, contentStateWithSticker.getSelectionAfter());
});

/**
 * Removes a sticker from the editor state
 */
var removeSticker = (function (editorState, blockKey) {
  var content = editorState.getCurrentContent();
  var newSelection = new draftJs.SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: 0
  });
  var afterKey = content.getKeyAfter(blockKey);
  var afterBlock = content.getBlockForKey(afterKey);
  var targetRange; // Only if the following block the last with no text then the whole block
  // should be removed. Otherwise the block should be reduced to an unstyled block
  // without any characters.

  if (afterBlock && afterBlock.getType() === 'unstyled' && afterBlock.getLength() === 0 && afterBlock === content.getBlockMap().last()) {
    targetRange = new draftJs.SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: afterKey,
      focusOffset: 0
    });
  } else {
    targetRange = new draftJs.SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 1
    });
  } // change the blocktype and remove the characterList entry with the sticker


  content = draftJs.Modifier.setBlockType(content, targetRange, 'unstyled');
  content = draftJs.Modifier.removeRange(content, targetRange, 'backward'); // force to new selection

  var newState = draftJs.EditorState.push(editorState, content, 'remove-range');
  return draftJs.EditorState.forceSelection(newState, newSelection);
});

/**
 * Adds backspace support to stickers
 */

var cleanupSticker = function cleanupSticker(editorState, blockKey) {
  var content = editorState.getCurrentContent(); // get range of the broken sticker block

  var targetRange = new draftJs.SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: 0
  }); // convert the sticker block to a unstyled block to make text editing work

  var withoutSticker = draftJs.Modifier.setBlockType(content, targetRange, 'unstyled');
  var newState = draftJs.EditorState.push(editorState, withoutSticker, 'remove-range');
  return draftJs.EditorState.forceSelection(newState, withoutSticker.getSelectionAfter());
};

var cleanupEmptyStickers = (function (editorState) {
  var newEditorState = editorState; // If there is an empty sticker block we remove it.
  // This can happen if a user hits the backspace button and removes the sticker.
  // In this case the block will still be of type sticker.

  editorState.getCurrentContent().get('blockMap').forEach(function (block) {
    if (block.get('type') === 'sticker' && block.getEntityAt(0) === null) {
      newEditorState = cleanupSticker(editorState, block.get('key'));
    }
  });
  return newEditorState;
});

var blockRendererFn = (function (sticker) {
  return function (contentBlock, _ref) {
    var getEditorState = _ref.getEditorState,
        setEditorState = _ref.setEditorState;
    var type = contentBlock.getType();

    if (type === 'sticker') {
      return {
        component: sticker,
        props: {
          onRemove: function onRemove(blockKey) {
            setEditorState(removeSticker(getEditorState(), blockKey));
          }
        }
      };
    }

    return undefined;
  };
});

var Sticker = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Sticker, _Component);

  function Sticker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.remove = function (event) {
      // Note: important to avoid a content edit change
      event.preventDefault();
      event.stopPropagation();

      _this.props.blockProps.onRemove(_this.props.block.getKey());
    };

    return _this;
  }

  var _proto = Sticker.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        block = _this$props.block,
        stickers = _this$props.stickers,
        _this$props$theme = _this$props.theme,
        theme = _this$props$theme === void 0 ? {} : _this$props$theme,
        contentState = _this$props.contentState;
    var removeButton =
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React__default['default'].createElement("span", {
      className: theme.stickerRemoveButton,
      onClick: this.remove,
      role: "button"
    }, "\u2715");
    var data = contentState.getEntity(block.getEntityAt(0)).getData();
    return /*#__PURE__*/React__default['default'].createElement("figure", {
      contentEditable: false,
      "data-offset-key": block.get('key') + "-0-0",
      className: theme.sticker
    }, /*#__PURE__*/React__default['default'].createElement("img", {
      className: theme.stickerImage,
      src: stickers.getIn(['data', data.id, 'url']),
      role: "presentation"
    }), this.props.attachRemoveButton ? removeButton : null);
  };

  return Sticker;
}(React.Component);

/**
 * Showcases a sticker one can then pick to add to the editor
 */
var StickerOption = /*#__PURE__*/function (_Component) {
  _inheritsLoose(StickerOption, _Component);

  function StickerOption() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.onClick = function () {
      _this.props.onClick(_this.props.id);
    };

    return _this;
  }

  var _proto = StickerOption.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        id = _this$props.id,
        url = _this$props.url,
        _this$props$theme = _this$props.theme,
        theme = _this$props$theme === void 0 ? {} : _this$props$theme;
    return /*#__PURE__*/React__default['default'].createElement("button", {
      onClick: this.onClick,
      key: id,
      type: "button",
      className: theme.selectSticker
    }, /*#__PURE__*/React__default['default'].createElement("img", {
      className: theme.selectStickerImage,
      src: url,
      role: "presentation"
    }));
  };

  return StickerOption;
}(React.Component);

/**
 * Sets the CSS overflow value to newValue
 * Use like this: setOverflow('auto', document.body);
 */
function setOverflow(newValue, element) {
  element.style.overflow = newValue; // eslint-disable-line no-param-reassign
}

/**
 * Sticker Selector Component
 */
var StickerSelect = /*#__PURE__*/function (_Component) {
  _inheritsLoose(StickerSelect, _Component);

  function StickerSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      open: false
    };
    _this.preventNextClose = void 0;

    _this.onMouseEnter = function () {
      setOverflow('hidden', document.body);
    };

    _this.onMouseLeave = function () {
      setOverflow('auto', document.body);
    };

    _this.openPopover = function () {
      if (!_this.state.open) {
        _this.preventNextClose = true;

        _this.setState({
          open: true
        });
      }
    };

    _this.closePopover = function () {
      if (!_this.preventNextClose && _this.state.open) {
        _this.setState({
          open: false
        });
      }

      _this.preventNextClose = false;
    };

    _this.add = function (id) {
      // TODO - review this approach
      var editor = _this.props.editor;
      editor.onChange(addSticker(editor.state.editorState, id));
    };

    return _this;
  }

  var _proto = StickerSelect.prototype;

  // When the selector is open and users click anywhere on the page,
  // the selector should close
  _proto.componentDidMount = function componentDidMount() {
    document.addEventListener('click', this.closePopover);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  } // When users are scrolling the popover, the page shouldn't scroll when
  // they reach the end of it
  ;

  _proto.render = function render() {
    var _this2 = this;

    // Create the sticker selection elements
    var data = this.props.stickers.get('data');
    var stickerElements = data.map(function (sticker) {
      var id = sticker.get('id');
      var url = sticker.get('url');
      return /*#__PURE__*/React__default['default'].createElement(StickerOption, {
        theme: _this2.props.theme,
        key: id,
        onClick: _this2.add,
        id: id,
        url: url
      });
    });
    var _this$props$theme = this.props.theme,
        theme = _this$props$theme === void 0 ? {} : _this$props$theme;
    var popoverClassName = this.state.open ? theme.selectPopover : theme.selectClosedPopover;
    var buttonClassName = this.state.open ? theme.selectPressedButton : theme.selectButton;
    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: theme.select
    }, /*#__PURE__*/React__default['default'].createElement("button", {
      className: buttonClassName,
      onMouseUp: this.openPopover,
      type: "button"
    }, this.props.selectButtonContent), /*#__PURE__*/React__default['default'].createElement("div", {
      className: popoverClassName,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: theme.selectStickerList
    }, stickerElements.toList().toJS()), /*#__PURE__*/React__default['default'].createElement("div", {
      className: theme.selectBottomGradient
    })));
  };

  return StickerSelect;
}(React.Component);

var defaultTheme = {
  // sticker styles
  sticker: "sl55r16",
  stickerImage: "s1b1f21y",
  stickerRemoveButton: "s3u1xfs",
  // select styles
  select: "snop97i",
  selectPopover: "s1te48ud",
  selectClosedPopover: "sqwiblq",
  selectBottomGradient: "s1sha4g8",
  selectButton: "s1m6n3s1",
  selectPressedButton: "shl2p6m",
  selectStickerList: "sjjedyb",
  // select stricker styles
  selectSticker: "s14u7spj",
  selectStickerImage: "s64maza"
};

var index = (function (config) {
  // Styles are overwritten instead of merged as merging causes a lot of confusion.
  //
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.
  var theme = config.theme ? config.theme : defaultTheme;
  var stickers = config.stickers;
  var selectButtonContent = config.selectButtonContent ? config.selectButtonContent : '☺'; // default to true if not explicitly set to false

  var attachRemoveButton = config.attachRemoveButton !== false;

  var DecoratedSticker = function DecoratedSticker(props) {
    return /*#__PURE__*/React__default['default'].createElement(Sticker, _extends({}, props, {
      attachRemoveButton: attachRemoveButton,
      stickers: stickers,
      theme: theme
    }));
  };

  var DecoratedStickerSelect = function DecoratedStickerSelect(props) {
    return /*#__PURE__*/React__default['default'].createElement(StickerSelect, _extends({}, props, {
      selectButtonContent: selectButtonContent,
      stickers: stickers,
      theme: theme
    }));
  };

  return {
    blockRendererFn: blockRendererFn(DecoratedSticker),
    onChange: cleanupEmptyStickers,
    add: addSticker,
    remove: removeSticker,
    blockRenderMap: immutable.Map({
      sticker: {
        element: 'div'
      }
    }),
    StickerSelect: DecoratedStickerSelect
  };
});

exports.default = index;
