import React, { Component } from 'react'
import { List, Input, Button, Avatar, message, Spin, Icon, Carousel, Form, DatePicker, Col, Table, Tag, Alert } from '@uyun/components'
import reqwest from 'reqwest'
import InfiniteScroll from 'react-infinite-scroller'
import './index.less'
import img1 from '../../../public/static/images/1.jpg'
import img6 from '../../../public/static/images/2.jpg'
import img2 from '../../../public/static/images/2.jpg'
import img7 from '../../../public/static/images/7.jpg'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const regex_mobile = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/
const regex_email = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const columns = [{
  title: 'Username',
  dataIndex: 'username',
  key: 'username',
  render: text => <span>{text}</span>,
},
  {
  title: 'Mobile',
  dataIndex: 'mobile',
  key: 'mobile',
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
}]

export default class ListShow extends Component {

  state = {
    data: [
      {'id': 1, 'name': '李白'},
      {'id': 2, 'name': '杜甫'},
      {'id': 3, 'name': '杜牧'},
      {'id': 4, 'name': '李贺'},
      ],
    value: '',
    loading: false,
    hasMore: true,
    show_data: [{
      key: '1',
      username: 'John',
      mobile: '18365597692',
      email: '546339672@qq.com',
    }],
  }

  handleAddPerson = (event) => {
    const data = this.state.data
    if (event !== '') {
      const new_dict = {'id': data.length + 1, 'name': event}
      data.push(new_dict)
      this.setState({
        data: data,
        value: ''
      })
    }
  }

  handleChangeValue = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleDelete = (id) => {
    const data = this.state.data
    console.log(id)
    this.setState({data: data.filter(t => t.id !== id)} )
  }

  omponentDidMount() {
    this.fetchData((res) => {
      this.setState({
        data: res.results,
      });
    });
  }

  fetchData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 5) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  }

  handleSubmit = (event) => {
    const form_username = event.target.form_username.value
    const form_mobile = event.target.form_mobile.value
    const form_email = event.target.form_email.value
    const show_data = this.state.show_data

    const check_mobile = regex_mobile.test(form_mobile)
    const check_email = regex_email.test(form_email)

    show_data.forEach((item) => {
      if (form_username.toLowerCase() === item['username'].toLowerCase() ||
        form_email === item['email'] || form_mobile === item['mobile']) {
        console.log("用户信息已存在")
      }else{
        if (check_email && check_mobile) {
          const new_data = {'key': (show_data.length + 1).toString(),
            'username': form_username, 'mobile': form_mobile, 'email': form_email}
            show_data.push(new_data)
          this.setState({
            show_data: show_data
          })
          console.log(show_data)
        }else{
          console.log("邮箱或号码错误")
        }
      }
    })
  }

  render () {
    const data = this.state.data
    const show_data = this.state.show_data

    return (
      <div style={{marginLeft: 30, marginTop: 20}}>
        {/*<Carousel autoplay className='picture-style'>*/}
          {/*<div><img src={img1} className='picture-style-div' /></div>*/}
          {/*<div><img src={img2} className='picture-style-div' /></div>*/}
          {/*<div><img src={img7} className='picture-style-div' /></div>*/}
          {/*<div><img src={img6} className='picture-style-div' /></div>*/}
        {/*</Carousel>*/}
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
          className="demo-infinite-container"
        >
          <h3 style={{ marginBottom: 16 }}>列表展示</h3>
          <List
            size="large"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={item.name}
                />
                <div><Icon type="close" onClick={() => this.handleDelete(item.id)}/></div>
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className='demo-loading-container'>
                <Spin />
              </div>
            )}
            </List>
        </InfiniteScroll>
        <Input.Search enterButton="添加" value={this.state.value} onChange={this.handleChangeValue} onSearch={this.handleAddPerson}/>

        <Table columns={columns} dataSource={show_data} className='table-show' onChange={this.handleChangeTable}/>

        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout}  label="username">
            <Input placeholder="Please Input username" id="form_username"/>
          </FormItem>

          <FormItem {...formItemLayout}  label="Phone Number">
            <Input placeholder="Please Input mobile" id="form_mobile" />
          </FormItem>

          <FormItem {...formItemLayout} label="E-mail">
            <Input placeholder="Please Input email" id="form_email" />
          </FormItem>

          <FormItem {...formItemLayout} wrapperCol={{ span: 12, offset: 10 }}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>

        </Form>
      </div>
    )
  }
}
