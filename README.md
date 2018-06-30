# url-replace-loader for webpack

html-loader works pretty good with stuff like this:

`<img class="img-fluid w-100" src="assets/img-temp/400x568/img1.jpg" alt="Image Description">`

With file-loader it could place this img1.jpg where it should be, ensure it was initially.
So far so good. But... 

It wouldn't work with:

`<div class="g-bg-cover" style="background: url(../img-temp/500x650/img1.jpg);">`

I tried initially to try with html-loader?interpolate, but:
1) it doesn't work good when html-loader is not first loader, for example after ejs-compiled-loader
2) you should change input html, which I would like not to do

I believe there is a solution somewhere in "the internet", but after googling I came to conclusion
it's faster to write my loader for my needs, that will load files for each `url(...)`. So yeah, it replaces
`each` url().

Possible usage:

```
const HTMLWebpackPlugin = require('html-webpack-plugin');

new HTMLWebpackPlugin({
    template: 'url-replace-loader!extract-loader!html-loader!ejs-compiled-loader!src/views/home.ejs',
    filename: 'home.html',
    chunks: ['vendor', 'home'],
}),
```