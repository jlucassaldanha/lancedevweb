### Desafio Elite Dev 2026 - 2 (Front-end)

Este é o repositório do front-end para o desafio da Casa de Leilões online. A interface foi construída para consumir a API REST do sistema, focando em uma experiência de usuário fluida, responsiva e alinhada à identidade visual proposta.

### Aplicação publicada

| Recurso | Endereço |
| --- | --- |
| Aplicação | https://lancedevweb.vercel.app |
| API | https://lancedev-production.up.railway.app/ |
| Swagger | https://lancedev-production.up.railway.app/api-docs/ |

> Link para o Repo da API: https://github.com/jlucassaldanha/LanceDev

#### Decisões Técnicas e Arquitetura

Para garantir uma interface escalável, manutenível e entregue dentro do prazo, as seguintes decisões foram tomadas:

1.   **Shadcn UI:** Escolhido como base de componentes pela sua alta capacidade de personalização. Diferente de bibliotecas de componentes tradicionais, o Shadcn permite acesso direto ao código fonte do componente, facilitando a adaptação exata à paleta de cores escolhida inspirada no desafio (Azul Escuro, Verde Limão, Ciano, etc.).

2.   **TanStack Query, React Hook Form e Zod:** A trindade escolhida para gerenciamento de estado assíncrono e formulários. O TanStack Query facilita o consumo da API e o *caching*, enquanto o React Hook Form aliado ao Zod garante validações de formulário (como login e registro) performáticas e seguras no lado do cliente.

3.   **Prototipação com Stitch:** Utilizado na fase inicial para criar os esboços e wireframes das telas, garantindo que a estrutura visual estivesse sólida antes de iniciar a codificação.

4.   **Reaproveitamento Estrutural:** Para otimizar o tempo de desenvolvimento, grande parte da base estrutural do projeto, como *Providers* (de tema e query) e funções utilitárias, foi reaproveitada de códigos de projetos pessoais anteriores (como o *[ticketdev](https://github.com/jlucassaldanha/ticketdevweb)*).

5.   **Abstração e Tipos Genéricos:** Criação de interfaces e tipos genéricos reutilizáveis para padronizar as respostas da API e simplificar a integração entre componentes de listagens.

#### O que foi feito até agora

A aplicação já contempla as seguintes funcionalidades operacionais:

*   **Sistema de Temas (Dark/Light Mode):** Implementação completa da alternância de temas, utilizando as variáveis CSS baseadas em `oklch` para garantir a identidade visual (fundo Azul Marinho no escuro e base limpa no claro).

*   **Autenticação & Controle de Acesso:** Telas de Login e Registro com validação de formulários e redirecionamento baseado no papel (*Role*) do usuário (Leiloeiro vs. Licitante).

*   **Vitrine e Listagem de Lotes:** Exibição pública e categorizada de lotes **Ao Vivo**, **Programados (Agendados)** e **Finalizados**.

*   **Comprovante de Arremate Público:** Emissão e compartilhamento por link de recibos de leilões finalizados com mascaramento de dados por privacidade.

*   **Integridade / Auditoria:** Página pública para conferência de integridade e histórico de lances de um lote.

*   **Carteira do Usuário:** Consulta de saldo (total, comprometido e disponível) e funcionalidade de depósito simulado exclusivo para licitantes.

*   **Meus Arremates:** Tela de acompanhamento para o licitante consultar os lotes arrematados e acessar seus recibos.

*   **Gestão de Lotes ("Meus Lotes"):** Painel exclusivo para o leiloeiro visualizar seus lotes publicados e realizar cancelamentos permitidos.

*   **Dashboards:** Visão geral adaptada para perfis de Licitante e Leiloeiro com atalhos e valor na carteira.

*   **Criação de Lotes (Painel do Leiloeiro):** Interface de busca integrada à API do *The Metropolitan Museum of Art*, permitindo selecionar a obra e definir regras financeiras (lance inicial, incremento mínimo e intervalo de datas).

*   **Sala do Lote Ao Vivo:** Disputa em tempo real com atualizações contínuas via *polling*, exibindo o maior lance, histórico mascarado por privacidade e indicadores visuais de liderança ("Você está ganhando" / "Você foi superado").

#### Comportamentos Inesperados e Limitações Conhecidas

1.  **Termos e Buscas da API do *The Met* em Inglês:** Por integrar a API pública do *The Metropolitan Museum of Art*, os títulos, autores e termos das obras de arte estão em inglês, exigindo que pesquisas por palavras-chave na criação de lotes sejam feitas no idioma original (ex: *"Sunflowers"*, *"Jar"*, *"Van Gogh"*).

2.  **Estados de Carregamento Unificados:** Em determinados cenários de navegação, optou-se por componentes de carregamento (*spinners*) unificados para seções inteiras em vez de seletores granulados por elemento.

3.  **Tipagem Defensiva com Strings Vazias:** Uso pontual de *strings* vazias (`""`) na inicialização de estados e formulários no lugar de tratamentos mais estritos com `null` ou `undefined`.

4.  **Semântica HTML Reduzida:** Estruturação visual focada em velocidade de entrega, resultando no uso de tags menos semânticas (`div` e `span`) em certos componentes de layout.

### Responsividade e Compatibilidade Mobile

Embora o projeto não tenha seguido estritamente a abordagem *Mobile-First*, a interface foi inteiramente adaptada e otimizada para garantir uma experiência de uso fluida, consistente e responsiva em diferentes tamanhos de tela (smartphones, tablets e desktops):


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
As escolhas técnicas estão formalmente documentadas na pasta [docs/adr/](./docs/adr/).

#### Uso de Inteligência Artificial e Reaproveitamento
O desenvolvimento contou com o auxílio de IA para aceleração de *boilerplate* e consultoria, além do reaproveitamento de componentes base de projetos pessoais. Detalhes completos em [Declaração de Uso de IA](IA_USE.md).