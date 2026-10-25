# 0001. Estratégia de Sincronização da Sala ao Vivo (Polling com React Query)

* **Status:** Aceito
* **Contexto:** O escopo do desafio exige que a sala do lote ao vivo exiba o lance atual, o histórico de lances, a contagem regressiva e os indicadores visuais de liderança ("você está ganhando" / "você foi superado") atualizados instantaneamente e sem recarregar a página. Como a arquitetura do back-end adotou uma abordagem RESTful clássica para simplificar o consumo, foi criado um endpoint dedicado e consolidado (`GET /lots/:id/live-room`) que entrega todos esses dados mastigados, incluindo as flags de liderança (`isWinning`), nomes mascarados por privacidade e o relógio sincronizado do servidor. O front-end precisava de um mecanismo seguro e eficiente para espelhar esse estado continuamente.


* **Decisão:** Optou-se por implementar uma estratégia de *polling* (consultas periódicas controladas) utilizando a propriedade `refetchInterval` da biblioteca `@tanstack/react-query`. O hook consulta continuamente o endpoint `/live-room` em intervalos curtos de tempo, rodando em segundo plano.
* **Consequências:**
* **Positivo:** Atende integralmente aos requisitos de manter a tela atualizada sem recarregamentos. Maximiza a sinergia com as decisões arquiteturais do back-end, que criou este endpoint consolidado exatamente para evitar o anti-padrão de sobrecarregar o front-end com múltiplos cálculos de estado e requisições paralelas. O uso do React Query ainda garante o gerenciamento automático de *cache*, cancelamento de requisições obsoletas e tratamento simplificado de erros (como quedas na rede).


* **Negativo:** Diferente de abordagens orientadas a eventos (como WebSockets ou SSE), o *polling* gera tráfego de rede constante, pois o cliente realiza requisições HTTP periódicas mesmo quando nenhum lance novo foi dado. Contudo, este é um *trade-off* totalmente aceitável e esperado para o escopo do desafio, mantendo a simplicidade da infraestrutura e respeitando os limites da API fornecida.