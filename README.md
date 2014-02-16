# gulp-spritesmith [![Build status](https://travis-ci.org/twolfson/gulp-spritesmith.png?branch=master)](https://travis-ci.org/twolfson/gulp-spritesmith)

Convert a set of images into a spritesheet and CSS variables via [gulp][]

This project was built as a port of [grunt-spritesmith][], the [grunt][] equivalent of a wrapper around [spritesmith][].

[gulp]: http://gulpjs.com/
[grunt-spritesmith]: https://github.com/Ensighten/grunt-spritesmith
[grunt]: http://gruntjs.com/
[spritesmith]: https://github.com/Ensighten/spritesmith

![Example input/output](docs/example.png)

Alternative output formats include [SASS, Stylus, LESS, and JSON][css-formats].

[css-formats]: https://github.com/twolfson/gulp-spritesmith#spritesmithparams

## Getting Started
Install the module with: `npm install gulp-spritesmith`

```javascript
var gulp = require('gulp');
var spritesmith = require('gulp-spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  spriteData.img.pipe(gulp.dest('path/to/image/folder/'));
  spriteData.css.pipe(gulp.dest('path/to/css/folder/'));
});
```

## Documentation
`gulp-spritesmith` presents the `spritesmith` function as its `module.exports`.

### `spritesmith(params)`
[gulp][] plugin that returns a [readable stream][] and an object containing two [writable streams][].

The input/output streams interact with [vinyl-fs][] objects which are [gulp's][gulp] format of choice.

[readable stream]: http://nodejs.org/api/stream.html#stream_class_stream_readable
[writable streams]: http://nodejs.org/api/stream.html#stream_class_stream_writable
[vinyl-fs]: https://github.com/wearefractal/vinyl-fs

- params `Object` - Container for `gulp-spritesmith` parameters
  - imgName `String` - Filename to save image as
      - Supported image extensions are `.png` and `.jpg/jpeg` (limited to specfic engines)
      - Image format can be overridden via `imgOpts.format`
  - cssName `String` - Filename to save CSS as
      - Supported CSS extensions are `.css` (CSS), `.sass` ([SASS][]), `.scss` ([SCSS][]), `.less` ([LESS][]), `.styl/.stylus` ([Stylus][]), and `.json` ([JSON][])
      - CSS format can be overridden via `cssFormat`
  - imgPath `String` - Optional path to use in CSS referring to image location
  - engine `String` - Optional image generating engine to use
      - By default, `auto` will be used which detects the best supported engine for your system
      - Supported options are `phantomjs`, `canvas`, `gm`, and `pngsmith`
      - More information can be found in the [engine][] section
  - algorithm `String` - Optional method for how to pack images
      - Supported options are `top-down` (default), `left-right`, `diagonal`, `alt-diagonal`, and `binary-tree`
      - More information can be found in the [algorithm][] section
  - padding `Number` - Optional amount of pixels to include between images
      - By default, there will be no padding
  - imgOpts `Object` - Options for image output
      - format `String` - Override for format of output image
          - Supported values are `png` and `jpg` (limited to specific engines)
      - quality `Number` - Quality of image (only supported by `gm` engine)
      - timeout `Number` - Milliseconds to wait before terminating render (limited to `phantomjs` engine)
  - engineOpts `Object` - Options for engine configuration
      - imagemagick `Boolean` - Force usage of `imagemagick` over `graphicsmagick` (limited to `gm`)
  - cssFormat `String` - Override for format of CSS output
      - Supported values are `css` (CSS), `sass` ([SASS][]), `scss` ([SCSS][]), `less` ([LESS][]), `stylus` ([Stylus][]), and `json` ([JSON][])
  - cssVarMap `Function` - Iterator to customize CSS variable names
      - An example can be found [here][cssvarmap-example]
  - cssOpts `Object` - Container for CSS templates
      - functions `Boolean` - Skip output of mixins
      - cssClass `Function` - Iterator to override default CSS selectors
          - An example can be found [here][cssclass-example]


[SASS]: http://sass-lang.com/
[SCSS]: http://sass-lang.com/
[LESS]: http://lesscss.org/
[Stylus]: http://learnboost.github.com/stylus/
[JSON]: http://json.org/

[engine]: #engines
[algorithm]: #algorithms
[cssvarmap-example]: TODO
[cssclass-example]: TODO

#### Engines
_(Coming soon)_

#### Algorithms
_(Coming soon)_

## Examples
_(Coming soon)_

### Using `cssVarMap`
_(Coming soon)_

### Using `cssOpts.cssClass`
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `gulp` and test via `npm test`.

## Attribution
GitHub and Twitter icons were taken from [Alex Peattie's JustVector Social Icons][justvector].

Fork designed by [P.J. Onori][onori] from The Noun Project.

[justvector]: http://alexpeattie.com/projects/justvector_icons/
[noun-fork-icon]: http://thenounproject.com/noun/fork/#icon-No2813
[onori]: http://thenounproject.com/somerandomdude

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## Unlicense
As of Feb 09 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
