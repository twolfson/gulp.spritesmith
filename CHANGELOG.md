# gulp.spritesmith changelog
6.9.0 - Upgraded to `spritesmith@3.3.0` to fix Vinyl@2 and Gulp@4 support. Fixes #135

6.8.0 - Moved off of deprecated `gulp-util`

6.7.0 - Switched from `twolfson-style` to ESLint

6.6.0 - Removed support for Node.js < 4

6.5.1 - Documented cache busting support via `gulp-spritesmash`

6.5.0 - Added normal/retina name collision detection

6.4.0 - Upgraded all dependencies via @dankang in #116

6.3.0 - Upgraded to `spritesheet-templates@10.2.0` to move to appropriate SASS/SCSS commenting convention

6.2.1 - Upgraded to `spritesheet-templates@10.1.1` to correct `inline-block` examples in templates

6.2.0 - Upgraded to `spritesheet-templates@10.1.0` to add HTML comments to non-CSS templates

6.1.0 - Upgraded to `spritesmith@3.1.0` to add quality support for JPEGs

6.0.1 - Updated donation URL

6.0.0 - Upgraded to `spritesmith@3.0.0` and altered `img` contents from `Buffer` to stream

5.0.1 - Updated donation URL

5.0.0 - Upgraded to `spritesmith-engine-spec@2.0.0`

4.3.0 - Upgraded to `spritesmith@1.5.0` to add `specVersion` validation

4.2.4 - Updated link to specification

4.2.3 - Moved from Gratipay to bit.ly URL for donations

4.2.2 - Added newsletter badge to README

4.2.1 - Updated node versions to support `>= 0.10.0`

4.2.0 - Moved to emitting errors rather than assert to be more gulp-like. Fixes #73

4.1.2 - Added `foundry` for release

4.1.1 - Added clarification for `retinaSrcFilter` lining up with `gulp.src`

4.1.0 - Upgraded to `spritesmith@1.4.0` to add better PNG support

4.0.0 - Upgraded to `spritesheet-templates@10.0.0` and moved to @2x suffix to prevent ordering issues

3.8.2 - Added back iojs to Travis CI

3.8.1 - Added proper `end` handling to split streams in documentation and tests. Fixes #48

3.8.0 - Upgraded to `spritesheet-templates@9.6.0` to pick up `json_texture` template

3.7.2 - Moved iojs to allowed failure until https://github.com/npm/npm/issues/8406 gets patched

3.7.1 - Moved from deprecated `licenses` key to `license` in `package.json`

3.7.0 - Fixed retina size assertion logic via @radist2s in #47

3.6.1 - Added README touchups via Ensighten/grunt-spritesmith#131

3.6.0 - Upgraded to `spritesheet-templates@9.4.0` and added handlebars helper registration

3.5.4 - Added `node@0.12` and `iojs` to CI tests

3.5.3 - Upgraded to `url2@1.0.4` to fix `git` `node_modules` issues. Fixes #34

3.5.2 - Fixed missing output for retina image to `img` stream via @radist2s in #37

3.5.1 - Added documentation on retina template data

3.5.0 - Added retina spritesheet support

3.4.0 - Upgraded to `spritesheet-templates@9.3.1` to pick up `spritesheet_info` in anticipation for retina info

3.3.1 - Upgraded to `spritesheet-templates@9.2.2` to pick up more granular templating

3.3.0 - Upgraded to `spritesheet-templates@9.2.0` to add inheritance support

3.2.0 - Upgraded to `spritesmith@1.3.0` to pick up background fill support for `pixelsmith`. Fixes #33

3.1.0 - Upgraded to `spritesheet-templates@9.1.0` to add single sprite fixes/warnings

3.0.0 - Upgraded to `spritesheet-templates@9.0.0` to reintroduce `2.6.0` as a major release

2.8.0 - Upgraded to `spritesmith@1.2.0` to pick up optimal `binary-tree` fixes

2.7.0 - Reverted `2.6.0` to remove breaking changes. Fixes #30

2.6.0 - Upgraded to `spritesheet-templates@8.3.0` to pick up `variableNameTransforms` support

2.5.2 - Fixed broken test suite due to `spritesheet-templates` patch upgrade

2.5.1 - Fixed typo for `imgOpts` in README. Fixes #28

2.5.0 - Upgraded to `spritesmith@1.1.0` to pick up `binary-tree` algorithm changes

2.4.0 - Upgraded to `spritesheet-templates@8.2.0` to pick up preprocessor `spritesheet` variables and mixins

2.3.0 - Upgraded to `spritesheet-templates@8.0.0` to pick up `spritesheet` parameter

2.2.0 - Moved from `json2css` to `spritesheet-templates`, its renamed equivalent

2.1.0 - Upgraded to `json2css@6.1.0` to pick up CSS selector fix

2.0.1 - Added more examples and links to examples from other sections

2.0.0 - Major release with multiple breaking changes:

- Upgraded to `spritesmith@1.0.0`
    - Moved to `pixelsmith` as default engine
    - Removed all other engines
    - Moved to `binary-tree` as default algorithm
- Upgraded to `json2css@6.0.0`
    - Renames `cssClass` to `cssSelector` to make it more semantic

1.5.0 - Added `twolfson-style` and fixed up lint errors

1.4.1 - Updated `gittip` to `gratipay`

1.4.0 - Upgraded to `spritesmith@0.20.0` to pick up `phantomjssmith's` JPEG support

1.3.0 - Added support for `gulp-newer` by doing nothing when no images are provided. Fixes #17

1.2.0 - Moved return stream to `stream.Transform` via @elentok in #16

1.1.2 - Corrected example image for README

1.1.1 - Updated README

1.1.0 - Upgraded to `json2css@5.2.0` to pick up useful CSS comments

1.0.0 - Upgraded to `json2css@5.0.0` to collect `scss_maps` alteration

0.5.1 - Increased timeout for tests to prevent false negatives. Related to #6

0.5.0 - Upgraded to `spritesmith@0.19.0` and added `algorithmOpts` to support skipping image sorting

0.4.0 - Upgraded to `json2css@4.4.0` to pick up `scss_maps` height fix

0.3.0 - Upgraded to `json2css@4.3.0` to pick up `scss_maps` template

0.2.0 - Added support for `cssTemplate` via @backflip in #3

0.1.1 - Update all name references from `gulp-spritesmith` to `gulp.spritesmith`

0.1.0 - Initial release
