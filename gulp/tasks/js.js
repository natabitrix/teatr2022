import webpack from "webpack-stream";

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "js",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            //mode: 'production',
            output: {
                filename: 'app.min.js'
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))

        .pipe(app.gulp.src(app.path.src.jsExt))
        .pipe(app.gulp.dest(app.path.build.js))


        .pipe(app.plugins.browsersync.stream())
}