# RUN YO GAME

Open this project in VS Code
Open your integrated terminal in VS Code `CNTRL + ~`
Run this command

```
browser-sync start --server "." --files "." --https --port 443
```

# SAVE YO CHANGES

```sh
git add -A
git commit -m "message"
git push origin main
```

# Get changes from everyone else

```sh
git fetch --all
git status # Must have no changes
git reset --hard origin/main # if you had changes this will destroy those changes....be careful
```
