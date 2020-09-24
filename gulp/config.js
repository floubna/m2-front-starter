const infos = {
    vendorName: 'Starter',
    themeName: 'Starter',
}

const paths = {
    assets: `./app/design/frontend/${infos.vendorName}/${infos.themeName}/web`,
    assetsSrc: `./app/design/frontend/${infos.vendorName}/${infos.themeName}/web/src`
}

export const config = {
    theme: {
        name: `${infos.themeName}`,
        url: 'starter.test'
    },

    style:  {
        src: `${paths.assetsSrc}/scss/**/**/*.scss`,
        dest: `${paths.assets}/css/`,
        srcDir: `${paths.assetsSrc}/scss/`,
        sourcemap: `maps/`
    },

    icon: {
        name: 'starter_icons',
        className: 'icon',
        src: `${paths.assetsSrc}/images/_icons/**/**/*.svg`,
        cssToFont: '../fonts/icons/',

        font: {
            dest: `${paths.assets}/fonts/icons/`,
            templates: {
                style: {
                    src: `${paths.assetsSrc}/templates/icons/style.scss`,
                    dest: `${paths.assetsSrc}/scss/bases/`,
                    fileName: "_icons"
                },

                vars: {
                    src: `${paths.assetsSrc}/templates/icons/vars.scss`,
                    dest: `${paths.assetsSrc}/scss/utilities/`,
                    fileName: "_icons"
                }
            }
        }
    },

    images: {
        dir: `${paths.assetsSrc}/images`,
        src: [
            `${paths.assetsSrc}/images/**/*`,
            `!${paths.assetsSrc}/images/_*`,
            `!${paths.assetsSrc}/images/_*/**/*`
        ],
        dest: `${paths.assets}/images`
    },

    watch: {
        style: `${paths.assetsSrc}/scss/**/**/*.scss`
    }
}


