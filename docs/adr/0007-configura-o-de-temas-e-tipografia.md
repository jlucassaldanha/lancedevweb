# 0006. Mapeamento do Design System (Cores OKLCH e Tipografia)

* **Status:** Aceito

### Contexto
O desafio especificava a obrigatoriedade de seguir a paleta visual do guia em PDF e permitia o diferencial de Dark Mode. Além disso, havia necessidade de estruturar uma hierarquia tipográfica marcante para leilões.

### Decisão
1. **Cores:** Mapeou-se a paleta usando o formato `oklch` no Tailwind CSS v4. O fundo Azul Marinho foi reservado exclusivamente para o modo escuro (`.dark`), enquanto o Verde Neon assumiu a cor Primária (Ação), o Roxo a cor Secundária e o Ciano a cor de Acento.
2. **Tipografia:** Configurou-se a combinação de fontes através do pacote `next/font/google`, intercalando uma fonte Sans-Serif para leitura de dados e uma Serif para títulos de destaque.

### Consequências
* **Positivas:** Garante contraste adequado, suporte nativo e fluido ao Dark Mode e identidade visual coerente com a proposta de leilão de itens de valor.
* **Negativas:** Exige atenção na aplicação das classes utilitárias de fonte para manter a consistência entre páginas.