# 1. Utilização da Biblioteca Shadcn UI

**Data:** Outubro de 2026

### Contexto
O desafio exige a implementação de uma interface limpa que respeite rigorosamente uma paleta de cores específica (Azul Marinho, Verde Limão, Ciano e Roxo) e possua a capacidade (opcional, mas recomendada) de alternar entre temas Claro e Escuro. Bibliotecas tradicionais como Material UI ou Ant Design trazem muito CSS embutido, dificultando a sobreposição de estilos.

### Decisão
Optou-se por utilizar o **Shadcn UI** como base de componentes. Em vez de instalar os componentes como dependências npm fechadas, o Shadcn injeta o código-fonte na pasta do projeto, utilizando Tailwind CSS para a estilização.

### Consequências

*   **Positivas:** Permitiu total flexibilidade para reescrever as variáveis globais (`oklch`) para se adequarem à paleta da Casa de Leilões. Facilitou a implementação do *Dark Mode* de forma nativa e limpa.
*   **Negativas:** Aumenta ligeiramente a quantidade de arquivos dentro do repositório front-end, exigindo gestão manual caso algum componente base precise de atualização.