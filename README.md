### Desafio Elite Dev 2026 - 2 (Front-end)

Este é o repositório do front-end para o desafio da Casa de Leilões online. A interface foi construída para consumir a API REST do sistema, focando em uma experiência de usuário fluida, responsiva e alinhada à identidade visual proposta.

### Aplicação publicada

| Recurso | Endereço |
| --- | --- |
| Aplicação | https://lancedevweb.vercel.app |
| API | https://lancedev-production.up.railway.app/ |
| Swagger | https://lancedev-production.up.railway.app/api-docs/ |

#### Decisões Técnicas e Arquitetura

Para garantir uma interface escalável, manutenível e entregue dentro do prazo, as seguintes decisões foram tomadas:

*   **Shadcn UI:** Escolhido como base de componentes pela sua alta capacidade de personalização. Diferente de bibliotecas de componentes tradicionais, o Shadcn permite acesso direto ao código fonte do componente, facilitando a adaptação exata à paleta de cores exigida no desafio (Azul Escuro, Verde Limão, Ciano, etc.).
*   **TanStack Query, React Hook Form e Zod:** A trindade escolhida para gerenciamento de estado assíncrono e formulários. O TanStack Query facilita o consumo da API e o *caching*, enquanto o React Hook Form aliado ao Zod garante validações de formulário (como login e registro) performáticas e seguras no lado do cliente.
*   **Prototipação com Stitch:** Utilizado na fase inicial para criar os esboços e wireframes das telas, garantindo que a estrutura visual estivesse sólida antes de iniciar a codificação.
*   **Reaproveitamento Estrutural:** Para otimizar o tempo de desenvolvimento, grande parte da base estrutural do projeto, como *Providers* (de tema e query) e funções utilitárias, foi reaproveitada de códigos validados de projetos pessoais anteriores (como o *ticketdev*).

#### O que foi feito até agora

A aplicação já contempla as seguintes funcionalidades operacionais:

*   **Sistema de Temas (Dark/Light Mode):** Implementação completa da alternância de temas, utilizando as variáveis CSS baseadas em `oklch` para garantir a identidade visual (fundo Azul Marinho no escuro e base limpa no claro).
*   **Autenticação:** Telas de Login e Registro perfeitamente funcionais e integradas.
*   **Vitrine de Lotes:** A tela inicial (pública) exibindo a listagem dos itens leiloados além das telas de listagem completa.
*   **Comprovante de Arremate:** Tela para visualização e compartilhamento do recibo de itens arrematados.
*   **Integridade / Auditoria:** Página pública para conferência de integridade e histórico de lances de um lote.
*   **Carteira do Usuário:** Consulta de saldo e funcionalidade de depósito simulado.
*   **Meus arremates:** Tela com listagem dos arremates do usuário logado.

#### Comportamentos Inesperados e Limitações Conhecidas

Devido ao tempo restrito para a entrega do desafio, os seguintes pontos são de conhecimento técnico e assumidos como *trade-offs* da versão atual:

*   **Lotes sem lances constando como "Íntegros":** Na página de integridade, lotes recém-criados que ainda não receberam nenhum lance estão sendo exibidos com a flag de integridade ativa, mesmo não possuindo histórico na cadeia de *hashes* para validar.
*   **Uso excessivo de Strings Vazias:** Pelo tempo reduzido, algumas tipagens e inicializações de estado precisaram utilizar *strings* vazias (`""`) ao invés de tratamentos mais robustos de `null` ou `undefined`, o que pode gerar uma necessidade de refatoração futura em cenários mais estritos.
*  **Semântica HTML Reduzida:** Estruturação visual focada em agilidade, apresentando uso de tags HTML menos semânticas em determinados componentes visuais.

#### Como rodar a aplicação localmente

**1. Clone o repositório e instale as dependências:**
```bash
npm install
```

**2. Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto apontando para a sua API local (ou de produção):
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

**3. Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```
Acesse `http://localhost:3000` no seu navegador.

#### Decisões Arquiteturais (ADRs)
As escolhas técnicas estão formalmente documentadas na pasta `docs/adr/`.

#### Uso de Inteligência Artificial e Reaproveitamento
O desenvolvimento contou com o auxílio de IA para aceleração de *boilerplate* e consultoria, além do reaproveitamento de componentes base de projetos pessoais. Detalhes completos em [Declaração de Uso de IA](IA_USE.md).