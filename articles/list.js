export default {
  articles:
  [
    {
      fileName: 'testOne.md',
      subject: 'Hello',
      title: 'IamtestOne我是第一个1测试文件',
      tags:
      [
        'tag1',
        'tag2',
        'VUE'
      ],
      summary: '我是文章摘要',
      date: '20200328'
    },
    {
      fileName: 'testTwo.md',
      subject: 'Hello',
      title: 'IamtestTwo!我是第一个2测试文件',
      tags:
      [
        'tag1',
        'tag2',
        'CSS',
        'JS',
        'HTML'
      ],
      summary: '我是文章摘要',
      date: '20200101'
    }
  ],
  dates:
  {
    20200101:
    [
      'IamtestTwo!我是第一个2测试文件'
    ],
    20200328:
    [
      'IamtestOne我是第一个1测试文件'
    ]
  },
  tags:
  {
    tag1:
    [
      'IamtestOne我是第一个1测试文件',
      'IamtestTwo!我是第一个2测试文件'
    ],
    tag2:
    [
      'IamtestOne我是第一个1测试文件',
      'IamtestTwo!我是第一个2测试文件'
    ],
    VUE:
    [
      'IamtestOne我是第一个1测试文件'
    ],
    CSS:
    [
      'IamtestTwo!我是第一个2测试文件'
    ],
    JS:
    [
      'IamtestTwo!我是第一个2测试文件'
    ],
    HTML:
    [
      'IamtestTwo!我是第一个2测试文件'
    ]
  }
}
