！！！ 如果你要修改共用的代码的话，一定要提前 公告一下

代码每天晚上提交一下，白天一下来就更新一下

保证一点：无论何时拉取?master分支进行启动，都要是一个能运行的版本

建立一个空项目只填项目名,然后到这个页面,本地提交到历史区以后,执行这2行代码就提交到服务器上了
git remote add origin https://github.com/killkey/edaixi-.git
git push -u origin master


   
  1  git init
  2  git add -A
  3  git commit -m 'init'
  4  git remote add origin https://github.com/killkey/edaixi-.git
  5  git push -u origin master
  -----以上是一个简单分支
  创建并切换到分支first
  git checkout -b first
  git add -A
  git commit -m "init"

  将first分支内容合并到master：
  切换到master分支
  git checkout master
  git merge first
  
     