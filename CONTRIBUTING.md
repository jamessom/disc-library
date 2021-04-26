# Contributions

## Pull requests

The steps to contribute to the evolution of the code, whether to solve bugs or create features are as follows:

- Create a project fork
- Create a new branch
- Make changes or add features
- Commit changes and send them to the remote
- Make pull request and assign to a reviewer
- In case of revisions: make new commits in the same branch created and send to the remote

An example of a bug resolution would follow the following flow:

```shell
$ disc-library (master)> git pull origin master
$ disc-library (master)> git checkout -b bug/bug-xpto
$ disc-library (bug/bug-xpto)> git commit -a -m "Fix bug"
$ disc-library (bug/bug-xpto)> git push origin bug/bug-xpto
```

A nice feature of Github is the [link to issue](https://help.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue), see the example below:

```shell
$ disc-library (master) > git pull origin master
$ disc-library (master) > git checkout -b feature/link-issue
$ disc-library (feature/link-issue) > git commit -a -m "Fixes bug related to issue #1"
$ disc-library (feature/link-issue) > git push origin feature/link-issue
```

Then open a Pull Request for your modification.
