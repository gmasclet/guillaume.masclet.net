# guillaume.masclet.net website

This is the source code of [my personnal website](https://guillaume.masclet.net/en/).

I'm posting this so anyone who's curious may take a look but I doubt anyone is going to have any interest in forking/reusing this source code.

If you want to build and run this website locally anyway, you will need:
* a Docker installation.
* a [jwilder/nginx-proxy](https://github.com/nginx-proxy/nginx-proxy) running instance. If you want to run the website directly, just edit the docker-compose file accordindly (that is, remove almost everything and add a binding on the port of your choice, for instance 8080:80). For the sake of completness, my own setup of the jwilder/nginx-proxy is available [here](https://github.com/gmasclet/nginx-proxy) and should work out of the box.

```sh
# build (please note you may add the .bin folder to your PATH)
.bin/npm install
.bin/npm run build # "watch" and "clean" are also available, I hope it's self explaining

# set up env
echo > .env<<EOF
PROXY_VIRTUAL_HOST=localhost
EOF

# run
docker-compose up -d
```
