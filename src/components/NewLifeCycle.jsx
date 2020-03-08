import React, { Component } from 'react'


class SubCounter extends Component{
    constructor(props){
        super(props);
        this.state = {number:0};
        this.log = console.log
        this.log('sub constructor')
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        console.log('sub getDerivedStateFromProps')
        return null
    }


    componentDidMount() {
        this.log('sub componentDidMount')
    }
    

    //调用此方法的时候会把新的属性对象和新的状态对象传过来
    shouldComponentUpdate(nextProps,nextState){
        this.log('sub shouldComponentUpdate');
        return true
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

  static getDerivedStateFromProps (nextProps, prevState) {
    console.log('getDerivedStateFromProps')
    return null
}

  //componentDidMount在渲染过程中永远只有执行一次
  componentDidMount(){
    this.setState({ number: 1 })
    this.log('componentDidMount');
  }


  shouldComponentUpdate(nextProps,nextState){
    this.log('shouldComponentUpdate', nextProps, nextState);
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    this.log('componentDidUpdate');
  }


  add = ()=>{
      this.setState({number:this.state.number});
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