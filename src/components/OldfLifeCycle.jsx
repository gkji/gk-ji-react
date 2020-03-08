import React, { Component } from 'react'

const log = console.log

class SubCounter extends Component{
    constructor(props){
        super(props);
        this.state = {number:0};
        this.log = console.log
        this.log('sub constructor')
    }

    componentWillMount() {

        this.log('sub componentWillMount')
    }

    componentDidMount() {
        this.setState({ value: 'test' })
        this.log('sub componentDidMount')

    }
    

    //componentWillReceiveProp 组件收到新的属性对象
    componentWillReceiveProps(nextProps){
        this.log('sub componentWillReceiveProps', nextProps, this.props)
    }

    //调用此方法的时候会把新的属性对象和新的状态对象传过来
    shouldComponentUpdate(nextProps,nextState){
        this.log('sub shouldComponentUpdate');
        return true
    }

    componentWillUpdate (nextProps, nextState) {
      this.log('sub componentWillUpdate')

      // log('nn', nextProps, nextState)
      // if (nextProps.number === 1 && nextState.number === 0) {
      //   this.log('will update setSTate')
      //   this.setState({ number: 2})
      // }
    }

    componentDidUpdate () {
        this.log('sub componentDidUpdate')
        
    }

    render(){
        this.log('sub render')
        return(
            <div style={{border:'5px solid green'}}>
                <p>{this.props.number}</p>
            </div>
        )
    }

    componentWillUnmount(){
        this.log('sub componentWillUnmount');
    }
}

export default class LifeCycle extends Component {
    //// props = {age:10,name:'计数器'}
  static defaultProps = {
      name:'计数器'
  }
  constructor(props){
    super();
    //this.props = props;
    //初始化默认的状态对象
    this.state = { number:0, users:[] };
    this.log = console.log
    this.log('constructor');
  }  

  //componentWillMount在渲染过程中可能会执行多次
  componentWillMount(){
    this.log('componentWillMount');
  }

  //componentDidMount在渲染过程中永远只有执行一次
  componentDidMount(){
    this.log('componentDidMount');
    // this.setState(prevState => prevState.number ++)
  }

  componentWillReceiveProps(){
    this.log('componentWillReceiveProps')
  }

  shouldComponentUpdate(nextProps,nextState){
    this.log('shouldComponentUpdate', nextProps, nextState);
    if (nextState.number === 1) {
      return false
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState){

    this.log('componentWillUpdate');
  }

  componentDidUpdate(prevProps, prevState) {
    this.log('componentDidUpdate');
  }


  add = ()=>{
      this.setState(prevState => prevState.number ++);
  };
  render() {
    this.log('render')
    return (
      <div style={{border:'5px solid red',padding:'5px'}}>
        <p>{this.props.name}:{this.state.number}</p>
        <button onClick={this.add}>+</button>
        <ul>
            {
                this.state.users.map((user, index)=>(<li key={index}>{user.this.login}</li>))
            }
        </ul>
        {<SubCounter number={this.state.number}/>}
      </div>
    )
  };
};