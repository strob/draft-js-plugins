import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import punycode from 'punycode';

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

var CharCounter = function CharCounter(_ref) {
  var _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? {} : _ref$theme,
      className = _ref.className,
      store = _ref.store,
      limit = _ref.limit;

  var getCharCount = function getCharCount(editorState) {
    var decodeUnicode = function decodeUnicode(str) {
      return punycode.ucs2.decode(str);
    }; // func to handle unicode characters


    var plainText = editorState.getCurrentContent().getPlainText('');
    var regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed

    var cleanString = plainText.replace(regex, '').trim(); // replace above characters w/ nothing

    return decodeUnicode(cleanString).length;
  };

  var getClassNames = function getClassNames(count) {
    var defaultStyle = clsx(theme.counter, className);
    var overLimitStyle = clsx(theme.counterOverLimit, className);
    return count > limit ? overLimitStyle : defaultStyle;
  };

  var count = getCharCount(store.getEditorState());
  var classNames = getClassNames(count);
  return /*#__PURE__*/React.createElement("span", {
    className: classNames
  }, count);
};

CharCounter.propTypes = {
  theme: PropTypes.any,
  className: PropTypes.any,
  store: PropTypes.any,
  limit: PropTypes.any
};

var WordCounter = function WordCounter(_ref) {
  var store = _ref.store,
      limit = _ref.limit,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? {} : _ref$theme,
      className = _ref.className;

  var getWordCount = function getWordCount(editorState) {
    var plainText = editorState.getCurrentContent().getPlainText('');
    var regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed

    var cleanString = plainText.replace(regex, ' ').trim(); // replace above characters w/ space

    var wordArray = cleanString.match(/\S+/g); // matches words according to whitespace

    return wordArray ? wordArray.length : 0;
  };

  var getClassNames = function getClassNames(count) {
    var defaultStyle = clsx(theme.counter, className);
    var overLimitStyle = clsx(theme.counterOverLimit, className);
    return count > limit ? overLimitStyle : defaultStyle;
  };

  var count = getWordCount(store.getEditorState());
  var classNames = getClassNames(count);
  return /*#__PURE__*/React.createElement("span", {
    className: classNames
  }, count);
};

WordCounter.propTypes = {
  theme: PropTypes.any,
  limit: PropTypes.number
};

var LineCounter = function LineCounter(_ref) {
  var store = _ref.store,
      limit = _ref.limit,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? {} : _ref$theme,
      className = _ref.className;

  var getLineCount = function getLineCount(editorState) {
    var blockArray = editorState.getCurrentContent().getBlocksAsArray();
    return blockArray ? blockArray.length : null;
  };

  var getClassNames = function getClassNames(count) {
    var defaultStyle = clsx(theme.counter, className);
    var overLimitStyle = clsx(theme.counterOverLimit, className);
    return count > limit ? overLimitStyle : defaultStyle;
  };

  var count = getLineCount(store.getEditorState());
  var classNames = getClassNames(count);
  return /*#__PURE__*/React.createElement("span", {
    className: classNames
  }, count);
};

LineCounter.propTypes = {
  theme: PropTypes.any,
  store: PropTypes.any,
  className: PropTypes.any,
  limit: PropTypes.number
};

var CustomCounter = function CustomCounter(_ref) {
  var store = _ref.store,
      _ref$limit = _ref.limit,
      limit = _ref$limit === void 0 ? 0 : _ref$limit,
      countFunction = _ref.countFunction,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? {} : _ref$theme,
      className = _ref.className;

  var getClassNames = function getClassNames(count) {
    var defaultStyle = clsx(theme.counter, className);
    var overLimitStyle = clsx(theme.counterOverLimit, className);
    return count > limit ? overLimitStyle : defaultStyle;
  };

  var plainText = store.getEditorState().getCurrentContent().getPlainText('');
  var count = countFunction(plainText);
  var classNames = getClassNames(count);
  return /*#__PURE__*/React.createElement("span", {
    className: classNames
  }, count);
};

CustomCounter.propTypes = {
  theme: PropTypes.any,
  store: PropTypes.any,
  className: PropTypes.any,
  limit: PropTypes.number,
  countFunction: PropTypes.func.isRequired
};

var defaultTheme = {
  counter: "c1svg00",
  counterOverLimit: "c6sdxe3"
};

var index = (function (config) {
  if (config === void 0) {
    config = {};
  }

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

  var DecoratedCharCounter = function DecoratedCharCounter(props) {
    return /*#__PURE__*/React.createElement(CharCounter, _extends({}, props, {
      theme: theme,
      store: store
    }));
  };

  var DecoratedWordCounter = function DecoratedWordCounter(props) {
    return /*#__PURE__*/React.createElement(WordCounter, _extends({}, props, {
      theme: theme,
      store: store
    }));
  };

  var DecoratedLineCounter = function DecoratedLineCounter(props) {
    return /*#__PURE__*/React.createElement(LineCounter, _extends({}, props, {
      theme: theme,
      store: store
    }));
  };

  var DecoratedCustomCounter = function DecoratedCustomCounter(props) {
    return /*#__PURE__*/React.createElement(CustomCounter, _extends({}, props, {
      theme: theme,
      store: store
    }));
  };

  return {
    CharCounter: DecoratedCharCounter,
    WordCounter: DecoratedWordCounter,
    LineCounter: DecoratedLineCounter,
    CustomCounter: DecoratedCustomCounter,
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    }
  };
});

export default index;
