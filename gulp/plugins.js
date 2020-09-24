import {src, dest, series, parallel, watch, lastRun, task } from 'gulp'
import plugins from "gulp-load-plugins"
const $ = plugins({lazy: true})

// browsersync
import browserSync from "browser-sync";
const server = browserSync.create()

export { src, dest, series, parallel, watch, lastRun, task, $, server }
