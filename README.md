# Camelie Dermatologia — Landing Pages de Tratamentos

Hospedado via GitHub Pages em `tratamentos.camelie.com.br`

## Estrutura

```
camelie-tratamentos/
├── CNAME                          ← domínio custom para GitHub Pages
├── .nojekyll                      ← desativa processamento Jekyll
├── index.html                     ← redirect para camelie.com.br
├── assets/
│   ├── css/tratamentos.css        ← CSS compartilhado (todas as páginas)
│   └── js/tratamentos.js          ← JS compartilhado (navbar, scroll, carrossel, FAQ)
└── toxina-botulinica/
    ├── index.html                 ← landing page da toxina
    └── fotos/
        ├── entrada.jpg
        ├── sala.jpg
        ├── lavabo.jpg
        ├── massagem.jpg
        └── consultorio.jpg
```

## Deploy inicial

1. Criar repositório `camelie-tratamentos` no GitHub (público)
2. Subir todos os arquivos
3. Em **Settings → Pages**: Source = "Deploy from a branch", Branch = `main`, Folder = `/ (root)`
4. No DNS do domínio, adicionar CNAME: `tratamentos` → `SEU-USUARIO.github.io`
5. Voltar em Settings → Pages e digitar `tratamentos.camelie.com.br` no campo Custom Domain
6. Marcar "Enforce HTTPS" (pode levar alguns minutos para ativar)

## Adicionar nova página de tratamento

1. Criar pasta: `nome-do-tratamento/`
2. Copiar `toxina-botulinica/index.html` como base
3. Editar textos, título, meta tags, Schema.org e links do WhatsApp
4. Adicionar fotos em `nome-do-tratamento/fotos/`
5. Commit e push — publica automaticamente

## Fotos

3 fotos são placeholders (entrada, massagem, consultório) — substituir pelos JPGs reais:
- Redimensionar para 800px de largura
- Salvar como JPG qualidade 80-85%
- Manter os mesmos nomes de arquivo

## SEO

- Cada página tem Schema.org MedicalProcedure
- Open Graph configurado
- Canonical URL definida
- FAQ com perguntas long-tail
- Solicitar indexação no Google Search Console após publicar
