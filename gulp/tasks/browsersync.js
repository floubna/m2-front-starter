// =========================================================
// Gulp Task: Serve
// Description:
// Dependencies: browser-sync
// =========================================================
import { config } from '../config';
import { $, server } from '../plugins';

export function serve(done) {
    var stream =
// -------------------------------------------- Start Task
        server.init({
            logPrefix: config.theme.name,
            host: config.theme.url,
            https: true,
            port: 3060,
            open: false,
            notify: false,
            ghost: false,
            cookies: { stripeDomain: false }
        });
        done();
// ---------------------------------------------- End Task
    return stream;
};

