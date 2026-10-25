### Declaração de Uso de Inteligência Artificial e Código Base

Em conformidade com as diretrizes do desafio Elite Dev, este documento detalha o uso de ferramentas de IA e estratégias de desenvolvimento para o Front-end.

#### 1. Uso de Inteligência Artificial (Gemini)

A inteligência artificial (especificamente os modelos Gemini) foi utilizada nas seguintes frentes:

*   **Consultoria e Planejamento:** A IA atuou como uma parceira de *brainstorming* para validar o plano de ataque (quais rotas começar primeiro) e para ajudar no mapeamento das cores do tema (convertendo a paleta do PDF para variáveis CSS `oklch` no padrão do Tailwind).
*   **Geração de Boilerplate:** Utilizada para acelerar a criação de esqueletos estruturais de código, como a configuração base do `ShadcnThemeProvider` e arquivos de estilo iniciais.
*   **O que não foi feito por IA:** A construção da lógica de negócio, integração do *TanStack Query*, mapeamento de formulários com *Zod* e a decisão de como tratar os componentes na tela não foram automatizadas. Todo o código gerado foi minuciosamente revisado e adaptado à mão para atender ao escopo.

#### 2. Reaproveitamento de Código

Para focar na resolução do problema de negócio (lances, leilões, salas ao vivo) dentro do prazo, optei por reaproveitar código de projetos autorais antigos:

*   **Base do Projeto (ticketdev):** Grande parte da infraestrutura do front-end, incluindo arquivos utilitários (utils), lógicas genéricas de formatação e os escopos dos *Providers* (React Query e Next Themes), foi importada do meu repositório pessoal de um projeto anterior chamado *ticketdev*. Isso me permitiu ganhar agilidade sem comprometer a qualidade estrutural da aplicação.