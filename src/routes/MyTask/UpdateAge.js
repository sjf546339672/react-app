import React, {Component} from 'react'
import './index.less'
import { Button } from '@uyun/components'
import moment from 'moment'


moment.locale('zh-cn')

export default class UpdateAge extends Component {

  state = {
    "age": 20,
    "date": null,
  }

  // 增加年龄函数
  handleAddAge = () => {
    this.setState({
      age: this.state.age + 1
    })
  }

  // 减小年龄函数
  handleAddLess = () => {
    const age = this.state.age
    this.setState({
      age: age - 1
    })
    if(age === 1){
      this.setState({
        age: 20
      })
    }
  }

  render () {
    const age = this.state.age
    const date = this.state.date

    return (
      <div>
        <h2>对年龄的增加和减小</h2>
        <div>{age}</div>
        <div onClick={this.handleAddAge}>增加年龄</div>
        <div onClick={this.handleAddLess}>较小年龄</div>

        <h2 style={{marginTop: 30}}>按钮</h2>
        <div>
          <input type="text" style={{fontSize: 17, color: 'blue'}}/>
          <Button type="primary">点击</Button><div style={{marginTop: 10}}></div>
          <input type="text" style={{fontSize: 17, color: 'blue'}}/>
          <Button type="primary" icon="search">搜索</Button>
        </div>

      </div>
    )
  }
}
