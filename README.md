# vue-project

Todo: cover with tests:
- ProductDetailsPopup
  - WalletStep
    * title h1 exists
    * section with wallets exists
    * close btn click
    * click on wallet shows section with change and proceed btns  
    * click on change wallet hides section with btns 
    * click on proceed btn opens next step of the wizard 
    * check if wallet is not selected, proceed btn is disabled
  - CartStep
    * total price exists 
    * all products rendered 
    * check price change when the quantity of the products is increased 
    * check price change when the quantity of the products is decreased 
    * click on expand price opens section 
    * close click 
    * proceed click opens next step 
  - FormStep
    * all fields are rendered 
    * check validate func when some values are out 
    * back click return on prev step
    * next click proceeds to next step 
  - SummaryStep
    * all products are rendered 
    * check Ship To & Staking Requirement 
    * check Products Total Price existance & value 

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
