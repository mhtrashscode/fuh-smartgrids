docker container run -it `
    --name cont2 `
    --mount type=bind,src="$(pwd)",target=/app `
    -p 127.0.0.1:3001:3000 `
    demoapp_v3