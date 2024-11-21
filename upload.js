import { scp } from 'scp2'
import { readFileSync } from 'fs'
import ora from 'ora'
import { green } from 'chalk'

const spinner = ora(green('正在发送到服务器...'))
spinner.start()

scp(
  './dist',
  {
    host: '18.167.116.86',
    port: '22',
    username: 'ec2-user',
    privateKey: readFileSync('./frontend-test.pem'),
    path: '/home/exchange/h5'
  },
  (err) => {
    spinner.stop()
    if (err) {
      console.log('err:', err)
      return
    }
    console.log(green('项目发布完毕！'))
  }
)
