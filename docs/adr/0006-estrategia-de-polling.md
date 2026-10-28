# 0005. Estratégia de Polling para Atualização da Sala ao Vivo

* **Status:** Aceito

### Contexto
A sala de lote ao vivo exige atualizações em tempo real do lance corrente, histórico de lances e status de liderança sem exigir o recarregamento manual da página pelo usuário.

### Decisão
Implementou-se uma estratégia de **polling** via TanStack Query utilizando a propriedade `refetchInterval` no hook da sala ao vivo (`useLiveLot`), aproveitando o endpoint consolidado `GET /lots/:id/live-room` provido pelo back-end.

### Consequências
* **Positivas:** Mantém a interface sincronizada com o servidor sem a complexidade de infraestrutura de WebSockets ou SSE, garantindo facilidade de manutenção e integração com os estados de *cache* do React Query.
* **Negativas:** Gera requisições HTTP periódicas em intervalos fixos, gerando tráfego de rede contínuo durante a permanência do usuário na tela.