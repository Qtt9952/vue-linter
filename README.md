## 概述

vue3 + vite 项目快速配置 ESlint、Prettier、CommitLint、Husky、Lint-Staged。

## 流程

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

### 配置 ESlint

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

#### 配置 rules 常用规则

配置 `eslintrc.cjs` 文件的 `rules` 常用规则：

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

```javascript
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 设置 js 的解析器为 @babel/eslint-parser
    // https://github.com/mysticatea/vue-eslint-parser#-options
    parser: '@babel/eslint-parser',
    ecmaVersion: 2019,
    // ECMAScript modules 模式
    sourceType: 'module',
    ecmaFeatures: {
      // 不允许 return 语句出现在 global 环境下
      globalReturn: false,
      // 开启全局 script 模式
      impliedStrict: true,
      jsx: true,
    },
    // 即使没有 babelrc 配置文件，也使用 @babel/eslint-parser 来解析
    requireConfigFile: false,
    // 仅允许 import export 语句出现在模块的顶层
    allowImportExportEverywhere: false,
  },
  plugins: ['vue'],
  rules: {
    /**
     * 限制自定义组件的属性风格
     */
    'vue/attribute-hyphenation': 'off',
    /**
     * 标签属性必须按规则排序
     */
    'vue/attributes-order': 'error',
    /**
     * <script> 标签必须有 lang 属性
     */
    'vue/block-lang': 'off',
    /**
     * 变量名必须是 camelCase 风格的
     * @reason 很多 api 或文件名都不是 camelCase 风格的
     */
    camelcase: 'off',
    'vue/camelcase': 'off',
    /**
     * 支持在模版中使用 eslint-disable-next-line 等注释
     */
    'vue/comment-directive': 'error',
    /**
     * 限制组件接口定义的模式
     */
    'vue/component-api-style': 'off',
    /**
     * 组件的 name 属性必须符合 PascalCase
     * @reason 这是官方建议的规范
     */
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    /**
     * 限制组件名的风格
     */
    'vue/component-name-in-template-casing': 'off',
    /**
     * 限制组件名称的命名规范
     */
    'vue/component-options-name-casing': 'off',
    /**
     * 组件中必须按照 <script>, <template>, <style> 排序
     * @reason 这是官方建议的顺序
     */
    'vue/component-tags-order': [
      'error',
      {
        order: [['script', 'template'], 'style'],
      },
    ],
    /**
     * 自定义事件名必须用 kebab-case 风格
     */
    'vue/custom-event-name-casing': 'error',
    /**
     * 禁止使用 foo['bar']，必须写成 foo.bar
     * @reason 当需要写一系列属性的时候，可以更统一
     */
    'dot-notation': 'off',
    'vue/dot-notation': 'off',
    /**
     * 必须使用 === 或 !==，禁止使用 == 或 !=
     */
    eqeqeq: 'off',
    'vue/eqeqeq': ['error', 'always'],
    /**
     * 标签的第一个属性必须换行
     * @reason 代码格式问题，最好由 Prettier 解决
     */
    'vue/first-attribute-linebreak': 'off',
    /**
     * button 标签必须有 type 属性
     */
    'vue/html-button-has-type': 'off',
    /**
     * HTML 注释的 <!-- 后必须有空格或换行符
     * @reason 代码格式问题，最好由 Prettier 解决
     */
    'vue/html-comment-content-newline': 'off',
    /**
     * HTML 注释必须有首位空格
     * @reason 代码格式问题，最好由 Prettier 解决
     */
    'vue/html-comment-content-spacing': 'off',
    /**
     * HTML 注释缩进必须有两个空格
     * @reason 代码格式问题，最好由 Prettier 解决
     */
    'vue/html-comment-indent': 'off',
    /**
     * 修复 no-unused-vars 不检查 jsx 的问题
     */
    'vue/jsx-uses-vars': 'error',
    /**
     * 组件名称必须和文件名一致
     */
    'vue/match-component-file-name': 'off',
    /**
     * 组件名称必须是两个以上的单词
     */
    'vue/multi-word-component-names': 'off',
    /**
     * 多行属性之间必须有空行
     * @reason 代码格式问题，最好由 Prettier 解决
     */
    'vue/new-line-between-multi-line-property': 'off',
    /**
     * nextTick 必须使用 Promise 模式调用
     */
    'vue/next-tick-style': 'off',
    /**
     * watch 中禁止使用箭头函数
     */
    'vue/no-arrow-functions-in-watch': 'error',
    /**
     * 计算属性禁止包含异步方法
     */
    'vue/no-async-in-computed-properties': 'error',
    /**
     * 禁止 <template> 中使用字符串
     */
    'vue/no-bare-strings-in-template': 'off',
    /**
     * 禁止给布尔值 props 添加默认值
     * @reason 类型相关的约束交给 TypeScript
     */
    'vue/no-boolean-default': 'off',
    /**
     * 禁止有 v-html 或 v-text 属性的标签内部还有内容
     */
    'vue/no-child-content': 'error',
    /**
     * 禁止 data() 中有计算属性
     */
    'vue/no-computed-properties-in-data': 'error',
    /**
     * 禁止将常量作为分支条件判断中的测试表达式，但允许作为循环条件判断中的测试表达式
     */
    'no-constant-condition': 'off',
    'vue/no-constant-condition': 'off',
    /**
     * 禁止在 data 中使用已废弃的对象定义
     */
    'vue/no-deprecated-data-object-declaration': 'error',
    /**
     * 禁止使用已废弃的 destroyed 和 beforeDestroy 生命周期
     */
    'vue/no-deprecated-destroyed-lifecycle': 'error',
    /**
     * 禁止使用已废弃的 $listeners
     */
    'vue/no-deprecated-dollar-listeners-api': 'error',
    /**
     * 禁止使用已废弃的 $scopedSlots
     */
    'vue/no-deprecated-dollar-scopedslots-api': 'error',
    /**
     * 禁止使用已废弃的 events 接口
     */
    'vue/no-deprecated-events-api': 'error',
    /**
     * 禁止使用已废弃的 filters 语法
     */
    'vue/no-deprecated-filter': 'error',
    /**
     * 禁止使用已废弃的 functional 模版
     */
    'vue/no-deprecated-functional-template': 'error',
    /**
     * 禁止使用已废弃的 is 属性
     */
    'vue/no-deprecated-html-element-is': 'error',
    /**
     * 禁止使用已废弃的 inline-template 属性
     */
    'vue/no-deprecated-inline-template': 'error',
    /**
     * 禁止使用已废弃的 this
     */
    'vue/no-deprecated-props-default-this': 'error',
    /**
     * 禁止使用已废弃的 tag 属性
     */
    'vue/no-deprecated-router-link-tag-prop': 'error',
    /**
     * 禁用已废弃的 scope 属性
     */
    'vue/no-deprecated-scope-attribute': 'error',
    /**
     * 使用 v-slot 替代已废弃的 slot
     */
    'vue/no-deprecated-slot-attribute': 'error',
    /**
     * 禁用已废弃的 slot-scope
     */
    'vue/no-deprecated-slot-scope-attribute': 'error',
    /**
     * 禁止在 v-bind 指令中使用已废弃的 .sync 修饰符
     */
    'vue/no-deprecated-v-bind-sync': 'error',
    /**
     * 禁用已废弃的 v-is 指令
     */
    'vue/no-deprecated-v-is': 'error',
    /**
     * 禁止使用已废弃的 .native 修饰符
     */
    'vue/no-deprecated-v-on-native-modifier': 'error',
    /**
     * 禁止使用已废弃的数字修饰符
     */
    'vue/no-deprecated-v-on-number-modifiers': 'error',
    /**
     * 禁止使用已废弃的 Vue.config.keyCodes
     */
    'vue/no-deprecated-vue-config-keycodes': 'error',
    /**
     * 禁止重复的键名
     */
    'vue/no-dupe-keys': 'error',
    /**
     * 禁止在 v-if 和 v-else-if 中出现重复的测试表达式
     */
    'vue/no-dupe-v-else-if': 'error',
    /**
     * 使用 v-bind="$attrs" 时 inheritAttrs 必须是 false
     */
    'vue/no-duplicate-attr-inheritance': 'error',
    /**
     * 禁止出现重复的属性
     */
    'vue/no-duplicate-attributes': [
      'error',
      {
        allowCoexistClass: false,
        allowCoexistStyle: false,
      },
    ],
    /**
     * 禁止 <template> <script> <style> 为空
     */
    'vue/no-empty-component-block': 'error',
    /**
     * 禁止解构赋值中出现空 {} 或 []
     */
    'no-empty-pattern': 'off',
    'vue/no-empty-pattern': 'error',
    /**
     * 禁止在 <script setup> 中使用 export
     */
    'vue/no-export-in-script-setup': 'error',
    /**
     * 禁止在 await 之后调用 expose
     */
    'vue/no-expose-after-await': 'error',
    /**
     * 禁止 model 中出现错误的属性
     */
    'vue/no-invalid-model-keys': 'error',
    /**
     * 禁止使用特殊空白符（比如全角空格），除非是出现在字符串、正则表达式、模版字符串中或 HTML 内容中
     */
    'no-irregular-whitespace': 'off',
    'vue/no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: true,
        skipTemplates: true,
        skipHTMLTextContents: true,
      },
    ],
    /**
     * 禁止异步注册生命周期
     */
    'vue/no-lifecycle-after-await': 'error',
    /**
     * 禁止出现没必要的 <template>
     */
    'vue/no-lone-template': 'error',
    /**
     * 禁止使用超出 js 精度范围的数字
     */
    'no-loss-of-precision': 'off',
    'vue/no-loss-of-precision': 'error',
    /**
     * 禁止 class 中出现复数的对象
     */
    'vue/no-multiple-objects-in-class': 'error',
    /**
     * 禁止给 scoped slots 传递多个参数
     */
    'vue/no-multiple-slot-args': 'error',
    /**
     * 禁止修改组件的 props
     */
    'vue/no-mutating-props': 'error',
    /**
     * 禁止出现语法错误
     */
    'vue/no-parsing-error': 'error',
    /**
     * 禁止潜在的拼写错误
     */
    'vue/no-potential-component-option-typo': 'off',
    /**
     * 禁止直接使用由 ref 生成的变量，必须使用它的 value
     */
    'vue/no-ref-as-operand': 'error',
    /**
     * 组件的 name 属性静止使用保留字
     */
    'vue/no-reserved-component-names': 'error',
    /**
     * 禁止覆盖保留字
     */
    'vue/no-reserved-keys': 'error',
    /**
     * 禁止使用保留的 props
     */
    'vue/no-reserved-props': 'error',
    /**
     * 禁止在模版中使用指定的 block
     */
    'vue/no-restricted-block': 'off',
    /**
     * 禁止 await 后调用指定的函数
     */
    'vue/no-restricted-call-after-await': 'off',
    /**
     * 限制使用特定的 class
     */
    'vue/no-restricted-class': 'off',
    /**
     * 禁止使用指定的组件选项
     */
    'vue/no-restricted-component-options': 'off',
    /**
     * 禁止使用特定的自定义事件
     */
    'vue/no-restricted-custom-event': 'off',
    /**
     * 禁止使用特定的 props
     */
    'vue/no-restricted-props': 'off',
    /**
     * 禁止使用指定的属性
     */
    'vue/no-restricted-static-attribute': 'off',
    /**
     * 禁止使用指定的语法
     */
    'no-restricted-syntax': 'off',
    'vue/no-restricted-syntax': 'off',
    /**
     * 禁止使用指定的 v-bind 参数
     */
    'vue/no-restricted-v-bind': 'off',
    /**
     * 禁止对 setup 中的 props 解构
     */
    'vue/no-setup-props-destructure': 'error',
    /**
     * 组件的 data 属性的值必须是一个函数
     */
    'vue/no-shared-component-data': 'off',
    /**
     * 禁止在计算属性中对属性修改
     */
    'vue/no-side-effects-in-computed-properties': 'off',
    /**
     * 禁止在数组中出现连续的逗号
     */
    'no-sparse-arrays': 'off',
    'vue/no-sparse-arrays': 'error',
    /**
     * 禁止使用 style 属性
     */
    'vue/no-static-inline-styles': 'off',
    /**
     * 禁止 <template> 使用 key 属性
     */
    'vue/no-template-key': 'off',
    /**
     * 模版中的变量名禁止与前一个作用域重名
     */
    'vue/no-template-shadow': 'off',
    /**
     * 添加了 target="_blank" 属性时，必须添加 rel="noopener noreferrer"
     */
    'vue/no-template-target-blank': 'off',
    /**
     * 禁止在 <textarea> 中出现模版语法 {{message}}
     */
    'vue/no-textarea-mustache': 'error',
    /**
     * 禁止在 beforeRouteEnter 方法中使用 this
     */
    'vue/no-this-in-before-route-enter': 'error',
    /**
     * 禁止使用未定义的组件
     */
    'vue/no-undef-components': 'off',
    /**
     * 禁止使用未定义的属性
     */
    'vue/no-undef-properties': 'off',
    /**
     * 当你的 vue 版本较老时，禁用还未支持的语法
     */
    'vue/no-unsupported-features': 'off',
    /**
     * 禁止定义在 components 中的组件未使用
     */
    'vue/no-unused-components': 'error',
    /**
     * 禁止属性定义了却未使用
     */
    'vue/no-unused-properties': 'off',
    /**
     * 标签属性必须按规则排序
     * @reason 识别有限制，无法识别在其他组件中使用的情况
     */
    'vue/no-unused-refs': 'off',
    /**
     * 模版中已定义的变量必须使用
     */
    'vue/no-unused-vars': 'error',
    /**
     * 禁止将计算熟悉当作方法调用
     */
    'vue/no-use-computed-property-like-method': 'error',
    /**
     * 禁止在同一个元素上使用 v-if 和 v-for 指令
     */
    'vue/no-use-v-if-with-v-for': 'error',
    /**
     * 禁止出现没必要的字符串连接
     */
    'no-useless-concat': 'off',
    'vue/no-useless-concat': 'error',
    /**
     * 禁止出现无用的 mustache 字符串
     */
    'vue/no-useless-mustaches': 'error',
    /**
     * 禁止模版中使用未生效的属性
     */
    'vue/no-useless-template-attributes': 'error',
    /**
     * 禁止出现无用的 v-bind
     */
    'vue/no-useless-v-bind': 'error',
    /**
     * 禁止使用 v-html
     */
    'vue/no-v-html': 'off',
    /**
     * 禁止使用 v-text
     */
    'vue/no-v-text': 'off',
    /**
     * 禁止在组件中使用 v-text v-html
     */
    'vue/no-v-text-v-html-on-component': 'error',
    /**
     * 禁止在 await 之后调用 watch
     */
    'vue/no-watch-after-await': 'error',
    /**
     * 必须使用 a = {b} 而不是 a = {b: b}
     * @reason 有时后者可以使代码结构更清晰
     */
    'object-shorthand': 'off',
    'vue/object-shorthand': 'off',
    /**
     * 一个文件必须仅包含一个组件
     */
    'vue/one-component-per-file': 'error',
    /**
     * 组件的属性必须为一定的顺序
     */
    'vue/order-in-components': 'error',
    /**
     * <template> <script> <style> 之间必须有空行
     * @reason 代码格式问题，最好由 Prettier 解决
     */
    'vue/padding-line-between-blocks': 'off',
    /**
     * 在模版中必须用单独的 class 属性表达静态类的名字
     */
    'vue/prefer-separate-static-class': 'off',
    /**
     * 必须使用模版字符串而不是字符串连接
     */
    'prefer-template': 'off',
    'vue/prefer-template': 'off',
    /**
     * props 必须用驼峰式
     */
    'vue/prop-name-casing': 'off',
    /**
     * <component> 必须有绑定的组件
     */
    'vue/require-component-is': 'error',
    /**
     * props 如果不是 required 的字段，必须有默认值
     * @reason 类型相关的约束交给 TypeScript
     */
    'vue/require-default-prop': 'off',
    /**
     * 必须直接使用 export default 导出组件
     */
    'vue/require-direct-export': 'off',
    /**
     * emits 必须为函数
     */
    'vue/require-emit-validator': 'off',
    /**
     * emits 属性必须包含 $emit() 中的值
     */
    'vue/require-explicit-emits': 'error',
    /**
     * 必须导出 expose
     */
    'vue/require-expose': 'off',
    /**
     * 组件必须包含 name 属性
     */
    'vue/require-name-property': 'off',
    /**
     * props 的取值必须是基本类型的构造函数，而不是字符串
     * @reason 类型相关的约束交给 TypeScript
     */
    'vue/require-prop-type-constructor': 'off',
    /**
     * prop 必须有类型限制
     * @reason 类型相关的约束交给 TypeScript
     */
    'vue/require-prop-types': 'off',
    /**
     * render 函数必须有返回值
     */
    'vue/require-render-return': 'error',
    /**
     * this.$slots.default 必须被当作方法使用
     */
    'vue/require-slots-as-functions': 'error',
    /**
     * transition 内部必须有条件指令
     */
    'vue/require-toggle-inside-transition': 'error',
    /**
     * v-for 指令的元素必须有 v-bind:key
     */
    'vue/require-v-for-key': 'error',
    /**
     * prop 的默认值必须匹配它的类型
     * @reason 类型相关的约束交给 TypeScript
     */
    'vue/require-valid-default-prop': 'off',
    /**
     * 计算属性必须有返回值
     */
    'vue/return-in-computed-property': 'error',
    /**
     * emits 中的方法必须有返回值
     */
    'vue/return-in-emits-validator': 'error',
    /**
     * script setup 中定义的变量必须使用
     */
    'vue/script-setup-uses-vars': 'error',
    /**
     * props 的键名必须排好序
     */
    'vue/sort-keys': 'off',
    /**
     * class 的值必须按字母排序
     */
    'vue/static-class-names-order': 'off',
    /**
     * 禁止在模版中用 this
     */
    'vue/this-in-template': 'error',
    /**
     * 当一个节点上出现两个 v-on:click 时，其中一个必须为 exact
     */
    'vue/use-v-on-exact': 'error',
    /**
     * 使用缩写的 : 而不是 v-bind:
     */
    'vue/v-bind-style': 'error',
    /**
     * v-for 中必须用 in 进行遍历
     */
    'vue/v-for-delimiter-style': 'off',
    /**
     * 禁止在 v-on 的事件名使用横杠
     */
    'vue/v-on-event-hyphenation': 'error',
    /**
     * 禁止在 v-on 的值中调用函数
     */
    'vue/v-on-function-call': 'error',
    /**
     * 使用缩写的 @click 而不是 v-on:click
     */
    'vue/v-on-style': 'error',
    /**
     * 使用缩写的 #one 而不是 v-slot:one
     */
    'vue/v-slot-style': 'off',
    /**
     * defineEmits 必须使用合法的语法
     */
    'vue/valid-define-emits': 'off',
    /**
     * defineProps 必须使用合法的语法
     */
    'vue/valid-define-props': 'off',
    /**
     * 禁止调用 Vue.nextTick 或 vm.$nextTick 时不使用 await
     */
    'vue/valid-next-tick': 'error',
    /**
     * template 的根节点必须合法
     */
    'vue/valid-template-root': 'error',
    /**
     * v-bind 指令必须合法
     */
    'vue/valid-v-bind': 'error',
    /**
     * v-cloak 指令必须合法
     */
    'vue/valid-v-cloak': 'error',
    /**
     * v-else 指令必须合法
     */
    'vue/valid-v-else': 'error',
    /**
     * v-else-if 指令必须合法
     */
    'vue/valid-v-else-if': 'error',
    /**
     * v-for 指令必须合法
     */
    'vue/valid-v-for': 'error',
    /**
     * v-html 指令必须合法
     */
    'vue/valid-v-html': 'error',
    /**
     * v-if 指令必须合法
     */
    'vue/valid-v-if': 'error',
    /**
     * v-is 指令必须合法
     */
    'vue/valid-v-is': 'error',
    /**
     * valid-v-memo 指令必须合法
     */
    'vue/valid-v-memo': 'off',
    /**
     * v-model 指令必须合法
     */
    'vue/valid-v-model': 'error',
    /**
     * v-on 指令必须合法
     */
    'vue/valid-v-on': 'error',
    /**
     * v-once 指令必须合法
     */
    'vue/valid-v-once': 'error',
    /**
     * v-pre 指令必须合法
     */
    'vue/valid-v-pre': 'error',
    /**
     * v-show 指令必须合法
     */
    'vue/valid-v-show': 'error',
    /**
     * v-slot 指令必须合法
     */
    'vue/valid-v-slot': 'error',
    /**
     * v-text 指令必须合法
     */
    'vue/valid-v-text': 'error',
  },
};
```

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: require('./overrides.js'),
  rules: {
    'react/sort-comp': 'off',

    /**
     * 重载的函数必须写在一起
     * @reason 增加可读性
     */
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    /**
     * 限制数组类型必须使用 Array<T> 或 T[]
     * @reason 允许灵活运用两者
     */
    '@typescript-eslint/array-type': 'off',
    /**
     * 禁止对没有 then 方法的对象使用 await
     */
    '@typescript-eslint/await-thenable': 'off',
    /**
     * 禁止使用 // @ts-ignore // @ts-nocheck // @ts-check
     * @reason 这种注释本身就是对特殊代码的说明
     */
    '@typescript-eslint/ban-ts-comment': 'off',
    /**
     * 禁止使用类似 tslint:disable-next-line 这样的注释
     */
    '@typescript-eslint/ban-tslint-comment': 'off',
    /**
     * 禁止使用指定的类型
     */
    '@typescript-eslint/ban-types': 'off',
    /**
     * 类的只读属性若是一个字面量，则必须使用只读属性而不是 getter
     */
    '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
    /**
     * 必须使用内置的 Record<K, T> 来描述仅包含可索引成员的接口
     */
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    /**
     * 类型断言必须使用 as Type，禁止使用 <Type>，禁止对对象字面量进行类型断言（断言成 any 是允许的）
     * @reason <Type> 容易被理解为 jsx
     */
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],
    /**
     * 优先使用 interface 而不是 type
     * @reason interface 可以 implement, extend 和 merge
     */
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    /**
     * 一致的类型导出语法
     */
    '@typescript-eslint/consistent-type-exports': 'off',
    /**
     * 必须使用 import type 导入类型
     */
    '@typescript-eslint/consistent-type-imports': 'off',
    /**
     * 有默认值或可选的参数必须放到最后
     */
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'off',
    /**
     * 禁止使用 foo['bar']，必须写成 foo.bar
     * @reason 当需要写一系列属性的时候，可以更统一
     */
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': 'off',
    /**
     * 函数返回值必须与声明的类型一致
     * @reason 返回值类型可以推导出来
     */
    '@typescript-eslint/explicit-function-return-type': 'off',
    /**
     * 必须设置类的成员的可访问性
     * @reason 将不需要公开的成员设为私有的，可以增强代码的可理解性，对文档输出也很友好
     */
    '@typescript-eslint/explicit-member-accessibility': 'error',
    /**
     * 导出的函数或类中的 public 方法必须定义输入输出参数的类型
     */
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    /**
     * 变量必须在定义的时候赋值
     */
    'init-declarations': 'off',
    '@typescript-eslint/init-declarations': 'off',
    /**
     * 类的成员之间是否需要空行
     * @reason 有时为了紧凑需要挨在一起，有时为了可读性需要空一行
     */
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    /**
     * 指定类成员的排序规则
     * @reason 优先级：
     * 1. static > instance
     * 2. field > constructor > method
     * 3. public > protected > private
     */
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'static-field',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'static-method',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-field',
          'protected-field',
          'private-field',
          'instance-field',
          'field',
          'constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'public-method',
          'protected-method',
          'private-method',
          'instance-method',
          'method',
        ],
      },
    ],
    /**
     * 接口中的方法必须用属性的方式定义
     * @reason 配置了 strictFunctionTypes 之后，用属性的方式定义方法可以获得更严格的检查
     */
    '@typescript-eslint/method-signature-style': 'error',
    /**
     * 限制各种变量或类型的命名规则
     */
    '@typescript-eslint/naming-convention': 'off',
    /**
     * 禁止使用 Array 构造函数
     */
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'off',
    /**
     * 禁止滥用 toString 方法
     */
    '@typescript-eslint/no-base-to-string': 'off',
    /**
     * 禁止使用容易混淆的非空断言
     */
    '@typescript-eslint/no-confusing-non-null-assertion': 'off',
    /**
     * 禁止使用返回值为 void 的函数的返回值
     */
    '@typescript-eslint/no-confusing-void-expression': 'off',
    /**
     * 禁止重复定义类的成员
     * @reason 编译阶段就会报错了
     */
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'off',
    /**
     * 禁止重复导入模块
     */
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': 'error',
    /**
     * 禁止 delete 时传入的 key 是动态的
     */
    '@typescript-eslint/no-dynamic-delete': 'off',
    /**
     * 不允许有空函数
     * @reason 有时需要将一个空函数设置为某个项的默认值
     */
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    /**
     * 禁止定义空的接口
     */
    '@typescript-eslint/no-empty-interface': 'error',
    /**
     * 禁止使用 any
     */
    '@typescript-eslint/no-explicit-any': 'off',
    /**
     * 禁止多余的 non-null 断言
     */
    '@typescript-eslint/no-extra-non-null-assertion': 'off',
    /**
     * 禁止定义没必要的类，比如只有静态方法的类
     */
    '@typescript-eslint/no-extraneous-class': 'off',
    /**
     * 禁止调用 Promise 时没有处理异常情况
     */
    '@typescript-eslint/no-floating-promises': 'off',
    /**
     * 禁止对 array 使用 for in 循环
     */
    '@typescript-eslint/no-for-in-array': 'off',
    /**
     * 禁止使用 eval
     */
    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    /**
     * 禁止给一个初始化时直接赋值为 number, string 的变量显式的声明类型
     * @reason 可以简化代码
     */
    '@typescript-eslint/no-inferrable-types': 'error',
    /**
     * 禁止在类之外的地方使用 this
     * @reason 只允许在 class 中使用 this
     */
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': 'error',
    /**
     * 禁止使用无意义的 void 类型
     * @reason void 只能用在函数的返回值中
     */
    '@typescript-eslint/no-invalid-void-type': 'error',
    /**
     * 禁止在循环内的函数内部出现循环体条件语句中定义的变量
     * @reason 使用 let 就已经解决了这个问题了
     */
    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': 'off',
    /**
     * 禁止使用超出 js 精度范围的数字
     */
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',
    /**
     * 禁止使用 magic numbers
     */
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    /**
     * 禁止 void 抛出空
     */
    '@typescript-eslint/no-meaningless-void-operator': 'off',
    /**
     * 禁止在接口中定义 constructor，或在类中定义 new
     */
    '@typescript-eslint/no-misused-new': 'off',
    /**
     * 避免错误的使用 Promise
     */
    '@typescript-eslint/no-misused-promises': 'off',
    /**
     * 禁止使用 namespace 来定义命名空间
     * @reason 使用 es6 引入模块，才是更标准的方式。
     * 但是允许使用 declare namespace ... {} 来定义外部命名空间
     */
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: true,
        allowDefinitionFiles: true,
      },
    ],
    /**
     * 禁止非空断言后面跟着双问号
     */
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    /**
     * 禁止在 optional chaining 之后使用 non-null 断言（感叹号）
     * @reason optional chaining 后面的属性一定是非空的
     */
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    /**
     * 禁止使用 non-null 断言（感叹号）
     * @reason 使用 non-null 断言时就已经清楚了风险
     */
    '@typescript-eslint/no-non-null-assertion': 'off',
    /**
     * 禁止给类的构造函数的参数添加修饰符
     * @reason 强制所有属性都定义到类里面，比较统一
     */
    '@typescript-eslint/no-parameter-properties': 'error',
    /**
     * 禁止重复定义变量
     * @reason 禁用 var 之后，编译阶段就会报错了
     */
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    /**
     * 禁止使用 require
     * @reason 统一使用 import 来引入模块，特殊情况使用单行注释允许 require 引入
     */
    '@typescript-eslint/no-require-imports': 'error',
    /**
     * 禁止导入指定的模块
     */
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-restricted-imports': 'off',
    /**
     * 禁止变量名与上层作用域内的已定义的变量重复
     * @reason 很多时候函数的形参和传参是同名的
     */
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    /**
     * 禁止将 this 赋值给其他变量，除非是解构赋值
     */
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
      },
    ],
    /**
     * 禁止 throw 字面量，必须 throw 一个 Error 对象
     */
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    /**
     * 禁止使用类型别名
     */
    '@typescript-eslint/no-type-alias': 'off',
    /**
     * 测试表达式中的布尔类型禁止与 true 或 false 直接比较
     */
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
    /**
     * 条件表达式禁止是永远为真（或永远为假）的
     */
    '@typescript-eslint/no-unnecessary-condition': 'off',
    /**
     * 在命名空间中，可以直接使用内部变量，不需要添加命名空间前缀
     */
    '@typescript-eslint/no-unnecessary-qualifier': 'off',
    /**
     * 禁止范型的类型有默认值时，将范型设置为该默认值
     */
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    /**
     * 禁止无用的类型断言
     */
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    /**
     * 禁止没用的类型限制
     */
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    /**
     * 禁止将 any 类型的变量作为函数参数调用
     */
    '@typescript-eslint/no-unsafe-argument': 'off',
    /**
     * 禁止将变量或属性的类型设置为 any
     */
    '@typescript-eslint/no-unsafe-assignment': 'off',
    /**
     * 禁止调用 any 类型的变量上的方法
     */
    '@typescript-eslint/no-unsafe-call': 'off',
    /**
     * 禁止获取 any 类型的变量中的属性
     */
    '@typescript-eslint/no-unsafe-member-access': 'off',
    /**
     * 禁止函数的返回值的类型是 any
     */
    '@typescript-eslint/no-unsafe-return': 'off',
    /**
     * 禁止无用的表达式
     */
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    /**
     * 已定义的变量必须使用
     */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    /**
     * 禁止在定义变量之前就使用它
     * @reason 编译阶段检查就足够了
     */
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    /**
     * 禁止出现没必要的 constructor
     */
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    /**
     * 禁止使用 require 来引入模块
     * @reason no-require-imports 规则已经约束了 require
     */
    '@typescript-eslint/no-var-requires': 'off',
    /**
     * 必须使用 ! 而不是 as
     */
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    /**
     * 限制语句之间的空行规则，比如变量定义完之后必须要空行
     */
    'padding-line-between-statements': 'off',
    '@typescript-eslint/padding-line-between-statements': 'off',
    /**
     * 使用 as const 替代 as 'bar'
     * @reason as const 是新语法，不是很常见
     */
    '@typescript-eslint/prefer-as-const': 'off',
    /**
     * 枚举值必须初始化
     */
    '@typescript-eslint/prefer-enum-initializers': 'off',
    /**
     * 使用 for 循环遍历数组时，如果索引仅用于获取成员，则必须使用 for of 循环替代 for 循环
     * @reason for of 循环更加易读
     */
    '@typescript-eslint/prefer-for-of': 'error',
    /**
     * 使用函数类型别名替代包含函数调用声明的接口
     */
    '@typescript-eslint/prefer-function-type': 'error',
    /**
     * 使用 includes 而不是 indexOf
     */
    '@typescript-eslint/prefer-includes': 'off',
    /**
     * 枚举类型的值必须是字面量，禁止是计算值
     * @reason 编译阶段检查就足够了
     */
    '@typescript-eslint/prefer-literal-enum-member': 'off',
    /**
     * 禁止使用 module 来定义命名空间
     * @reason module 已成为 js 的关键字
     */
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    /**
     * 使用 ?? 替代 ||
     */
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    /**
     * 使用 optional chaining 替代 &&
     */
    '@typescript-eslint/prefer-optional-chain': 'error',
    /**
     * 私有变量如果没有在构造函数外被赋值，则必须设为 readonly
     */
    '@typescript-eslint/prefer-readonly': 'off',
    /**
     * 函数的参数必须设置为 readonly
     */
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    /**
     * 使用 reduce 方法时，必须传入范型，而不是对第二个参数使用 as
     */
    '@typescript-eslint/prefer-reduce-type-parameter': 'off',
    /**
     * 使用 RegExp#exec 而不是 String#match
     */
    '@typescript-eslint/prefer-regexp-exec': 'off',
    /**
     * 类的方法返回值是 this 时，类型必须设置为 this
     */
    '@typescript-eslint/prefer-return-this-type': 'off',
    /**
     * 使用 String#startsWith 而不是其他方式
     */
    '@typescript-eslint/prefer-string-starts-ends-with': 'off',
    /**
     * 当需要忽略下一行的 ts 错误时，必须使用 @ts-expect-error 而不是 @ts-ignore
     * @reason 使用 @ts-expect-error 可以避免对不会报错的代码设置了 @ts-ignore
     */
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    /**
     * async 函数的返回值必须是 Promise
     */
    '@typescript-eslint/promise-function-async': 'off',
    /**
     * 使用 sort 时必须传入比较函数
     */
    '@typescript-eslint/require-array-sort-compare': 'off',
    /**
     * async 函数中必须存在 await 语句
     */
    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',
    /**
     * 使用加号时，两者必须同为数字或同为字符串
     */
    '@typescript-eslint/restrict-plus-operands': 'off',
    /**
     * 模版字符串中的变量类型必须是字符串
     */
    '@typescript-eslint/restrict-template-expressions': 'off',
    /**
     * 禁止在 return 语句里使用 await
     */
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'off',
    /**
     * 联合类型和交叉类型的每一项必须按字母排序
     */
    '@typescript-eslint/sort-type-union-intersection-members': 'off',
    /**
     * 条件判断必须传入布尔值
     */
    '@typescript-eslint/strict-boolean-expressions': 'off',
    /**
     * 使用联合类型作为 switch 的对象时，必须包含每一个类型的 case
     */
    '@typescript-eslint/switch-exhaustiveness-check': 'off',
    /**
     * 禁止使用三斜杠导入文件
     * @reason 三斜杠是已废弃的语法，但在类型声明文件中还是可以使用的
     */
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'always',
        lib: 'always',
      },
    ],
    /**
     * interface 和 type 定义时必须声明成员的类型
     */
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: false,
        objectDestructuring: false,
        parameter: false,
        propertyDeclaration: true,
        variableDeclaration: false,
      },
    ],
    /**
     * 方法调用时需要绑定到正确的 this 上
     */
    '@typescript-eslint/unbound-method': 'off',
    /**
     * 函数重载时，若能通过联合类型将两个函数的类型声明合为一个，则使用联合类型而不是两个函数声明
     */
    '@typescript-eslint/unified-signatures': 'error',
  },
};
```

```javascript
// module.exports = require('./lib/base.js')

module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2019,
    // ECMAScript modules 模式
    sourceType: 'module',
    ecmaFeatures: {
      // 不允许 return 语句出现在 global 环境下
      globalReturn: false,
      // 开启全局 script 模式
      impliedStrict: true,
      jsx: true,
    },
    // 即使没有 babelrc 配置文件，也使用 @babel/eslint-parser 来解析
    requireConfigFile: false,
    // 仅允许 import export 语句出现在模块的顶层
    allowImportExportEverywhere: false,
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  // 以当前目录为根目录，不再向上查找 .eslintrc.js
  root: true,
  rules: {
    /**
     * setter 必须有对应的 getter，getter 可以没有对应的 setter
     */
    'accessor-pairs': [
      'error',
      {
        setWithoutGet: true,
        getWithoutSet: false,
      },
    ],
    /**
     * 数组的方法除了 forEach 之外，回调函数必须有返回值
     */
    'array-callback-return': 'error',
    /**
     * 箭头函数体必须由大括号包裹
     * @reason 代码格式问题，最好由 Prettier 解决
     */
    'arrow-body-style': 'off',
    /**
     * 将 var 定义的变量视为块作用域，禁止在块外使用
     * @reason 已经禁止使用 var 了
     */
    'block-scoped-var': 'off',
    /**
     * 变量名必须是 camelCase 风格的
     * @reason 很多 api 或文件名都不是 camelCase 风格的
     */
    camelcase: 'off',
    /**
     * 注释的首字母必须大写
     */
    'capitalized-comments': 'off',
    /**
     * 在类的非静态方法中，必须存在对 this 的引用
     */
    'class-methods-use-this': 'off',
    /**
     * 禁止函数的循环复杂度超过 20
     * @reason https://en.wikipedia.org/wiki/Cyclomatic_complexity
     */
    complexity: [
      'error',
      {
        max: 20,
      },
    ],
    /**
     * 禁止函数在不同分支返回不同类型的值
     * @reason 缺少 TypeScript 的支持，类型判断是不准确的
     */
    'consistent-return': 'off',
    /**
     * 限制 this 的别名
     */
    'consistent-this': 'off',
    /**
     * constructor 中必须有 super
     */
    'constructor-super': 'error',
    /**
     * switch 语句必须有 default
     */
    'default-case': 'off',
    /**
     * switch 语句中的 default 必须在最后
     */
    'default-case-last': 'error',
    /**
     * 有默认值的参数必须放在函数参数的末尾
     */
    'default-param-last': 'off',
    /**
     * 禁止使用 foo['bar']，必须写成 foo.bar
     * @reason 当需要写一系列属性的时候，可以更统一
     */
    'dot-notation': 'off',
    /**
     * 必须使用 === 或 !==，禁止使用 == 或 !=
     */
    eqeqeq: ['error', 'always'],
    /**
     * 禁止方向错误的 for 循环
     */
    'for-direction': 'error',
    /**
     * 函数赋值给变量的时候，函数名必须与变量名一致
     */
    'func-name-matching': [
      'error',
      'always',
      {
        includeCommonJSModuleExports: false,
      },
    ],
    /**
     * 函数必须有名字
     */
    'func-names': 'off',
    /**
     * 必须只使用函数声明或只使用函数表达式
     */
    'func-style': 'off',
    /**
     * getter 必须有返回值，并且禁止返回空
     */
    'getter-return': 'error',
    /**
     * setter 和 getter 必须写在一起
     */
    'grouped-accessor-pairs': 'error',
    /**
     * for in 内部必须有 hasOwnProperty
     */
    'guard-for-in': 'error',
    /**
     * 禁止使用指定的标识符
     */
    'id-denylist': 'off',
    /**
     * 限制变量名长度
     */
    'id-length': 'off',
    /**
     * 限制变量名必须匹配指定的正则表达式
     */
    'id-match': 'off',
    /**
     * 变量必须在定义的时候赋值
     */
    'init-declarations': 'off',
    /**
     * 单行注释必须写在上一行
     */
    'line-comment-position': 'off',
    /**
     * 类的成员之间是否需要空行
     * @reason 有时为了紧凑需要挨在一起，有时为了可读性需要空一行
     */
    'lines-between-class-members': 'off',
    /**
     * 限制一个文件中类的数量
     */
    'max-classes-per-file': 'off',
    /**
     * 代码块嵌套的深度禁止超过 5 层
     */
    'max-depth': ['error', 5],
    /**
     * 限制一个文件最多的行数
     */
    'max-lines': 'off',
    /**
     * 限制函数块中的代码行数
     */
    'max-lines-per-function': 'off',
    /**
     * 回调函数嵌套禁止超过 3 层，多了请用 async await 替代
     */
    'max-nested-callbacks': ['error', 3],
    /**
     * 函数的参数禁止超过 3 个
     */
    'max-params': ['error', 3],
    /**
     * 限制函数块中的语句数量
     */
    'max-statements': 'off',
    /**
     * 限制一行中的语句数量
     */
    'max-statements-per-line': 'off',
    /**
     * 约束多行注释的格式
     * @reason 能写注释已经不容易了，不需要限制太多
     */
    'multiline-comment-style': 'off',
    /**
     * new 后面的类名必须首字母大写
     */
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: false,
        properties: true,
      },
    ],
    /**
     * 禁止使用 alert
     */
    'no-alert': 'off',
    /**
     * 禁止使用 Array 构造函数时传入的参数超过一个
     * @reason 参数为一个时表示创建一个指定长度的数组，比较常用
     * 参数为多个时表示创建一个指定内容的数组，此时可以用数组字面量实现，不必使用构造函数
     */
    'no-array-constructor': 'error',
    /**
     * 禁止将 async 函数做为 new Promise 的回调函数
     * @reason 出现这种情况时，一般不需要使用 new Promise 实现异步了
     */
    'no-async-promise-executor': 'error',
    /**
     * 禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了
     * @reason 要求太严格了，有时需要在循环中写 await
     */
    'no-await-in-loop': 'off',
    /**
     * 禁止使用位运算
     */
    'no-bitwise': 'off',
    /**
     * 禁止使用 caller 或 callee
     * @reason 它们是已废弃的语法
     */
    'no-caller': 'error',
    /**
     * switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
     */
    'no-case-declarations': 'error',
    /**
     * 禁止对已定义的 class 重新赋值
     */
    'no-class-assign': 'error',
    /**
     * 禁止与负零进行比较
     */
    'no-compare-neg-zero': 'error',
    /**
     * 禁止在测试表达式中使用赋值语句，除非这个赋值语句被括号包起来了
     */
    'no-cond-assign': ['error', 'except-parens'],
    /**
     * 禁止使用 console
     */
    'no-console': 'off',
    /**
     * 禁止对使用 const 定义的常量重新赋值
     */
    'no-const-assign': 'error',
    /**
     * 禁止将常量作为分支条件判断中的测试表达式，但允许作为循环条件判断中的测试表达式
     */
    'no-constant-condition': [
      'error',
      {
        checkLoops: false,
      },
    ],
    /**
     * 禁止在构造函数中返回值
     */
    'no-constructor-return': 'error',
    /**
     * 禁止使用 continue
     */
    'no-continue': 'off',
    /**
     * 禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\x1f/
     * @reason 几乎不会遇到这种场景
     */
    'no-control-regex': 'off',
    /**
     * 禁止使用 debugger
     */
    'no-debugger': 'error',
    /**
     * 禁止对一个变量使用 delete
     * @reason 编译阶段就会报错了
     */
    'no-delete-var': 'off',
    /**
     * 禁止在正则表达式中出现形似除法操作符的开头，如 let a = /=foo/
     * @reason 有代码高亮的话，在阅读这种代码时，也完全不会产生歧义或理解上的困难
     */
    'no-div-regex': 'off',
    /**
     * 禁止在函数参数中出现重复名称的参数
     * @reason 编译阶段就会报错了
     */
    'no-dupe-args': 'off',
    /**
     * 禁止重复定义类的成员
     */
    'no-dupe-class-members': 'error',
    /**
     * 禁止 if else 的条件判断中出现重复的条件
     */
    'no-dupe-else-if': 'error',
    /**
     * 禁止在对象字面量中出现重复的键名
     */
    'no-dupe-keys': 'error',
    /**
     * 禁止在 switch 语句中出现重复测试表达式的 case
     */
    'no-duplicate-case': 'error',
    /**
     * 禁止重复导入模块
     */
    'no-duplicate-imports': 'error',
    /**
     * 禁止在 else 内使用 return，必须改为提前结束
     * @reason else 中使用 return 可以使代码结构更清晰
     */
    'no-else-return': 'off',
    /**
     * 禁止出现空代码块，允许 catch 为空代码块
     */
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    /**
     * 禁止在正则表达式中使用空的字符集 []
     */
    'no-empty-character-class': 'error',
    /**
     * 不允许有空函数
     * @reason 有时需要将一个空函数设置为某个项的默认值
     */
    'no-empty-function': 'off',
    /**
     * 禁止解构赋值中出现空 {} 或 []
     */
    'no-empty-pattern': 'error',
    /**
     * 禁止使用 foo == null，必须使用 foo === null
     */
    'no-eq-null': 'error',
    /**
     * 禁止使用 eval
     */
    'no-eval': 'error',
    /**
     * 禁止将 catch 的第一个参数 error 重新赋值
     */
    'no-ex-assign': 'error',
    /**
     * 禁止修改原生对象
     * @reason 修改原生对象可能会与将来版本的 js 冲突
     */
    'no-extend-native': 'error',
    /**
     * 禁止出现没必要的 bind
     */
    'no-extra-bind': 'error',
    /**
     * 禁止不必要的布尔类型转换
     */
    'no-extra-boolean-cast': 'error',
    /**
     * 禁止出现没必要的 label
     * @reason 已经禁止使用 label 了
     */
    'no-extra-label': 'off',
    /**
     * switch 的 case 内必须有 break, return 或 throw，空的 case 除外
     */
    'no-fallthrough': 'error',
    /**
     * 禁止将一个函数声明重新赋值
     */
    'no-func-assign': 'error',
    /**
     * 禁止对全局变量赋值
     */
    'no-global-assign': 'error',
    /**
     * 禁止使用 ~+ 等难以理解的类型转换，仅允许使用 !!
     */
    'no-implicit-coercion': [
      'error',
      {
        allow: ['!!'],
      },
    ],
    /**
     * 禁止在全局作用域下定义变量或申明函数
     * @reason 模块化之后，不会出现这种在全局作用域下定义变量的情况
     */
    'no-implicit-globals': 'off',
    /**
     * 禁止在 setTimeout 或 setInterval 中传入字符串
     */
    'no-implied-eval': 'error',
    /**
     * 禁止对导入的模块进行赋值
     */
    'no-import-assign': 'error',
    /**
     * 禁止在代码后添加单行注释
     */
    'no-inline-comments': 'off',
    /**
     * 禁止在 if 代码块内出现函数声明
     */
    'no-inner-declarations': ['error', 'both'],
    /**
     * 禁止在 RegExp 构造函数中出现非法的正则表达式
     */
    'no-invalid-regexp': 'error',
    /**
     * 禁止在类之外的地方使用 this
     * @reason 只允许在 class 中使用 this
     */
    'no-invalid-this': 'error',
    /**
     * 禁止使用特殊空白符（比如全角空格），除非是出现在字符串、正则表达式或模版字符串中
     */
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: true,
        skipTemplates: true,
      },
    ],
    /**
     * 禁止使用 __iterator__
     * @reason __iterator__ 是一个已废弃的属性
     * 使用 [Symbol.iterator] 替代它
     */
    'no-iterator': 'error',
    /**
     * 禁止 label 名称与已定义的变量重复
     * @reason 已经禁止使用 label 了
     */
    'no-label-var': 'off',
    /**
     * 禁止使用 label
     */
    'no-labels': 'error',
    /**
     * 禁止使用没必要的 {} 作为代码块
     */
    'no-lone-blocks': 'error',
    /**
     * 禁止 else 中只有一个单独的 if
     * @reason 单独的 if 可以把逻辑表达的更清楚
     */
    'no-lonely-if': 'off',
    /**
     * 禁止在循环内的函数内部出现循环体条件语句中定义的变量
     * @reason 使用 let 就已经解决了这个问题了
     */
    'no-loop-func': 'off',
    /**
     * 禁止使用超出 js 精度范围的数字
     */
    'no-loss-of-precision': 'error',
    /**
     * 禁止使用 magic numbers
     */
    'no-magic-numbers': 'off',
    /**
     * 禁止正则表达式中使用肉眼无法区分的特殊字符
     * @reason 某些特殊字符很难看出差异，最好不要在正则中使用
     */
    'no-misleading-character-class': 'error',
    /**
     * 禁止连续赋值，比如 foo = bar = 1
     */
    'no-multi-assign': 'off',
    /**
     * 禁止使用 \ 来换行字符串
     */
    'no-multi-str': 'error',
    /**
     * 禁止 if 里有否定的表达式
     * @reason 否定的表达式可以把逻辑表达的更清楚
     */
    'no-negated-condition': 'off',
    /**
     * 禁止使用嵌套的三元表达式，比如 a ? b : c ? d : e
     */
    'no-nested-ternary': 'off',
    /**
     * 禁止直接 new 一个类而不赋值
     * @reason new 应该作为创建一个类的实例的方法，所以不能不赋值
     */
    'no-new': 'error',
    /**
     * 禁止使用 new Function
     * @reason 这和 eval 是等价的
     */
    'no-new-func': 'error',
    /**
     * 禁止直接 new Object
     */
    'no-new-object': 'error',
    /**
     * 禁止使用 new 来生成 Symbol
     */
    'no-new-symbol': 'error',
    /**
     * 禁止使用 new 来生成 String, Number 或 Boolean
     */
    'no-new-wrappers': 'error',
    /**
     * 禁止在字符串中使用 \8 \9
     * @reason 代码格式问题，最好由 Prettier 解决
     */
    'no-nonoctal-decimal-escape': 'off',
    /**
     * 禁止将 Math, JSON 或 Reflect 直接作为函数调用
     */
    'no-obj-calls': 'error',
    /**
     * 禁止使用 0 开头的数字表示八进制数
     * @reason 编译阶段就会报错了
     */
    'no-octal': 'off',
    /**
     * 禁止使用八进制的转义符
     * @reason 编译阶段就会报错了
     */
    'no-octal-escape': 'off',
    /**
     * 禁止对函数的参数重新赋值
     */
    'no-param-reassign': 'error',
    /**
     * 禁止使用 ++ 或 --
     */
    'no-plusplus': 'off',
    /**
     * 禁止在 Promise 的回调函数中直接 return
     */
    'no-promise-executor-return': 'error',
    /**
     * 禁止使用 __proto__
     * @reason __proto__ 是已废弃的语法
     */
    'no-proto': 'error',
    /**
     * 禁止使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable
     * @reason hasOwnProperty 比较常用
     */
    'no-prototype-builtins': 'off',
    /**
     * 禁止重复定义变量
     * @reason 禁用 var 之后，编译阶段就会报错了
     */
    'no-redeclare': 'off',
    /**
     * 禁止在正则表达式中出现连续的空格
     */
    'no-regex-spaces': 'error',
    /**
     * 禁止导出指定的变量名
     */
    'no-restricted-exports': 'off',
    /**
     * 禁止使用指定的全局变量
     */
    'no-restricted-globals': 'off',
    /**
     * 禁止导入指定的模块
     */
    'no-restricted-imports': 'off',
    /**
     * 禁止使用指定的对象属性
     */
    'no-restricted-properties': 'off',
    /**
     * 禁止使用指定的语法
     */
    'no-restricted-syntax': 'off',
    /**
     * 禁止在 return 语句里赋值
     */
    'no-return-assign': ['error', 'always'],
    /**
     * 禁止在 return 语句里使用 await
     */
    'no-return-await': 'off',
    /**
     * 禁止出现 location.href = 'javascript:void(0)';
     * @reason 有些场景下还是需要用到这个
     */
    'no-script-url': 'off',
    /**
     * 禁止将自己赋值给自己
     */
    'no-self-assign': 'error',
    /**
     * 禁止将自己与自己比较
     */
    'no-self-compare': 'error',
    /**
     * 禁止使用逗号操作符
     */
    'no-sequences': 'error',
    /**
     * 禁止 setter 有返回值
     */
    'no-setter-return': 'error',
    /**
     * 禁止变量名与上层作用域内的已定义的变量重复
     * @reason 很多时候函数的形参和传参是同名的
     */
    'no-shadow': 'off',
    /**
     * 禁止使用保留字作为变量名
     */
    'no-shadow-restricted-names': 'error',
    /**
     * 禁止在数组中出现连续的逗号
     */
    'no-sparse-arrays': 'error',
    /**
     * 禁止在普通字符串中出现模版字符串里的变量形式
     */
    'no-template-curly-in-string': 'error',
    /**
     * 禁止使用三元表达式
     */
    'no-ternary': 'off',
    /**
     * 禁止在 super 被调用之前使用 this 或 super
     */
    'no-this-before-super': 'error',
    /**
     * 禁止 throw 字面量，必须 throw 一个 Error 对象
     */
    'no-throw-literal': 'error',
    /**
     * 禁止使用未定义的变量
     */
    'no-undef': 'off',
    /**
     * 禁止将 undefined 赋值给变量
     */
    'no-undef-init': 'error',
    /**
     * 禁止使用 undefined
     */
    'no-undefined': 'off',
    /**
     * 禁止变量名出现下划线
     */
    'no-underscore-dangle': 'off',
    /**
     * 循环内必须对循环条件中的变量有修改
     */
    'no-unmodified-loop-condition': 'error',
    /**
     * 必须使用 !a 替代 a ? false : true
     * @reason 后者表达的更清晰
     */
    'no-unneeded-ternary': 'off',
    /**
     * 禁止在 return, throw, break 或 continue 之后还有代码
     */
    'no-unreachable': 'error',
    /**
     * 禁止在第一轮循环时就一定会退出循环的情况出现
     */
    'no-unreachable-loop': 'error',
    /**
     * 禁止在 finally 中出现 return, throw, break 或 continue
     * @reason finally 中的语句会在 try 之前执行
     */
    'no-unsafe-finally': 'error',
    /**
     * 禁止在 in 或 instanceof 操作符的左侧变量前使用感叹号
     */
    'no-unsafe-negation': 'error',
    /**
     * 禁止使用不安全的 optional chaining
     */
    'no-unsafe-optional-chaining': 'error',
    /**
     * 禁止无用的表达式
     */
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    /**
     * 禁止出现没用到的 label
     * @reason 已经禁止使用 label 了
     */
    'no-unused-labels': 'off',
    /**
     * 已定义的变量必须使用
     */
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
        caughtErrors: 'none',
      },
    ],
    /**
     * 变量必须先定义后使用
     */
    'no-use-before-define': [
      'error',
      {
        variables: false,
        functions: false,
        classes: false,
      },
    ],
    /**
     * 禁止正则表达式中出现无用的回溯引用
     * @reason 某些回溯引用语法上没问题，但是会永远匹配到空字符串
     */
    'no-useless-backreference': 'error',
    /**
     * 禁止出现没必要的 call 或 apply
     */
    'no-useless-call': 'error',
    /**
     * 禁止在 catch 中仅仅只是把错误 throw 出去
     * @reason 这样的 catch 是没有意义的，等价于直接执行 try 里的代码
     */
    'no-useless-catch': 'error',
    /**
     * 禁止出现没必要的计算键名
     */
    'no-useless-computed-key': 'error',
    /**
     * 禁止出现没必要的字符串连接
     */
    'no-useless-concat': 'error',
    /**
     * 禁止出现没必要的 constructor
     */
    'no-useless-constructor': 'error',
    /**
     * 禁止出现没必要的转义
     * @reason 转义可以使代码更易懂
     */
    'no-useless-escape': 'off',
    /**
     * 禁止解构赋值时出现同样名字的的重命名，比如 let { foo: foo } = bar;
     */
    'no-useless-rename': 'error',
    /**
     * 禁止没必要的 return
     */
    'no-useless-return': 'off',
    /**
     * 禁止使用 var
     */
    'no-var': 'error',
    /**
     * 禁止使用 void
     */
    'no-void': 'error',
    /**
     * 禁止注释中出现 TODO 和 FIXME
     */
    'no-warning-comments': 'off',
    /**
     * 禁止使用 with
     * @reason 编译阶段就会报错了
     */
    'no-with': 'off',
    /**
     * 必须使用 a = {b} 而不是 a = {b: b}
     * @reason 有时后者可以使代码结构更清晰
     */
    'object-shorthand': 'off',
    /**
     * 禁止变量申明时用逗号一次申明多个
     */
    'one-var': ['error', 'never'],
    /**
     * 必须使用 x = x + y 而不是 x += y
     */
    'operator-assignment': 'off',
    /**
     * 限制语句之间的空行规则，比如变量定义完之后必须要空行
     */
    'padding-line-between-statements': 'off',
    /**
     * 回调函数必须使用箭头函数
     */
    'prefer-arrow-callback': 'error',
    /**
     * 申明后不再被修改的变量必须使用 const 来申明
     */
    'prefer-const': 'off',
    /**
     * 必须使用解构赋值
     */
    'prefer-destructuring': 'off',
    /**
     * 使用 ES2016 的语法 ** 替代 Math.pow
     */
    'prefer-exponentiation-operator': 'off',
    /**
     * 使用 ES2018 中的正则表达式命名组
     * @reason 正则表达式已经较难理解了，没必要强制加上命名组
     */
    'prefer-named-capture-group': 'off',
    /**
     * 必须使用 0b11111011 而不是 parseInt()
     */
    'prefer-numeric-literals': 'off',
    /**
     * 必须使用 ... 而不是 Object.assign，除非 Object.assign 的第一个参数是一个变量
     */
    'prefer-object-spread': 'error',
    /**
     * Promise 的 reject 中必须传入 Error 对象，而不是字面量
     */
    'prefer-promise-reject-errors': 'error',
    /**
     * 优先使用正则表达式字面量，而不是 RegExp 构造函数
     */
    'prefer-regex-literals': 'error',
    /**
     * 必须使用 ...args 而不是 arguments
     */
    'prefer-rest-params': 'off',
    /**
     * 必须使用 ... 而不是 apply，比如 foo(...args)
     */
    'prefer-spread': 'off',
    /**
     * 必须使用模版字符串而不是字符串连接
     */
    'prefer-template': 'off',
    /**
     * parseInt 必须传入第二个参数
     */
    radix: 'error',
    /**
     * 禁止将 await 或 yield 的结果做为运算符的后面项
     * @reason 这样会导致不符合预期的结果
     * https://github.com/eslint/eslint/issues/11899
     * 在上面 issue 修复之前，关闭此规则
     */
    'require-atomic-updates': 'off',
    /**
     * async 函数中必须存在 await 语句
     */
    'require-await': 'off',
    /**
     * 正则表达式中必须要加上 u 标志
     */
    'require-unicode-regexp': 'off',
    /**
     * generator 函数内必须有 yield
     */
    'require-yield': 'error',
    /**
     * 导入必须按规则排序
     */
    'sort-imports': 'off',
    /**
     * 对象字面量的键名必须排好序
     */
    'sort-keys': 'off',
    /**
     * 变量申明必须排好序
     */
    'sort-vars': 'off',
    /**
     * 注释的斜线或 * 后必须有空格
     */
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
        block: {
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    /**
     * 禁止使用 'strict';
     */
    strict: ['error', 'never'],
    /**
     * 创建 Symbol 时必须传入参数
     */
    'symbol-description': 'error',
    /**
     * 必须使用 isNaN(foo) 而不是 foo === NaN
     */
    'use-isnan': 'error',
    /**
     * typeof 表达式比较的对象必须是 'undefined', 'object', 'boolean', 'number', 'string', 'function', 'symbol', 或 'bigint'
     */
    'valid-typeof': 'error',
    /**
     * var 必须在作用域的最前面
     */
    'vars-on-top': 'off',
    /**
     * 必须使用 if (foo === 5) 而不是 if (5 === foo)
     */
    yoda: [
      'error',
      'never',
      {
        onlyEquality: true,
      },
    ],
  },
};
```

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

### 配置 Prettier

> eslint 应主要负责校验语法校验，prettier 应主要负责代码格式化

#### 添加依赖

查看 [Prettier 文档](https://prettier.io/docs/en/install)，根据安装命令，添加依赖`yarn add prettier -D`

#### 创建文件，配置规则

运行命令，添加文件`node --eval "fs.writeFileSync('.prettierrc.cjs','{}\n')"`，.js 文件可能会报错，所以最好还是使用 .cjs。

<details>
  <summary>Prettier </summary>
  <pre><code>module.exports = {
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
};</code></pre></details>

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

#### 在 ESLint 中加入 Prettier

在 ESLint 校验中加入 Prettier 格式化配合使用，安装依赖
`yarn add eslint-config-prettier eslint-plugin-prettier -D`
修改`.eslintrc.cjs`的设置

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

### 配置 Husky

> husky 是一个增强的 git hook 工具，可以在 git hook 的各个阶段执行我们在 package.json 中配置好的 npm script。

通过 Husky 在 Git Commit 时进行代码校验。

#### 安装依赖

`yarn add husky -D`

#### 添加脚本

在 package.json 中添加脚本 prepare 并运行。（husky install 前需要 git init）

```bash
npm pkg set scripts.prepare="husky install"
yarn prepare // husky - Git hooks installed
```

#### 添加 Git Hook

在项目根目录创建 .husky 文件夹，并执行命令添加 git hook 。
`npx husky add .husky/pre-commit "npm run lint"`

#### 验证

把 eslintrc.cjs 中 rules 的`'@typescript-eslint/no-unused-vars': 'warn'`注释，然后 git commit 一条信息，提交后会报错，说明 husky pre-commit hook 配置成功。

```bash
git commit -m 'init'

vue3-lints\src\App.vue
  3:7  error  'test' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```

### 配置 Lint-staged

> **lint-staged **的概念是在 git 中暂存的文件上运行已配置的 linter（或其他）任务。

每次提交都检测所有代码并不是一个好的决定，比如你只修改了文件 A 结果文件 B 报错了，但是文件 B 并不是你负责的模块，改还是不改？可以通过 lint-staged **只对暂存区的代码进行检验**。

#### 添加依赖

`yarn add lint-staged -D`

#### package.json 添加配置

```json
{
  "lint-staged": {
    "*.{ts,vue,tsx}": ["yarn lint", "prettier . --write"]
  }
}
```

避免与前面 husky pre-commit 操作重复，应该把`.husky/pre-commit`中替换`yarn lint`为 `npx lint-staged`。现在每次提交代码前都会对改动的文件进行 Lint 检查和 Prettier 格式化。

### 配置 Commitlint

> commitlint 帮助您的**团队遵守提交约定**。通过支持 npm 安装的配置，它使提交约定的共享变得容易。

```bash
git commit -m <type>(<scope>): <subject>
# type：提交的改动类型（如新增、修改、更新等）
# scope（可选）：标识此次提交主要涉及到代码中哪个模块
# subject：一句话描述此次提交的主要内容。
```

#### 添加依赖

查看 [commitlint 文档](https://commitlint.js.org/#/)，执行命令添加依赖`yarn add @commitlint/cli @commitlint/config-conventional -D`

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

或者执行官网上的命令创建`echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.cjs`。
官网上面的执行命令创建文件，有可能 eslint 时会报错，原因可能是用 echo 创建的文件有[编码格式问题](https://github.com/conventional-changelog/commitlint/issues/3256)。

```bash
yarn lint
...\vue3-lints\commitlint.config.cjs
  1:0  error  Parsing error: File appears to be binary
```

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

#### 添加 commitlint 命令到 husky 中

执行命令，添加 commitlint 语句到 husky hook 的 commit-msg 中。
`npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'`

## 常见问题

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
