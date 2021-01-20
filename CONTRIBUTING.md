# Getting Started

- View the [README](../README.md)
- Learn how to [format pull requests](#submitting-a-pull-request).
- Read how to [rebase/merge upstream branches](#configuring-remotes).
- [Find an issue to work on](https://github.com/ospic/webapp/issues) and start smashing!
- Learn more at our [getting started guide]().

# Contributing Guidelines [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/ospic/webapp/issues)

When contributing to this repository, please first discuss the change you wish to make via an issue.

## Submitting a Pull Request

### Best Practices to send Pull Requests:

- Fork the [project](https://github.com/ospic/webapp) on GitHub
- Clone the project locally into your system.

```
git clone https://github.com/{{Your-username}}/webapp.git
```

- Make sure you are in the `master` branch.

```
git checkout master
```

- Create a new branch with a meaningful name before adding and commiting your changes.

```
git checkout -b {{ YOUR NEW BRANCH NAME }}
```

- Add the files you changed. (avoid using `git add .`)

```
git add file-name
```

- Follow the style conventions for a [meaningful commit message](COMMIT_MESSAGE.md).

```
git commit
```

- If you forgot to add some changes, you can edit your previous commit message.

```
git commit --amend
```

- Squash multiple commits to a single commit. (example: squash last two commits done on this branch into one)

```
git rebase --interactive HEAD~2
```

- Push this branch to your remote repository on GitHub.

```
git push origin branch-name
```

- If any of the squashed commits have already been pushed to your remote repository, you need to do a force push.

```
git push origin remote-branch-name --force
```

- Follow the Pull request template and submit a pull request with a motive for your change and the method you used to achieve it to be merged with the `master` branch.
- If you can, please submit the pull request with the fix or improvements including tests.
- During review, if you are requested to make changes, rebase your branch and squash the multiple commits into one. Once you push these changes the pull request will edit automatically.

## Configuring remotes

When a repository is cloned, it has a default remote called `origin` that points to your fork on GitHub, not the original repository it was forked from. To keep track of the original repository, you should add another remote called `upstream`.

1. Set the `upstream`.

```
git remote add upstream https://github.com/ospic/webapp.git
```

2. Use `git remote -v` to check the status. The output must be something like this:

```
  > origin    https://github.com/your-username/webapp.git (fetch)
  > origin    https://github.com/your-username/webapp.git (push)
  > upstream  https://github.com/ospic/webapp.git (fetch)
  > upstream  https://github.com/ospic/webapp.git (push)
```

3. To update your local copy with remote changes, run the following: (This will give you an exact copy of the current remote. You should not have any local changes on your master branch, if you do, use rebase instead.)

```
git fetch upstream
git checkout master
git merge upstream/master
```

4. Push these merged changes to the master branch on your fork. Ensure to pull in upstream changes regularly to keep your forked repository up to date.

```
git push origin master
```

5. Switch to the branch you are using for some piece of work.

```
git checkout branch-name
```

6. Rebase your branch, which means, take in all latest changes and replay your work in the branch on top of this - this produces cleaner versions/history.

```
git rebase master
```

7. Push the final changes when you're ready.

```
git push origin branch-name
```

## After your Pull Request is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository.

1. Delete the remote branch on GitHub.

```
git push origin --delete branch-name
```

2. Checkout the master branch.

```
git checkout master
```

3. Delete the local branch.

```
git branch -D branch-name
```

4. Update your master branch with the latest upstream version.

```
git pull upstream master
```

This is it.
