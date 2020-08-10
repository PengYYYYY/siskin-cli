const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const inquirer = require('inquirer')

const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.greenBright(content))
const { clone } = require('./download')
const { resolve } = require('path')
const { cwd } = require('process')

const open = require('open')

const spawn = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

const packages = [
  {
    name: '模版',
    repo: 'github:super-YUE/vue-next-study'
  }, {
    name: '模版2',
    repo: 'github:super-YUE/vue-next-study'
  }
]

const getAnswersFromInquirer = async(packages) => {
  const question = {
    type: 'list',
    name: 'template',
    scroll: false,
    message: 'Select template',
    choices: packages.map(package => ({
      value: package.repo,
      name: package.name
    }))
  }
  let { template } = await inquirer.prompt(question)
  return template
}

module.exports = async name => {
  clear()
  const data = await figlet('welcome to use siskin')
  log(data)

  // 选择模版
  const repo = await getAnswersFromInquirer(packages)

  log(`🚀创建项目：${name}`)
  try {
    await clone(repo, name)
    // 自动安装
    log('安装依赖')
    await spawn('yarn', ['install'], { cwd: `./${name}`})

    log(`
      👌安装完成：
      cd ${name}
      yarn dev
    `)

    // 启动
    await spawn('yarn', ['run', 'serve'], { cwd: `./${name}`})

    open()
  } catch(e) {
    
  }
}