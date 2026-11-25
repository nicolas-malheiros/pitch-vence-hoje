# VenceHoje — Pitch de 3 minutos · v3

Especificação da apresentação: roteiro cronometrado (vira as notas do apresentador, tecla N) + especificação slide a slide + requisitos técnicos.

Equipe: Antônio Budal, Nicolas Malheiros, Lucas Santos, João Penna e Felipe Miguel.

**O que mudou da v2 para a v3**

- Cenário: a padaria virou o **Mercadinho da Esquina**, e o pão integral virou um **Arroz Branco 1kg** que vence hoje: de **R$ 7,99 por R$ 3,19 (−60%)**.
- A cliente Ana virou o cliente **Pedro**. O Seu Zé continua.
- Os papéis P1 a P5 foram trocados pelos nomes reais da equipe.
- O S3 ficou bem mais simples: **só o Felipe fala**, e os outros três fazem mímica em silêncio.
- As falas ficaram mais curtas e fáceis de dizer em voz alta. O Plano B de cortes foi refeito.
- O Felipe abre o S1 apresentando a cena e os três personagens para a banca, em ~5 s. Para caber, o S1 passou a ir até 0:20 e o S2 até 0:35 (o bloco 1 continua com 35 s).
- A cena do problema é feita de pé, na frente do telão, sem balcão nem parede imaginária: o Seu Zé só percebe que o arroz vence hoje na hora de fechar, não dá tempo de avisar ninguém, e o arroz vai para o saco de lixo do Antônio. O Pedro, ao lado, reclama que levaria com 60% de desconto se soubesse antes.
- As animações agora ficam sempre ligadas (`CONFIG.movimento: "completo"`), mesmo em PCs com as animações do Windows desligadas.

---

## 1. Números oficiais

Use exatamente estes valores nos slides e nas falas.

| Item | Valor | Rótulo na tela |
| --- | --- | --- |
| Produto da cena | Arroz Branco 1kg · de R$ 7,99 por R$ 3,19 (−60%) · vence hoje | Mercadinho da Esquina · 0,4 km |
| Desperdício no Brasil | ≈ 20 milhões de toneladas/ano | Fonte: PNUMA/UNEP, 2024 |
| TAM | 603 mil estabelecimentos · R$ 1,1 tri/ano | Mercado Total do Varejo Alimentar (ABRAS 2026) |
| SAM | 90 mil PMEs urbanas no Sul/Sudeste, em cidades > 100 mil hab. · R$ 135 mi/ano | Mercado Endereçável |
| SOM | 200 lojas parceiras ativas (meta 18–24 meses) · R$ 300 mil/ano | Faturamento inicial |
| Comissão | 15% sobre cada reserva retirada | cobrada em fatura mensal |
| Plano Premium | R$ 79/mês | destaque no app + relatórios de vendas |
| Ticket médio por loja | ≈ R$ 125/mês | = R$ 135 mi ÷ 90 mil lojas ÷ 12 |
| Pagamento | na retirada, na loja | o app só faz a reserva (QR Code) |
| Área inicial | Joinville | mercados de bairro, hortifrútis, padarias |

Conta do SOM: 200 lojas × R$ 125 × 12 meses = R$ 300 mil/ano.
Conta do ticket: loja que recupera ~R$ 620/mês em vendas pelo app paga ~R$ 93 de comissão (15%); com ~40% das lojas no Premium (R$ 79), a média fica em ~R$ 125/loja/mês.
Observação para a banca: o TAM é o faturamento do setor; SAM e SOM são receita potencial do VenceHoje. O rodapé do S8 deixa isso explícito.

Pesquisa (relatório das entrevistas), sem citar número de entrevistados:

- Lojistas: 80% perdem R$ 300+/mês com vencimento · 73% têm até 10 min/dia · 67% pagariam por uma solução · 60% temem pela imagem/responsabilidade · 76% usam promoção no balcão · 47% preferem comissão.
- Consumidores: 73% já compraram por desconto de validade · 67% andam até 10 min · 82% decidem pelo preço · 60% só vão com 30%+ de desconto · 53% nunca ouviram falar de algo parecido · 47% se preocupam com qualidade.

---

## 2. Linha do tempo (alvo 2:50, folga de 10 s)

| Bloco | Tempo | Duração | Quem fala | Slides | Restante na etiqueta ao entrar |
| --- | --- | --- | --- | --- | --- |
| 1. Problema (cena + narração) | 0:00–0:35 | 35 s | Felipe abre · Nicolas, Antônio e João atuam · Felipe narra | S1 (0:00), S2 (0:20) | 2:50 · 2:30 |
| 2. Solução + app + área | 0:35–1:10 | 35 s | Só Felipe fala · os outros em mímica | S3 (0:35), S4 (0:58) | 2:15 · 1:52 |
| 3. Pesquisa | 1:10–1:35 | 25 s | João | S5 | 1:40 |
| 4. Benchmark | 1:35–1:55 | 20 s | Lucas | S6 | 1:15 |
| 5. Fonte de receita | 1:55–2:15 | 20 s | Nicolas | S7 | 0:55 |
| 6. TAM/SAM/SOM | 2:15–2:35 | 20 s | Nicolas | S8 | 0:35 |
| 7. Conclusão | 2:35–2:50 | 15 s | Felipe + todos | S9 | 0:15 |

Passagens de vez: Felipe → João (fim do S4, "O João foi perguntar") → Lucas (fim do S5, João vira para ele) → Nicolas (fim do S6, Lucas vira para ele) → Nicolas segue no S8 → Felipe (S9). O Lucas passa os slides o tempo todo, inclusive quando ele mesmo apresenta.

## 3. Papéis

| Pessoa | Na cena | Apresenta | Falas na cena | Adereço |
| --- | --- | --- | --- | --- |
| Felipe Miguel | Narrador | Problema (S2), Solução/App/Área (S3–S4) e Conclusão (S9) | abre a cena no S1, narra o S2 e todo o S3 | — |
| Antônio Budal | A Lixeira | não apresenta slide | 1 fala curta no S1, mímica no S3, reação no S9 e a frase final em coro | saco de lixo preto aberto nas mãos |
| Lucas Santos | Passa os slides | Benchmark (S6) | nenhuma; aperta T no início e dá todos os cliques | passador de slides |
| João Penna | Pedro, o cliente | Pesquisa (S5) | 1 fala curta no S1, mímica no S3 | celular |
| Nicolas Malheiros | Seu Zé, dono do mercadinho | Fonte de receita (S7) e TAM/SAM/SOM (S8) | 1 fala curta no S1, mímica no S3 | boné, pacote de arroz 1kg com etiqueta vermelha "VENCE HOJE", celular no bolso |

---

## 4. Roteiro cronometrado

Falas entre aspas; ações entre colchetes. `[CLIQUE]` = Lucas avança. Trechos marcados com **(B1)** a **(B5)** são os cortes do Plano B.

### Bloco 1 — Problema · 0:00–0:35 · S1 → S2

A cena é feita de pé, na frente do telão: sem balcão físico e sem fingir parede entre quem está dentro e fora da loja.

[S1 no telão: "Mercadinho da Esquina · 19:58". **Lucas aperta T** para iniciar a etiqueta. Os quatro já estão de pé na frente do telão: Nicolas segurando o arroz, Antônio ao lado com o saco de lixo preto aberto, João um pouco ao lado e Felipe à frente para apresentar.]

**Felipe** [apontando para cada um]: "Oito da noite no mercadinho da esquina: o Seu Zé, dono da loja… o lixo… e o Pedro, cliente do bairro."

**Nicolas (Seu Zé)** [olha a validade e o relógio]: "Vence hoje e eu só vi agora, fechando! Não dá mais tempo de vender." [solta o arroz dentro do saco do Antônio]

**Antônio (Lixeira)** [animado, segurando o saco]: "Valeu, Seu Zé! Mais um pro lixo!"

**João (Pedro)** [olha indignado para o saco de lixo]: "Pô, Seu Zé, comida boa no lixo?! Se eu soubesse com 60% de desconto, eu levava na hora!"

[0:20 — todos congelam. Felipe dá um passo à frente.] `[CLIQUE → S2]`

**Felipe:** "Repararam? O arroz estava ótimo. **(B1)** O Seu Zé perdeu dinheiro, o Pedro perdeu 60% de desconto… e quem ganhou foi o lixo." [Antônio acena, orgulhoso]

**Felipe:** "E o Brasil joga fora cerca de 20 milhões de toneladas de comida por ano."

### Bloco 2 — Solução, amostra do app e área · 0:35–1:10 · S3 → S4

**Felipe:** "Agora vamos voltar duas horas." `[CLIQUE → S3: rebobina sozinho 19:58 → 17:58]`

[No rebobinar, Antônio devolve o arroz do saco para o Nicolas e os três voltam às posições, em silêncio. Daqui até o fim do S3, **só o Felipe fala**; os outros três acompanham a narração com mímica.]

**Felipe:** "Olha como muda: o Seu Zé vê que vence hoje e publica com 60% de desconto em segundos." [Nicolas digita no celular] `[CLIQUE 1: "Publicado!" + notificação no celular do Pedro]`

**Felipe:** "Na hora, o alerta chega no celular do Pedro: de 7,99 por 3,19. Ele reserva com um toque." [João olha o celular e sorri] `[CLIQUE 2: tela de reserva com QR Code]`

**Felipe:** "Passa no mercadinho, paga no balcão… e o lixo fica sem nada." [João mostra o celular, Nicolas entrega o arroz. Antônio olha o saco vazio e sai de lado, desolado.] `[CLIQUE 3: marca VenceHoje]`

**Felipe:** "Isso é o VenceHoje. Venceu? O anúncio sai sozinho." `[CLIQUE → S4]`

**Felipe:** "A gente começa por Joinville: mercados de bairro, hortifrútis e padarias. Mas será que as pessoas querem isso? O João foi perguntar."

### Bloco 3 — Pesquisa · 1:10–1:35 · S5

`[CLIQUE → S5]`

**João** [saindo do personagem]: "A gente foi perguntar. Entre os lojistas, 80% perdem 300 reais ou mais por mês com produto vencendo **(B2)**, e 67% pagariam por uma solução."

**João:** "Entre os consumidores, 73% já compraram por desconto de validade. E 53% nunca viram nada parecido."

**João** [vira para o Lucas]: "Mas ninguém faz isso?"

### Bloco 4 — Benchmark · 1:35–1:55 · S6

`[CLIQUE → S6]`

**Lucas:** "Faz, mas diferente. A Food To Save vende sacola surpresa. **(B4)** Você paga sem saber o que vem."

**Lucas:** "E 76% dos lojistas ainda usam plaquinha no balcão. No VenceHoje, você vê produto, preço e validade antes de sair de casa."

**Lucas** [vira para o Nicolas]: "E como isso dá dinheiro?"

### Bloco 5 — Fonte de receita · 1:55–2:15 · S7

`[CLIQUE → S7]`

**Nicolas:** "Quase metade dos lojistas pediu comissão: o lojista só paga quando vende."

**Nicolas:** "O cliente paga no balcão, o lojista escaneia o QR Code e o VenceHoje fica com 15%, numa fatura mensal. **(B3)** Quem quer destaque e relatórios assina o Premium, por 79 reais por mês."

**Nicolas:** "E o tamanho desse mercado?"

### Bloco 6 — TAM/SAM/SOM · 2:15–2:35 · S8

`[CLIQUE → S8, círculo externo]` (Nicolas continua)

**Nicolas:** "O varejo de alimentos movimenta 1,1 trilhão de reais por ano no Brasil." `[CLIQUE: SAM]` "Nosso alvo: 90 mil pequenos negócios no Sul e no Sudeste, 135 milhões por ano." `[CLIQUE: SOM]` "Em dois anos, a meta é chegar a 200 lojas parceiras: 300 mil reais por ano."

### Bloco 7 — Conclusão · 2:35–2:50 · S9

`[CLIQUE → S9; a etiqueta é ajustada para 0:15]` [os cinco se alinham lado a lado]

**Felipe:** **(B5)** "Todo dia, comida boa vai pro lixo às oito da noite. Com o VenceHoje, o Seu Zé ganha, o Pedro economiza e o lixo passa fome." [Antônio faz cara de choro]

**Felipe** [olhando para a banca]: "Banca, comida tem prazo de validade. Essa oportunidade também."

`[CLIQUE FINAL: etiqueta vai a 0:00 e carimba "VENCE HOJE"]`

**TODOS** [apontando para a banca]: "E ela vence hoje!"

---

## 5. Especificação dos slides

### 5.1 Regras globais

- **Formato:** 16:9, desenhado em 1920×1080 e escalado para caber em qualquer tela (letterbox, sem cortar). Testar em 1920×1080 e 1366×768.
- **Paleta** (mesma do relatório e da Defesa da Ideia):
  - `--verde-escuro: #0F3D24` (capa, cena, fechamento)
  - `--verde: #1B7A55` (destaques, barras)
  - `--lima: #A3DE5B` (acento, números de destaque)
  - `--offwhite: #F4F6F1` (fundo dos slides claros)
  - `--texto: #1A1A1A`
  - `--trilho: #DCE4D8` (fundo das barras)
  - `--alerta: #D94B3D` (só "vence hoje", prejuízo e a etiqueta nos últimos 20 s)
- **Fontes:** Space Grotesk (títulos e números, 600–700) e Inter (texto, 400–600). Ambas OFL.
- **Texto por slide:** no máximo 1 título + 1 número grande + 3 rótulos curtos. Nada de parágrafo.
- **Marca:** o nome "VenceHoje" só aparece no clique 3 do S3 (é a revelação). Do S4 ao S8, wordmark pequeno no canto inferior esquerdo.
- **Ícones:** SVG inline, traço simples (2 px), na cor do texto ou verde.
- **Transição entre slides:** fade de 250 ms. Nada de efeitos chamativos.

### 5.2 Etiqueta de validade (contagem regressiva)

- Fixa no canto superior direito, em todos os slides. Formato de etiqueta de preço (retângulo com furo e cordão), fundo lima, texto verde-escuro: `VENCE EM 2:50`.
- **Início:** tecla `T` (ou o primeiro avanço, se ainda estiver parada). `T` de novo pausa/retoma; `R` zera para 2:50.
- **Últimos 20 s:** fundo `--alerta`, texto branco, pulso leve a cada segundo.
- **Sincronia:** configurável em `CONFIG.timerSync`:
  - `"s9"` (padrão): ao entrar no S9, o restante é ajustado para 0:15, para cima ou para baixo, com transição suave de 400 ms (sem salto brusco).
  - `"todos"`: ao entrar em cada slide, o restante é ajustado para o valor da coluna "Restante na etiqueta ao entrar" da linha do tempo.
  - `"off"`: corre livre.
- **Final garantido:** o clique final do S9 força 0:00 e dispara o carimbo, mesmo que a contagem ainda não tenha chegado lá. Se chegar a 0:00 antes, ela para em 0:00, sem som nem alarme.

### 5.3 Slides

#### S1 — Cena: Mercadinho da Esquina · 0:00–0:20

- **Título na tela:** nenhum (é cenário).
- **Dado principal:** relógio digital "19:58" grande.
- **Layout:** fundo verde-escuro. Esquerda: fachada ilustrada "Mercadinho da Esquina" (toldo listrado verde e off-white). Direita: relógio digital grande. Base: etiqueta vermelha "Arroz Branco 1kg · R$ 7,99 · VENCE HOJE".
- **Visual:** ilustração SVG plana de balcão e vitrine com prateleiras de mercado (caixas, latas, garrafas) e, no balcão, um saco de arroz branco 1kg com etiqueta vermelha "VENCE HOJE". Sem plaquinha de promoção: na cena, o Seu Zé só percebe a validade na hora de fechar. Sem fotos.
- **Animação:** relógio avança devagar até 20:00 durante a cena (1 minuto de relógio a cada ~6 s: chega a 20:00 perto do momento em que o Seu Zé joga o arroz no saco).
- **Cliques:** nenhum interno.

#### S2 — Quem ganhou foi o lixo · 0:20–0:35

- **Título:** "Quem ganhou foi o lixo."
- **Dado principal:** "≈ 20 milhões de toneladas" + linha menor "de alimento desperdiçado por ano no Brasil". Rodapé: "Fonte: PNUMA/UNEP, 2024".
- **Layout:** fundo off-white. Faixa superior com 3 ícones grandes lado a lado: loja "−R$ 7,99" (vermelho), cliente "economia perdida", lixeira "+1". Centro: número gigante.
- **Animação:** ao entrar, os 3 ícones aparecem em sequência automática (0,6 s entre eles, acompanhando a fala); depois o número conta de 0 a 20 mi em 1,5 s.
- **Cliques:** nenhum interno.

#### S3 — Rebobinar + amostra do app · 0:35–0:58

- **Título:** nenhum até o clique 3.
- **Dado principal:** a oferta "Arroz Branco 1kg · R$ 3,19 ~~R$ 7,99~~ · −60% · Vence hoje · 0,4 km".
- **Entrada (automática, 2 s):** tela cheia verde-escuro com ícone de rebobinar e relógio voltando 19:58 → 17:58; depois aparecem os dois celulares.
- **Layout:** dois celulares lado a lado, telas feitas em HTML/CSS (não imagem). Embaixo de cada um: "Seu Zé · loja" e "Pedro · cliente".
  - **Celular esquerdo — lojista, tela "Publicar oferta":** campos preenchidos (Produto: Arroz Branco 1kg, com ícone de saco de arroz · Preço: R$ 7,99 → R$ 3,19, chip "−60%" · Quantidade: 6 · Validade: hoje) e botão verde "Publicar".
  - **Celular direito — cliente (Pedro), tela "Ofertas perto de você":** igual ao mockup da Defesa da Ideia. Endereço "Rua das Flores, 123". Filtros: Tudo · Mercado · Hortifrúti. Lista:
    - Arroz Branco 1kg · Mercadinho da Esquina · R$ 3,19 (R$ 7,99) · −60% · Vence hoje · 0,4 km
    - Iogurte Natural 170g · Mercado Bom Preço · R$ 1,59 (R$ 1,99) · −20% · Vence amanhã · 0,6 km
    - Mix de Frutas 200g · Hortifruti Central · R$ 4,49 (R$ 5,99) · −25% · Vence hoje · 0,7 km
    - Lasanha Bolonhesa 400g · Sabor Caseiro · R$ 11,19 (R$ 15,99) · −30% · Vence hoje · 1,1 km
    - Barra inferior: Descubra · Favoritos · Compras · Perfil.
    - Antes do clique 1, o Arroz Branco 1kg não está na lista.
- **Cliques (3):**
  1. Lojista: botão vira "Publicado!" com check. 0,8 s depois, notificação desliza no topo do celular do Pedro ("Arroz 1kg a 400 m · −60%") e o card do Arroz Branco 1kg entra no topo da lista.
  2. Cliente: tela de reserva: "Reservado!", QR Code grande, "Arroz Branco 1kg · R$ 3,19", "Retire até 20:00 · pague na loja", "Mercadinho da Esquina · 0,4 km".
  3. Os celulares recuam e aparece no centro o wordmark "VenceHoje" + slogan "Desconto hoje. Menos desperdício."

#### S4 — Como funciona + área de atuação · 0:58–1:10

- **Título:** "Publicar, encontrar, reservar, retirar."
- **Dado principal:** selo "Venceu? Anúncio removido automaticamente."
- **Layout:** fundo off-white.
  - Metade de cima: linha horizontal com 4 círculos numerados: 1 Loja publica · 2 App mostra ofertas perto · 3 Cliente reserva (QR Code) · 4 Retira e paga na loja. Selo verde-claro centralizado abaixo.
  - Metade de baixo: 3 cartões com ícone (Mercados de bairro · Hortifrútis · Padarias) e, à direita, pino de mapa "Joinville · SC".
- **Animação:** os 4 passos acendem em sequência automática ao entrar (0,5 s cada); depois os cartões sobem.
- **Cliques:** nenhum interno.

#### S5 — A gente perguntou · 1:10–1:35

- **Título:** "A gente perguntou."
- **Subtítulo:** "Pesquisa com lojistas e consumidores locais" (sem número de entrevistados).
- **Layout:** duas colunas com barras horizontais no estilo do relatório (barra `--verde` sobre trilho `--trilho`, percentual grande à direita em Space Grotesk).
  - Lojistas: 80% perdem R$ 300 ou mais por mês · 67% pagariam por uma solução · 73% têm até 10 min por dia.
  - Consumidores: 73% já compraram por desconto de validade · 82% decidem pelo preço · 53% nunca viram algo parecido (esta barra em `--lima`, destacada).
- **Animação:** barras crescem de 0 ao valor em 0,8 s ao entrar, coluna da esquerda primeiro.
- **Cliques:** nenhum interno.

#### S6 — Benchmark · 1:35–1:55

- **Título:** "Nosso maior concorrente é uma plaquinha de papel."
- **Layout:** tabela comparativa com ícones ✓ / ✗, coluna VenceHoje destacada (fundo verde-escuro, texto branco, levemente maior).

| Critério | VenceHoje | Food To Save | SaveFood (beta) | Plaquinha no balcão |
| --- | --- | --- | --- | --- |
| Vê o produto exato antes de sair de casa | ✓ | ✗ sacola surpresa | ✓ | ✗ |
| Validade visível na oferta | ✓ | ✗ | ✓ | ✓ |
| Alcança quem está fora da loja | ✓ | ✓ | ✓ | ✗ |
| Pagamento na retirada, sem taxa no app | ✓ | ✗ | ✗ | ✓ |

- **Rodapé:** "76% dos lojistas entrevistados usam promoção no balcão".
- **Animação:** a linha da plaquinha e a coluna VenceHoje aparecem por último (destaque).
- **Cliques:** nenhum interno.

#### S7 — Fonte de receita · 1:55–2:15

- **Título:** "Só paga quando vende."
- **Layout:** fundo off-white, dois cartões lado a lado.
  - Cartão 1 (maior, borda verde): "15%" gigante + "por reserva retirada" + selo lima "47% dos lojistas preferem comissão". Embaixo, fluxo de 3 ícones: Reserva no app → QR Code escaneado na loja → Fatura mensal.
  - Cartão 2: "R$ 79/mês" + "Plano Premium" + 2 itens: "destaque no app" · "relatórios de vendas".
- **Rodapé:** "Ticket médio estimado: R$ 125 por loja/mês".
- **Cliques:** nenhum interno.

#### S8 — TAM / SAM / SOM · 2:15–2:35

- **Título:** "Um mercado de R$ 1,1 trilhão."
- **Layout:** três círculos concêntricos à esquerda (externo verde-escuro, médio verde, interno lima); legenda à direita, alinhada a cada círculo:
  - **TAM · R$ 1,1 tri/ano** — Mercado Total do Varejo Alimentar · 603 mil estabelecimentos
  - **SAM · R$ 135 mi/ano** — Mercado Endereçável · 90 mil PMEs urbanas no Sul/Sudeste, cidades > 100 mil hab.
  - **SOM · R$ 300 mil/ano** — Faturamento inicial · 200 lojas parceiras (meta 18–24 meses)
- **Rodapé:** "TAM: faturamento do setor (ABRAS 2026). SAM e SOM: receita potencial do VenceHoje, ticket de R$ 125/loja/mês."
- **Cliques (2):** entra com o TAM; clique 1 = SAM; clique 2 = SOM. Cada círculo cresce de dentro para fora com a legenda ao lado.

#### S9 — Fechamento · 2:35–2:50

- **Título:** "Essa oportunidade vence hoje."
- **Layout:** fundo verde-escuro. A etiqueta de validade sai do canto e cresce até o centro da tela, mostrando a contagem (ajustada para 0:15 ao entrar). Embaixo: wordmark "VenceHoje", slogan "Desconto hoje. Menos desperdício." e, em letra pequena, "Antônio Budal · Nicolas Malheiros · Lucas Santos · João Penna · Felipe Miguel".
- **Clique final (1):** a etiqueta vai a 0:00, troca o texto para "VENCE HOJE" em `--alerta` e dá um carimbo (escala 1 → 1,25 → 1 em 300 ms, leve rotação de −4°).

---

## 6. Requisitos técnicos para o Claude Code

- **Um único `index.html`**, sem nenhuma requisição de rede: CSS e JS inline, ícones em SVG inline, sem CDN, sem bibliotecas externas.
- **Fontes embutidas:** Inter e Space Grotesk em WOFF2, embutidas como base64 em `@font-face` (subset latin + latin-ext, pesos 400/600/700). Fallback: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. Testar com o Wi-Fi desligado.
- **Configuração no topo do script**, num objeto `CONFIG`, para ajustes sem mexer no resto: `timerTotal: 170` (segundos), `timerSync: "s9"`, `slideStarts` (restante ao entrar em cada slide), números do TAM/SAM/SOM, comissão, Premium e nomes da equipe.
- **Teclado e passador:** → / espaço / PageDown / Enter avançam (primeiro os cliques internos do slide, depois o próximo slide); ← / PageUp voltam; `F` tela cheia; `T` inicia/pausa a etiqueta; `R` zera a etiqueta; `N` abre as notas; `Home` volta ao S1. Clique do mouse também avança.
- **Notas do apresentador (`N`):** abre uma segunda janela com a fala do slide atual (do roteiro da seção 4), a próxima fala e a etiqueta grande. Sincronizar as duas janelas por `BroadcastChannel`, com reserva via `window.postMessage` para funcionar abrindo o arquivo direto (file://).
- **Animações:** CSS (transitions/keyframes) acionadas por classes, reiniciadas a cada entrada no slide (avançando ou voltando). `CONFIG.movimento` vem como `"completo"`: as animações rodam sempre, mesmo com as animações do Windows desligadas. `"auto"` respeita `prefers-reduced-motion`; `"reduzido"` força só fades.
- **Escala:** palco fixo de 1920×1080 com `transform: scale()` para caber na janela, centralizado, fundo preto nas bordas.
- **Contraste:** texto com contraste mínimo de 4,5:1 sobre o fundo.

---

## 7. Plano B de tempo (se passar de 3:00, corte nesta ordem)

1. **B1 · S2:** tirar "O Seu Zé perdeu dinheiro, o Pedro perdeu 60% de desconto…" e ir direto para "e quem ganhou foi o lixo" (−4 s).
2. **B2 · S5:** tirar "e 67% pagariam por uma solução"; o número continua no slide (−3 s).
3. **B3 · S7:** tirar a frase do Premium; ele continua no slide (−5 s).
4. **B4 · S6:** tirar "Você paga sem saber o que vem" (−2 s).
5. **B5 · S9:** tirar a primeira frase do Felipe e ir direto para "Banca, comida tem prazo de validade…" (−6 s). O Antônio faz a cara de choro mesmo assim.

Com os cinco cortes, o pitch fica cerca de 20 s mais curto.

## 8. Perguntas prováveis da banca

| Pergunta | Resposta em uma frase |
| --- | --- |
| "Se o pagamento é na loja, como vocês garantem a comissão?" | Cada reserva gera um QR Code; o lojista escaneia na retirada, o que confirma a venda e baixa o estoque, e no fim do mês recebe uma fatura (Pix ou boleto) só das retiradas confirmadas. |
| "E se o lojista não escanear o QR para não pagar?" | A reserva fica pendente: o estoque do app não baixa, a loja não recebe a avaliação do cliente e reservas sem confirmação geram alerta para a nossa equipe. |
| "Por que 15%?" | O lojista fica com 85% de uma venda que iria para o lixo, e a comissão é cobrada só quando ele vende, que é o que 47% dos lojistas pediram. |
| "E se o cliente passar mal? A imagem da loja não fica queimada?" | 60% dos lojistas tiveram esse medo; por isso a validade fica sempre visível e o anúncio sai sozinho quando vence. |
| "O lojista vai ter tempo pra isso?" | 73% têm até 10 minutos por dia, e publicar uma oferta leva segundos. |
| "Qual desconto faz o cliente ir até a loja?" | 60% só vão com 30% ou mais e 67% andam até 10 minutos; o app prioriza ofertas próximas e com bom desconto. |
| "Por que não sacola surpresa, como a Food To Save?" | 47% dos consumidores se preocupam com a qualidade; ver o produto exato e a validade passa mais confiança. |
| "E o SaveFood, que é parecido?" | Está em fase beta; nosso foco é o comércio de bairro, com publicação em segundos, reserva sem pagamento no app e remoção automática no vencimento como padrão. |
| "Como chegaram em R$ 300 mil no SOM?" | 200 lojas × ticket médio de R$ 125/mês × 12 meses; o ticket é o mesmo do SAM (R$ 135 mi ÷ 90 mil lojas). |
