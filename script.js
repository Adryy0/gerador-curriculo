// Gerador de Currículo - prévia em tempo real + exportação para PDF via impressão
const CHAVE = "gerador-curriculo:dados";

const camposSimples = [
  "nome", "cargo", "email", "telefone", "cidade", "linkedin",
  "resumo", "habilidades", "cursos",
];

const modelos = {
  formacao: { titulo: "Curso / Instituição", periodo: "Período (ex.: 2025 - 2026)", detalhe: "Detalhes (opcional)" },
  experiencia: { titulo: "Cargo / Empresa", periodo: "Período", detalhe: "O que você fazia (uma atividade por linha)" },
};

const previa = document.getElementById("curriculo");

let estado = carregar();

function estadoInicial() {
  const base = { formacao: [], experiencia: [] };
  camposSimples.forEach((c) => (base[c] = ""));
  return base;
}

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE));
    if (dados && typeof dados === "object") return { ...estadoInicial(), ...dados };
  } catch (e) {
    // ignora dados corrompidos
  }
  return estadoInicial();
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch (e) {
    // armazenamento indisponível: segue sem salvar
  }
}

function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto || "";
  return div.innerHTML;
}

// ---------- Itens dinâmicos (formação / experiência) ----------
function renderItens(tipo) {
  const container = document.getElementById(`lista-${tipo}`);
  const m = modelos[tipo];
  container.innerHTML = estado[tipo]
    .map(
      (item, i) => `
    <div class="item" data-tipo="${tipo}" data-indice="${i}">
      <input data-campo="titulo" placeholder="${m.titulo}" value="${escapar(item.titulo).replace(/"/g, "&quot;")}">
      <input data-campo="periodo" placeholder="${m.periodo}" value="${escapar(item.periodo).replace(/"/g, "&quot;")}">
      <textarea data-campo="detalhe" rows="2" placeholder="${m.detalhe}">${escapar(item.detalhe)}</textarea>
      <button type="button" class="remover" data-remover>Remover</button>
    </div>`
    )
    .join("");
}

function listaHtml(texto, separador) {
  const itens = texto.split(separador).map((t) => t.trim()).filter(Boolean);
  return itens.length ? `<ul>${itens.map((t) => `<li>${escapar(t)}</li>`).join("")}</ul>` : "";
}

function blocoItens(tipo) {
  return estado[tipo]
    .filter((i) => i.titulo || i.periodo || i.detalhe)
    .map(
      (i) => `
      <div class="linha"><span>${escapar(i.titulo)}</span><span>${escapar(i.periodo)}</span></div>
      ${listaHtml(i.detalhe, "\n")}`
    )
    .join("");
}

function secao(titulo, conteudo) {
  return conteudo ? `<h2>${titulo}</h2>${conteudo}` : "";
}

// ---------- Prévia ----------
function renderPrevia() {
  const contatos = [estado.email, estado.telefone, estado.cidade, estado.linkedin]
    .map((c) => c.trim())
    .filter(Boolean)
    .map(escapar)
    .join(" · ");

  const html = `
    <h1>${escapar(estado.nome) || '<span class="vazio">Seu nome aqui</span>'}</h1>
    ${estado.cargo ? `<div class="objetivo">${escapar(estado.cargo)}</div>` : ""}
    ${contatos ? `<div class="contato">${contatos}</div>` : ""}
    ${secao("Resumo", estado.resumo.trim() ? `<p>${escapar(estado.resumo)}</p>` : "")}
    ${secao("Formação", blocoItens("formacao"))}
    ${secao("Experiência", blocoItens("experiencia"))}
    ${secao("Habilidades", listaHtml(estado.habilidades, ","))}
    ${secao("Cursos e projetos", listaHtml(estado.cursos, "\n"))}
  `;
  previa.innerHTML = html;
}

function atualizar() {
  salvar();
  renderPrevia();
}

// ---------- Eventos ----------
camposSimples.forEach((id) => {
  const el = document.getElementById(id);
  el.value = estado[id];
  el.addEventListener("input", () => {
    estado[id] = el.value;
    atualizar();
  });
});

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) {
    const tipo = add.dataset.add;
    estado[tipo].push({ titulo: "", periodo: "", detalhe: "" });
    renderItens(tipo);
    atualizar();
    return;
  }
  const remover = e.target.closest("[data-remover]");
  if (remover) {
    const item = remover.closest(".item");
    const { tipo, indice } = item.dataset;
    estado[tipo].splice(Number(indice), 1);
    renderItens(tipo);
    atualizar();
  }
});

document.addEventListener("input", (e) => {
  const item = e.target.closest(".item");
  if (!item || !e.target.dataset.campo) return;
  const { tipo, indice } = item.dataset;
  estado[tipo][Number(indice)][e.target.dataset.campo] = e.target.value;
  atualizar();
});

document.getElementById("btn-pdf").addEventListener("click", () => window.print());

document.getElementById("btn-limpar").addEventListener("click", () => {
  if (!confirm("Apagar todos os dados do currículo?")) return;
  estado = estadoInicial();
  camposSimples.forEach((id) => (document.getElementById(id).value = ""));
  renderItens("formacao");
  renderItens("experiencia");
  atualizar();
});

// ---------- Início ----------
renderItens("formacao");
renderItens("experiencia");
renderPrevia();
