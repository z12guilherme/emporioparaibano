// script.js — versão completa com lista de temperos atualizada
// persistência localStorage
// carrinho sem bug (identificação por id, delegação, proteção contra cliques duplos)
// carrinho arrastável com pin
// geração automática de cards
window.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'emporio_cart_v1';
  let cart = [];

  const produtos = {
    temperos: [
      { name: 'Tempero Ana Maria (100g)', desc: 'O tempero Ana Maria é um mix de temperos popular no Brasil, como: alho, cebola, salsa, cebolinha, manjericão, orégano, pimentão, tomate, e caldo de galinha. Ideal para realçar carnes, aves, peixes, legumes, sopas, ensopados, arroz e feijão.', price: 5.00, img: 'img/temperos/anamaria.jpg' },
      { name: 'Tempero Chimichurri tradicional (100g)', desc: 'Mistura de chas e especiarias secas (cebola, alho, salsa, orégano, manjericão, pimentão), sem pimenta. Versátil para carnes, aves, peixes, legumes e outros pratos.', price: 5.50, img: 'img/temperos/chimichurri.jpg' },
      { name: 'Tempero Chimichurri Defumado (100g)', desc: 'Mistura de chas e especiarias com fumaça em pó para dar toque defumado a carnes, aves, peixes e legumes.', price: 5.50, img: 'img/temperos/chimichurri_defumado.jpg' },
      { name: 'Tempero Chimichurri com Pimenta (100g)', desc: 'Chimichurri com adição de pimenta para toque apimentado em carnes, aves, peixes e legumes.', price: 5.50, img: 'img/temperos/chimichurri_com_pimenta.jpg' },
      { name: 'Tempero Edu Guedes tradicional (100g)', desc: 'Mistura desidratada: cebola, cenoura, pimentão, cebolinha, salsa, alho granulado e manjericão. Ideal para molhos, carnes e arroz.', price: 5.50, img: 'img/temperos/edu_guedes_tradicional.jpg' },
      { name: 'Tempero Edu Guedes completo (100g)', desc: 'Versão completa com açafrão e outros ingredientes desidratados para sabor e cor em molhos, carnes e arroz.', price: 5.50, img: 'img/temperos/edu_guedes_completo.jpg' },
      { name: 'Tempero Feijãozinho (100g)', desc: 'Contém cebola, alho, salsa, proteína de soja sabor bacon, caldo de bacon e colorau. Prático para feijão, feijoada, sopas e caldos.', price: 5.00, img: 'img/temperos/feijaozinho.jpg' },
      { name: 'Tempero Pega Esposa (100g)', desc: 'Alho, cebola, pimentões, cenoura, folhas de louro e chas desidratadas (salsa, orégano, manjericão, alecrim). Ótimo para bifes, frango, peixes e saladas.', price: 5.50, img: 'img/temperos/pega_esposa.jpg' },
      { name: 'Tempero Lemon Pepper (100g)', desc: 'Combinação de raspas de limão, sal e pimenta-do-reino moída. Excelente em carnes suínas, aves, peixes, legumes e saladas.', price: 5.00, img: 'img/temperos/lemon_pepper.jpg' },
      { name: 'Tempero Pega Marido (100g)', desc: 'Cebola desidratada, alho granulado, pimentão vermelho, tomate seco, mostarda, alecrim, cebolinha, manjericão e louro. Para arroz, refogados, carnes e sopas.', price: 5.50, img: 'img/temperos/pega_marido.jpg' },
      { name: 'Páprica Doce (100g)', desc: 'Pimentões secos moídos que adicionam cor suave e sabor delicado a carnes, aves, peixes, sopas e molhos.', price: 3.50, img: 'img/temperos/paprica_doce.jpg' },
      { name: 'Páprica Defumada (100g)', desc: 'Pimentões defumados moídos que adicionam sabor e aroma defumado a carnes, aves, peixes e molhos.', price: 3.50, img: 'img/temperos/paprica_defumada.jpg' },
      { name: 'Páprica Picante (100g)', desc: 'Pimentões secos com adição de pimenta, para dar toque picante e cor a pratos diversos.', price: 3.50, img: 'img/temperos/paprica_picante.jpg' },
      { name: 'Açafrão (100g)', desc: 'Também conhecido como cúrcuma, adiciona cor, sabor e propriedades benéficas. Usado em carnes, arroz, sopas e molhos.', price: 4.00, img: 'img/temperos/acafrao.jpg' },
      { name: 'Colorau Paraíba (100g)', desc: 'Colorau de coloração vibrante, usado em arroz, feijão, carnes e molhos para cor e sabor suave.', price: 4.00, img: 'img/temperos/colorau_paraiba.jpg' },
      { name: 'Colorau Tradicional (100g)', desc: 'Urucum em pó que adiciona cor avermelhada e sabor levemente terroso a pratos brasileiros.', price: 3.00, img: 'img/temperos/colorau_tradicional.jpg' },
      { name: 'Cominho Moído (100g)', desc: 'Especiaria versátil para carnes, legumes, ovos, feijão, lentilha, arroz, batatas e sopas.', price: 4.50, img: 'img/temperos/cominho_moido.jpg' },
      { name: 'Mix para Arroz (100g)', desc: 'Composto de cebola, alho e cenoura desidratados para dar sabor de refogado ao arroz e outros pratos.', price: 5.00, img: 'img/temperos/mix_para_arroz.jpg' },
      { name: 'Caldo de Galinha em Pó (menos sódio) (100g)', desc: 'Caldo em pó com menos sódio para substituir cubos, prático em sopas, cozidos e molhos.', price: 3.80, img: 'img/temperos/caldo_de_galinha.jpg' },
      { name: 'Tempero Tempera Tudo (100g)', desc: 'Mistura de especiarias para dar sabor a carnes, legumes, saladas, sopas e ovos.', price: 5.00, img: 'img/temperos/tempera_tudo.jpg' },
      { name: 'Fumaça em pó (100g)', desc: 'Condimento para conferir sabor defumado a carnes, molhos, sopas e até preparações doces como molho barbecue.', price: 6.00, img: 'img/temperos/fumaca.jpg' },
      { name: 'Alho Desidratado (100g)', desc: 'Indicado em todas as preparações culinárias em substituição ao alho cru. Refogados em geral, legumes, temperos para caldos, sopas e molhos.', price: 5.00, img: 'img/temperos/alho_desidratado.jpg' },
      { name: 'Cebola em Flocos Desidratada (100g)', desc: 'Ingrediente versátil que pode ser usado em diversas receitas, tanto para sabor quanto para textura.', price: 5.50, img: 'img/temperos/cebola_em_flocos_desidratada.jpg' },
      { name: 'Pimenta Calabresa (100g)', desc: 'Muito usada para adicionar sabor picante e aroma em carnes, peixes, sopas e molhos.', price: 5.00, img: 'img/temperos/pimenta_calabresa.jpg' },
      { name: 'Sal Rosa Fino do Himalaia (100g)', desc: 'Sal puro e rico em minerais, ideal para uso diário e finalização gourmet.', price: 2.00, img: 'img/temperos/sal_rosa_fino_do_himalaia.jpg' },
      { name: 'Sal Rosa Grosso do Himalaia (100g)', desc: 'Perfeito para churrascos, substituto saudável do sal grosso comum.', price: 2.00, img: 'img/temperos/sal_rosa_grosso_do_himalaia.jpg' },
      { name: 'Sal Marinho (100g)', desc: 'Extraído da evaporação da água do mar, preserva minerais e nutrientes.', price: 2.00, img: 'img/temperos/sal_marinho.jpg' },
      { name: 'Tempero Fit Frango (100g)', desc: 'Mix sem sódio com páprica, alho, cebola, cúrcuma, chas e especiarias.', price: 5.00, img: 'img/temperos/tempero_fit_frango.jpg' },
      { name: 'Tempero Fit Completo (100g)', desc: 'Mix saudável sem conservantes, ideal para carnes, legumes, peixes e sopas.', price: 5.00, img: 'img/temperos/tempero_fit_completo.jpg' },
      { name: 'Tempero Realce (100g)', desc: 'Ideal para carnes, arroz, legumes e ensopados.', price: 4.50, img: 'img/temperos/tempero_realce.jpg' },
      { name: 'Caldo de Carne em Pó (100g)', desc: 'Prático e saboroso, substitui o caldo em cubos em sopas e carnes.', price: 3.00, img: 'img/temperos/caldo_de_carne_em_po.jpg' },
      { name: 'Caldo de Costela em Pó (100g)', desc: 'Versátil para sopas, caldos, molhos e carnes.', price: 3.00, img: 'img/temperos/caldo_de_costela_em_po.jpg' },
      { name: 'Bacon Desidratado (100g)', desc: 'Sabor defumado autêntico, ótimo em feijão, sopas, farofas e hambúrgueres.', price: 5.50, img: 'img/temperos/bacon_desidratado.jpg' },
      { name: 'Pimenta do Reino Preta em Grãos (100g)', desc: 'Grãos inteiros com aroma intenso, ideal para moer na hora.', price: 8.00, img: 'img/temperos/pimenta_do_reino_graos.jpg' },
      { name: 'Pimenta do Reino Preta Moída (100g)', desc: 'Versátil, dá toque picante e marcante em carnes, molhos e sopas.', price: 8.00, img: 'img/temperos/pimenta_do_reino_preta_moida.jpg' },
      { name: 'Mostarda em Grãos (100g)', desc: 'Sementes amarelas com sabor marcante, usadas em molhos, carnes e chás.', price: 7.00, img: 'img/temperos/mostarda_em_graos.jpg' },
      { name: 'Tempero Master Chef (100g)', desc: 'Seleção de especiarias para sabor intenso e gourmet.', price: 5.50, img: 'img/temperos/masterchef.jpg' },
      { name: 'Tempero Molho Tártaro (100g)', desc: 'Blend com cebola, cenoura, pimentão e chas, ótimo para molhos e peixes.', price: 4.50, img: 'img/temperos/molho_tartaro.jpg' },
      { name: 'Orégano (100g)', desc: 'Erva aromática clássica para massas, pizzas, carnes e molhos.', price: 6.00, img: 'img/temperos/oregano.jpg' },
      { name: 'Tempero Cebola, Alho e Salsa (100g)', desc: 'Combinação versátil para carnes, aves, arroz, feijão e sopas.', price: 5.00, img: 'img/temperos/alho_salsa_cebola.jpg' },
      { name: 'Salsa Desidratada (100g)', desc: 'Prática para sopas, molhos, carnes, saladas e peixes.', price: 4.00, img: 'img/temperos/salsa_desidratada.jpg' },
      { name: 'Alho Frito Granulado (100g)', desc: 'Adiciona crocância e sabor em pratos, ótimo para finalizar receitas.', price: 5.00, img: 'img/temperos/alho_frito_granulado.jpg' },
      { name: 'Tempero Curry (100g)', desc: 'É uma ótima combinação para temperar: carnes, peixes, aves, batatas, sopa, molhos, ovos, moluscos, vegetais, grãos, assados e cozidos em geral.', price: 4.00, img: 'img/temperos/curry.jpg' },
      { name: 'Tempero Baiano sem Pimenta (100g)', desc: 'É uma mistura de cominho e especiarias que serve para dar sabor e aroma a diversos pratos. Pode ser usado em carnes, feijão, feijoada, sopas, caldos, entre outros pratos. Obs. O Tempero Baiano é moído na hora, para manter seu aroma e sabor ainda mais marcantes.', price: 5.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Tempero Baiano com Pimenta (100g)', desc: 'É uma mistura de cominho e especiarias, com adição de pimentas, que serve para dar sabor e aroma a diversos pratos, além de dar um toque apimentado. Pode ser usado em carnes, feijão, feijoada, sopas, caldos, entre outros pratos. Obs. O Tempero Baiano é moído na hora, para manter seu aroma e sabor ainda mais marcantes.', price: 5.50, img: 'img/temperos/placeholder.jpg' },
      { name: 'Ajinomoto (100g)', desc: 'Ideal para temperar qualquer preparação salgada, como carnes, frangos, legumes, verduras, feijão e arroz, e garantir sabor de forma prática e econômica.', price: 4.50, img: 'img/temperos/placeholder.jpg' },
      { name: 'Alho em pó (100g)', desc: 'É um tempero versátil que pode ser usado em uma variedade de pratos para adicionar sabor e aroma. Ele pode ser adicionado a sopas, molhos, carnes, aves, peixes, vegetais e muito mais. É importante lembrar que o alho em pó é mais concentrado que o alho fresco, então use com moderação no início e ajuste a quantidade conforme necessário.', price: 4.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Amaciante de carnes (100g)', desc: 'O Amaciante de Carne é um produto que promove a maciez da carne, resultando assim em uma carne mais macia e suculenta.', price: 3.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Tempero Beef Ribs (100g)', desc: 'Ideal para preparar carnes bovinas, suínas, assados, e refogados, ele também adiciona um sabor excepcional em hambúrgueres, ovos e muitos outros pratos.', price: 5.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Caldo de Bacon em Pó (100g)', desc: 'É um tempero que dá um sabor defumado e irresistível às suas receitas. Perfeito para dar um toque especial a sopas, feijões, molhos, risotos e muito mais.', price: 3.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Caldo de Legumes em Pó (100g)', desc: 'Pode-se dissolver o pó em água quente e usar o caldo líquido como base para sopas, molhos e risotos, ou adicionar uma pitada diretamente nos alimentos enquanto cozinha para intensificar o sabor.', price: 3.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Cebola desidratada (100g)', desc: 'A cebola desidratada é um tempero amplamente utilizado na culinária para adicionar sabor e aroma a pratos salgados. Ela é produzida a partir de cebolas frescas que passam por um processo de desidratação para remover a água e concentrar os seus sabores e nutrientes.', price: 4.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Cominho em grãos (100g)', desc: 'O Cominho em grãos, é uma especiaria versátil que pode ser usada em diversos pratos, como carnes, legumes, ovos, queijos, feijão, lentilha, arroz, batatas, sopas e caldos.', price: 6.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Cominho Temperado moído (100g)', desc: 'Além do tradicional sabor do Cominho, ele contém louro, orégano e sementes de coentro para intensificar ainda mais seu sabor.', price: 5.50, img: 'img/temperos/placeholder.jpg' },
      { name: 'Creme de Cebola (100g)', desc: 'O creme de cebola em pó serve principalmente para dar sabor e uma textura cremosa a uma variedade de pratos, como sopas, cremes, molhos, marinadas, carnes, aves, hambúrgueres, almôndegas e recheios.', price: 4.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Cúrcuma em Pó (100g)', desc: 'É uma especiaria muito utilizada para conferir cor, sabor e aroma a diversos pratos, tornando-os ainda mais saborosos e saudáveis. Ela combina, principalmente com receitas salgadas como molhos, feijão, arroz, frutos do mar, frango, sopas, biscoitos, entre outros, além de ser muito conhecida por ser poder anti-inflamatório e antioxidante.', price: 4.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Tempero Limão e Ervas Finas (100g)', desc: 'É uma mistura versátil que combina o aroma e sabor das ervas aromáticas, como salsa, cebolinha e tomilho, com a refrescância e acidez do limão, em forma de raspas ou pó. É ideal para dar um toque fresco a peixes, aves, saladas, vegetais e patês.', price: 5.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Tempero Limão e Orégano (100g)', desc: 'É uma combinação de ingredientes que traz um sabor cítrico e aromático a pratos como carnes, aves, peixes e saladas.', price: 5.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Manjericão (100g)', desc: 'O manjericão seco é uma erva aromática desidratada, usada para adicionar sabor e aroma a pratos como molhos, sopas, massas, carnes e saladas, e também pode ser consumido em chá. Por ser desidratado, é prático, duradouro (até um ano) e fácil de usar em diversas preparações, mantendo o sabor intenso e as propriedades da erva fresca.', price: 4.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Tempero Mix para Frango (100g)', desc: 'Perfeito para preparar desde um simples frango cozido até um delicioso frango assado, esse mix vai te surpreender com seu sabor e qualidade, possui uma combinação de temperos que realça o sabor de sua refeição, tornando-a especial e única.', price: 5.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Nozes Moscada Inteiro (und)', desc: 'É uma especiaria versátil usada em pratos doces e salgados, como molhos (branco e strogonoff), massas, risotos, purês, bolos, pudins e tortas, realçando o sabor de carnes suaves, como aves e peixes. Também é utilizada em bebidas, como cappuccinos, entre outras. A forma mais aromática é a ralada na hora do uso, usando um ralador fino.', price: 1.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Pimenta Caiena em Pó (100g)', desc: 'Serve principalmente para adicionar picância e sabor a pratos salgados e pode ser usada em diversas preparações culinárias, como carnes, aves, peixes, saladas, molhos e sopas. Além disso, ela possui propriedades termogênicas, auxiliando na aceleração do metabolismo e na queima de calorias.', price: 6.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Pimenta Rosa (100g)', desc: 'Ela pode ser usada inteira, levemente esmagada ou moída, em pratos salgados e doces. Combina bem com carnes, peixes, aves, molhos, saladas, e até mesmo em sobremesas e bebidas, adicionando um toque aromático e sofisticado.', price: 6.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Sal de Parrilla (100g)', desc: 'O sal de parrilla é um tipo de sal com granulometria menor que o sal grosso, ideal para churrascos e assados, especialmente em carnes mais espessas. Sua principal função é salgar a carne de maneira uniforme, sem ressecá-la e evitando a perda excessiva de líquidos, o que ajuda a manter a suculência.', price: 2.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Semente de Coentro (100g)', desc: 'Pode ser usada inteira ou esmagadas, em molhos de carnes e peixes, em feijões e para temperar leguminosas e sopas, também pode ser levemente tostado e moído na hora para intensificar o sabor e o aroma.', price: 4.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Semente de Coentro Rosa (100g)', desc: 'Assim como a semente tradicional, pode ser usada inteira ou esmagadas, em molhos de carnes e peixes, em feijões e para temperar leguminosas e sopas, também pode ser levemente tostado e moído na hora para intensificar o sabor e o aroma.', price: 5.00, img: 'img/temperos/placeholder.jpg' },
      { name: 'Tempero para Churrasco sem Pimenta (100g)', desc: 'O tempero de churrasco em pó é uma mistura de especiarias e ervas secas que é usada para realçar o sabor de carnes grelhadas, assadas ou churrascos.', price: 4.00, img: 'img/temperos/placeholder.jpg' }
    ],

    chas: [
      { name: 'Alcachofra (50g)', desc: 'A alcachofra auxilia na melhora da digestão, auxilia na regulação do colesterol, atua como diurético e fonte de fibras, também é tradicionalmente usada como hepatoprotetor.', price: 3.50, img: 'img/chas/alcachofra.jpg' },
      { name: 'Alecrim (50g)', desc: 'O alecrim serve para temperar alimentos, atuar como repelente de insetos, além de ter benefícios para a saúde, como melhorar a digestão e a memória, aliviar dores de cabeça, ter ação antioxidante e ajudar a reduzir inflamações e gases.', price: 2.50, img: 'img/chas/alecrim.jpg' },
      { name: 'Alfazema (50g)', desc: 'A alfazema (ou lavanda) ajuda a acalmar a mente, reduzir a ansiedade e a insônia, e aliviar dores e tensões musculares devido às suas propriedades relaxantes, sedativas, analgésicas e anti-inflamatórias.', price: 4.00, img: 'img/chas/alfazema.jpg' },
      { name: 'Amora Folhas (50g)', desc: 'A folha de amora é utilizada para auxiliar a regular as taxas hormonais, combater os sintomas da menopausa e TPM, fortalecer o sistema imunológico, melhorar a saúde digestiva e da pele, e ajudar no controle do peso corporal.', price: 3.00, img: 'img/chas/amora.jpg' },
      { name: 'Anis-Estrelado (50g)', desc: 'O anis-estrelado serve para diversas finalidades: é usado na culinária como especiaria e para aromatizar alimentos e bebidas, como chás, licores e gin; na medicina popular, tem propriedades digestivas, expectorantes e antibacterianas.', price: 5.00, img: 'img/chas/anis_estrelado.jpg' },
      { name: 'Aroeira Casca (50g)', desc: 'A aroeira é usada na medicina popular pelas suas propriedades anti-inflamatórias, antimicrobianas e cicatrizantes, sendo indicada para tratar problemas urinários (como cistite), inflamações gerais e reumatismo.', price: 3.50, img: 'img/chas/casca_de_aroeira.jpg' },
      { name: 'Barbatimão Rasurado (50g)', desc: 'O barbatimão é muito utilizado para acelerar a cicatrização de feridas, cortes, queimaduras, e úlceras na pele devido às suas propriedades cicatrizantes, adstringentes, antibacterianas e anti-inflamatórias.', price: 3.00, img: 'img/chas/barbatimao.jpg' },
      { name: 'Boldo (50g)', desc: 'O chá de Boldo auxilia na melhora da digestão, no tratamento de problemas hepáticos, ajuda o funcionamento adequado do fígado e alivia desconfortos gastrointestinais, reduzindo sintomas como inchaço abdominal, gases e azia.', price: 4.50, img: 'img/chas/cha_boldo.jpg' },
      { name: 'Camomila (50g)', desc: 'A camomila ajuda a acalmar, melhorar o sono e aliviar a ansiedade, devido aos seus efeitos sedativos e ansiolíticos. Também é usada para reduzir a inflamação e aliviar sintomas digestivos como indigestão e cólicas.', price: 4.00, img: 'img/chas/camomila.jpg' },
      { name: 'Canela em Pau (50g)', desc: 'A canela em pau serve como um ingrediente saboroso e versátil na culinária, sendo adicionada a doces, pães, bolos, café, chás e até a pratos salgados, para realçar o sabor.', price: 4.80, img: 'img/chas/canela_em_pau.jpg' },
      { name: 'Canela-de-Velho (50g)', desc: 'A canela-de-velho é uma planta medicinal usada para aliviar dores nas articulações, como artrite e artrose, devido às suas propriedades anti-inflamatórias e analgésicas.', price: 2.50, img: 'img/chas/canela_de_velho.jpg' },
      { name: 'Capim-Limão (50g)', desc: 'O Capim-santo, também conhecido como capim-limão ou capim-cidreira, é uma planta medicinal com propriedades calmantes, digestivas, antioxidantes e antimicrobianas.', price: 3.50, img: 'img/chas/capim_limao.jpg' },
      { name: 'Cardo-Mariano (50g)', desc: 'O cardo mariano é uma planta de flores roxas cujo principal componente ativo é a silimarina, um poderoso antioxidante e hepatoprotetor.', price: 3.50, img: 'img/chas/cardo_mariano.jpg' },
      { name: 'Carqueja (50g)', desc: 'A carqueja é muito utilizada para auxiliar em problemas de digestão e do fígado, como azia e gastrite, além de atuar como diurético, ajudando a reduzir a retenção de líquidos.', price: 2.50, img: 'img/chas/carqueja.jpg' },
      { name: 'Cavalinha (50g)', desc: 'A cavalinha serve como um agente diurético natural, ajudando o corpo a eliminar o excesso de líquidos e combatendo o inchaço, e é um excelente remineralizante.', price: 4.00, img: 'img/chas/cavalinha.jpg' },
      { name: 'Chá Mate (50g)', desc: 'O chá mate verde serve para dar mais energia e melhorar o foco devido à sua cafeína e outras substâncias stimulantes, além de ser um potente diurético e antioxidante.', price: 2.50, img: 'img/chas/mate.jpg' },
      { name: 'Chá Preto (50g)', desc: 'O chá preto serve para aumentar a energia e o foco, graças à cafeína e à L-teanina, além de contribuir para a saúde do coração e do cérebro por ser rico em antioxidantes.', price: 3.50, img: 'img/chas/cha_preto.jpg' },
      { name: 'Chá-Seca-Barriga (50g)', desc: 'O chá "seca barriga", refere-se a misturas de ervas comumente associadas à perda de peso e redução da gordura abdominal.', price: 3.50, img: 'img/chas/cha_seca_barriga.jpg' },
      { name: 'Chá Verde (50g)', desc: 'O chá verde oferece uma variedade de benefícios para a saúde, como sua ação antioxidante, que combate o envelhecimento precoce, ele também pode ajudar no processo de emagrecimento ao acelerar o metabolismo.', price: 3.00, img: 'img/chas/cha_verde.jpg' },
      { name: 'Chambá (50g)', desc: 'O Chambá é uma planta medicinal popularmente utilizada como expectorante, broncodilatador, antitussígeno e para tratar problemas respiratórios como asma, bronquite, tosse e chiado no peito.', price: 3.00, img: 'img/chas/chamba.jpg' },
      { name: 'Chapéu-de-Couro (50g)', desc: 'O chapéu-de-couro pode auxiliar no tratamento de problemas no sistema urinário, como infecções, devido às suas propriedades diuréticas, anti-inflamatórias e depurativas.', price: 3.50, img: 'img/chas/chapeu_de_couro.jpg' },
      { name: 'Cravo-da-India (50g)', desc: 'O cravo-da-índia, além de muito utilizado na culinária para a preparação de diversos pratos, também possui ação antioxidante, anti-inflamatória e antimicrobiana.', price: 6.00, img: 'img/chas/cravo_da_india.jpg' },
      { name: 'Dente-de-Leão (50g)', desc: 'O dente-de-leão é usado para diversas finalidades na medicina popular e pode ser consumido como chá, devido às suas propriedades diuréticas, depurativas e hepatoprotetoras.', price: 4.00, img: 'img/chas/dente_de_leao.jpg' },
      { name: 'Desinchá (50g)', desc: 'O chá Desinchá é utilizado para auxiliar na redução do inchaço corporal, promover a saciedade, dar mais energia e acelerar o metabolismo, contribuindo para um processo de emagrecimento saudável.', price: 3.50, img: 'img/chas/desincha.jpg' },
      { name: 'Endro (50g)', desc: 'O endro oferece vários benefícios, principalmente por suas propriedades digestivas, ajudando a aliviar gases, inchaço, cólicas, constipação e náuseas.', price: 2.50, img: 'img/chas/cha_endro.jpg' },
      { name: 'Erva-Baleeira (50g)', desc: 'A Erva-baleeira é muito utilizada para aliviar dores e inflamações, sendo recomendada para condições como artrite, reumatismo, dores musculares e na coluna, contusões e torções.', price: 3.50, img: 'img/chas/erva_baleeira.jpg' },
      { name: 'Erva-Cidreira (50g)', desc: 'A Erva-cidreira é muito utilizada para acalmar, reduzir a ansiedade e melhorar o sono, atuando como um calmante natural no sistema nervoso central.', price: 3.50, img: 'img/chas/erva_cidreira.jpg' },
      { name: 'Erva-Doce Argentina (50g)', desc: 'A Erva-doce argentina serve para diversos fins, principalmente para a melhora da digestão, alívio de gases e cólicas, mas também tem propriedades que a tornam benéfica para a saúde dos fígado.', price: 4.00, img: 'img/chas/erva_doce_argentina.jpg' },
      { name: 'Erva-Doce Tradicional (50g)', desc: 'A Erva-doce tradicional é muito utilizada na culinária e na medicina popular devido ao seu sabor adocicado e propriedades digestivas e anti-inflamatórias.', price: 2.50, img: 'img/chas/erva_doce.jpg' },
      { name: 'Espinheira-Santa (50g)', desc: 'A Espinheira-santa é utilizada para aliviar problemas digestivos, como gastrite, úlceras, azia, má digestão e gases, atuando como protetor da mucosa gástrica e redutor da acidez estomacal.', price: 3.80, img: 'img/chas/espinheira_santa.jpg' },
      { name: 'Eucalipto (50g)', desc: 'O eucalipto oferece uma variedade de benefícios, para a saúde com suas propriedades expectorantes e descongestionantes ajudam a aliviar problemas respiratórios como gripes, resfriados e sinusites.', price: 2.50, img: 'img/chas/cha_eucalipto.jpg' },
      { name: 'Folha de Abacateiro (50g)', desc: 'A folha de abacate serve para preparar um chá com propriedades diuréticas, antioxidantes e anti-inflamatórias, que podem auxiliar no controle da diabetes e da pressão alta.', price: 3.00, img: 'img/chas/folha_de_abacate.jpg' },
      { name: 'Ginkgo-Biloba (50g)', desc: 'O Ginkgo Biloba é uma planta comumente usada para melhorar a memória e outras funções cognitivas, além de auxiliar na circulação sanguínea e no tratamento de zumbidos e vertigens.', price: 4.00, img: 'img/chas/ginkgo_biloba.jpg' },
      { name: 'Graviola Folhas (50g)', desc: 'As folhas da graviola possuem diversas propriedades benéficas à saúde, incluindo ação antioxidante, anti-inflamatória e antimicrobiana, além de auxiliar no controle da diabetes e na saúde digestiva.', price: 3.50, img: 'img/chas/graviola.jpg' },
      { name: 'Hibisco (50g)', desc: 'O Chá de Hibisco, pode oferecer vários benefícios para a saúde, incluindo a melhora da saúde cardiovascular, ajudando a controlar a pressão arterial e o colesterol.', price: 3.50, img: 'img/chas/hibisco.jpg' },
      { name: 'Hortelã (50g)', desc: 'O Chá de Hortelã pode auxiliar na melhora da digestão, aliviar cólicas e gases intestinais, reduzir náuseas, aliviar dores de cabeça e musculares, combater sintomas de gripe e resfriados.', price: 3.00, img: 'img/chas/hortela.jpg' },
      { name: 'Ipê-Roxo (50g)', desc: 'O Ipê-Roxo pode oferecer múltiplos benefícios à saúde, como ação anti-inflamatória, antibiótica e antifúngica, além de ser um potente antioxidante.', price: 3.00, img: 'img/chas/ipe_roxo.jpg' },
      { name: 'Jatobá Casca (50g)', desc: 'O jatobá possui propriedades anti-inflamatórias, antioxidantes, antiespasmódicas e expectorantes, que podem ser usadas para ajudar no tratamento de feridas, dor de estômago, diarreia ou inflamação na garganta.', price: 3.00, img: 'img/chas/jatoba.jpg' },
      { name: 'Louro Folhas (40g)', desc: 'A folha de louro serve para melhorar a digestão, aliviar dores musculares e cólicas, combater o estresse, reduzir a retenção de líquidos e ajudar no controle do colesterol e da diabetes.', price: 3.00, img: 'img/chas/cha_louro.jpg' },
      { name: 'Melissa (50g)', desc: 'O chá de melissa, também conhecido como erva-cidreira, oferece diversos benefícios como a ação calmante para combater a ansiedade e a insónia, propriedades digestivas, anti-inflamatórias, antioxidantes e antivirais.', price: 3.50, img: 'img/chas/melissa.jpg' },
      { name: 'Mulungu (30g)', desc: 'O Mulungu, conhecido por suas propriedades calmantes e sedativas, é tradicionalmente utilizado como um remédio natural para ansiedade, estresse e insônia, auxiliando no relaxamento muscular.', price: 3.00, img: 'img/chas/mulungu.jpg' },
      { name: 'Passiflora (50g)', desc: 'A Passiflora, também conhecida como flor-do-maracujá, oferece diversos benefícios à saúde, principalmente devido às suas propriedades calmantes e ansiolíticas.', price: 3.00, img: 'img/chas/cha_passiflora.jpg' },
      { name: 'Pata-de-Vaca (50g)', desc: 'A Pata-de-Vaca tem como principais benefícios o auxílio no controle do diabetes (ação hipoglicemiante), a ação diurética, que ajuda na eliminação de líquidos, e propriedades antioxidantes e anti-inflamatórias.', price: 3.00, img: 'img/chas/pata_de_vaca.jpg' },
      { name: 'Pau-Tenente (50g)', desc: 'O Pau-Tenente, também conhecido como pau amargo, quina ou quassia, é uma planta medicinal muito usada para problemas digestivos, falta de apetite, diabetes e parasitas intestinais.', price: 3.50, img: 'img/chas/pau-tenente.jpg' },
      { name: 'Pedra-Hume (50g)', desc: 'A pedra hume serve para estancar pequenos sangramentos (como os de depilação ou barbear), cicatrizar feridas superficiais, reduzir a transpiração e o mau cheiro nas axilas.', price: 3.00, img: 'img/chas/pedra_ume.jpg' },
      { name: 'Picão-Preto (50g)', desc: 'O Chá de Picão-preto tem vários benefícios, incluindo ação anti-inflamatória, hepatoprotetora, diurética e antioxidante.', price: 3.00, img: 'img/chas/cha_picao_preto.jpg' },
      { name: 'Porangaba (50g)', desc: 'O chá de Porangaba é utilizado principalmente como diurético para evitar a retenção de líquidos, termogênico e também como inibidor de apetite.', price: 3.00, img: 'img/chas/porangaba.jpg' },
      { name: 'Quixaba (50g)', desc: 'O Chá de Quixaba é muito usado para aliviar inflamações no útero e cistos ovarianos, tratar diabetes, auxiliar na cicatrização de feridas na pele e como anti-inflamatório em geral.', price: 3.50, img: 'img/chas/quixaba.jpg' },
      { name: 'Quebra-Pedra (50g)', desc: 'O Chá de Quebra-pedra é tradicionalmente usado para ajudar na prevenção e no tratamento de pedras nos rins e problemas do trato urinário.', price: 4.00, img: 'img/chas/quebra_pedra.jpg' },
      { name: 'Sene (30g)', desc: 'O chá de sene oferece benefícios como alívio da prisão de ventre, através das suas propriedades laxativas, a planta auxilia na eliminação de gases e evita a retenção de líquidos.', price: 2.00, img: 'img/chas/sene.jpg' },
      { name: 'Sucupira Semente (50g)', desc: 'A Semente da Sucupira, de árvores nativas do Brasil, é tradicionalmente usada na medicina popular por suas propriedades anti-inflamatórias, analgésicas e antioxidantes.', price: 8.00, img: 'img/chas/sucupira.jpg' },
      { name: 'Unha de Gato (50g)', desc: 'A unha de gato é usada popularmente para tratar condições inflamatórias como artrite, reumatismo e sinusite, e para fortalecer o sistema imunológico.', price: 3.50, img: 'img/chas/unha_de_gato.jpg' },
      { name: 'Uxi Amarelo (50g)', desc: 'Uxi amarelo é uma planta medicinal muito usada para auxiliar no tratamento de inflamações do útero, infecção urinária ou artrite, pois tem propriedades anti-inflamatórias, antioxidantes, diuréticas.', price: 3.00, img: 'img/chas/uxi_amarelo.jpg' },
    ],

    funcionais: [
      { name: 'Açaí em Pó (100g)', desc: 'O Açaí em Pó é rico em fibras, antioxidantes e gorduras saudáveis, serve como um ingrediente nutritivo para a culinária, podendo ser adicionado a sucos, vitaminas, bolos e outras preparações para enriquecer seu valor nutricional. Seus benefícios incluem a promoção da saúde intestinal, o auxílio no controle do colesterol e o fornecimento de energia para o corpo.', price: 6.50, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Aveia em Flocos Finos (100g)', desc: 'A Aveia em flocos finos oferece benefícios como a melhora da saúde intestinal e do coração, o controle do açúcar no sangue e do colesterol, a promoção da saciedade, o auxílio na perda de peso e o fortalecimento do sistema imunológico. É rica em fibras solúveis como a betaglucana, vitaminas do complexo B, minerais e antioxidantes, que contribuem para o bem-estar geral e a proteção do corpo.', price: 1.70, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Gérmen de trigo (100g)', desc: 'O Gérmen de Trigo auxilia na melhora da saúde da pele e dos cabelos, fortalecer o sistema imunológico, regular o intestino e a pressão arterial, auxiliar no controle do colesterol e do açúcar no sangue, e também pode ter um papel importante na redução dos sintomas da menopausa.', price: 4.50, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Aveia em Flocos Grossos (100g)', desc: 'A aveia em flocos grossos serve como um alimento funcional rico em fibras e outros nutrientes, que auxilia na saúde cardiovascular, controla o colesterol, favorece o emagrecimento e a saciedade, melhora o trânsito intestinal e atua como prebiótico, além de ser uma ótima fonte de vitaminas e minerais. Culinariamente, é usada em granolas, mingaus, bolos, biscoitos e para acompanhar frutas, iogurtes e shakes.', price: 1.70, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Cacau em Pó 100% (100g)', desc: 'O cacau 100% em pó oferece múltiplos benefícios à saúde, como proteção cardiovascular ao reduzir a pressão arterial e melhorar o fluxo sanguíneo, ação antioxidante contra o envelhecimento precoce, regulação do humor através da estimulação de serotonina, e auxílio no controle do açúcar no sangue e saúde intestinal devido ao seu baixo índice glicêmico e fibras.', price: 4.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Canela em Pó (100g)', desc: 'A canela em pó serve para diversas funções na saúde e culinária, atuando como um potente agente antioxidante e anti-inflamatório, ajudando no controle da glicemia, melhorando a digestão e fortalecendo o sistema imunológico. Na culinária, pode ser usada para dar sabor e aroma a pratos doces e salgados, e como um ingrediente termogênico que acelera o metabolismo, auxiliando na queima de gordura.', price: 5.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Catuaba em Pó (100g)', desc: 'A Catuaba em pó serve como um energizante natural e afrodisíaco, ajudando a aumentar a energia física e mental, combater o cansaço, a fadiga e o estresse, melhorar a memória, a circulação sanguínea e a função sexual. Também possui propriedades antioxidantes e anti-inflamatórias, sendo utilizada para aumentar a vitalidade e o bem-estar geral.', price: 4.50, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Colágeno em Pó Hidrolisado (100g)', desc: 'O Colágeno em pó Hidrolisado serve para fortalecer a pele, unhas e cabelos, prevenir a flacidez e melhorar a saúde das articulações e ossos, o que é especialmente útil com o envelhecimento, quando o corpo produz menos colágeno. Ele também ajuda na recuperação muscular e desempenho físico, além de complementar a dieta e as estruturas do corpo como tendões e cartilagens.', price: 130.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Creatina Monohidratada (100g)', desc: 'Os principais benefícios da creatina incluem o aumento da massa e força muscular, melhora da performance em exercícios de alta intensidade, e auxílio na recuperação muscular após o treino, pois fornece energia para os músculos e atrai água para dentro das células musculares. Além disso, a creatina contribui para a prevenção de doenças crônicas, melhora da saúde óssea e pode ter efeitos positivos na função cerebral, como melhora da cognição e da memória.', price: 19.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Dolomita (100g)', desc: 'A dolomita em pó serve para suplementar cálcio e magnésio, beneficiando a saúde óssea e muscular, a saúde digestiva e auxiliando a saúde bucal. Na pele e cabelos, tem efeitos anti-inflamatórios, calmantes e clareadores, sendo usada em máscaras faciais e como tratamento para espinhas, manchas e caspa.', price: 3.50, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Extrato de Soja em pó (100g)', desc: 'O extrato de soja em pó é um alimento que serve como alternativa ao leite de vaca para intolerantes à lactose ou alergia a proteínas animais, podendo ser consumido em bebidas, vitaminas e receitas. Além disso, é rico em proteínas, fibras e fitoestrogênios (isoflavonas), que contribuem para a saúde cardiovascular, o alívio dos sintomas da menopausa, a manutenção da massa óssea e o controle do açúcar no sangue.', price: 3.50, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farelo de Aveia (100g)', desc: 'O farelo de aveia ajuda a diminuir o colesterol "ruim", combater a prisão de ventre, emagrecer e evitar a diabetes. Isso porque esse cereal é rico em fibras que facilitam a evacuação, promovem a saciedade e equilibram os níveis de glicose no sangue.', price: 1.70, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha da Felicidade (100g)', desc: 'A farinha da felicidade é uma mistura de ingredientes naturais, que serve para melhorar o bem-estar e a saúde, principalmente através do consumo de fibras. Seus benefícios incluem auxílio na digestão, promoção da saciedade para o controle do apetite e do peso, fortalecimento dos ossos e melhora da imunidade. Pode ser adicionada a diversos alimentos como sucos, iogurtes, bolos e sopas para enriquecer a dieta.', price: 5.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Amêndoas (100g)', desc: 'A farinha de amêndoas oferece benefícios como o controle da glicemia e do colesterol, auxílio na saciedade e no emagrecimento, e é uma fonte de fibras, proteínas, gorduras saudáveis, vitamina E e magnésio. Por não conter glúten, é uma ótima alternativa para celíacos e intolerantes, além de ser versátil e saborosa em diversas receitas.', price: 12.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Amendoim (100g)', desc: 'A Farinha de Amendoim é fonte de ferro, cálcio, potássio e manganês. É rica também em gorduras boas. Ótima fonte de proteínas, auxiliando na disposição para atividades físicas, além dos benefícios para a saúde, a Farinha de Amendoim é feita apenas com amendoim torrado e moído e é uma excelente opção nutritiva e saborosa para muitas receitas como biscoitos, bolos, pães, cookies e muito mais.', price: 3.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Arroz (100g)', desc: 'A farinha de arroz oferece benefícios como ser uma opção sem glúten para celíacos e intolerantes, auxiliar na saúde digestiva e cardíaca, controlar o peso por promover saciedade devido às fibras, além de ser fonte de vitaminas do complexo B, proteínas e minerais essenciais como magnésio e ferro, contribuindo para a saúde óssea e muscular.', price: 2.50, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Aveia (100g)', desc: 'A farinha de aveia serve principalmente como um ingrediente versátil para enriquecer a alimentação, sendo usada em receitas como bolos, pães, tortas e panquecas, e adicionada a vitaminas, sucos ou iogurtes. Devido ao seu teor de fibras e nutrientes como magnésio, zinco e manganês, ela contribui para a saúde cardiovascular, ajuda no controle do peso, melhora a digestão e pode aumentar a sensação de saciedade.', price: 1.70, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Banana Verde (100g)', desc: 'A farinha de banana verde serve como suplemento alimentar rico em amido resistente, auxiliando no controle do peso, da glicose e do colesterol, além de melhorar a saúde intestinal e fortalecer a imunidade. Pode ser usada como alternativa à farinha de trigo para pessoas com intolerância ao glúten e também como espessante natural em receitas doces e salgadas, como bolos, cremes e sopas.', price: 3.80, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Batata Doce (100g)', desc: 'A Farinha de Batata Doce é benéfica porque é uma fonte de carboidrato de baixo índice glicêmico, rico em fibras, vitaminas (A, C, B) e minerais (ferro, cálcio, potássio, magnésio), promovendo energia sustentada, saciedade, saúde intestinal e imunidade. Ajuda no ganho de massa muscular e na queima de gordura, além de ter propriedades antioxidantes que combatem radicais livres, sendo útil para a saúde da pele, olhos e prevenção de doenças crônicas.', price: 3.80, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Berinjela (100g)', desc: 'A farinha de berinjela auxilia na perda de peso e no controle do colesterol e da glicemia por ser rica em fibras. Ela também é uma boa fonte de vitaminas e minerais, como as vitaminas do complexo B, C e A, e magnésio, que contribuem para a saciedade, a função intestinal e a saúde do coração, além de ter propriedades antioxidantes que protegem as células.', price: 6.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Beterraba (100g)', desc: 'A farinha de beterraba é um suplemento nutritivo que serve para melhorar o desempenho físico, ajudar na saúde cardiovascular (reduzindo a pressão arterial), fortalecer a imunidade, auxiliar no controle do nível de açúcar no sangue, combater a anemia e melhorar o funcionamento do intestino.', price: 9.90, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Castanha de Caju (100g)', desc: 'A farinha de castanha de caju é um alimento nutritivo rico em fibras, gorduras boas e proteínas, que oferece vários benefícios à saúde, como: regulação da glicose no sangue, redução do colesterol LDL e aumento do HDL, fortalecimento do sistema imunológico e dos ossos, além de propriedades antioxidantes que protegem as células. É também uma excelente alternativa sem glúten e com baixo teor de carboidratos, ideal para quem busca uma alimentação mais saudável.', price: 6.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Chia (100g)', desc: 'A farinha de chia serve para melhorar a digestão, promover a perda de peso, reforçar a saúde óssea e dos ossos, e reduzir o risco de doenças cardíacas e diabetes, devido à sua riqueza em fibras, proteínas, ômega-3, cálcio, fósforo e magnésio. Também atua como antioxidante, protegendo as células e fortalecimento do sistema imunológico.', price: 3.50, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Coco Branca (100g)', desc: 'É uma excelente alternativa para quem busca uma dieta sem glúten e rica em fibras, é indicada para celíacos, veganos e pessoas com restrições alimentares. A farinha de coco é rica em proteínas e fibras alimentares, contribuindo para o controle glicêmico, redução do colesterol, aumento da saciedade e suas gorduras boas ajudam no funcionamento do organismo.', price: 3.80, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Linhaça Dourada (100g)', desc: 'A farinha de linhaça dourada serve para promover a saúde cardiovascular, auxiliar no controle do peso e diabetes, melhorar o funcionamento do intestino e combater a inflamação, devido ao seu alto teor de fibras, ômega-3, antioxidantes e minerais como cálcio, magnésio e potássio. É um alimento versátil que pode ser adicionado a sucos, iogurtes, sopas e massas para enriquecer a dieta.', price: 3.80, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Linhaça Marrom (100g)', desc: 'A farinha de linhaça marrom é benéfica por ser rica em fibras, que auxiliam a saúde digestiva e controlam o colesterol, e em ômega-3, importante para o coração e cérebro. Contém minerais como magnésio e ferro, e lignanas com ação antioxidante, que podem ajudar na prevenção de doenças, controle de peso e na stabilização do açúcar no sangue.', price: 3.80, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Maracujá (100g)', desc: 'A farinha de maracujá oferece benefícios como auxílio no emagrecimento e no controle da glicose devido à fibra pectina, que reduz a absorção de gorduras e carboidratos e promove saciedade. Além disso, contribui para a saúde digestiva, melhora os níveis de colesterol, e fornece minerais como ferro e cálcio, além da vitamina B3.', price: 3.50, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Farinha de Uva Roxa (100g)', desc: 'A farinha de uva oferece vários benefícios para a saúde devido ao seu alto teor de antioxidantes (como resveratrol e antocianinas) e fibras, que ajudam a combater os radicais livres, proteger o coração e regular o intestino. Ela também é uma boa fonte de minerais e pode melhorar a circulação sanguínea, auxiliando no desempenho físico e na recuperação muscular.', price: 7.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Feno-Grego Granulado (100g)', desc: 'O Feno-Grego granulado serve como suplemento para controlar o açúcar no sangue e o colesterol, melhorar a libido, aumentar os níveis de testosterona, a saúde da pele e do cabelo, além de auxiliar na produção de leite materno em lactantes e potencializar o ganho de massa muscular e resistência física, além disso, suas sementes contêm vitaminas, minerais e fibras.', price: 6.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Fibra de Maçã (100g)', desc: 'A fibra de maçã serve para melhorar a digestão, regular o colesterol e os níveis de açúcar no sangue, promover a saciedade e auxiliar no controle do peso, e fortalecer o intestino, sendo rica em fibras solúveis e insolúveis como a pectina, que ajudam na formação do bolo fecal e na saúde intestinal geral, além de seu sabor ser muito agradável.', price: 8.60, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Gengibre em Pó (100g)', desc: 'O gengibre em pó oferece benefícios como redução de náuseas e indigestão, ação anti-inflamatória e antioxidante, auxílio na recuperação muscular, e um efeito termogênico que acelera o metabolismo e a queima de gordura. O consumo deve ser feito com orientação médica em casos de hipertensão, úlceras ou gravidez.', price: 6.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Ginseng em Pó (100g)', desc: 'O ginseng em pó serve para aumentar o rendimento físico e mental, combater a fadiga e o cansaço, melhorar a concentração e a memória, fortalecer o sistema imunológico e auxiliar o organismo a lidar com o estresse, graças às suas propriedades adaptogênicas e antioxidantes.', price: 5.50, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Guaraná em Pó (100g)', desc: 'O guaraná em pó é um suplemento derivado do fruto do guaraná, conhecido por suas propriedades estimulantes devido à alta concentração de cafeína. É utilizado para combater o cansaço físico e mental, aumentar a energia, melhorar o humor e potencialmente auxiliar na queima de gordura.', price: 5.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Leite de Coco em Pó (100g)', desc: 'O leite de coco em pó é nutritivo e prático, oferecendo gorduras saudáveis (TCM e ácido láurico) que fornecem energia rápida, ajudam no controle de peso e na saúde do coração. Também reforça o sistema imunológico e é uma boa opção para veganos e intolerantes à lactose e ao glúten.', price: 8.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Levedo de Cerveja em Pó (100g)', desc: 'O levedo de cerveja em pó é rico em vitaminas do complexo B, proteínas, minerais e aminoácidos, e serve para fortalecer o sistema imunológico, melhorar a saúde da pele, cabelos e unhas, auxiliar o equilíbrio intestinal e promover o bem-estar geral. Atua como prebiótico e pode ajudar na produção de colágeno.', price: 7.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Maca Peruana (100g)', desc: 'A maca peruana em pó oferece benefícios como aumento da energia e resistência física, melhora da libido e função sexual, alívio dos sintomas da menopausa, fortalecimento do sistema imunológico e apoio à saúde óssea. É rica em vitaminas, minerais e antioxidantes.', price: 8.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Marapuama em Pó (100g)', desc: 'A marapuama em pó é usada como auxiliar natural para a saúde sexual e libido, com propriedades estimulantes do sistema nervoso central, além de benefícios contra fadiga, estresse, depressão e problemas de memória. Também é utilizada como tônico para circulação e disposição física.', price: 4.50, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Moringa em Pó (100g)', desc: 'A moringa em pó auxilia a saúde cardiovascular por suas propriedades antioxidantes, pode reduzir pressão arterial e colesterol ruim, fortalecer o sistema imunológico, combater estresse oxidativo e inflamação, promover a saúde digestiva e fornecer nutrientes importantes para pele e cabelo.', price: 8.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Multimistura (Pote 150g)', desc: 'Composição de farinhas e grãos que, inserida na dieta diária, ajuda a controlar taxas glicêmicas e de colesterol, além de fortalecer o sistema imunológico. Pode ser acrescentada a vitaminas, sucos, iogurtes ou frutas.', price: 10.00, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Psyllium (100g)', desc: 'O psyllium é uma fibra solúvel extraída da casca da semente Plantago ovata, conhecida por benefícios para saúde digestiva, equilíbrio do colesterol e controle glicêmico. Em contato com água forma gel viscoso que auxilia regularidade intestinal e promove saciedade.', price: 12.50, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Tribulus Terrestris (100g)', desc: 'O tribulus terrestris em pó possui propriedades antioxidantes e anti-inflamatórias, podendo ajudar na função sexual, fertilidade, bem-estar na menopausa e alívio da TPM. Estudos sobre aumento de testosterona e ganho de massa muscular ainda são inconsistentes.', price: 9.80, img: 'img/funcionais/placeholder-cha-verde-funcional.jpg' },
      { name: 'Gérmen de trigo (100g)', desc: 'O Gérmen de Trigo auxilia na melhora da saúde da pele e dos cabelos, fortalecer o sistema imunológico, regular o intestino e a pressão arterial, auxiliar no controle do colesterol e do açúcar no sangue, e também pode ter um papel importante na redução dos sintomas da menopausa.', price: 4.50, img: 'img/chas/placeholder-cha-germen-trigo.jpg' }
    ]
  };

  /* persistence */
  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(i => ({ id: String(i.id || ''), name: String(i.name || ''), price: Number(i.price) || 0, qty: Math.max(0, Math.floor(Number(i.qty) || 0)) })).filter(i => i.qty > 0);
    } catch (e) { console.warn('Erro ao carregar carrinho', e); return []; }
  }
  function saveCart() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) { console.warn('Erro ao salvar carrinho', e); } }

  /* utils */
  function slugify(str) { return String(str||'').toLowerCase().normalize?.('NFD').replace(/\p{Diacritic}/gu,'').replace(/[^\w\s-]/g,'').trim().replace(/\s+/g,'-'); }
  function esc(s){ return String(s).replace(/"/g,'&quot;'); }

  /* render produtos */
  function gerarCard(prod) {
    const id = slugify(prod.name);
    return `
      <div class="card" role="article" data-id="${id}">
        <img src="${prod.img}" class="card-img-top" alt="${esc(prod.name)}" loading="lazy">
        <div class="card-body">
          <h5 class="card-title">${esc(prod.name)}</h5>
          <p class="card-text">${esc(prod.desc)}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <p class="fw-bold">R$ ${Number(prod.price).toFixed(2)}</p>
            <button class="btn bg-yellow" type="button" data-id="${id}" data-name="${esc(prod.name)}" data-price="${Number(prod.price)}">Adicionar</button>
          </div>
        </div>
      </div>`;
  }
  function renderProdutos() {
    ['temperos','chas','funcionais'].forEach(cat => {
      const carousel = document.getElementById(`${cat}-carousel`);
      if (!carousel) return;
      carousel.innerHTML = '';
      const list = produtos[cat] || [];
      list.forEach(p => carousel.insertAdjacentHTML('beforeend', gerarCard(p)));
    });
  }

  /* cart logic */
  function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const cartEl = document.getElementById('cart');
    if (!cartItems || !cartEl) return;

    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    cartItems.innerHTML = '';
    let total = 0;

    if (!isMobile || cartEl.classList.contains('open')) {
      // Modo desktop ou mobile expandido
      cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
          <div class="name">${esc(item.name)}</div>
          <div class="controls" aria-hidden="false">
            <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Diminuir">−</button>
            <div style="min-width:28px;text-align:center;" data-qty-for="${item.id}">${item.qty}</div>
            <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Aumentar">+</button>
          </div>
          <div class="item-price">R$ ${(item.price * item.qty).toFixed(2)}</div>
        `;
        cartItems.appendChild(li);
        total += item.price * item.qty;
      });
    } else {
      // Mobile fechado: mostrar apenas resumo
      const li = document.createElement('li');
      li.textContent = `${cart.reduce((acc,i)=>acc+i.qty,0)} itens no carrinho`;
      cartItems.appendChild(li);
    }

    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    if (cartCount) cartCount.textContent = cart.reduce((acc,i)=>acc+i.qty,0);
    saveCart();
  }

  function addToCart(id, name, price) {
    if (!id || !name || Number.isNaN(Number(price))) return;
    const idx = cart.findIndex(i => i.id === id);
    if (idx !== -1) cart[idx].qty += 1;
    else cart.push({ id, name, price: Number(price), qty: 1 });
    renderCart();
  }
  window.addToCart = addToCart;

  function changeQty(id, delta) {
    const idx = cart.findIndex(i => i.id === id);
    if (idx === -1) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx,1);
    renderCart();
  }

  /* attach product buttons */
  document.addEventListener('click', e => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;
    const { id, name, price, action } = btn.dataset;
    if (action==='inc') changeQty(id,1);
    else if (action==='dec') changeQty(id,-1);
    else addToCart(id,name,Number(price));
  });

  /* persist cart */
  cart = loadCart();
  renderProdutos();
  renderCart();

  /* scroll carousel */
  window.scrollCarousel = function(carouselId, delta){
    const el = document.getElementById(carouselId);
    if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  }

  /* cart drag functionality */
  function setupCartDrag() {
    const cartEl = document.getElementById('cart');
    if (!cartEl) return;

    let isDragging = false;
    let startX, startY, initialX, initialY;

    cartEl.addEventListener('mousedown', (e) => {
      if (window.innerWidth <= 768) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = cartEl.offsetLeft;
      initialY = cartEl.offsetTop;
      cartEl.style.cursor = 'grabbing';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      cartEl.style.left = `${initialX + dx}px`;
      cartEl.style.top = `${initialY + dy}px`;
      cartEl.style.right = 'auto';
      cartEl.style.bottom = 'auto';
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) { isDragging = false; cartEl.style.cursor = 'grab'; }
    });
  }
  setupCartDrag();

  /* cart toggle mobile */
  const cartToggle = document.getElementById('cart-toggle');
  if (cartToggle){
    cartToggle.addEventListener('click', ()=>{
      const cartEl = document.getElementById('cart');
      cartEl.classList.toggle('open');
      renderCart();
    });
  }

  /* send to WhatsApp */
  window.sendToWhatsApp = function(){
    if (!cart.length) return alert('Carrinho vazio!');
    
    // Separar produtos por categoria
    const chas = [];
    const temperos = [];
    const funcionais = [];
    
    cart.forEach(item => {
      // Verificar se é um chá
      if (produtos.chas.some(cha => cha.name === item.name)) {
        chas.push(item);
      } 
      // Verificar se é um produto funcional
      else if (produtos.funcionais.some(funcional => funcional.name === item.name)) {
        funcionais.push(item);
      }
      // Se não for chá nem funcional, é tempero
      else {
        temperos.push(item);
      }
    });
    
    let msg = 'Olá, gostaria de fazer o pedido:%0A%0A';
    
    // Adicionar temperos
    if (temperos.length > 0) {
      msg += '🌶️ TEMPEROS: %0A';
      temperos.forEach(item => {
        msg += `- ${item.name} x${item.qty} = R$ ${(item.price * item.qty).toFixed(2)}%0A`;
      });
      const subtotalTemperos = temperos.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
      msg += `Subtotal Temperos: R$ ${subtotalTemperos}%0A%0A`;
    }
    
    // Adicionar chas
    if (chas.length > 0) {
      msg += '🌿 CHÁS:%0A';
      chas.forEach(item => {
        msg += `- ${item.name} x${item.qty} = R$ ${(item.price * item.qty).toFixed(2)}%0A`;
      });
      const subtotalchas = chas.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
      msg += `Subtotal chas: R$ ${subtotalchas}%0A%0A`;
    }
    
    // Adicionar produtos funcionais
    if (funcionais.length > 0) {
      msg += '💊 PRODUTOS FUNCIONAIS:%0A';
      funcionais.forEach(item => {
        msg += `- ${item.name} x${item.qty} = R$ ${(item.price * item.qty).toFixed(2)}%0A`;
      });
      const subtotalFuncionais = funcionais.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
      msg += `Subtotal Funcionais: R$ ${subtotalFuncionais}%0A%0A`;
    }
    
    // Total geral
    const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
    msg += `*TOTAL: R$ ${total}*`;
    
    const url = `https://wa.me/+5581991889242?text=${msg}`;
    window.open(url, '_blank');
  }
});

