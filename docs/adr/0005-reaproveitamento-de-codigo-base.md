# 0004. Reaproveitamento de Infraestrutura Base (ticketdev)

* **Status:** Aceito

### Contexto
A configuração inicial de um projeto em React/Next.js exige tempo para estruturar diretórios, configurar *Providers* globais (Next Themes, React Query) e criar funções utilitárias de formatação comum.

### Decisão
Optou-se por reaproveitar a infraestrutura base e funções utilitárias provenientes do projeto autoral prévio do desenvolvedor, chamado **ticketdev**.

### Consequências
* **Positivas:** Redução significativa do tempo gasto em configurações iniciais de *boilerplate*, permitindo focar diretamente na implementação das regras do desafio da Casa de Leilões.
* **Negativas:** Carregamento indireto de pequenas utilidades genéricas que podem não ser totalmente utilizadas no escopo deste desafio.