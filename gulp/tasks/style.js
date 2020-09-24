import { config, paths } from '../config';
import { src, dest , $, server } from '../plugins';

// =========================================================
// Gulp Task: stylesLint
// Description: Allow to generate iconfont from svg
// Dependencies: gulp-stylelint stylelint stylelint-config-recommended-scss stylelint-scss gulp-notify gulp-plumber gulp-cached
// =========================================================
export function stylesLint() {
    var stream =
        // -------------------------------------------- Start Task
        src(config.style.src)
            .pipe($.newer(config.style.dest))
            .pipe($.cached('lint'))
            .pipe($.plumber())
            .pipe($.stylelint({
                reporters: [{
                    formatter: 'string',
                    debug: true,
                    console: true
                }]
            }))
            .on("error", $.notify.onError(function (error) {
                return error.message;
            }));

    // ---------------------------------------------- End Task
    return stream;
};

// =========================================================
// Gulp Task: stylesScss
// Description: Allow to generate iconfont from svg
// Dependencies: gulp-sass gulp-cached gulp-cached-sass gulp-plumber gulp-newer gulp-sourcemaps gulp-notify tailwindcss autoprefixer cssnano
// =========================================================
export function stylesScss() {
    var cssnano = require('cssnano');
    var sassPlugins = [
        require('autoprefixer'),
        // cssnano() // Minification et suppression
    ];

    var stream =
// -------------------------------------------- Start Task
        src(config.style.src)
            .pipe($.newer(config.style.dest))
            .pipe($.cached('sass'))
            .pipe($.cachedSass(config.style.srcDir))
            .pipe($.plumber())
            .pipe($.sourcemaps.init({
                loadMaps: true
            }))
            .pipe($.sass({
                includePaths: ['./node_modules', '../'],
            }))
            .on("error", $.notify.onError({
                title: "Gulp",
                subtitle: "Failure!",
                message: "Error: <%= error.message %>",
                sound: "Basso"
            }))
            .pipe($.postcss(sassPlugins))
            .pipe($.notify({
                title: "Gulp",
                subtitle: "Success!",
                message: config.theme.name + ' styles compiled successfully',
                onLast: true,
                sound: "Pop"
            }))
            .pipe($.sourcemaps.write(config.style.maps, {
                includeContent: false,
                debug: true
            }))
            .pipe(dest(config.style.dest))
            .pipe(server.stream());
// ---------------------------------------------- End Task
    return stream;
};
