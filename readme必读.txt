克隆项目到本地 git clone https://github.com/killkey/edaixi-.git
因为没有node_modules,文件，所以拉下来以后，打开项目 到当前目录下 执行 npm i 创建node_modules
然后运行npm run dev 看看能不能运行起来

！！！ 如果你要修改共用的代码的话，一定要提前 公告一下

代码每天晚上提交一下，白天一下来就更新一下

保证一点：无论何时拉取?master分支进行启动，都要是一个能运行的版本


白天写代码之前在master分支下更新一下 git pull
如果你在自己分支下有未做完的项目，并且commit了，拉取需切换到自己的分支，并且用git merge master，然后把冲突的地方自行修改


代码每天晚上提交一下如上操作 记得切换到自己的分支

  创建并切换到分支first
  切换分支前先看一下有哪些分支 git branch -a 然后复制分支名切换分支，减少错误
  git checkout -b first
  git add -A
  git commit -m "init"

--------------------以下必须是一个可运行的程序才可执行
  将first分支内容合并到master：
  切换到master分支
  git checkout master
  git merge first
  git push -u origin master




可以不看 这是一个分支的简单情况
----------
  1  git init
  2  git add -A
  3  git commit -m 'init'
  4  git remote add origin https://github.com/killkey/edaixi-.git
  5  git push -u origin master
-----以上是一个简单分支



     