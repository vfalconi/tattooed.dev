# tattooed.dev: an 11ty + Gulp situation

"Monsters are the patron saints of imperfection." -- [Guillermo Del Toro](https://www.theguardian.com/film/2016/aug/03/guillermo-del-toro-bleak-house-home-lacma-exhibit)

My setup for publishing tattooed.dev.

## Config (`./.env`)

| setting | description | required |
| ----- | ----- | ----- |
| `BUILD_ENVIRONMENT` | development, [...anythingelse] | yes |
| `BUILD_BLOG_ENDPOINT` | CMS URL for JSON feed of blog content | yes |
| `BUILD_BOOKS_ENDPOINT` | CMS URL for JSON feed of bookshelf entries | yes |
| `BUILD_PHOTOS_ENDPOINT` | CMS URL for JSON feed of photo post content | yes |
| `BUILD_PROJECTS_ENDPOINT` | CMS URL for JSON feed of projects content | yes |
| `WEBMENTIONS_ENDPOINT` | URL for webmentions source | yes |
| `BUILD_DIR` | where to save output | |

## Automation

`dev` branch is ultimately disposable, and all changes should start here.

once they're ready, merge into `canon` to trigger ci build. merge `canon` into `public` to push to GitHub.

## Commands

```bash
# start dev server
npm start
# shortcut for gulp (build, watch), and npx (11ty --serve)
```

```bash
# build site for the real world
npm run-script build
# shortcut for guilp (build) and npx (11ty)
```

```bash
# run tests
npm test
# shortcut for mocha
```

```bash
# start with debug
npm run-script start:debug
# same as start but it turns on debug mode
```
