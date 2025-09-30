# Gestão de Leads - Frontend

## Descrição

Este projeto é o frontend para um sistema de gestão de leads, desenvolvido utilizando Next.js. Ele oferece uma interface de usuário para interagir com o backend de gestão de leads, permitindo a visualização e gerenciamento de informações de leads, autenticação de usuários e outras funcionalidades relacionadas.

## Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias:

*   **Next.js**: Framework React para aplicações web com renderização do lado do servidor e geração de sites estáticos.
*   **React**: Biblioteca JavaScript para construção de interfaces de usuário.
*   **TypeScript**: Linguagem de programação para maior segurança e escalabilidade.
*   **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
*   **NextAuth.js**: Solução de autenticação completa para Next.js.
*   **Axios**: Cliente HTTP baseado em Promises para fazer requisições a APIs.
*   **React Hook Form** e **Zod**: Para gerenciamento de formulários e validação de esquemas.
*   **Sonner**: Biblioteca para notificações toast.
*   **React Icons**: Biblioteca de ícones populares.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

*   Node.js (versão 18 ou superior)
*   npm ou Yarn (gerenciador de pacotes do Node.js)

## Instalação

Siga os passos abaixo para configurar o projeto em sua máquina local:

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd management-leads-front-main
    ```

    *(Nota: Substitua `<URL_DO_REPOSITORIO>` pela URL real do seu repositório.)*

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou yarn install
    ```

## Configuração

1.  **Variáveis de Ambiente:**

    Crie um arquivo `.env.local` na raiz do projeto, baseado no `.env.example` (se houver), e configure as variáveis de ambiente necessárias. A mais importante será a URL do seu backend.

    ```env
    NEXTAUTH_URL=http://localhost:3001 # URL do seu frontend
    NEXTAUTH_SECRET=SUA_CHAVE_SECRETA_AQUI # Gere uma chave segura
    NEXT_PUBLIC_API_URL=http://localhost:3000 # URL do seu backend
    ```

    *Certifique-se de que `NEXT_PUBLIC_API_URL` aponte para o endereço onde seu backend está rodando.*

## Execução do Frontend

Para iniciar o servidor de desenvolvimento do Next.js:

```bash
npm run dev
# ou yarn dev
```

O aplicativo estará disponível em `http://localhost:3001` (ou na porta configurada nas variáveis de ambiente).

## Build para Produção

Para construir o aplicativo para produção:

```bash
npm run build
# ou yarn build
```

Para iniciar o aplicativo em modo de produção após o build:

```bash
npm run start
# ou yarn start
```

## Scripts Disponíveis

*   `npm run dev`: Inicia o servidor de desenvolvimento com Next.js.
*   `npm run build`: Compila o projeto para produção.
*   `npm run start`: Inicia o servidor de produção.
*   `npm run lint`: Executa o linter para identificar problemas de código.

## Estrutura do Projeto

```
.env.example
eslint.config.mjs
next.config.ts
package.json
package-lock.json
postcss.config.mjs
public/
├── file.svg
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg
src/
├── app/
│   ├── (private_pages)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (public_pages)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── footer/
│   │   └── footer.tsx
│   ├── form/
│   │   └── form.tsx
│   ├── header/
│   │   └── header.tsx
│   ├── lead-modal/
│   │   └── lead.tsx
│   ├── login/
│   │   └── login.tsx
│   └── modal/
│       └── modal.tsx
├── guard/
│   └── auth-guard/
│       └── auth-guard.tsx
├── providers/
│   ├── auth-interceptor/
│   │   └── auth-interceptor.tsx
│   └── auth-provider/
│       └── auth-provider.tsx
├── schemas/
│   ├── leads-schemas.ts
│   └── login-schema.ts
└── services/
    └── index.ts
typescript.json
```

---

**Desenvolvido por Jhoão Pedro**
