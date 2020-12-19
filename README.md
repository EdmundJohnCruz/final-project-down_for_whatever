# Final Project

Our app is currently running at http://54.183.63.131:4000/
Docker will require the images to be made with:
```bash
$ sudo docker build -f devops/<name>.Dockerfile -t dfw/<name> .
```
for each Dockerfile inside devops

We are going to continue working on this after noon to try to get our last bugs ironed out, but there is a commit at 12 which you can use if you want to see our work by that hard deadline.

We aren't able to get get Kafka working, since it either uses enough memory and causes the whole instance to hang or we don't give it enough and it crashes imediately. The rest of the project is more or less working.

Thanks,
Down For Whatever Team.
