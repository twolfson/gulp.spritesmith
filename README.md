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
For cross-platform accessibility, [spritesmith][] offers multiple sprite engines. Each of these engines has a different set of dependencies.

If you are running into issues, consult the [FAQ section](#faqs).

##### pngsmith
The `pngsmith` engine uses [`pngparse`][], an JavaScript `png` parser, to interpret images into [`ndarrays`][]. This requires no additional steps before installation.

[`pngparse`]: https://github.com/darkskyapp/pngparse
[`ndarrays`]: https://github.com/mikolalysenko/ndarray

Key differences: It requires no additional installation steps but you are limited to `.png` files for your source files.

##### phantomjs
The `phantomjs` engine relies on having [phantomjs][] installed on your machine. Visit [the phantomjs website][phantomjs] for installation instructions.

[spritesmith][] has been tested against `phantomjs@1.9.0`.

[phantomjs]: http://phantomjs.org/

Key differences: `phantomjs` is the easiest engine to install that supports all image formats.

##### canvas
The `canvas` engine uses [node-canvas][] which has a dependency on [Cairo][cairo]. Installation instructions can be found in the [node-canvas wiki][].

Additionally, you will need to install [node-gyp][] for the C++ bindings.

```bash
sudo npm install -g node-gyp
```

Key differences: `canvas` has the best performance (useful for over 100 sprites). However, it is limited to `UNIX`.

[node-canvas]: https://github.com/learnboost/node-canvas
[cairo]: http://cairographics.org/
[node-canvas wiki]: https://github.com/LearnBoost/node-canvas/wiki/_pages
[node-gyp]: https://github.com/TooTallNate/node-gyp/

##### gm (Graphics Magick / Image Magick)
The `gm` engine depends on [Graphics Magick][graphics-magick] or [Image Magick][image-magick].

For the best results, install from the site rather than through a package manager (e.g. `apt-get`). This avoids potential transparency issues which have been reported.

[spritesmith][] has been developed and tested against `graphicsmagick@1.3.17`.

[graphics-magick]: http://www.graphicsmagick.org/
[image-magick]: http://imagemagick.org/

Key differences: `gm` has the most options for export via `imgOpts`.

#### Algorithms
`spritesmith` offers a variety of image patterns via [twolfson/layout][].

[twolfson/layout]: (https://github.com/twolfson/layout

|     top-down (default)    |           left-right          |          diagonal         |            alt-diagonal           |           binary-tree           |
| ------------------------- | ----------------------------- | ------------------------- | --------------------------------- | ------------------------------- |
| [![top-down][]][top-down] | [![left-right][]][left-right] | [![diagonal][]][diagonal] | [![alt-diagonal][]][alt-diagonal] | [![binary-tree][]][binary-tree] |

For best packing, use `binary-tree` which uses a solution to the [rectangle packing problem][packing-problem].

[packing-problem]: http://en.wikipedia.org/wiki/Packing_problem

If you are worried about sprites being visible within other sprites, use `alt-diagonal`.

If you are using a repeating background, `top-down` or `left-right` depending on your occasion.

The `diagonal` algorithm exists for you if you need it.

[top-down]: docs/algorithms/top-down.png
[left-right]: docs/algorithms/left-right.png
[diagonal]: docs/algorithms/diagonal.png
[alt-diagonal]: docs/algorithms/alt-diagonal.png
[binary-tree]: docs/algorithms/binary-tree.png

## Examples
### Using `cssVarMap`
Task configuration

```js
gulp.task('sprite', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.styl',
    cssVarMap: function (sprite) {
      // `sprite` has `name`, `image` (full path), `x`, `y`
      //   `width`, `height`, `total_width`, `total_height`
      // EXAMPLE: Prefix all sprite names with 'sprite-'
      sprite.name = 'sprite-' + sprite.name;
    }
  }));
  spriteData.img.pipe(gulp.dest('path/to/image/folder/'));
  spriteData.css.pipe(gulp.dest('path/to/styl/folder/'));
});
```

CSS output

```sass
/* As opposed to `$fork_x = 0px;` */
$sprite-fork_x = 0px;
$sprite-fork_y = 0px;
$sprite-fork_offset_x = 0px;
$sprite-fork_offset_y = 0px;
...
```

### Using `cssOpts.cssClass`
Task configuration

```js
gulp.task('sprite', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    cssOpts: {
      cssClass: function (item) {
        // `item` has `x`, `y`, `width`, `height`, `name`, `image`, and more
        // It is suggested to `console.log` output
        return '.sprite-' + item.name;
      }
    }
  }));
  spriteData.img.pipe(gulp.dest('path/to/image/folder/'));
  spriteData.css.pipe(gulp.dest('path/to/css/folder/'));
});
```

CSS output

```css
/* As opposed to .fork { */
.sprite-fork {
  background-image: url(sprite.png);
  background-position: 0px 0px;
  width: 32px;
  height: 32px;
}
```

## FAQs
### I am seeing errors during installation.
If `npm` exits normally, everything should work. These errors are being caused by `npm` attempting to install the various `spritesmith` engines.

### `spritesmith` is saying my engine "could not be loaded"
If you have specified an `engine` in your config, then you must satisfy its requirements *before* installing `grunt-spritesmith`.

To remedy this, verify you have installed the appropriate set of requirements for your engine:

https://github.com/Ensighten/grunt-spritesmith#requirements

Afterwards, re-install `grunt-spritesmith` so it detects the satisfied requirements for your engine.

```bash
npm install grunt-spritesmith
```

### `spritesmith` is saying "no spritesmith engine could be loaded for your machine"
If you are running `grunt-spritesmith` before `1.21.0`, then you have not satisfied any of the requirements for any of the engines *before* installing `grunt-spritesmith`. If you are running `1.21.0` or greater, then there is a bug and please open a new issue.

> The current version of `grunt-spritesmith` can be determined via `npm ls grunt-spritesmith`.

To remedy the issue before `1.21.0`, choose an engine and verify you have installed the appropriate set of requirements:

https://github.com/Ensighten/grunt-spritesmith#requirements

Afterwards, re-install `grunt-spritesmith` so it detects the satisfied requirements for your engine.

```bash
npm install grunt-spritesmith
```

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
