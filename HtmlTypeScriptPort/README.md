# Corruption of Champions - TypeScript Port

Currently working on a faithful conversion of Corruption of Champion into using TypeScript.&nbsp; Its last official release (v0.94) was in ActionScript3 (Flash).

## Game Overview

Corruption of Champions is an erotic text based and browser based flash game.

---

## Game Features

The rules that govern and guide the player's actions, as well as the game's response to them

- Corruption of Champions [Wiki](https://wiki.smutosaur.us/CoC/Main_Page 'Erotic browser based flash text game')

---

## Technology Stack (Reference Links)

- Markdown: [Cheat Sheet](https://www.markdownguide.org/cheat-sheet 'A quick reference to the Markdown syntax')
- TypeScript: [Official Docs](https://www.typescriptlang.org/docs 'TypeScript Official Documentation'), [VS Code](https://code.visualstudio.com/docs/languages/typescript 'TypeScript in Visual Studio Code')

### WebPack Command Reference

1. Initial project assets

   - `npm init -y`
   - `npm i lodash jquery bootstrap`

2. WebPack: [Getting Started](https://webpack.js.org/guides/getting-started), [Configuration](https://webpack.js.org/concepts/configuration) (_webpack.config.js_)

   - `npm i -D webpack webpack-cli`
   - `npm i -D webpack-dev-server html-webpack-plugin`

3. Install the [TypeScript](https://webpack.js.org/guides/typescript) compiler, [loader](https://webpack.js.org/guides/build-performance/#typescript-loader), & [HMR](https://webpack.js.org/guides/hot-module-replacement)

   - `npm i -D typescript ts-loader`
   - `npm i -D fork-ts-checker-webpack-plugin tsconfig-paths-webpack-plugin`
   - `npm i -D @types/lodash @types/jquery @types/bootstrap`

4. Inject CSS into the DOM with [Style Loader](https://github.com/webpack-contrib/style-loader) & [CSS Loader](https://github.com/webpack-contrib/css-loader)

   - `npm i -D style-loader css-loader`
