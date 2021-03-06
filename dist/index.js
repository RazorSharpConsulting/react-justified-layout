'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isNumber = require('lodash/isNumber');
var map = require('lodash/map');
var take = require('lodash/take');
var zip = require('lodash/zip');
var justifiedLayout = require('justified-layout');
var PropTypes = require('prop-types');
var React = require('react');

function extractDimension(_ref) {
  var props = _ref.props;

  if (!props) {
    // TODO
    return 0;
  }

  if (props.aspectRatio) {
    return props.aspectRatio;
  } else {
    return { height: props.style.height, width: props.style.width };
  }
  // TODO Measure the element if no props are here?
}

function normalizeDimension(dimension) {
  if (isNumber(dimension)) {
    return dimension;
  } else if (dimension.height && dimension.width) {
    return dimension.width / dimension.height;
  } else {
    return 0;
  }
}

var Style = { position: 'relative' };

var JustPropTypes = {
  boxSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    horizontal: PropTypes.number.isRequired,
    vertical: PropTypes.number.isRequired
  })]),
  children: PropTypes.node,
  containerPadding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired
  })]),
  containerWidth: PropTypes.number,
  forceAspectRation: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  fullWidthBreakoutRowCadence: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  maxNumRows: PropTypes.number,
  showWidows: PropTypes.bool,
  targetRowHeight: PropTypes.number,
  targetRowHeightTolerance: PropTypes.number,
  widowLayoutStyle: PropTypes.string
};

var JustDefaultProps = {
  boxSpacing: 10,
  containerPadding: 10,
  containerWidth: 1060,
  forceAspectRation: false,
  fullWidthBreakoutRowCadence: false,
  maxNumRows: Number.POSITIVE_INFINITY,
  showWidows: true,
  targetRowHeight: 320,
  targetRowHeightTolerance: 0.25,
  widowLayoutStyle: 'left'
};

var JustifiedLayout = function (_React$Component) {
  _inherits(JustifiedLayout, _React$Component);

  function JustifiedLayout() {
    _classCallCheck(this, JustifiedLayout);

    return _possibleConstructorReturn(this, (JustifiedLayout.__proto__ || Object.getPrototypeOf(JustifiedLayout)).apply(this, arguments));
  }

  _createClass(JustifiedLayout, [{
    key: 'render',

    // See http://flickr.github.io/justified-layout/ for an explanation of what these props do
    value: function render() {
      var _props = this.props,
          children = _props.children,
          style = _props.style,
          config = _objectWithoutProperties(_props, ['children', 'style']);

      var childDims = React.Children.map(children, extractDimension).map(normalizeDimension);

      var _justifiedLayout = justifiedLayout(childDims, config),
          containerHeight = _justifiedLayout.containerHeight,
          boxes = _justifiedLayout.boxes;

      var elementLayout = zip(take(children, boxes.length), boxes);

      return React.createElement(
        'div',
        { style: _extends({}, Style, style, { height: containerHeight, width: this.props.containerWidth }) },
        map(elementLayout, function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              element = _ref3[0],
              layout = _ref3[1];

          var height = layout.height,
              left = layout.left,
              top = layout.top,
              width = layout.width;

          return React.cloneElement(element, _extends({}, element.props, {
            style: _extends({}, element.props.style, {
              position: 'absolute',
              height: height, left: left, top: top, width: width
            })
          }));
        })
      );
    }
  }]);

  return JustifiedLayout;
}(React.Component);

module.exports = JustifiedLayout;
