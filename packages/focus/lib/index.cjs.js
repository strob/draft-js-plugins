'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var draftJs = require('draft-js');
var immutable = require('immutable');
var DraftOffsetKey = require('draft-js/lib/DraftOffsetKey');
var React = require('react');
var clsx = require('clsx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var DraftOffsetKey__default = /*#__PURE__*/_interopDefaultLegacy(DraftOffsetKey);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var clsx__default = /*#__PURE__*/_interopDefaultLegacy(clsx);

var insertBlockAfterSelection = function insertBlockAfterSelection(contentState, selectionState, newBlock) {
  var targetKey = selectionState.getStartKey();
  var array = [];
  contentState.getBlockMap().forEach(function (block, blockKey) {
    array.push(block);
    if (blockKey !== targetKey) return;
    array.push(newBlock);
  });
  return contentState.merge({
    blockMap: draftJs.BlockMapBuilder.createFromArray(array),
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: newBlock.getKey(),
      anchorOffset: newBlock.getLength(),
      focusKey: newBlock.getKey(),
      focusOffset: newBlock.getLength(),
      isBackward: false
    })
  });
};

function insertNewLine(editorState) {
  var contentState = editorState.getCurrentContent();
  var selectionState = editorState.getSelection();
  var newLineBlock = new draftJs.ContentBlock({
    key: draftJs.genKey(),
    type: 'unstyled',
    text: '',
    characterList: immutable.List()
  });
  var withNewLine = insertBlockAfterSelection(contentState, selectionState, newLineBlock);
  var newContent = withNewLine.merge({
    selectionAfter: withNewLine.getSelectionAfter().set('hasFocus', true)
  });
  return draftJs.EditorState.push(editorState, newContent, 'insert-fragment');
}

// Set selection of editor to next/previous block
var setSelection = (function (getEditorState, setEditorState, mode, event) {
  var editorState = getEditorState();
  var selectionKey = editorState.getSelection().getAnchorKey();
  var newActiveBlock = mode === 'up' ? editorState.getCurrentContent().getBlockBefore(selectionKey) : editorState.getCurrentContent().getBlockAfter(selectionKey);

  if (newActiveBlock && newActiveBlock.get('key') === selectionKey) {
    return;
  }

  if (newActiveBlock) {
    // TODO verify that always a key-0-0 exists
    var offsetKey = DraftOffsetKey__default['default'].encode(newActiveBlock.getKey(), 0, 0);
    var node = document.querySelectorAll("[data-offset-key=\"" + offsetKey + "\"]")[0]; // set the native selection to the node so the caret is not in the text and
    // the selectionState matches the native selection

    var selection = window.getSelection();
    var range = document.createRange();
    range.setStart(node, 0);
    range.setEnd(node, 0);
    selection.removeAllRanges();
    selection.addRange(range);
    var offset = mode === 'up' ? newActiveBlock.getLength() : 0;
    event.preventDefault();
    setEditorState(draftJs.EditorState.forceSelection(editorState, new draftJs.SelectionState({
      anchorKey: newActiveBlock.getKey(),
      anchorOffset: offset,
      focusKey: newActiveBlock.getKey(),
      focusOffset: offset,
      isBackward: false
    })));
  }
});

var setSelectionToBlock = (function (getEditorState, setEditorState, newActiveBlock) {
  var editorState = getEditorState(); // TODO verify that always a key-0-0 exists

  var offsetKey = DraftOffsetKey__default['default'].encode(newActiveBlock.getKey(), 0, 0);
  var node = document.querySelectorAll("[data-offset-key=\"" + offsetKey + "\"]")[0]; // set the native selection to the node so the caret is not in the text and
  // the selectionState matches the native selection

  var selection = window.getSelection();
  var range = document.createRange();
  range.setStart(node, 0);
  range.setEnd(node, 0);
  selection.removeAllRanges();
  selection.addRange(range);
  setEditorState(draftJs.EditorState.forceSelection(editorState, new draftJs.SelectionState({
    anchorKey: newActiveBlock.getKey(),
    anchorOffset: 0,
    focusKey: newActiveBlock.getKey(),
    focusOffset: 0,
    isBackward: false
  })));
});

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

// Get a component's display name
var getDisplayName = function getDisplayName(WrappedComponent) {
  var component = WrappedComponent.WrappedComponent || WrappedComponent;
  return component.displayName || component.name || 'Component';
};

var createDecorator = (function (_ref) {
  var theme = _ref.theme,
      blockKeyStore = _ref.blockKeyStore;
  return function (WrappedComponent) {
    var BlockFocusDecorator = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
      React.useEffect(function () {
        blockKeyStore.add(props.block.getKey());
        return function () {
          blockKeyStore.remove(props.block.getKey());
        };
      }, []);

      var onClick = function onClick(evt) {
        evt.preventDefault();

        if (!props.blockProps.isFocused) {
          props.blockProps.setFocusToBlock();
        }
      };

      var blockProps = props.blockProps,
          className = props.className;
      var isFocused = blockProps.isFocused;
      var combinedClassName = isFocused ? clsx__default['default'](className, theme.focused) : clsx__default['default'](className, theme.unfocused);
      return /*#__PURE__*/React__default['default'].createElement(WrappedComponent, _extends({}, props, {
        ref: ref,
        onClick: onClick,
        className: combinedClassName
      }));
    });
    BlockFocusDecorator.displayName = "BlockFocus(" + getDisplayName(WrappedComponent) + ")"; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    BlockFocusDecorator.WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent;
    return BlockFocusDecorator;
  };
});

function createBlockKeyStore() {
  var keys = immutable.List();
  return {
    add: function add(key) {
      keys = keys.push(key);
      return keys;
    },
    remove: function remove(key) {
      keys = keys.filter(function (item) {
        return item !== key;
      });
      return keys;
    },
    includes: function includes(key) {
      return keys.includes(key);
    },
    getAll: function getAll() {
      return keys;
    }
  };
}

var getBlockMapKeys = (function (contentState, startKey, endKey) {
  var blockMapKeys = contentState.getBlockMap().keySeq();
  return blockMapKeys.skipUntil(function (key) {
    return key === startKey;
  }).takeUntil(function (key) {
    return key === endKey;
  }).concat([endKey]);
});

var getSelectedBlocksMapKeys = (function (editorState) {
  var selectionState = editorState.getSelection();
  var contentState = editorState.getCurrentContent();
  return getBlockMapKeys(contentState, selectionState.getStartKey(), selectionState.getEndKey());
});

var blockInSelection = (function (editorState, blockKey) {
  var selectedBlocksKeys = getSelectedBlocksMapKeys(editorState);
  return selectedBlocksKeys.includes(blockKey);
});

/* NOT USED at the moment, but might be valuable if we want to fix atomic block behaviour */

function removeBlock(editorState, blockKey) {
  var content = editorState.getCurrentContent();
  var beforeKey = content.getKeyBefore(blockKey);
  var beforeBlock = content.getBlockForKey(beforeKey); // Note: if the focused block is the first block then it is reduced to an
  // unstyled block with no character

  if (beforeBlock === undefined) {
    var _targetRange = new draftJs.SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 1
    }); // change the blocktype and remove the characterList entry with the sticker


    content = draftJs.Modifier.removeRange(content, _targetRange, 'backward');
    content = draftJs.Modifier.setBlockType(content, _targetRange, 'unstyled');

    var _newState = draftJs.EditorState.push(editorState, content, 'remove-range'); // force to new selection


    var _newSelection = new draftJs.SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 0
    });

    return draftJs.EditorState.forceSelection(_newState, _newSelection);
  }

  var targetRange = new draftJs.SelectionState({
    anchorKey: beforeKey,
    anchorOffset: beforeBlock.getLength(),
    focusKey: blockKey,
    focusOffset: 1
  });
  content = draftJs.Modifier.removeRange(content, targetRange, 'backward');
  var newState = draftJs.EditorState.push(editorState, content, 'remove-range'); // force to new selection

  var newSelection = new draftJs.SelectionState({
    anchorKey: beforeKey,
    anchorOffset: beforeBlock.getLength(),
    focusKey: beforeKey,
    focusOffset: beforeBlock.getLength()
  });
  return draftJs.EditorState.forceSelection(newState, newSelection);
}

var defaultTheme = {
  unfocused: "uz5k6rs",
  focused: "f1vn2c6d"
};

var focusableBlockIsSelected = function focusableBlockIsSelected(editorState, blockKeyStore) {
  var selection = editorState.getSelection();

  if (selection.getAnchorKey() !== selection.getFocusKey()) {
    return false;
  }

  var content = editorState.getCurrentContent();
  var block = content.getBlockForKey(selection.getAnchorKey());
  return blockKeyStore.includes(block.getKey());
};

var deleteCommands = ['backspace', 'backspace-word', 'backspace-to-start-of-line', 'delete', 'delete-word', 'delete-to-end-of-block'];

function forceSelection(editorState) {
  // By forcing the selection the editor will trigger the blockRendererFn which is
  // necessary for the blockProps containing isFocus to be passed down again.
  // EditorState.forceSelection is not used as it will force the focus to true which is not
  // correct if this call comes from onBlur
  return draftJs.EditorState.set(editorState, {
    selection: editorState.getSelection(),
    forceSelection: true,
    nativelyRenderedContent: null,
    inlineStyleOverride: null
  });
}

var index = (function (config) {
  if (config === void 0) {
    config = {};
  }

  var blockKeyStore = createBlockKeyStore();
  var theme = config.theme ? config.theme : defaultTheme;
  var lastSelection;
  var lastContentState;
  return {
    handleReturn: function handleReturn(event, editorState, _ref) {
      var setEditorState = _ref.setEditorState;

      // if a focusable block is selected then overwrite new line behavior to custom
      if (focusableBlockIsSelected(editorState, blockKeyStore)) {
        setEditorState(insertNewLine(editorState));
        return 'handled';
      }

      return 'not-handled';
    },
    handleKeyCommand: function handleKeyCommand(command, editorState, eventTimeStamp, _ref2) {
      var setEditorState = _ref2.setEditorState;

      if (deleteCommands.includes(command) && focusableBlockIsSelected(editorState, blockKeyStore)) {
        var key = editorState.getSelection().getStartKey();
        var newEditorState = removeBlock(editorState, key);

        if (newEditorState !== editorState) {
          setEditorState(newEditorState);
          return 'handled';
        }
      }

      return 'not-handled';
    },
    onChange: function onChange(editorState) {
      // in case the content changed there is no need to re-render blockRendererFn
      // since if a block was added it will be rendered anyway and if it was text
      // then the change was not a pure selection change
      var contentState = editorState.getCurrentContent();

      if (!contentState.equals(lastContentState)) {
        lastContentState = contentState;
        return editorState;
      }

      lastContentState = contentState; // if the selection didn't change there is no need to re-render

      var selection = editorState.getSelection();

      if (lastSelection && selection.equals(lastSelection)) {
        lastSelection = editorState.getSelection();
        return editorState;
      } // Note: Only if the previous or current selection contained a focusableBlock a re-render is needed.


      var focusableBlockKeys = blockKeyStore.getAll();

      if (lastSelection) {
        var lastBlockMapKeys = getBlockMapKeys(contentState, lastSelection.getStartKey(), lastSelection.getEndKey());

        if (lastBlockMapKeys.some(function (key) {
          return focusableBlockKeys.includes(key);
        })) {
          lastSelection = selection;
          return forceSelection(editorState);
        }
      }

      var currentBlockMapKeys = getBlockMapKeys(contentState, selection.getStartKey(), selection.getEndKey());

      if (currentBlockMapKeys.some(function (key) {
        return focusableBlockKeys.includes(key);
      })) {
        lastSelection = selection;
        return forceSelection(editorState);
      }

      return editorState;
    },
    // TODO edgecase: if one block is selected and the user wants to expand the selection using the shift key
    keyBindingFn: function keyBindingFn(evt, _ref3) {
      var getEditorState = _ref3.getEditorState,
          setEditorState = _ref3.setEditorState;
      var editorState = getEditorState(); // TODO match by entitiy instead of block type

      if (focusableBlockIsSelected(editorState, blockKeyStore)) {
        // arrow left
        if (evt.keyCode === 37) {
          setSelection(getEditorState, setEditorState, 'up', evt);
        } // arrow right


        if (evt.keyCode === 39) {
          setSelection(getEditorState, setEditorState, 'down', evt);
        } // arrow up


        if (evt.keyCode === 38) {
          setSelection(getEditorState, setEditorState, 'up', evt);
        } // arrow down


        if (evt.keyCode === 40) {
          setSelection(getEditorState, setEditorState, 'down', evt);
          return undefined;
        }
      } // Don't manually overwrite in case the shift key is used to avoid breaking
      // native behaviour that works anyway.


      if (evt.shiftKey) {
        return undefined;
      } // arrow left


      if (evt.keyCode === 37) {
        // Covering the case to select the before block
        var selection = editorState.getSelection();
        var selectionKey = selection.getAnchorKey();
        var beforeBlock = editorState.getCurrentContent().getBlockBefore(selectionKey); // only if the selection caret is a the left most position

        if (beforeBlock && selection.getAnchorOffset() === 0 && blockKeyStore.includes(beforeBlock.getKey())) {
          setSelection(getEditorState, setEditorState, 'up', evt);
        }
      } // arrow right


      if (evt.keyCode === 39) {
        // Covering the case to select the after block
        var _selection = editorState.getSelection();

        var _selectionKey = _selection.getFocusKey();

        var currentBlock = editorState.getCurrentContent().getBlockForKey(_selectionKey);
        var afterBlock = editorState.getCurrentContent().getBlockAfter(_selectionKey);

        var notAtomicAndLastPost = currentBlock.getType() !== 'atomic' && currentBlock.getLength() === _selection.getFocusOffset();

        if (afterBlock && notAtomicAndLastPost && blockKeyStore.includes(afterBlock.getKey())) {
          setSelection(getEditorState, setEditorState, 'down', evt);
        }
      } // arrow up


      if (evt.keyCode === 38) {
        // Covering the case to select the before block with arrow up
        var _selectionKey2 = editorState.getSelection().getAnchorKey();

        var _beforeBlock = editorState.getCurrentContent().getBlockBefore(_selectionKey2);

        if (_beforeBlock && blockKeyStore.includes(_beforeBlock.getKey())) {
          setSelection(getEditorState, setEditorState, 'up', evt);
        }
      } // arrow down


      if (evt.keyCode === 40) {
        // Covering the case to select the after block with arrow down
        var _selectionKey3 = editorState.getSelection().getAnchorKey();

        var _afterBlock = editorState.getCurrentContent().getBlockAfter(_selectionKey3);

        if (_afterBlock && blockKeyStore.includes(_afterBlock.getKey())) {
          setSelection(getEditorState, setEditorState, 'down', evt);
        }
      }

      return undefined;
    },
    // Wrap all block-types in block-focus decorator
    blockRendererFn: function blockRendererFn(contentBlock, _ref4) {
      var getEditorState = _ref4.getEditorState,
          setEditorState = _ref4.setEditorState;

      // This makes it mandatory to have atomic blocks for focus but also improves performance
      // since all the selection checks are not necessary.
      // In case there is a use-case where focus makes sense for none atomic blocks we can add it
      // in the future.
      if (contentBlock.getType() !== 'atomic') {
        return undefined;
      }

      var editorState = getEditorState();
      var isFocused = editorState.getSelection().getHasFocus() && blockInSelection(editorState, contentBlock.getKey());
      return {
        props: {
          isFocused: isFocused,
          isCollapsedSelection: editorState.getSelection().isCollapsed(),
          setFocusToBlock: function setFocusToBlock() {
            setSelectionToBlock(getEditorState, setEditorState, contentBlock);
          }
        }
      };
    },
    decorator: createDecorator({
      theme: theme,
      blockKeyStore: blockKeyStore
    })
  };
});

exports.default = index;
