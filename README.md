# npm-hook

This is an ongoing experiment to learn and experiment with node.js. It is meant to implement a webhook interface to respond 
to things like github webhooks.

The behavior of the webhook is to:

1. git clone the repository
1. git checkout a branch
1. git pull
1. run an arbitrary command

git, npm and whatever is used in the command must be implemented in the server where the webhook is run.
