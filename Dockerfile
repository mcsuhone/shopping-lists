FROM denoland/deno:alpine-1.22.0

EXPOSE 7777

WORKDIR /

CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "--no-check", "app.js" ]