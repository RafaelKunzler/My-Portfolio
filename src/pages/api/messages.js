import { createMessage, getAllMessages } from "../../lib/messages";

export const prerender = false;


export const GET = async () => {
  const messages = await getAllMessages();
  if (!messages) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify(messages), {
    status: 200,
  });
};

export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const date = body?.date ? new Date(body.date) : new Date();

    if (!name || !message) {
      return new Response(
        JSON.stringify({ error: "Nome e mensagem sao obrigatorios." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const createdMessage = await createMessage({
      name,
      message,
      date
    });

    return new Response(
      JSON.stringify({ success: true, message: createdMessage }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("ERRO NA API:", error);

    return new Response(
      JSON.stringify({ error: "Erro interno" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
