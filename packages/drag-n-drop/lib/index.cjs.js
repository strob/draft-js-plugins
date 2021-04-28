'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var draftJs = require('draft-js');
var immutable = require('immutable');
var React = require('react');

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

function addBlock(editorState, selection, type, data, entityType, text) {
  if (text === void 0) {
    text = ' ';
  }

  var currentContentState = editorState.getCurrentContent();
  var currentSelectionState = selection; // in case text is selected it is removed and then the block is appended

  var afterRemovalContentState = draftJs.Modifier.removeRange(currentContentState, currentSelectionState, 'backward'); // deciding on the postion to split the text

  var targetSelection = afterRemovalContentState.getSelectionAfter();
  var blockKeyForTarget = targetSelection.get('focusKey');
  var block = currentContentState.getBlockForKey(blockKeyForTarget);
  var insertionTargetSelection;
  var insertionTargetBlock; // In case there are no characters or entity or the selection is at the start it
  // is safe to insert the block in the current block.
  // Otherwise a new block is created (the block is always its own block)

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


  var newContentStateAfterSplit = draftJs.Modifier.setBlockType(insertionTargetBlock, insertionTargetSelection, type); // creating a new ContentBlock including the entity with data
  // Entity will be created with a specific type, if defined, else will fall back to the ContentBlock type

  var contentStateWithEntity = newContentStateAfterSplit.createEntity(entityType || type, 'IMMUTABLE', _extends({}, data));
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  var charData = draftJs.CharacterMetadata.create({
    entity: entityKey
  });
  var fragmentArray = [new draftJs.ContentBlock({
    key: draftJs.genKey(),
    type: type,
    text: text,
    characterList: immutable.List(immutable.Repeat(charData, text.length || 1)) // eslint-disable-line new-cap

  }), // new contentblock so we can continue wrting right away after inserting the block
  new draftJs.ContentBlock({
    key: draftJs.genKey(),
    type: 'unstyled',
    text: '',
    characterList: immutable.List() // eslint-disable-line new-cap

  })]; // create fragment containing the two content blocks

  var fragment = draftJs.BlockMapBuilder.createFromArray(fragmentArray); // replace the contentblock we reserved for our insert

  return draftJs.Modifier.replaceWithFragment(newContentStateAfterSplit, insertionTargetSelection, fragment);
}

function removeBlock(contentState, blockKey) {
  var afterKey = contentState.getKeyAfter(blockKey);
  var afterBlock = contentState.getBlockForKey(afterKey);
  var targetRange; // Only if the following block the last with no text then the whole block
  // should be removed. Otherwise the block should be reduced to an unstyled block
  // without any characters.

  if (afterBlock && afterBlock.getType() === 'unstyled' && afterBlock.getLength() === 0 && afterBlock === contentState.getBlockMap().last()) {
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
  } // change the blocktype and remove the characterList entry with the block


  var newContentState = draftJs.Modifier.setBlockType(contentState, targetRange, 'unstyled');
  return draftJs.Modifier.removeRange(newContentState, targetRange, 'backward');
}

var DRAFTJS_BLOCK_KEY = 'DRAFTJS_BLOCK_KEY';

var handleDrop = (function (selection, dataTransfer, isInternal, _ref) {
  var getEditorState = _ref.getEditorState,
      setEditorState = _ref.setEditorState;
  var editorState = getEditorState(); // Get data 'text' (anything else won't move the cursor) and expecting kind of data (text/key)

  var raw = dataTransfer.data.getData('text');
  var data = raw ? raw.split(':') : [];

  if (data.length !== 2) {
    return 'not-handled';
  } // Existing block dropped


  if (data[0] === DRAFTJS_BLOCK_KEY) {
    var blockKey = data[1]; // Get content, selection, block

    var contentState = editorState.getCurrentContent();
    var block = contentState.getBlockForKey(blockKey);
    var entity = contentState.getEntity(block.getEntityAt(0));
    var contentStateAfterInsert = addBlock(editorState, selection, block.getType(), entity.getData(), entity.getType());
    var contentStateAfterRemove = removeBlock(contentStateAfterInsert, blockKey); // force to new selection

    var newSelection = new draftJs.SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 0
    });
    var newState = draftJs.EditorState.push(editorState, contentStateAfterRemove, 'insert-fragment');
    setEditorState(draftJs.EditorState.forceSelection(newState, newSelection));
  }

  return 'handled';
});

// Get a component's display name
var getDisplayName = function getDisplayName(WrappedComponent) {
  var component = WrappedComponent.WrappedComponent || WrappedComponent;
  return component.displayName || component.name || 'Component';
};

var createDecorator = (function (_ref) {
  var store = _ref.store;
  return function (WrappedComponent) {
    var BlockDraggableDecorator = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
      // Handle start-drag and set dataTransfer data with blockKey
      var startDrag = function startDrag(event) {
        event.dataTransfer.dropEffect = 'move'; // eslint-disable-line no-param-reassign
        // declare data and give info that its an existing key and a block needs to be moved

        event.dataTransfer.setData('text', DRAFTJS_BLOCK_KEY + ":" + props.block.getKey());
      }; // If this is rendered before the store is initialized default to read only
      // NOTE(@mxstbr): Reference issue: draft-js-plugins/draft-js-plugins#926


      var readOnly = store.getReadOnly ? store.getReadOnly() : true;
      return /*#__PURE__*/React__default['default'].createElement(WrappedComponent, _extends({
        ref: ref
      }, props, {
        onDragStart: !readOnly ? startDrag : undefined
      }));
    });
    BlockDraggableDecorator.displayName = "BlockDraggable(" + getDisplayName(WrappedComponent) + ")"; // eslint-disable-next-line no-redeclare

    BlockDraggableDecorator.WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent;
    return BlockDraggableDecorator;
  };
});

function createBlockDndPlugin() {
  var store = {
    getReadOnly: undefined
  };
  return {
    initialize: function initialize(_ref) {
      var getReadOnly = _ref.getReadOnly;
      store.getReadOnly = getReadOnly;
    },
    decorator: createDecorator({
      store: store
    }),
    // Handle blocks dragged and dropped across the editor
    handleDrop: handleDrop
  };
}

exports.default = createBlockDndPlugin;
