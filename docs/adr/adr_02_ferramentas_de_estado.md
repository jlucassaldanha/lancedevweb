# 2. Stack de Formulários e Estado (TanStack, RHF e Zod)

**Data:** Outubro de 2026

### Contexto
Uma aplicação de leilões lida com muitas entradas de dados (login, criação de lote, depósitos) e necessidades de requisições de estado de rede para manter a vitrine e carteiras atualizadas.

### Decisão
Foi escolhida a combinação de **TanStack Query** (React Query), **React Hook Form** e **Zod**.

### Consequências

*   **Positivas:** 
    *   *TanStack Query:* Removeu a necessidade de gerenciar `isLoading` e `isError` manualmente com `useEffect`, trazendo cache de rotas públicas de brinde.
    *   *RHF + Zod:* Garante que lances, depósitos e autenticação sejam validados rigorosamente no cliente antes de tocar a API, melhorando a resposta visual de erro para o usuário sem custo de rede.
*   **Negativas:** Curva de aprendizado inicial e verbosidade na configuração dos *schemas* de validação, contornadas através do conhecimento prévio adquirido em projetos passados.