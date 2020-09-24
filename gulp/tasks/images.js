// =========================================================
// Gulp Task: images
// Description: Allow to optimize images
// Dependencies: gulp-image
// =========================================================
import { config } from '../config';
import { src, dest, lastRun, $ } from '../plugins';

export function images() {
    var stream =
// -------------------------------------------- Start Task
        src(config.images.src, {
            since: file => {
                if (lastRun('images') <= file.stat.ctime) {
                    return 0
                }
                return lastRun('images')
            },
        })
        .pipe($.image({
            pngquant: true,
            optipng: true,
            zopflipng: false,
            jpegRecompress: true,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            options: {
                optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
                pngquant: ['--speed=1', '--force', 256],
                zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
                jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
                mozjpeg: ['-optimize', '-progressive'],
                guetzli: ['--quality', 85],
                gifsicle: ['--optimize'],
                svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
            }
        }))
        .pipe(dest(config.images.dest))
// ---------------------------------------------- End Task
    return stream;
};

