# gulp.spritesmith [![Build status](https://travis-ci.org/twolfson/gulp.spritesmith.png?branch=master)](https://travis-ci.org/twolfson/gulp.spritesmith)

Convert a set of images into a spritesheet and CSS variables via [gulp][]

This is the official port of [grunt-spritesmith][], the [grunt][] equivalent of a wrapper around [spritesmith][].

[gulp]: http://gulpjs.com/
[grunt-spritesmith]: https://github.com/Ensighten/grunt-spritesmith
[grunt]: http://gruntjs.com/
[spritesmith]: https://github.com/Ensighten/spritesmith

![Example input/output](docs/example.png)

Alternative output formats include [SASS, Stylus, LESS, and JSON][css-formats].

[css-formats]: #spritesmithparams

### Do you like `gulp.spritesmith`?
[Support us via gittip][gittip] or [spread word on Twitter][twitter]

[gittip]: https://www.gittip.com/twolfson/
[twitter]: https://twitter.com/intent/tweet?text=CSS%20sprites%20made%20easy%20via%20gulp.spritesmith&url=https%3A%2F%2Fgithub.com%2Ftwolfson%2Fgulp.spritesmith&via=twolfsn

## Getting Started
Install the module with: `npm install gulp.spritesmith`

```js
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  spriteData.pipe(gulp.dest('path/to/output/'));
});
```

### Continuing the pipeline
In addition to the `spriteData` stream, we offer individual streams for images and CSS. This allows for image optimization and CSS minification.

```js
var gulp = require('gulp');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));

  // Pipe image stream through image optimizer and onto disk
  spriteData.img
    .pipe(imagemin())
    .pipe(gulp.dest('path/to/image/folder/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  spriteData.css
    .pipe(csso())
    .pipe(gulp.dest('path/to/css/folder/'));
});
```

## Documentation
`gulp.spritesmith` presents the `spritesmith` function as its `module.exports`.

### `spritesmith(params)`
[gulp][] plugin that returns a [transform stream][] with 2 [readable stream][] properties.

The input/output streams interact with [vinyl-fs][] objects which are [gulp's][gulp] format of choice.

[transform stream]: http://nodejs.org/api/stream.html#stream_class_stream_transform
[readable stream]: http://nodejs.org/api/stream.html#stream_class_stream_readable
[vinyl-fs]: https://github.com/wearefractal/vinyl-fs

- params `Object` - Container for `gulp.spritesmith` parameters
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
  - algorithmOpts `Object` - Options for algorithm configuration
      - sort `Boolean` - Enable/disable image sorting by `algorithm`
          - By default, sorting is enabled (`true`)
  - engineOpts `Object` - Options for engine configuration
      - imagemagick `Boolean` - Force usage of `imagemagick` over `graphicsmagick` (limited to `gm`)
  - cssFormat `String` - Override for format of CSS output
      - Supported values are `css` (CSS), `sass` ([SASS][]), `scss` ([SCSS][]), `scss_maps` ([SCSS][] using [map notation][sass-maps]), `less` ([LESS][]), `stylus` ([Stylus][]), and `json` ([JSON][])
  - cssVarMap `Function` - Iterator to customize CSS variable names
      - An example can be found [here][cssvarmap-example]
  - cssTemplate `Function|String` - CSS templating function or path to alternative [mustache][] template
      - More information can be found in the [cssTemplate][] section
  - cssOpts `Object` - Container for CSS templates
      - functions `Boolean` - Skip output of mixins
      - cssClass `Function` - Iterator to override default CSS selectors
          - An example can be found [here][cssclass-example]

[SASS]: http://sass-lang.com/
[SCSS]: http://sass-lang.com/
[sass-maps]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps
[LESS]: http://lesscss.org/
[Stylus]: http://learnboost.github.com/stylus/
[JSON]: http://json.org/
[mustache]: http://mustache.github.io/

[engine]: #engines
[algorithm]: #algorithms
[cssvarmap-example]: #using-cssvarmap
[cssTemplate]: #cssTemplate
[cssclass-example]: #using-cssoptscssclass

**Returns**:
- retStream [`stream.Transform`][transform stream] - Stream that outputs image and CSS as [vinyl-fs][] objects
- retStream.img [`stream.Readable`][readable stream] - Stream for image output as a [vinyl-fs][] object
- retStream.css [`stream.Readable`][readable stream] - Stream for CSS output as a [vinyl-fs][] object

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
npm install -g node-gyp
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

#### cssTemplate
`gulp.spritespritesmith` allows you to define your own CSS template, either via a `function` or [mustache][] template.

If you pass in a `Function`, it should have a signature of `function (params) {}` and return a `String`.

If you pass in a `String`, we treat this as a path; reading in the file and rendering it via [mustache.js][mustache]. The template will be passed the same `params` as in the `Function` case.

> An example template is https://github.com/twolfson/json2css/blob/4.2.0/lib/templates/stylus.template.mustache

#### `params`
`params` is an object with some normalization nicities from [`json2css`][], our default collection of templates.

- params `Object`
    - items `Object[]` - Array of sprite information
      - name `String` - Name of the sprite file (sans extension)
      - x `Number` - Horizontal position of sprite's left edge in spritesheet
      - y `Number` - Vertical position of sprite's top edge in spritesheet
      - width `Number` - Width of sprite
      - height `Number` - Height of sprite
      - total_width `Number` - Width of entire spritesheet
      - total_height `Number` - Height of entire spritesheet
      - image `String` - Relative URL path from CSS to spritesheet
      - escaped_image `String` - URL encoded `image`
      - source_image `String` - Path to the original sprite file
      - offset_x `Number` - Negative value of `x`. Useful to `background-position`
      - offset_y `Number` - Negative value of `y`. Useful to `background-position`
      - px `Object` - Container for numeric values including `px`
        - x `String` - `x` suffixed with `px`
        - y `String` - `y` suffixed with `px`
        - width `String` - `width` suffixed with `px`
        - height `String` - `height` suffixed with `px`
        - total_width `String` - `total_width` suffixed with `px`
        - total_height `String` - `total_height` suffixed with `px`
        - offset_x `String` - `offset_x` suffixed with `px`
        - offset_y `String` - `offset_y` suffixed with `px`
    - options `Object` - Options passed in via `cssOpts` in `grunt-spritesmith` config

[`json2css`]: https://github.com/twolfson/json2css

An example sprite `item` is:

```js
{
  "name": "sprite2",
  "x": 10,
  "y": 20,
  "width": 20,
  "height": 30,
  "total_width": 80,
  "total_height": 100,
  "image": "nested/dir/spritesheet.png",
  "escaped_image": "nested/dir/spritesheet.png",
  "source_image": "path/to/original/sprite.png",
  "offset_x": -10,
  "offset_y": -20,
  "px": {
    "x": "10px",
    "y": "20px",
    "width": "20px",
    "height": "30px",
    "total_width": "80px",
    "total_height": "100px",
    "offset_x": "-10px",
    "offset_y": "-20px"
  }
}
```

## Examples
### Using `cssVarMap`
Task configuration:

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

CSS output:

```sass
/* As opposed to `$fork_x = 0px;` */
$sprite-fork_x = 0px;
$sprite-fork_y = 0px;
$sprite-fork_offset_x = 0px;
$sprite-fork_offset_y = 0px;
...
```

### Using `cssOpts.cssClass`
Task configuration:

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

CSS output:

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
If you have specified an `engine` in your config, then you must satisfy its requirements *before* installing `gulp.spritesmith`.

To remedy this, verify you have installed the appropriate set of requirements for your engine:

https://github.com/twolfson/gulp.spritesmith#engines

Afterwards, re-install `gulp.spritesmith` so it detects the satisfied requirements for your engine.

```bash
npm install gulp.spritesmith
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `gulp` and test via `npm test`.

## Attribution
GitHub and Twitter icons were taken from [Alex Peattie's JustVector Social Icons][justvector].

Fork designed by [P.J. Onori][onori] from The Noun Project.

[justvector]: http://alexpeattie.com/projects/justvector_icons/
[noun-fork-icon]: http://thenounproject.com/noun/fork/#icon-No2813
[onori]: http://thenounproject.com/somerandomdude

## Unlicense
As of Feb 09 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
