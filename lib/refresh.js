const fs = require('fs')
const Handlebars= require('handlebars');
const chalk = require('chalk')

module.exports = async () => {
  const list = fs.readdirSync('./src/views')
    .filter(v => v !== 'Home.vue')
    .map(v => ({
      name:  v.replace('.vue', '').toLowerCase(),
      file: v,
    }))

  function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString();
      const result = Handlebars.compile(content)(meta);
      fs.watchFile(filePath, result)
      console.log(chalk.green(`🚀 ${filePath} 创建成功`))
    }
  }
}