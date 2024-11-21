import { scp } from 'scp2'
import { readFileSync } from 'fs'
import ora from 'ora'
import { green } from 'chalk'

const spinner = ora(green('正在发送到服务器...'))
spinner.start()

scp(
  './dist',
  {
    host: '18.166.52.32',
    port: '22',
    username: 'ec2-user',
    privateKey: readFileSync('./frontend-test.pem'),
    path: '/home/dcbox-wap-prod'
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
