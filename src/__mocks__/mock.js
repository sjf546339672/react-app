import Mock from 'mockjs'
import request from '@/utils/request'
import MockAdapter from '@uyun/utils/mock'

const mock = new MockAdapter(request)

mock
  .onGet('/analysis/count')
  .reply(
    200,
    Mock.mock({
      'new|0-10': 1,
      'pending|0-10': 1,
      'overdue|0-10': 1,
      'resolution|0-100': 1
    })
  )
  .onGet('/analysis/tendency')
  .reply(
    200,
    Mock.mock({
      'total_count|30': ['@natural(0, 50)'],
      'time|30': ['@date'],
      'finish_count|30': ['@natural(0, 5)'],
      'overdue_count|30': ['@natural(0, 20)']
    })
  )
  .onGet('/analysis/priority')
  .reply(
    200,
    Mock.mock([
      {
        'urgent_level|1': ['低', '中', '高'],
        'num|1-5': 1,
        'value|1': '3'
      }
    ])
  )
  .onGet('/analysis/distribution')
  .reply(
    200,
    Mock.mock({
      'resolution_rate|30': ['@natural(0, 12)'],
      'today_finish_count|30': ['@natural(0, 3'],
      'time|30': ['@date'],
      'today_create_count|30': ['@natural(0, 12)'],
      'overdue_count|30': ['@natural(0, 25)']
    })
  )
  .onGet('/analysis/statistics')
  .reply(
    200,
    Mock.mock({
      'list|2': [
        {
          id: '@id',
          'name|+1': [0, 1],
          'count|1-5': 1,
          'using|1': true
        }
      ]
    }).list
  )
  .onGet('/table')
  .reply(
    200,
    Mock.mock({
      'list|10': [
        {
          id: '@id',
          name: /Log_\d{10}/,
          user: {
            realname: '@name',
            'userBelongType|1-4': 1
          },
          'execType|0-2': 1,
          startTime: '@datetime',
          endTime: '@datetime',
          'execDuration|1000-35000': 1,
          'status|0-2': 1
        }
      ]
    }).list
  )
  .onPost('/form')
  .reply(200)
  .onGet('/flowsheet')
  .reply(
    200,
    Mock.mock({
      data: [
        {
          name: '@name',
          children: [
            {
              icon: 'iconfont icon-zhuzhuangtu',
              node: {
                name: '@cname',
                unicode: '\uea22'
              }
            },
            {
              icon: 'iconfont icon-binghang',
              name: '多个节点',
              node: [
                {
                  name: 'X',
                  width: 80,
                  height: 40,
                  unicode: '\uea22',
                  type: 'rect',
                  x: 0,
                  y: 0,
                  uuid: 'e4aee27d756d44d58a04fc60ddc11b78'
                },
                {
                  name: 'O',
                  width: 80,
                  height: 40,
                  type: 'rect',
                  unicode: '\uea22',
                  x: 100,
                  y: 210,
                  uuid: '7ec6adc69ae842afa858bebaf29f448e'
                }
              ],
              link: [
                {
                  source: {
                    uuid: 'e4aee27d756d44d58a04fc60ddc11b78',
                    position: 'bottom'
                  },
                  target: {
                    uuid: '7ec6adc69ae842afa858bebaf29f448e',
                    position: 'top'
                  },
                  uuid: 123,
                  name: '可以给我取名字'
                }
              ],
              type: 'rhomb'
            },
            {
              icon: 'iconfont icon-zidongjiedian',
              node: {
                name: '自动节点',
                unicode: '\uea27'
              }
            },
            {
              icon: 'iconfont icon-zuoduiqi',
              node: {
                name: '数据输出',
                unicode: '\ue65c'
              }
            },
            {
              icon: 'iconfont icon-ziliucheng',
              node: {
                name: '子流程',
                unicode: '\uea23'
              }
            },
            {
              icon: 'iconfont icon-rengongjiedian',
              node: {
                name: '人工节点',
                unicode: '\uea23'
              }
            },
            {
              icon: 'iconfont icon-APIjiedian',
              node: {
                name: 'API节点',
                unicode: '\uea26'
              }
            }
          ]
        },
        {
          name: '数据转换',
          children: [
            {
              icon: 'iconfont icon-shangduiqi',
              node: {
                name: '数据输入',
                unicode: '\ue657'
              }
            },
            {
              icon: 'iconfont icon-panding',
              node: {
                name: '判定',
                unicode: '\uea25'
              }
            }
          ]
        }
      ]
    })
  )
// .restore()

export default mock
