# API

## React.Component

### setState(updater, callback)

* setState 用于更新组件的状态, 并导致组件及其子组件的重新渲染, 是响应用户事件和服务端返回然后更新用户界面的主要方式
* setState 对组件的更新是异步的, 所以在 setState 之后直接读取 this.state 是不可靠, 应该通过 callback 或 componentDidUpdate 来获取状态
* stateChange is shallowly merged with state

``` javascript
// updater 的函数签名
(state, props) => stateChange
```

### forceUpdate(callback)

* 默认情况下 props 或 state 的改变将导致组件更新,如果组件依赖于其他数据, 可以通过调用 forceUpdate 来重新渲染组件
* 调用 forceUpdate 后直接调用 render, 跳过 shouldComponentUpdate
  * 对于子组件生命周期仍然是正常的

### 实例属性

**props**

* 包含所有有调用者传入的属性
* props.children 包含调用者传入的所有 child tags

**state**

* state 是组件的状态数据, 是一个普通的 js 对象
* 如果数据不会再渲染或数据流中使用, 就不必定义为 state, 可以定义为组件实例的属性
* 不要直接修改 state, 总是使用 setState

### 类属性

**defaultProps**

* 定义组件的默认属性, 当属性是 undefined 时将使用 defaultProps 中的值
* defaultProps 只对 undefined 的属性生效, 如果属性值是 null 也不会使用 defaultProps

**生命周期**

http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

**Mounting**

组件实例化并插入 DOM
    * constructor
    * getDerivedStateFromProps
    * render
    * componentDidMount
  
**Updating**

改变 props, setState 或 forceUpdate 会导致组件更新
    * getDerivedStateFromProps
    * shouldComponentUpdate
    * render
    * getSnapshotBeforeUpdate
    * componentDidUpdate


**constructor(props)**

* constructor 中通常会做以下两件事, 否则就不需要定义 constructor
    * 初始化 this.state: 直接对 this.state 赋值, 不要调用 setState, 
    * 绑定 event handler: 为什么必须绑定
* 注意事项
    * constructor 中必须调用 super(props), 否则 this.props 就是 undefined
    * constructor 不应该有副作用
    * 不要将 props 赋值给 this.state
        * 这是不必要的, 应该直接使用 this.props
        * 这会导致 bug, props 的更新不会反映到 state 上
        * 只有将 props 作为初始化值, 才可以使用该形式

**render()**

* render 是 class component 中必须要有的方法
* render 在调用时检查 this.props 和 this.state 的值, 并返回下列值之一
    * react elements
    * arrays and fragments: arrays 是指 react elment 的数组
    * portals
    * string and numbers: 作为文本节点插入 dom
    * booleans 或 null: null 表示不渲染任何东西
        * booleans 也不渲染内容, 主要是为了支持 test && <div /> 这种形式
* render 应该是纯函数, 不修改组件的状态, 不直接与浏览器进行交互, 每次调用返回相同的结果(?)
* 如果 shouldComponentUpdate 返回 false,  render 将不会被调用

**componentDidMount()**

* 适合在该生命周期中做的事情
    * 依赖 DOM 的操作
    * 发起网络请求
    * 进行订阅
* 可以在该函数中调用 setState, 这会导致再次渲染, 但第二次渲染会在浏览器刷新之前完成, 不会造成闪烁
    * 可能会导致性能问题, 大多数情况可以通过在 constructor 中设置初试状态替代
    * 在 modal 或 tooltip 里根据 DOM 元素的尺寸或位置渲染内容时可能是必须在 componentDidMount 中进行 setState

**componentDidUpdate(prevProps, prevState, snapshot)**

* 适合在该生命周期做的事情
    * 在组件更新后操作 DOM
    * 比较当前 props 与先前的 props 然后决定是否发起网络请求
        * 在 componentDidUpdate 中 setState 必须是条件性的, 否则将导致无限循环
        * componentDidUpdate 中的 setState 也会导致用户不可见的二次渲染
* 初次渲染时不会调用该方法
* getSnapshotBeforeUpdate 的返回值作为第三个参数传入

**componentWillUnmount**

* 适合在该声明周期做的事情
    * 取消定时器
    * 取消网络请求
    * 清理订阅
* componentWillUnmount 中不能调用 setState 没有效果, 组件不会重新渲染
* 组件实例一旦被卸载, 将不能再次挂载

### 以下是不常用的生命周期

**shouldComponentUpdate(nextProps, nextState)**

* react 组件的默认行为是在每次 props 或 state 发生改变时进行更新, 通过  shouldComponentUpdate 可以控制在 props 或 state 发生变化时组件更新
* 注意事项
    * 初次渲染或调用 forUpdate 时该方法不会调用
    * 该方法返回 false 时将阻止当前组件的更新, 但不会阻止子组件的更新
        * 返回 false 之后不会再调用 UNSAFE_componentWillUpdate, render 和 componentDidUpdate 方法
    * 该方法主要用于性能优化, 考虑使用 PureComponent, 而不是手写 shouldComponentUpdate
    * 不推荐在 shouldComponentUpdate 中进行深比较或使用 JSON.stringify, 这些操作低效而影响性能

**static getDerivedStateFromProps(props, state)**

* 该方法在每次调用 render 方法之前调用, 返回值是 newState

**getSnaphotBeforeUpdate(prevProps, prevState)**

* 更新过程中该方法在 render 之后, componentDidUpdate 之前调用
