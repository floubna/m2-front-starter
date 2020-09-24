"use strict";


// =========================================================
// IMPORTS
// =========================================================
// --------------------------------------PLUGINS & VARIABLES
import { series, parallel, watch, $, server } from "./gulp/plugins"
import { config } from "./gulp/config"

// ----------------------------------------------------TASKS
import { iconfont } from "./gulp/tasks/iconfont"
import { stylesScss, stylesLint } from "./gulp/tasks/style"
import { serve } from "./gulp/tasks/browsersync"
import { images } from "./gulp/tasks/images"

// =========================================================
// FUNCTIONS
// =========================================================
// -----------------------------------------------WATCH TASK
function watcher() {
    watch(config.style.src, {
        usePolling: true
    }, series(stylesLint, stylesScss))

    watch(config.images.src, images)

    watch(config.icon.src, iconfont)
}

// =========================================================
// EXPORTS TASKS
// =========================================================
module.exports = {
    images: images,
    serve: serve,
    styles: series(stylesLint, stylesScss),
    iconfont: series(iconfont, stylesScss),
    build: parallel(series(stylesScss), images),
    watch: series(parallel(series(stylesScss), images), watcher),
    'watch:bs': series(parallel(series(stylesScss), images), serve, watcher)
}
