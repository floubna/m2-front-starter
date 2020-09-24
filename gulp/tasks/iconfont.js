// =========================================================
// Gulp Task: Icon font
// Description: Allow to generate iconfont from svg
// Dependencies: gulp-iconfont gulp-consolidate gulp-rename
// =========================================================
import { config } from '../config';
import { src, dest, $ } from '../plugins';

const runTimestamp = Math.round(Date.now()/1000);

export function iconfont() {
    var stream =
// -------------------------------------------- Start Task
        src(config.icon.src)
            .pipe($.iconfont({
                fontName: config.icon.name, // required
                className: config.icon.className,
                fontPath: config.icon.cssToFont,
                normalize: true,
                fontHeight: 1001,
                formats: ['woff2', 'woff'], // default, 'woff2' and 'svg' are available
            }))

            .on('glyphs', (glyphs, op) => {
                const options = {
                    className: op.className,
                    fontName: op.fontName,
                    fontPath: op.fontPath,
                    glyphs: glyphs.map(mapGlyphs)
                }
                src(config.icon.font.templates.style.src)
                    .pipe($.consolidate('lodash', options))
                    .pipe($.rename({ basename: config.icon.font.templates.style.fileName }))
                    .pipe(dest(config.icon.font.templates.style.dest))
                src(config.icon.font.templates.vars.src)
                    .pipe($.consolidate('lodash', options))
                    .pipe($.rename({ basename: config.icon.font.templates.vars.fileName }))
                    .pipe(dest(config.icon.font.templates.vars.dest))

            })
            .pipe($.notify({
                title: "Gulp",
                subtitle: "Success!",
                message: 'Iconfont compiled successfully',
                onLast: true,
                sound: "Pop"
            }))
            .pipe(dest(config.icon.font.dest));
// ---------------------------------------------- End Task
    return stream;
};

function mapGlyphs (glyph) {
    return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
}
