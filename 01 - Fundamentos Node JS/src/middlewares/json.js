export async function json(req, res) {
  const buffers = [];

  // Coleta os pedaços de dados da requisição
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    // Concatena os buffers e transforma em objeto JSON
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    // Se não houver corpo ou o JSON for inválido, define como null
    req.body = null;
  }

  // Define que a resposta padrão será sempre JSON
  res.setHeader('Content-Type', 'application/json');
}