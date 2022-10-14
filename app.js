import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as messageService from "./services/messageService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const data = {
  messages: [],
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
}

const sendMessage = async (request) => {
  const formData = await request.formData();
  await messageService.create(formData.get("sender"), formData.get("message"));
};

const getMessages = async (request) => {
  return await messageService.findAll();
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname === "/") {
    data.messages = await getMessages(request);
    return new Response(await renderFile("index.eta", data), responseDetails);
  }
  else if (request.method === "POST") {
    await sendMessage(request);
    return redirectTo("/");
  }
};


let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

serve(handleRequest, { port: port });
