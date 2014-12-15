# gulp.spritesmith changelog
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
