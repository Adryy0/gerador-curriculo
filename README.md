# 📄 Gerador de Currículo Online

Formulário que monta um currículo em tempo real ao lado e permite **salvar em PDF**.
Feito com **HTML, CSS e JavaScript puro**, sem bibliotecas.

🔗 **Demo:** _(coloque aqui o link do GitHub Pages)_

## 💡 Por que fiz este projeto

Estou construindo meu próprio currículo para buscar a primeira oportunidade em TI e
percebi que muita gente perde tempo com formatação. Criei uma ferramenta útil de verdade,
que qualquer pessoa pode testar na hora.

## ✨ Funcionalidades

- Prévia do currículo atualizada **enquanto você digita**
- Seções dinâmicas: adicione e remova várias formações e experiências
- Habilidades e cursos viram listas automaticamente
- Seções vazias não aparecem no currículo
- Exportação em PDF (botão usa a impressão do navegador com layout próprio para A4)
- Dados salvos no navegador (LocalStorage), então nada se perde ao recarregar
- Responsivo: funciona no celular

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (Grid, `@media print`, `@page`)
- JavaScript (DOM, eventos, `localStorage`, manipulação de strings e arrays)

## ▶️ Como usar

1. Baixe ou clone o repositório
2. Abra o `index.html` no navegador
3. Preencha os campos e clique em **Baixar / imprimir em PDF**
   (na janela de impressão, escolha "Salvar como PDF")

## 🔒 Privacidade

Todos os dados ficam apenas no seu navegador. Nada é enviado para nenhum servidor.

## 🧠 O que aprendi

- Estado da aplicação separado da tela (estado → renderização)
- CSS específico para impressão
- Escapar HTML para evitar injeção de código pelo texto digitado
- Delegação de eventos para listas criadas dinamicamente

## 🚀 Próximos passos

- [ ] Escolher entre modelos de layout
- [ ] Exportar/importar os dados em JSON
- [ ] Versão em inglês
