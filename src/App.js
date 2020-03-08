import React from 'react';
import './App.css';
import { Select } from 'antd'
import 'antd/dist/antd.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameList: [
        { name: 'name1', gender: 1 },
        { name: 'name2', gender: 2 },
      ],
      gender: 0, // 1 男 2 女
      name: '',
    }
  }

  handleGenderChange = (value) => {
    this.setState({
      gender: value
    })
  }

  handleNameChange = (e) => {
    console.log('e', e.target.value)
    this.setState({
      name: e.target.value
    })
  }

  render () {
    const { nameList, gender, name } = this.state;
    console.log('name', name)
    const filterNameList = nameList.filter(person => {
      console.log('person.name.includes(name)', person.name.includes(name))
      return gender === 0 ? 
        person.name.includes(name) 
        : 
        (person.name.includes(name) && person.gender === gender)
    })
    console.log('filterNameList', filterNameList)
    return <div className="container">
      <div className="gender">
        性别: <Select onChange={this.handleGenderChange}>
              <Select.Option value={1} key='1'>男</Select.Option>
              <Select.Option value={2} key='2'>女</Select.Option>
        </Select>
      </div>
      <div>
        姓名: <input onChange={this.handleNameChange} placeholder="请输入关键字帅选"/>
      </div>
      <ul>
      {
            filterNameList.map((name, index) => {
              return <li key={index}>{name.name}</li>
            })
          }
      </ul>
    </div>
  }
}

export default App;
