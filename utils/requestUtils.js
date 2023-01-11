import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";

configure({
    views: `${Deno.cwd()}/views/`,
});
  
const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
        status: 303,
        headers: {
        "Location": path,
        },
    });
};

const getIDFromRequest = async(request, index) => {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    return parts[index];
};

export { configure, responseDetails, redirectTo, getIDFromRequest };