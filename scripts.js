let botao = document.querySelector(".botao-gerar")
let endereco = "https://api.groq.com/openai/v1/chat/completions"

async function gerarCodigo(){
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    let resposta = await fetch (endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                role:"system",
                content: "Você é um gerador de código HTML e CSS. Responda somente com código puro. NUNCA use crases,markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. se pedir algo girando, use rotate."
            },

            {
                role:"user",
                content: textoUsuario
            }
        ]
        })
    });

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    let cssGerado = resultado.match(/<style[^>]*>([\s\S]*?)<\/style>/i)

    blocoCodigo.textContent = cssGerado ? cssGerado[1].trim() : "CSS não encontrado na resposta gerada."
    resultadoCodigo.srcdoc = resultado

}

botao.addEventListener("click", gerarCodigo)
