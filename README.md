<a name="iOW0F"></a>

## 概述

vue3 + vite 项目快速配置 ESlint、Prettier、CommitLint、Husky、Lint-Staged。
<a name="ejmsV"></a>

## 流程

<a name="rsGju"></a>

### 创建项目

查看 [vite 文档](https://cn.vitejs.dev/guide/)，进入项目目录，使用 vite 创建 vue3 + ts 的项目`yarn create vite`。

```bash
$ yarn create vite
√ Project name: ... vue3-lints
√ Select a framework: » Vue
√ Select a variant: » TypeScript
cd vue3-lints
yarn
yarn dev
```

<a name="fBinY"></a>

### 配置 ESlint

<a name="DjJOu"></a>

#### 添加依赖

查看 [eslint 文档](https://zh-hans.eslint.org/docs/latest/use/getting-started)，运行`npm init @eslint/config`或`yarn add -D eslint` & `npx eslint --init`。

```bash
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · vue
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ What format do you want your config file to be in? · JavaScript
```

安装完成后，查看 package.json 可以看到添加了三个依赖：

- [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/rules)
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)
- [eslint-plugin-vue](https://eslint.vuejs.org/rules/)
  <a name="E7cfM"></a>

#### 配置 rules 常用规则

配置 `eslintrc.cjs` 文件的 `rules` 常用规则：

- vue 3

  ```javascript
  module.exports = {
    //...
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      'vue/max-attributes-per-line': 'off',
      'vue/no-v-html': 'off',
      'vue/require-prop-types': 'off',
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
    },
  };
  ```

- vue 项目: `.eslintrc.vue.cjs`
- typescript 项目: `.eslintrc.ts.cjs`
- 原生 javascript 项目: `.eslintrc.js.cjs`

<a name="wEaJ7"></a>

#### 验证

在 `package.json` 的 `scripts` 添加命令，用于检测和修复代码：

```json
"scripts": {
  "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix"
}
```

在 App.vue 上定义一个未使用的常量：

```json
const test = 'xx' // 变量上出现警告：'test' is assigned a value but never used.eslint@typescript-eslint/no-unused-vars
```

运行 `yarn lint`，提示报错信息，说明 eslint 配置生效。

```bash
...\vue3-lints\src\App.vue
  3:7  warning  'test' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (0 errors, 1 warning)
```

<a name="K6RV0"></a>

### 配置 Prettier

> eslint 应主要负责校验语法校验，prettier 应主要负责代码格式化

<a name="UVG0Q"></a>

#### 添加依赖

查看 [Prettier 文档](https://prettier.io/docs/en/install)，根据安装命令，添加依赖`yarn add prettier -D`
<a name="AkjJR"></a>

#### 创建文件，配置规则

运行命令，添加文件`node --eval "fs.writeFileSync('.prettierrc.cjs','{}\n')"`，.js 文件可能会报错，所以最好还是使用 .cjs。

```javascript
module.exports = {
  // 一行最多 120 字符
  printWidth: 120,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾需要有逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  bracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 格式化嵌入的内容
  embeddedLanguageFormatting: 'auto',
};
```

添加忽略文件`.prettierignore`，让 Prettier CLI 和编辑器知道哪些文件不能格式化。

```javascript
.editorconfig
.eslintignore
**/*.svg
package.json
LICENSE
yarn.lock
**/assets
**/*.yml
*.sh
*.snap
.gitignore
.npmignore
.prettierignore
.DS_Store
node_modules/**
lib/
es/
```

<a name="EPz6S"></a>

#### 在 ESLint 中加入 Prettier

在 ESLint 校验中加入 Prettier 格式化配合使用，安装依赖<br />`yarn add eslint-config-prettier eslint-plugin-prettier -D`<br />修改`.eslintrc.cjs`的设置

```javascript
module.exports = {
  extends: [
+    'plugin:prettier/recommended',
  ],
-  plugins: ['@typescript-eslint', 'vue'],
+  plugins: ['@typescript-eslint', 'vue', 'prettier'],
  rules: {
+    'prettier/prettier': 'error',
+    'arrow-body-style': 'off',
+    'prefer-arrow-callback': 'off',
  },
};

```

<a name="SUfUj"></a>

### 配置 Husky

> husky 是一个增强的 git hook 工具，可以在 git hook 的各个阶段执行我们在 package.json 中配置好的 npm script。

通过 Husky 在 Git Commit 时进行代码校验。
<a name="HuL7X"></a>

#### 安装依赖

`yarn add husky -D`
<a name="hkm0n"></a>

#### 添加脚本

在 package.json 中添加脚本  prepare  并运行。（husky install 前需要 git init）

```bash
npm pkg set scripts.prepare="husky install"
yarn prepare // husky - Git hooks installed
```

<a name="mw9PJ"></a>

#### 添加 Git Hook

在项目根目录创建 .husky 文件夹，并执行命令添加 git hook 。<br />`npx husky add .husky/pre-commit "npm run lint"`
<a name="kRo05"></a>

#### 验证

把 eslintrc.cjs 中 rules 的`'@typescript-eslint/no-unused-vars': 'warn'`注释，然后 git commit 一条信息，提交后会报错，说明 husky pre-commit hook 配置成功。

```bash
git commit -m 'init'

vue3-lints\src\App.vue
  3:7  error  'test' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```

<a name="U0bBI"></a>

### 配置 Lint-staged

> lint-staged 的概念是在 git 中暂存的文件上运行已配置的 linter（或其他）任务。

每次提交都检测所有代码并不是一个好的决定，比如你只修改了文件 A 结果文件 B 报错了，但是文件 B 并不是你负责的模块，改还是不改？可以通过 lint-staged **只对暂存区的代码进行检验**。
<a name="od4Em"></a>

#### 添加依赖

`yarn add lint-staged -D`
<a name="kDbTJ"></a>

#### package.json 添加配置

```json
{
  "lint-staged": {
    "*.{ts,vue,tsx}": ["yarn lint", "prettier . --write"]
  }
}
```

避免与前面 husky pre-commit 操作重复，应该把`.husky/pre-commit`中替换`yarn lint`为 `npx lint-staged`。现在每次提交代码前都会对改动的文件进行 Lint 检查和 Prettier 格式化。
<a name="yl3H4"></a>

### 配置 Commitlint

> commitlint 帮助您的**团队遵守提交约定**。通过支持 npm 安装的配置，它使提交约定的共享变得容易。

```bash
git commit -m <type>(<scope>): <subject>
# type：提交的改动类型（如新增、修改、更新等）
# scope（可选）：标识此次提交主要涉及到代码中哪个模块
# subject：一句话描述此次提交的主要内容。
```

<a name="yr6Au"></a>

#### 添加依赖

查看 [commitlint 文档](https://commitlint.js.org/#/)，执行命令添加依赖`yarn add @commitlint/cli @commitlint/config-conventional -D`
<a name="HUXpJ"></a>

#### 添加配置文件

**手动创建 .commitlint.config.cjs 文件**（后缀 .js 可能会报 CommonJS 语法错误，将后缀改为 .cjs 即可）

```bash
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['fix', 'feat', 'BREAKING CHANGE', 'ci', 'perf', 'style', 'refactor', 'docs', 'improv', 'chore']],
  },
};
```

或者执行官网上的命令创建`echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.cjs`。<br />官网上面的执行命令创建文件，有可能 eslint 时会报错，原因可能是用 echo 创建的文件有[编码格式问题](https://github.com/conventional-changelog/commitlint/issues/3256)。

```bash
yarn lint
...\vue3-lints\commitlint.config.cjs
  1:0  error  Parsing error: File appears to be binary
```

<a name="type-enum"></a>

type-enum

- fix (没有破坏性改动，仅作 bug 修复或打补丁)
- feat (没有破坏性改动，仅增加新功能或微调就功能)
- BREAKING CHANGE[fix/feat] (修复 bug 或增改功能，但会导致原有功能受影响或需改动)
- ci (对 CI 配置的修改)
- perf (关于性能方面的优化)
- style (修改代码风格、格式等，不影响代码逻辑和含义，如 white-space, formatting, missing semi-colons 等)
- refactor (代码重构，也就是没有功能增减或者 bug 修复)
- docs (文档的增删改)
- improv (对现有实现的优化，没有功能增删或 bug 修复，若仅有性能优化，则推荐使用 perf)
- chore (其他的非代码改动，比如构建流程、开发工具和依赖库版本等)
  <a name="OHlyH"></a>

#### 添加 commitlint 命令到 husky 中

执行命令，添加 commitlint 语句到 husky hook 的 commit-msg 中。<br />`npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'`
<a name="50d52dd9"></a>

## 常见问题

<a name="6f08ecc8"></a>

### 在 VSCode 中使用

在 VSCode 中，默认 ESLint 并不能识别 `.vue`、`.ts` 或 `.tsx` 文件，需要在「文件 => 首选项 => 设置」里做如下配置：

```
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "typescript",
    "typescriptreact"
  ]
}
```

<a name="05d28d5a"></a>

### 保存时自动修复 ESLint 错误

如果想要开启「保存时自动修复」的功能，你需要配置 `.vscode/settings.json`：

```
{
"eslint.validate": ["javascript", "javascriptreact", "vue", "typescript", "typescriptreact"],
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
},
}
```

<a name="3b7ee585"></a>

### VSCode 中的 autoFixOnSave 没有效果

如果需要针对 `.vue`、`.ts` 和 `.tsx` 文件开启 ESLint 的 autoFix，则需要配置成：

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
}
```
