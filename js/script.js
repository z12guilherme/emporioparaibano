  // script.js — versão completa com lista de temperos atualizada
// persistência localStorage
// carrinho sem bug (identificação por id, delegação, proteção contra cliques duplos)
// carrinho arrastável com pin
// Lista de Favoritos com persistência
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
      { name: 'Açafrão (100g)', desc: 'Também conhecido como cúrcuma, adiciona cor, sabor e propriedades benéficas. Usado em carnes, arroz, sopas e molhos.', price: 3.50, img: 'img/temperos/acafrao.jpg' },
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
      { name: 'Tempero Baiano sem Pimenta (100g)', desc: 'É uma mistura de cominho e especiarias que serve para dar sabor e aroma a diversos pratos. Pode ser usado em carnes, feijão, feijoada, sopas, caldos, entre outros pratos. Obs. O Tempero Baiano é moído na hora, para manter seu aroma e sabor ainda mais marcantes.', price: 5.00, img: 'img/temperos/baiano.jpg' },
      { name: 'Tempero Baiano com Pimenta (100g)', desc: 'É uma mistura de cominho e especiarias, com adição de pimentas, que serve para dar sabor e aroma a diversos pratos, além de dar um toque apimentado. Pode ser usado em carnes, feijão, feijoada, sopas, caldos, entre outros pratos. Obs. O Tempero Baiano é moído na hora, para manter seu aroma e sabor ainda mais marcantes.', price: 5.50, img: 'img/temperos/baiano.jpg' },
      { name: 'Ajinomoto (100g)', desc: 'Ideal para temperar qualquer preparação salgada, como carnes, frangos, legumes, verduras, feijão e arroz, e garantir sabor de forma prática e econômica.', price: 4.50, img: 'img/temperos/ajinomoto.jpg' },
      { name: 'Alho em pó (100g)', desc: 'É um tempero versátil que pode ser usado em uma variedade de pratos para adicionar sabor e aroma. Ele pode ser adicionado a sopas, molhos, carnes, aves, peixes, vegetais e muito mais. É importante lembrar que o alho em pó é mais concentrado que o alho fresco, então use com moderação no início e ajuste a quantidade conforme necessário.', price: 4.00, img: 'img/temperos/alho_em_po.jpg' },
      { name: 'Amaciante de carnes (100g)', desc: 'O Amaciante de Carne é um produto que promove a maciez da carne, resultando assim em uma carne mais macia e suculenta.', price: 3.00, img: 'img/temperos/amaciante_carne.jpg' },
      { name: 'Tempero Beef Ribs (100g)', desc: 'Ideal para preparar carnes bovinas, suínas, assados, e refogados, ele também adiciona um sabor excepcional em hambúrgueres, ovos e muitos outros pratos.', price: 5.00, img: 'img/temperos/beef.jpg' },
      { name: 'Caldo de Bacon em Pó (100g)', desc: 'É um tempero que dá um sabor defumado e irresistível às suas receitas. Perfeito para dar um toque especial a sopas, feijões, molhos, risotos e muito mais.', price: 3.00, img: 'img/temperos/bacon.jpg' },
      { name: 'Caldo de Legumes em Pó (100g)', desc: 'Pode-se dissolver o pó em água quente e usar o caldo líquido como base para sopas, molhos e risotos, ou adicionar uma pitada diretamente nos alimentos enquanto cozinha para intensificar o sabor.', price: 3.00, img: 'img/temperos/legumes.jpg' },
      { name: 'Cebola desidratada (100g)', desc: 'A cebola desidratada é um tempero amplamente utilizado na culinária para adicionar sabor e aroma a pratos salgados. Ela é produzida a partir de cebolas frescas que passam por um processo de desidratação para remover a água e concentrar os seus sabores e nutrientes.', price: 4.00, img: 'img/temperos/cebola_desidratada.jpg' },
      { name: 'Cominho em grãos (100g)', desc: 'O Cominho em grãos, é uma especiaria versátil que pode ser usada em diversos pratos, como carnes, legumes, ovos, queijos, feijão, lentilha, arroz, batatas, sopas e caldos.', price: 6.00, img: 'img/temperos/cominho.jpg' },
      { name: 'Cominho Temperado moído (100g)', desc: 'Além do tradicional sabor do Cominho, ele contém louro, orégano e sementes de coentro para intensificar ainda mais seu sabor.', price: 5.50, img: 'img/temperos/cominho_temperado.jpg' },
      { name: 'Creme de Cebola (100g)', desc: 'O creme de cebola em pó serve principalmente para dar sabor e uma textura cremosa a uma variedade de pratos, como sopas, cremes, molhos, marinadas, carnes, aves, hambúrgueres, almôndegas e recheios.', price: 4.00, img: 'img/temperos/creme_de_cebola.jpg' },
      { name: 'Cúrcuma em Pó (100g)', desc: 'É uma especiaria muito utilizada para conferir cor, sabor e aroma a diversos pratos, tornando-os ainda mais saborosos e saudáveis. Ela combina, principalmente com receitas salgadas como molhos, feijão, arroz, frutos do mar, frango, sopas, biscoitos, entre outros, além de ser muito conhecida por ser poder anti-inflamatório e antioxidante.', price: 4.00, img: 'img/temperos/curcuma.jpg' },
      { name: 'Tempero Limão e Ervas Finas (100g)', desc: 'É uma mistura versátil que combina o aroma e sabor das ervas aromáticas, como salsa, cebolinha e tomilho, com a refrescância e acidez do limão, em forma de raspas ou pó. É ideal para dar um toque fresco a peixes, aves, saladas, vegetais e patês.', price: 5.00, img: 'img/temperos/limaoeervas.jpg' },
      { name: 'Tempero Limão e Orégano (100g)', desc: 'É uma combinação de ingredientes que traz um sabor cítrico e aromático a pratos como carnes, aves, peixes e saladas.', price: 5.00, img: 'img/temperos/limaoeoregano.jpg' },
      { name: 'Manjericão (100g)', desc: 'O manjericão seco é uma erva aromática desidratada, usada para adicionar sabor e aroma a pratos como molhos, sopas, massas, carnes e saladas, e também pode ser consumido em chá. Por ser desidratado, é prático, duradouro (até um ano) e fácil de usar em diversas preparações, mantendo o sabor intenso e as propriedades da erva fresca.', price: 4.00, img: 'img/temperos/manjericao.jpg' },
      { name: 'Tempero Mix para Frango (100g)', desc: 'Perfeito para preparar desde um simples frango cozido até um delicioso frango assado, esse mix vai te surpreender com seu sabor e qualidade, possui uma combinação de temperos que realça o sabor de sua refeição, tornando-a especial e única.', price: 5.00, img: 'img/temperos/mix_frango.jpg' },
      { name: 'Nozes Moscada Inteiro (und)', desc: 'É uma especiaria versátil usada em pratos doces e salgados, como molhos (branco e strogonoff), massas, risotos, purês, bolos, pudins e tortas, realçando o sabor de carnes suaves, como aves e peixes. Também é utilizada em bebidas, como cappuccinos, entre outras. A forma mais aromática é a ralada na hora do uso, usando um ralador fino.', price: 1.00, img: 'img/temperos/noz_moscada.jpg' },
      { name: 'Pimenta Caiena em Pó (100g)', desc: 'Serve principalmente para adicionar picância e sabor a pratos salgados e pode ser usada em diversas preparações culinárias, como carnes, aves, peixes, saladas, molhos e sopas. Além disso, ela possui propriedades termogênicas, auxiliando na aceleração do metabolismo e na queima de calorias.', price: 6.00, img: 'img/temperos/pimenta_caiena.jpg' },
      { name: 'Pimenta Rosa (100g)', desc: 'Ela pode ser usada inteira, levemente esmagada ou moída, em pratos salgados e doces. Combina bem com carnes, peixes, aves, molhos, saladas, e até mesmo em sobremesas e bebidas, adicionando um toque aromático e sofisticado.', price: 6.00, img: 'img/temperos/pimenta_rosa.jpg' },
      { name: 'Sal de Parrilla (100g)', desc: 'O sal de parrilla é um tipo de sal com granulometria menor que o sal grosso, ideal para churrascos e assados, especialmente em carnes mais espessas. Sua principal função é salgar a carne de maneira uniforme, sem ressecá-la e evitando a perda excessiva de líquidos, o que ajuda a manter a suculência.', price: 2.00, img: 'img/temperos/parrila.jpg' },
      { name: 'Semente de Coentro (100g)', desc: 'Pode ser usada inteira ou esmagadas, em molhos de carnes e peixes, em feijões e para temperar leguminosas e sopas, também pode ser levemente tostado e moído na hora para intensificar o sabor e o aroma.', price: 4.00, img: 'img/temperos/semente_coentro.jpg' },
      { name: 'Semente de Coentro Rosa (100g)', desc: 'Assim como a semente tradicional, pode ser usada inteira ou esmagadas, em molhos de carnes e peixes, em feijões e para temperar leguminosas e sopas, também pode ser levemente tostado e moído na hora para intensificar o sabor e o aroma.', price: 5.00, img: 'img/temperos/semente_roxa.jpg' },
      { name: 'Tempero para Churrasco sem Pimenta (100g)', desc: 'O tempero de churrasco em pó é uma mistura de especiarias e ervas secas que é usada para realçar o sabor de carnes grelhadas, assadas ou churrascos.', price: 4.00, img: 'img/temperos/tempero_churrasco.jpg' }
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
      { name: 'Açaí em Pó (100g)', desc: 'O Açaí em Pó é rico em fibras, antioxidantes e gorduras saudáveis, serve como um ingrediente nutritivo para a culinária, podendo ser adicionado a sucos, vitaminas, bolos e outras preparações para enriquecer seu valor nutricional. Seus benefícios incluem a promoção da saúde intestinal, o auxílio no controle do colesterol e o fornecimento de energia para o corpo.', price: 6.50, img: 'img/funcionais/acai.jpg' },
      { name: 'Aveia em Flocos Finos (100g)', desc: 'A Aveia em flocos finos oferece benefícios como a melhora da saúde intestinal e do coração, o controle do açúcar no sangue e do colesterol, a promoção da saciedade, o auxílio na perda de peso e o fortalecimento do sistema imunológico. É rica em fibras solúveis como a betaglucana, vitaminas do complexo B, minerais e antioxidantes, que contribuem para o bem-estar geral e a proteção do corpo.', price: 1.70, img: 'img/funcionais/aveia.jpg' },
      { name: 'Gérmen de trigo (100g)', desc: 'O Gérmen de Trigo auxilia na melhora da saúde da pele e dos cabelos, fortalecer o sistema imunológico, regular o intestino e a pressão arterial, auxiliar no controle do colesterol e do açúcar no sangue, e também pode ter um papel importante na redução dos sintomas da menopausa.', price: 4.50, img: 'img/funcionais/germen_de_trigo.jpg' },
      { name: 'Aveia em Flocos Grossos (100g)', desc: 'A aveia em flocos grossos serve como um alimento funcional rico em fibras e outros nutrientes, que auxilia na saúde cardiovascular, controla o colesterol, favorece o emagrecimento e a saciedade, melhora o trânsito intestinal e atua como prebiótico, além de ser uma ótima fonte de vitaminas e minerais. Culinariamente, é usada em granolas, mingaus, bolos, biscoitos e para acompanhar frutas, iogurtes e shakes.', price: 1.70, img: 'img/funcionais/aveia_grossa.jpg' },
      { name: 'Cacau em Pó 100% (100g)', desc: 'O cacau 100% em pó oferece múltiplos benefícios à saúde, como proteção cardiovascular ao reduzir a pressão arterial e melhorar o fluxo sanguíneo, ação antioxidante contra o envelhecimento precoce, regulação do humor através da estimulação de serotonina, e auxílio no controle do açúcar no sangue e saúde intestinal devido ao seu baixo índice glicêmico e fibras.', price: 4.00, img: 'img/funcionais/cacau_em_po.jpg' },
      { name: 'Canela em Pó (100g)', desc: 'A canela em pó serve para diversas funções na saúde e culinária, atuando como um potente agente antioxidante e anti-inflamatório, ajudando no controle da glicemia, melhorando a digestão e fortalecendo o sistema imunológico. Na culinária, pode ser usada para dar sabor e aroma a pratos doces e salgados, e como um ingrediente termogênico que acelera o metabolismo, auxiliando na queima de gordura.', price: 5.00, img: 'img/funcionais/canela_em_po.jpg' },
      { name: 'Catuaba em Pó (100g)', desc: 'A Catuaba em pó serve como um energizante natural e afrodisíaco, ajudando a aumentar a energia física e mental, combater o cansaço, a fadiga e o estresse, melhorar a memória, a circulação sanguínea e a função sexual. Também possui propriedades antioxidantes e anti-inflamatórias, sendo utilizada para aumentar a vitalidade e o bem-estar geral.', price: 4.50, img: 'img/funcionais/catuaba_em_po.jpg' },
      { name: 'Colágeno em Pó Hidrolisado (100g)', desc: 'O Colágeno em pó Hidrolisado serve para fortalecer a pele, unhas e cabelos, prevenir a flacidez e melhorar a saúde das articulações e ossos, o que é especialmente útil com o envelhecimento, quando o corpo produz menos colágeno. Ele também ajuda na recuperação muscular e desempenho físico, além de complementar a dieta e as estruturas do corpo como tendões e cartilagens.', price: 130.00, img: 'img/funcionais/colageno.jpg' },
      { name: 'Creatina Monohidratada (100g)', desc: 'Os principais benefícios da creatina incluem o aumento da massa e força muscular, melhora da performance em exercícios de alta intensidade, e auxílio na recuperação muscular após o treino, pois fornece energia para os músculos e atrai água para dentro das células musculares. Além disso, a creatina contribui para a prevenção de doenças crônicas, melhora da saúde óssea e pode ter efeitos positivos na função cerebral, como melhora da cognição e da memória.', price: 19.00, img: 'img/funcionais/creatina.jpg' },
      { name: 'Dolomita (100g)', desc: 'A dolomita em pó serve para suplementar cálcio e magnésio, beneficiando a saúde óssea e muscular, a saúde digestiva e auxiliando a saúde bucal. Na pele e cabelos, tem efeitos anti-inflamatórios, calmantes e clareadores, sendo usada em máscaras faciais e como tratamento para espinhas, manchas e caspa.', price: 3.50, img: 'img/funcionais/dolomita.jpg' },
      { name: 'Extrato de Soja em pó (100g)', desc: 'O extrato de soja em pó é um alimento que serve como alternativa ao leite de vaca para intolerantes à lactose ou alergia a proteínas animais, podendo ser consumido em bebidas, vitaminas e receitas. Além disso, é rico em proteínas, fibras e fitoestrogênios (isoflavonas), que contribuem para a saúde cardiovascular, o alívio dos sintomas da menopausa, a manutenção da massa óssea e o controle do açúcar no sangue.', price: 3.50, img: 'img/funcionais/extrato_de_soja.jpg' },
      { name: 'Farelo de Aveia (100g)', desc: 'O farelo de aveia ajuda a diminuir o colesterol "ruim", combater a prisão de ventre, emagrecer e evitar a diabetes. Isso porque esse cereal é rico em fibras que facilitam a evacuação, promovem a saciedade e equilibram os níveis de glicose no sangue.', price: 1.70, img: 'img/funcionais/farelo_de_aveia.jpg' },
      { name: 'Farinha da Felicidade (100g)', desc: 'A farinha da felicidade é uma mistura de ingredientes naturais, que serve para melhorar o bem-estar e a saúde, principalmente através do consumo de fibras. Seus benefícios incluem auxílio na digestão, promoção da saciedade para o controle do apetite e do peso, fortalecimento dos ossos e melhora da imunidade. Pode ser adicionada a diversos alimentos como sucos, iogurtes, bolos e sopas para enriquecer a dieta.', price: 5.00, img: 'img/funcionais/farinha_felicidade.jpg' },
      { name: 'Farinha de Amêndoas (100g)', desc: 'A farinha de amêndoas oferece benefícios como o controle da glicemia e do colesterol, auxílio na saciedade e no emagrecimento, e é uma fonte de fibras, proteínas, gorduras saudáveis, vitamina E e magnésio. Por não conter glúten, é uma ótima alternativa para celíacos e intolerantes, além de ser versátil e saborosa em diversas receitas.', price: 12.00, img: 'img/funcionais/farinha_amendoas.jpg' },
      { name: 'Farinha de Amendoim (100g)', desc: 'A Farinha de Amendoim é fonte de ferro, cálcio, potássio e manganês. É rica também em gorduras boas. Ótima fonte de proteínas, auxiliando na disposição para atividades físicas, além dos benefícios para a saúde, a Farinha de Amendoim é feita apenas com amendoim torrado e moído e é uma excelente opção nutritiva e saborosa para muitas receitas como biscoitos, bolos, pães, cookies e muito mais.', price: 3.00, img: 'img/funcionais/farinha_amendoim.jpg' },
      { name: 'Farinha de Arroz (100g)', desc: 'A farinha de arroz oferece benefícios como ser uma opção sem glúten para celíacos e intolerantes, auxiliar na saúde digestiva e cardíaca, controlar o peso por promover saciedade devido às fibras, além de ser fonte de vitaminas do complexo B, proteínas e minerais essenciais como magnésio e ferro, contribuindo para a saúde óssea e muscular.', price: 2.50, img: 'img/funcionais/farinha_arroz.jpg' },
      { name: 'Farinha de Aveia (100g)', desc: 'A farinha de aveia serve principalmente como um ingrediente versátil para enriquecer a alimentação, sendo usada em receitas como bolos, pães, tortas e panquecas, e adicionada a vitaminas, sucos ou iogurtes. Devido ao seu teor de fibras e nutrientes como magnésio, zinco e manganês, ela contribui para a saúde cardiovascular, ajuda no controle do peso, melhora a digestão e pode aumentar a sensação de saciedade.', price: 1.70, img: 'img/funcionais/farinha_aveia.jpg' },
      { name: 'Farinha de Banana Verde (100g)', desc: 'A farinha de banana verde serve como suplemento alimentar rico em amido resistente, auxiliando no controle do peso, da glicose e do colesterol, além de melhorar a saúde intestinal e fortalecer a imunidade. Pode ser usada como alternativa à farinha de trigo para pessoas com intolerância ao glúten e também como espessante natural em receitas doces e salgadas, como bolos, cremes e sopas.', price: 3.80, img: 'img/funcionais/farinha_banana_verde.jpg' },
      { name: 'Farinha de Batata Doce (100g)', desc: 'A Farinha de Batata Doce é benéfica porque é uma fonte de carboidrato de baixo índice glicêmico, rico em fibras, vitaminas (A, C, B) e minerais (ferro, cálcio, potássio, magnésio), promovendo energia sustentada, saciedade, saúde intestinal e imunidade. Ajuda no ganho de massa muscular e na queima de gordura, além de ter propriedades antioxidantes que combatem radicais livres, sendo útil para a saúde da pele, olhos e prevenção de doenças crônicas.', price: 3.80, img: 'img/funcionais/farinha_batata-doce.jpg' },
      { name: 'Farinha de Berinjela (100g)', desc: 'A farinha de berinjela auxilia na perda de peso e no controle do colesterol e da glicemia por ser rica em fibras. Ela também é uma boa fonte de vitaminas e minerais, como as vitaminas do complexo B, C e A, e magnésio, que contribuem para a saciedade, a função intestinal e a saúde do coração, além de ter propriedades antioxidantes que protegem as células.', price: 6.00, img: 'img/funcionais/farinha_berinjela.jpg' },
      { name: 'Farinha de Beterraba (100g)', desc: 'A farinha de beterraba é um suplemento nutritivo que serve para melhorar o desempenho físico, ajudar na saúde cardiovascular (reduzindo a pressão arterial), fortalecer a imunidade, auxiliar no controle do nível de açúcar no sangue, combater a anemia e melhorar o funcionamento do intestino.', price: 9.90, img: 'img/funcionais/farinha_de_beterraba.jpg' },
      { name: 'Farinha de Castanha de Caju (100g)', desc: 'A farinha de castanha de caju é um alimento nutritivo rico em fibras, gorduras boas e proteínas, que oferece vários benefícios à saúde, como: regulação da glicose no sangue, redução do colesterol LDL e aumento do HDL, fortalecimento do sistema imunológico e dos ossos, além de propriedades antioxidantes que protegem as células. É também uma excelente alternativa sem glúten e com baixo teor de carboidratos, ideal para quem busca uma alimentação mais saudável.', price: 6.00, img: 'img/funcionais/castanha_de_caju.jpg' },
      { name: 'Farinha de Chia (100g)', desc: 'A farinha de chia serve para melhorar a digestão, promover a perda de peso, reforçar a saúde óssea e dos ossos, e reduzir o risco de doenças cardíacas e diabetes, devido à sua riqueza em fibras, proteínas, ômega-3, cálcio, fósforo e magnésio. Também atua como antioxidante, protegendo as células e fortalecimento do sistema imunológico.', price: 3.50, img: 'img/funcionais/chia.jpg' },
      { name: 'Farinha de Coco Branca (100g)', desc: 'É uma excelente alternativa para quem busca uma dieta sem glúten e rica em fibras, é indicada para celíacos, veganos e pessoas com restrições alimentares. A farinha de coco é rica em proteínas e fibras alimentares, contribuindo para o controle glicêmico, redução do colesterol, aumento da saciedade e suas gorduras boas ajudam no funcionamento do organismo.', price: 3.80, img: 'img/funcionais/farinha_branca_coco.jpg' },
      { name: 'Farinha de Linhaça Dourada (100g)', desc: 'A farinha de linhaça dourada serve para promover a saúde cardiovascular, auxiliar no controle do peso e diabetes, melhorar o funcionamento do intestino e combater a inflamação, devido ao seu alto teor de fibras, ômega-3, antioxidantes e minerais como cálcio, magnésio e potássio. É um alimento versátil que pode ser adicionado a sucos, iogurtes, sopas e massas para enriquecer a dieta.', price: 3.80, img: 'img/funcionais/farinha_de_linhaca_dourada.jpg' },
      { name: 'Farinha de Linhaça Marrom (100g)', desc: 'A farinha de linhaça marrom é benéfica por ser rica em fibras, que auxiliam a saúde digestiva e controlam o colesterol, e em ômega-3, importante para o coração e cérebro. Contém minerais como magnésio e ferro, e lignanas com ação antioxidante, que podem ajudar na prevenção de doenças, controle de peso e na stabilização do açúcar no sangue.', price: 3.80, img: 'img/funcionais/farinha_de_linhaca_marrom.jpg' },
      { name: 'Farinha de Maracujá (100g)', desc: 'A farinha de maracujá oferece benefícios como auxílio no emagrecimento e no controle da glicose devido à fibra pectina, que reduz a absorção de gorduras e carboidratos e promove saciedade. Além disso, contribui para a saúde digestiva, melhora os níveis de colesterol, e fornece minerais como ferro e cálcio, além da vitamina B3.', price: 3.50, img: 'img/funcionais/farinha_de_maracuja.jpg' },
      { name: 'Farinha de Uva Roxa (100g)', desc: 'A farinha de uva oferece vários benefícios para a saúde devido ao seu alto teor de antioxidantes (como resveratrol e antocianinas) e fibras, que ajudam a combater os radicais livres, proteger o coração e regular o intestino. Ela também é uma boa fonte de minerais e pode melhorar a circulação sanguínea, auxiliando no desempenho físico e na recuperação muscular.', price: 7.00, img: 'img/funcionais/farinha_uva_roxa.jpg' },
      { name: 'Feno-Grego Granulado (100g)', desc: 'O Feno-Grego granulado serve como suplemento para controlar o açúcar no sangue e o colesterol, melhorar a libido, aumentar os níveis de testosterona, a saúde da pele e do cabelo, além de auxiliar na produção de leite materno em lactantes e potencializar o ganho de massa muscular e resistência física, além disso, suas sementes contêm vitaminas, minerais e fibras.', price: 6.00, img: 'img/funcionais/feno_grego.jpg' },
      { name: 'Fibra de Maçã (100g)', desc: 'A fibra de maçã serve para melhorar a digestão, regular o colesterol e os níveis de açúcar no sangue, promover a saciedade e auxiliar no controle do peso, e fortalecer o intestino, sendo rica em fibras solúveis e insolúveis como a pectina, que ajudam na formação do bolo fecal e na saúde intestinal geral, além de seu sabor ser muito agradável.', price: 8.60, img: 'img/funcionais/fibra_de_maca.jpg' },
      { name: 'Gengibre em Pó (100g)', desc: 'O gengibre em pó oferece benefícios como redução de náuseas e indigestão, ação anti-inflamatória e antioxidante, auxílio na recuperação muscular, e um efeito termogênico que acelera o metabolismo e a queima de gordura. O consumo deve ser feito com orientação médica em casos de hipertensão, úlceras ou gravidez.', price: 6.00, img: 'img/funcionais/gengibre_em_po.jpg' },
      { name: 'Ginseng em Pó (100g)', desc: 'O ginseng em pó serve para aumentar o rendimento físico e mental, combater a fadiga e o cansaço, melhorar a concentração e a memória, fortalecer o sistema imunológico e auxiliar o organismo a lidar com o estresse, graças às suas propriedades adaptogênicas e antioxidantes.', price: 5.50, img: 'img/funcionais/ginseng.jpg' },
      { name: 'Guaraná em Pó (100g)', desc: 'O guaraná em pó é um suplemento derivado do fruto do guaraná, conhecido por suas propriedades estimulantes devido à alta concentração de cafeína. É utilizado para combater o cansaço físico e mental, aumentar a energia, melhorar o humor e potencialmente auxiliar na queima de gordura.', price: 5.00, img: 'img/funcionais/guarana_em_po.jpg' },
      { name: 'Leite de Coco em Pó (100g)', desc: 'O leite de coco em pó é nutritivo e prático, oferecendo gorduras saudáveis (TCM e ácido láurico) que fornecem energia rápida, ajudam no controle de peso e na saúde do coração. Também reforça o sistema imunológico e é uma boa opção para veganos e intolerantes à lactose e ao glúten.', price: 8.00, img: 'img/funcionais/leite_coco.jpg' },
      { name: 'Levedo de Cerveja em Pó (100g)', desc: 'O levedo de cerveja em pó é rico em vitaminas do complexo B, proteínas, minerais e aminoácidos, e serve para fortalecer o sistema imunológico, melhorar a saúde da pele, cabelos e unhas, auxiliar o equilíbrio intestinal e promover o bem-estar geral. Atua como prebiótico e pode ajudar na produção de colágeno.', price: 7.00, img: 'img/funcionais/levedura_de_cerveja.jpg' },
      { name: 'Maca Peruana (100g)', desc: 'A maca peruana em pó oferece benefícios como aumento da energia e resistência física, melhora da libido e função sexual, alívio dos sintomas da menopausa, fortalecimento do sistema imunológico e apoio à saúde óssea. É rica em vitaminas, minerais e antioxidantes.', price: 8.00, img: 'img/funcionais/maca_peruana.jpg' },
      { name: 'Marapuama em Pó (100g)', desc: 'A marapuama em pó é usada como auxiliar natural para a saúde sexual e libido, com propriedades estimulantes do sistema nervoso central, além de benefícios contra fadiga, estresse, depressão e problemas de memória. Também é utilizada como tônico para circulação e disposição física.', price: 4.50, img: 'img/funcionais/marapuama.jpg' },
      { name: 'Moringa em Pó (100g)', desc: 'A moringa em pó auxilia a saúde cardiovascular por suas propriedades antioxidantes, pode reduzir pressão arterial e colesterol ruim, fortalecer o sistema imunológico, combater estresse oxidativo e inflamação, promover a saúde digestiva e fornecer nutrientes importantes para pele e cabelo.', price: 8.00, img: 'img/funcionais/moringa.jpg' },
      { name: 'Multimistura (Pote 150g)', desc: 'Composição de farinhas e grãos que, inserida na dieta diária, ajuda a controlar taxas glicêmicas e de colesterol, além de fortalecer o sistema imunológico. Pode ser acrescentada a vitaminas, sucos, iogurtes ou frutas.', price: 10.00, img: 'img/funcionais/multimistura.jpg' },
      { name: 'Psyllium (100g)', desc: 'O psyllium é uma fibra solúvel extraída da casca da semente Plantago ovata, conhecida por benefícios para saúde digestiva, equilíbrio do colesterol e controle glicêmico. Em contato com água forma gel viscoso que auxilia regularidade intestinal e promove saciedade.', price: 12.50, img: 'img/funcionais/psyllium.jpg' },
      { name: 'Tribulus Terrestris (100g)', desc: 'O tribulus terrestris em pó possui propriedades antioxidantes e anti-inflamatórias, podendo ajudar na função sexual, fertilidade, bem-estar na menopausa e alívio da TPM. Estudos sobre aumento de testosterona e ganho de massa muscular ainda são inconsistentes.', price: 9.80, img: 'img/funcionais/germen_de_trigo.jpg' },
      { name: 'Gérmen de trigo (100g)', desc: 'O Gérmen de Trigo auxilia na melhora da saúde da pele e dos cabelos, fortalecer o sistema imunológico, regular o intestino e a pressão arterial, auxiliar no controle do colesterol e do açúcar no sangue, e também pode ter um papel importante na redução dos sintomas da menopausa.', price: 4.50, img: 'img/funcionais/germen_de_trigo.jpg' }
    ],

    sementesEgraos: [
      { name: 'Chia (100g)', desc: 'A chia serve para promover a saciedade e auxiliar na perda de peso, por ser rica em fibras, além de controlar o nível de açúcar no sangue e melhorar a saúde intestinal. Também contribui para a saúde cardiovascular devido ao seu teor de ômega-3, fortalece ossos e dentes por ser fonte de cálcio e minerais, e pode até aumentar a imunidade. A semente pode ser consumida em iogurtes, saladas, sucos ou hidratada em água.', price: 4.50, img: 'img/sementeseGraos/chia.jpg' },
      { name: 'Gergelim Branco (100g)', desc: 'O Gergelim Branco serve como um superalimento rico em nutrientes, fornecendo proteínas, gorduras saudáveis, fibras, cálcio, magnésio e outros minerais que contribuem para a saúde óssea e o bom funcionamento do organismo. Além disso, auxilia na melhora do colesterol e da digestão, e suas propriedades antioxidantes e o teor de fitoestrogênios podem beneficiar a saúde da pele, aliviar sintomas da menopausa e regular hormônios da tireoide.', price: 5.00, img: 'img/sementeseGraos/gergelim.jpg' },
      { name: 'Gergelim Preto (100g)', desc: 'Assim como o Gergelim Branco, o Gergelim Preto serve para a saúde devido ao seu alto teor de nutrientes, como cálcio, ferro, fibras e antioxidantes, sendo útil para a saúde óssea, digestiva e do coração, além de possuir propriedades anti-inflamatórias e poder ser usado como ingrediente em diversos pratos culinários, incluindo pães, saladas e pastas.', price: 5.00, img: 'img/sementeseGraos/gergelimpreto.jpg' },
      { name: 'Granola Diet a granel (100g)', desc: 'A granola diet é uma combinação nutricional benéfica que fornece energia, ajuda na saciedade devido às fibras e carboidratos, melhora a saúde digestiva, e fornece vitaminas, minerais e gorduras saudáveis essenciais para o bom funcionamento do organismo e para a vitalidade diária, a versão diet, é ideal para dieta com restrições de açúcares,pois não altera os índices glicêmicos.', price: 3.00, img: 'img/sementeseGraos/granoladiet.jpg' },
      { name: 'Granola Tradicional a granel (100g)', desc: 'A granola Tradicional é uma combinação nutricional benéfica que fornece energia, ajuda na saciedade devido às fibras e carboidratos, melhora a saúde digestiva, e fornece vitaminas, minerais e gorduras saudáveis essenciais para o bom funcionamento do organismo e para a vitalidade diária.', price: 3.00, img: 'img/sementeseGraos/granola.jpg' },
      { name: 'Granola Banana a granel (100g)', desc: 'A granola com banana é uma combinação nutricional benéfica que fornece energia, ajuda na saciedade devido às fibras e carboidratos, melhora a saúde digestiva, e fornece vitaminas, minerais e gorduras saudáveis essenciais para o bom funcionamento do organismo e para a vitalidade diária,com um toque especial, sabor banana.', price: 3.00, img: 'img/sementeseGraos/granola_banana.jpg' },
      { name: 'Granola Sabor da Terra 250g (Sabor Banana)', desc: 'Granola Sabor da Terra 250g (Sabor Banana)', price: 6.99, img: 'img/sementeseGraos/granola_sabordaterra_banana.jpg' },
      { name: 'Granola Sabor da Terra 250g (Sabor Cacau 70%)', desc: 'Granola Sabor da Terra 250g (Sabor Cacau 70%)', price: 6.99, img: 'img/sementeseGraos/granola_cacau.jpg' },
      { name: 'Granola Sabor da Terra 250g (Sabor Tradicional)', desc: 'Granola Sabor da Terra 250g (Sabor Tradicional)', price: 6.99, img: 'img/sementeseGraos/granola_250g.jpg' },
      { name: 'Granola Salgada (100g)', desc: 'Para quem deseja uma alimentação equilibrada e com menos açúcar, a Granola Salgada é uma excelente escolha. Com baixo teor de carboidratos, ela é uma aliada perfeita para manter a dieta em dia sem abrir mão do sabor. Além disso, seus ingredientes incluem propriedades antioxidantes, anti-inflamatórias e termogênicas, que potencializam seus benefícios à saúde.', price: 3.00, img: 'img/sementeseGraos/granolasalgada.jpg' },
      { name: 'Grão-de-Bico (100g)', desc: 'O Grão-de-bico é uma leguminosa rica em proteínas vegetais, fibras, vitaminas e minerais, conhecida pela sua versatilidade culinária e benefícios para a saúde, como o auxílio à digestão e ao humor. Pode ser consumido de diversas formas, incluindo em saladas, pastas, sopas, guisados, e até em farinha para pães e bolos.', price: 4.00, img: 'img/sementeseGraos/grao_de_bico.jpg' },
      { name: 'Lentilha (100g)', desc: 'A Lentilha oferece inúmeros benefícios, como melhorar a saúde do coração (controlando pressão e colesterol), auxiliar na prevenção e tratamento da anemia, ajudar no controle da diabetes e do peso, por ser rica em fibras e ter baixo índice glicêmico. Também contribui para a saúde óssea e o sistema imunológico, e é uma ótima fonte de proteína vegetal, ideal para vegetarianos e veganos.', price: 3.00, img: 'img/sementeseGraos/lentilha.jpg' },
      { name: 'Linhaça Dourada (100g)', desc: 'A linhaça dourada oferece benefícios como a melhora da saúde intestinal e do controle do peso, devido ao seu alto teor de fibras. É também uma fonte de ômega 3, que auxilia na redução do colesterol e na prevenção de doenças cardiovasculares. Além disso, a linhaça dourada tem propriedades antioxidantes e anti-inflamatórias que fortalecem o sistema imunológico e auxiliam na saúde da pele e cabelo.', price: 4.00, img: 'img/sementeseGraos/linhaca_dourada.jpg' },
      { name: 'Linhaça Marrom (100g)', desc: 'A Linhaça Marrom oferece benefícios como a melhora da saúde intestinal e do coração, ajuda no controle de peso e da glicemia, e possui propriedades antioxidantes e anti-inflamatórias devido ao seu alto teor de fibras, ômega 3 e lignanas, também contribui para a saúde da pele e pode aliviar sintomas da TPM e menopausa. É recomendável consumir a linhaça moída para melhor absorção dos nutrientes.', price: 4.00, img: 'img/sementeseGraos/linhaca_marrom.jpg' },
      { name: 'Mix de Quinoa em grãos (100g)', desc: 'O Mix de Quinoa oferece vários benefícios, como alto teor de proteínas e fibras, que auxiliam na digestão, saciedade e controle do peso; é uma fonte de vitaminas (complexo B, A, C, E) e minerais (ferro, cálcio, magnésio, zinco), importantes para ossos, músculos e o sistema imunológico, e contém antioxidantes, ômega 3 e 6 que protegem contra o envelhecimento precoce e doenças cardiovasculares. Por ser sem glúten, é uma ótima opção para celíacos e intolerantes.', price: 5.00, img: 'img/sementeseGraos/mix_de_quinoa.jpg' },
      { name: 'Pepita de Girassol (100g)', desc: 'As pepitas de girassol (ou sementes de girassol sem casca), oferecem múltiplos benefícios à saúde, incluindo a melhoria da saúde cardiovascular devido ao seu teor de gorduras saudáveis e fibras, a proteção da pele e cabelos devido às vitaminas e antioxidantes, o fortalecimento dos ossos e músculos por serem ricas em minerais, o auxílio na regulação do colesterol, a potencial melhoria do sistema imunológico e o auxílio na gestão do peso e controle da diabetes.', price: 5.00, img: 'img/sementeseGraos/pepita_girassol.jpg' },
      { name: 'Semente de Abóbora (100g)', desc: 'As Sementes de Abóbora oferecem múltiplos benefícios à saúde devido ao seu conteúdo de magnésio, zinco, fibras, antioxidantes e proteínas, incluindo a melhoria da saúde cardiovascular, o controle do açúcar no sangue, o reforço do sistema imunológico, a promoção da qualidade do sono e o auxílio à digestão e saciedade. Elas também podem contribuir para a saúde da próstata e ajudar a aumentar a massa muscular.', price: 7.00, img: 'img/sementeseGraos/abobora.jpg' },
      { name: 'Semente de Girassol - com casca (100g)', desc: 'A Semente de Girassol com Casca pode ser consumida de diversas formas: Como lanche entre as refeições, basta quebrar a casca com os dentes e consumir a semente interna. Adicionada a mixes de sementes e oleaginosas, para um snack nutritivo, torrada com um pouco de sal ou temperos naturais. Pode também ser usada para alimentar aves ornamentais ou animais de estimação, sob orientação adequada.', price: 2.50, img: 'img/sementeseGraos/girassol_com_casca.jpg' },
      { name: 'Soja em Grãos (100g)', desc: 'A Soja em Grãos é um superalimento que oferece múltiplos benefícios à saúde, como a redução do colesterol LDL, a prevenção de doenças cardiovasculares, a melhora do funcionamento intestinal e o auxílio na perda de peso devido à sua alta quantidade de fibras e proteínas. Além disso, é rica em minerais como cálcio e magnésio, importantes para a saúde óssea, e isoflavonas, que aliviam os sintomas da menopausa.', price: 3.50, img: 'img/sementeseGraos/sojagraos.jpg' }
    ],

    diversos: [
      { name: 'Açúcar Mascavo (100g)', desc: 'O açúcar mascavo beneficia a saúde por reter vitaminas (como B), minerais (ferro, magnésio, potássio, cálcio) e antioxidantes, que são perdidos no refinamento do açúcar branco. Por ser menos processado, ele também causa menos picos de glicose no sangue e evita aditivos químicos.', price: 1.50, img: 'img/diversos/acucar_mascavo.jpg' },
      { name: 'Ameixa Seca sem Caroço (100g)', desc: 'A ameixa sem caroço é um fruto desidratado rico em fibras, vitaminas e minerais, que auxilia na digestão, previne a prisão de ventre e melhora a saúde intestinal devido ao seu efeito laxante natural, pode ser usada em diversas receitas, como sobremesas, sucos, vitaminas, bolos e muito mais.', price: 5.00, img: 'img/diversos/ameixa_seca.jpg' },
      { name: 'Azeite de Dendê Bahia (500ml)', desc: 'O azeite de dendê (óleo de palma) serve principalmente para uso culinário, conferindo sabor e cor a pratos como acarajé, vatapá e moqueca, além de ser usado para fritar e refogar alimentos.', price: 19.00, img: 'img/diversos/azeite_dende.jpg' },
      { name: 'Bicarbonato de sódio (100g)', desc: 'O bicarbonato de sódio é muito utilizado como antiácido para aliviar azia e má digestão, e em usos domésticos para culinária (fermento) e limpeza de superfícies e estofados. Também pode ser usado em cuidados pessoais, como desodorizante para os pés.', price: 1.50, img: 'img/diversos/bicarbonato.jpg' },
      { name: 'Biscoito de Arroz sabor Churrasco (100g)', desc: 'Os Biscoitos de Arroz são uma ótima opção para o lanche da tarde ou qualquer hora do dia. Saudáveis, saborosos e crocantes, eles não contêm leite nem derivados. Sabor Churrasco, com aquele toque defumado.', price: 9.00, img: 'img/diversos/biscoito_arroz_churrasco.jpg' },
      { name: 'Biscoito de Arroz sabor Queijo (100g)', desc: 'O Biscoito de Arroz Sabor Queijo é um snack leve, crocante e saboroso, produzido a partir de arroz, combinado com um delicioso molho de queijo para oferecer um sabor marcante e único, uma excelente opção para lanches, festas e reuniões.', price: 9.00, img: 'img/diversos/biscoito_arroz_queijo.jpg' },
      { name: 'Ceral Chocobol (100g)', desc: 'O Cereal Chocobol é uma opção deliciosa e prática para começar o dia com energia e sabor. Feito com bolinhas crocantes de cereais sabor chocolate, ele é perfeito para agradar o paladar de crianças e adultos.', price: 3.00, img: 'img/diversos/cereal_chocobol.jpg' },
      { name: 'Chips Banana e Canela (100g)', desc: 'O Chips Banana com Canela é um snack crocante feito com banana verde desidratada e com canela, é uma opção deliciosa para matar a fome em qualquer lugar. Combina os benefícios da Banana, e seu sabor, com uma das especiarias mais gostosas, a canela!', price: 8.00, img: 'img/diversos/chips_banana_canela.jpg' },
      { name: 'Chips de Batata Doce e Chimichurri (100g)', desc: 'O Chips de Batata Doce e Chimichurri é feito a partir de fatias bem fininhas de batata doce, bem crocantes e sequinhas, depois temperadas com sal e o delicioso Tempero Chimichurri, podendo ser consumidas como um petisco ou lanchinho entre as refeições e até como pré ou pós treino.', price: 8.00, img: 'img/diversos/chips_batata_doce_chimichurri.jpg' },
      { name: 'Chips de Batata Doce e Lemon Pepper (100g)', desc: 'O Chips de Batata Doce e Lemon Pepper é feito a partir de fatias bem fininhas de batata doce, bem crocantes e sequinhas, depois temperadas com o delicioso Tempero Lemon Pepper, podendo ser consumidas como um petisco ou lanchinho entre as refeições e até como pré ou pós treino.', price: 8.00, img: 'img/diversos/chips_batata_doce_lemon_pepper.jpg' },
      { name: 'Chips de Macaxeira Tradicional (100g)', desc: 'O Chips de Macaxeira Tradicional é uma opção perfeita para seus lanches, um petisco crocante, leve e sequinho, além de ser prático e saboroso, e com valores menores em gordura e sódio, comparando com as chips comuns.', price: 8.00, img: 'img/diversos/chips_macaxeira_tradicional.jpg' },
      { name: 'Chips de Macaxeira e Lemon Pepper (100g)', desc: 'O Chips de Macaxeira e Lemon Pepper é uma opção perfeita para seus lanches, um petisco crocante, leve e sequinho, com um toque especial do tempero Lemon Pepper, para deixá-lo ainda mais saboroso.', price: 8.00, img: 'img/diversos/chips_macaxeira_lemon_pepper.jpg'},
      { name: 'Cranberry (100g)', desc: 'Cranberry é uma fruta vermelha rica em antioxidantes e vitamina C, usada principalmente para prevenir infecções do trato urinário, pois suas proantocianidinas impedem as bactérias de se fixarem nas paredes da bexiga. Também serve para fortalecer o sistema imunológico e a saúde celular.', price: 7.50, img: 'img/diversos/cranberry.jpg' },
      { name: 'Damasco (100g)', desc: 'O Damasco Seco é rico em fibras, que melhoram o trânsito intestinal e ajudam a controlar o colesterol e a glicemia, além de ser fonte de potássio, importante para a saúde do coração e do controle da pressão arterial. Contém ainda ferro, que previne a anemia, e antioxidantes, como o betacaroteno, que combatem os radicais livres e auxiliam na prevenção de doenças crônicas e envelhecimento precoce.', price: 9.00, img: 'img/diversos/damasco.jpg' },
      { name: 'Lambedor Artesanal (200g)', desc: 'O Lambedor pode funcionar como um tratamento paliativo para aliviar a tosse e a congestão nasal, pois contém ingredientes com propriedades expectorantes e fluidificantes, como o mel e ervas medicinais que podem ajudar na remoção do catarro e aliviar o desconforto. No entanto, é crucial buscar orientação médica para se tratar de maneira mais eficaz.', price: 4.00, img: 'img/diversos/lambedor.jpg' },
      { name: 'Mel de Abelhas Artesanal (200ml)', desc: 'O Mel de abelhas italianas tem benefícios similares ao mel de outras qualidades, agindo como fonte de energia, fortalecendo o sistema imunológico, aliviando a tosse e a dor de garganta, melhorando a saúde do coração e com propriedades antioxidantes e anti-inflamatórias. Suas vitaminas e minerais auxiliam na renovação celular e prevenção do envelhecimento precoce.', price: 12.00, img: 'img/diversos/mel_abelha.jpg' },
      { name: 'Milho Torrado Mostarda e Mel (100g)', desc: 'O Milho Torrado Mostarda e Mel é muito conhecido pelo seu sabor e aroma únicos, ele também é super sequinho e crocante, o que deixa seus lanches e festas ainda mais diferenciados, além de ser uma opção de fonte de vitaminas e minerais.', price: 7.50, img: 'img/diversos/milho_torrado.jpg' },
      { name: 'Polvilho Azedo (100g)', desc: 'O polvilho azedo serve para dar crescimento e uma textura mais seca e crocante a preparações salgadas como pão de queijo, biscoitos e rosquinhas, devido ao processo de fermentação que passa na sua fabricação, conferindo-lhe um sabor mais intenso e ácido. É também uma alternativa sem glúten para substituir a farinha de trigo em diversas receitas.', price: 2.50, img: 'img/diversos/polvilho_azedo.jpg' },
      { name: 'Polvilho Doce (100g)', desc: 'O Polvilho Doce é um dos ingredientes mais básicos na culinária sem glúten, sendo amplamente utilizado na panificação e confeitaria. Extraído da mandioca, ele fornece leveza, elasticidade e maciez às massas, sendo indispensável em receitas como pães de queijo, biscoitos e bolos.', price: 2.50, img: 'img/diversos/polvilho_doce.jpg' },
      { name: 'Porta-Condimentos Inox Giratório c/12 potes', desc: 'Perfeito para uma organização prática e moderna para seus temperos, e deixar sua cozinha ainda mais completa.', price: 85.00, img: 'img/diversos/porta_condimentos_inox.jpg' },
      { name: 'Porta-Condimentos Preto Giratório c/09 potes', desc: 'O Porta-Temperos é super funcional, prático, tem um formato ergonômico e moderno, podendo armazenar todos seus condimentos de forma correta e em um mesmo local.', price: 70.00, img: 'img/diversos/porta_preto_9.jpg' },
      { name: 'Porta-Condimentos Preto Giratório c/12 potes', desc: 'O Porta-Temperos é super funcional, prático, tem um formato ergonômico e moderno, podendo armazenar todos seus condimentos de forma correta e em um mesmo local.', price: 80.00, img: 'img/diversos/porta_preto12.jpg' },
      { name: 'Porta-Condimentos Artesanal c/08 potes', desc: 'Mantenha seus temperos e especiarias bem conservados, com esse maravilhoso Porta-condimentos. Com acabamento feito a mão, este organizador é uma escolha artesanal que o transforma em uma peça de destaque que agrega charme com um toque rústico à sua cozinha.', price: 95.00, img: 'img/diversos/porta_artesanal.jpg' },
      { name: 'Sucrilho Tradicional (100g)', desc: 'Flocos de milhos com açúcar, popularmente conhecidos como Sucrilhos, enriquecidos com vitamina C, vitaminas do complexo B, ferro e zinco, é Ideal para um café da manhã saudável, nutritivo e saboroso, para começar o dia com energia e disposição.', price: 3.00, img: 'img/diversos/sucrilho.jpg' },
      { name: 'Tâmara sem Caroço (100g)', desc: 'A tâmara sem caroço serve como um lanche energético e um adoçante natural devido ao seu alto teor de açúcares naturais e fibras. É rica em vitaminas e minerais, como vitaminas do complexo B, potássio e magnésio, que auxiliam na melhora do funcionamento do intestino, no controle dos níveis de açúcar no sangue, no fortalecimento do sistema imunológico e na saúde ocular.', price: 6.00, img: 'img/diversos/tamara.jpg' },
      { name: 'Tapioca Granulada', desc: 'A tapioca granulada pode ser utilizada como base de várias receitas. Em geral, para utilizá-la basta hidratar os grãos. Após, pode-se fazer diversas receitas, como bolos, pudins, cuscuz, mingaus, papas, dadinhos de tapioca, sorvetes e muito mais.', price: 2.50, img: 'img/diversos/tapioca_granulada.jpg' },
      { name: 'Uva Passa Preta (100g)', desc: 'As Uvas Passas são uvas desidratadas, ricas em fibras, antioxidantes e minerais como potássio e ferro, que são benéficas para o funcionamento do intestino e para a saúde geral do corpo. Utilizadas em pratos doces e salgados, as passas concentram o sabor das uvas e são ideais para lanches rápidos ou para enriquecer receitas.', price: 3.50, img: 'img/diversos/uva_passa.jpg' },
      { name: 'Vinagre Orgânico de Maçã Almaromi (400ml)', desc: 'O Vinagre de Maçã Almaromi é 100% natural e produzido para atender os mais exigentes paladares. Possui acidez de 4%, embalagem especial e é apresentado em garrafa pet de 400 ml.', price: 24.00, img: 'img/diversos/vinagre_maca.jpg' },
      { name: 'Charque P.A. (500g)', desc: 'Charque de alta qualidade, perfeito para diversas preparações culinárias.', price: 18.00, img: 'img/diversos/charque.jpg' }
    ]
  };

  // Adicionando a nova categoria dinamicamente
  produtos.oleaginosas = [
    { name: 'Amêndoas Crua sem Casca (100g)', price: 10.00, desc: 'As Amêndoas Cruas são ricas em fibras, proteínas, gorduras saudáveis, vitaminas e minerais, como magnésio, cálcio e vitamina E, que trazem vários benefícios à saúde.', img: 'img/oleaginosas/amendoas_cruas.jpg' },
    { name: 'Amendoim com Sal (100g)', price: 3.00, desc: 'O amendoim oferece diversos benefícios para a saúde, quando consumido com moderação, incluindo a melhora da saúde cardiovascular, controle do colesterol, e fortalecimento muscular. Ideal para lanches e petiscos.', img: 'img/oleaginosas/amendoim_com_sal.jpg' },
    { name: 'Amendoim sem Sal (100g)', price: 3.00, desc: 'Rico em gorduras saudáveis, proteínas e fibras. A opção "Sem Sal" é ideal para receitas e dietas para pessoas hipertensas.', img: 'img/oleaginosas/amendoim_sem_sal.jpg' },
    { name: 'Amendoim Granulado (100g)', price: 3.00, desc: 'Alimento nutritivo e versátil, ideal para complementar receitas. Rico em proteínas, fibras e gorduras boas, oferece um sabor marcante e textura crocante.', img: 'img/oleaginosas/amendoim_granulado.jpg' },
    { name: 'Amendoim Japonês Cebola e Salsa (100g)', price: 3.00, desc: 'Salgadinho de amendoim revestido com uma massa de farinha de trigo, frito ou torrado. Ideal para lanches e petiscos.', img: 'img/oleaginosas/amendoim_japones_cebola_salsa.jpg' },
    { name: 'Amendoim Japonês Churrasco (100g)', price: 3.00, desc: 'Salgadinho de amendoim revestido com uma massa de farinha de trigo, frito ou torrado. Ideal para lanches e petiscos.', img: 'img/oleaginosas/amendoim_japones_churrasco.jpg' },
    { name: 'Amendoim Japonês Pimenta (100g)', price: 3.00, desc: 'Salgadinho de amendoim revestido com uma massa de farinha de trigo, frito ou torrado. Ideal para lanches e petiscos.', img: 'img/oleaginosas/amendoim_japones_pimenta.jpg' },
    { name: 'Amendoim Japonês Tradicional (100g)', price: 3.00, desc: 'Salgadinho de amendoim revestido com uma massa de farinha de trigo e depois frito ou torrado, ideal para lanches e petiscos.', img: 'img/oleaginosas/amendoim_japones_tradicional.jpg' },
    { name: 'Amendoim Japonês Mostarda e Mel (100g)', price: 3.00, desc: 'Salgadinho de amendoim revestido com uma massa de farinha de trigo, frito ou torrado. Ideal para lanches e petiscos.', img: 'img/oleaginosas/amendoim_japones_mostarda_mel.jpg' },
    { name: 'Amendoim Japonês Queijo (100g)', price: 3.00, desc: 'Salgadinho de amendoim revestido com uma massa de farinha de trigo, frito ou torrado. Ideal para lanches e petiscos.', img: 'img/oleaginosas/amendoim_japones_queijo.jpg' },
    { name: 'Amendoim Torrado com Casca (100g)', price: 2.50, desc: 'Rico em nutrientes como proteínas e gorduras, capaz de suprir as necessidades diárias de vitamina E, B1, B3, enxofre, sódio, magnésio, cobre, ferro e fósforo.', img: 'img/oleaginosas/amendoim_torrado_com_casca.jpg' },
    { name: 'Amendoim Doce (100g)', price: 3.80, desc: 'Amendoins confeitados, com deliciosa casquinha de açúcar colorida.', img: 'img/oleaginosas/amendoim_doce.jpg' },
    { name: 'Amendoim Chocolate (100g)', price: 3.80, desc: 'Amendoins confeitados, com deliciosa casquinha sabor chocolate.', img: 'img/oleaginosas/amendoim_chocolate.jpg' },
    { name: 'Castanha de Caju Granulada (100g)', price: 7.00, desc: 'Também conhecida como xerém, é perfeita para quem deseja praticidade e sabor. Versátil, pode ser usada em iogurtes, frutas, açaí, saladas e receitas doces ou salgadas.', img: 'img/oleaginosas/castanha_de_caju_granulada.jpg' },
    { name: 'Castanha Frita com Sal (100g)', price: 8.00, desc: 'Pode ser consumida em lanches ou aperitivos, mas com moderação, devido à adição de gorduras e sal.', img: 'img/oleaginosas/castanha_frita_com_sal.jpg' },
    { name: 'Castanha de Caju Tradicional (100g)', price: 8.00, desc: 'Beneficia o coração, fortalece o sistema imunológico e a saúde óssea. Pode melhorar o humor e a memória graças ao triptofano e magnésio.', img: 'img/oleaginosas/castanha_de_caju_tradicional.jpg' },
    { name: 'Castanha Caramelizada (100g)', price: 7.50, desc: 'Snack crocante e nutritivo, feito com açúcar mascavo e gergelim. Combina o sabor da castanha com a crocância do gergelim.', img: 'img/oleaginosas/castanha_caramelizada.jpg' },
    { name: 'Castanha do Pará (100g)', price: 18.00, desc: 'Beneficia a saúde cardiovascular, cerebral e imunológica devido ao seu alto teor de selênio. Recomenda-se um consumo moderado (2 a 3 unidades por dia).', img: 'img/oleaginosas/castanha_do_para.jpg' },
    { name: 'Nozes Mariposa (100g)', price: 9.50, desc: 'Oferecem múltiplos benefícios à saúde, como a proteção cardiovascular e ação antioxidante devido à presença de ômega-3, vitaminas e minerais.', img: 'img/oleaginosas/nozes_mariposa.jpg' }
  ];

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
      <div class="card" role="article" data-product-id="${id}">
        <img src="${prod.img}" class="card-img-top" alt="${esc(prod.name)}" loading="lazy">
        <div class="card-body">
          <h5 class="card-title">${esc(prod.name)}</h5>
          <p class="card-text">${esc(prod.desc)}</p>
          <div class="card-actions">
            <p class="fw-bold">R$ ${Number(prod.price).toFixed(2)}</p>
            <div>
              <button class="favorite-btn" data-action="favorite" data-id="${id}" aria-label="Adicionar aos Favoritos"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
              <button class="btn bg-yellow" type="button" data-action="add" data-id="${id}" data-name="${esc(prod.name)}" data-price="${Number(prod.price)}">Adicionar</button>
            </div>
          </div>
        </div>
      </div>`;
  }
  function renderProdutos() {
    ['temperos','chas','funcionais','sementesEgraos','oleaginosas','diversos'].forEach(cat => {
      const carousel = document.getElementById(`${cat}-carousel`);
      if (!carousel) return;
      carousel.innerHTML = '';
      const list = produtos[cat] || [];
      updateFavoriteButtons();
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
    document.getElementById('nav-cart-count').textContent = cart.reduce((acc,i)=>acc+i.qty,0);
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

  /* Fly to cart animation */
  function flyToCartAnimation(sourceElement) {
    const targetElement = document.getElementById('nav-cart-button');
    if (!sourceElement || !targetElement) return;

    const flyingImage = sourceElement.cloneNode(true);
    flyingImage.classList.add('flying-image');

    const startRect = sourceElement.getBoundingClientRect();
    const endRect = targetElement.getBoundingClientRect();

    document.body.appendChild(flyingImage);

    // Set initial position
    flyingImage.style.left = `${startRect.left}px`;
    flyingImage.style.top = `${startRect.top}px`;
    flyingImage.style.width = `${startRect.width}px`;
    flyingImage.style.height = `${startRect.height}px`;

    // Trigger animation
    requestAnimationFrame(() => {
      flyingImage.style.left = `${endRect.left + endRect.width / 2}px`;
      flyingImage.style.top = `${endRect.top + endRect.height / 2}px`;
      flyingImage.style.width = '0px';
      flyingImage.style.height = '0px';
      flyingImage.style.opacity = '0';
    });

    // Remove element after animation
    setTimeout(() => {
      flyingImage.remove();
    }, 800); // Must match CSS transition duration
  }

  /* attach product buttons */
  document.addEventListener('click', e => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const { id, name, price, action } = btn.dataset;
    if (action==='inc') changeQty(id,1);
    else if (action==='dec') changeQty(id,-1);
    else if (action==='favorite') {
      toggleFavorite(id);
    }
    else if (action==='add') {
      addToCart(id, name, Number(price));
      const cardImage = btn.closest('.card')?.querySelector('.card-img-top');
      if (cardImage) {
        flyToCartAnimation(cardImage);
      }
    }
  });

  /* persist cart */
  const FAVORITES_KEY = 'emporio_favorites_v1';
  let favorites = [];

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
  const navCartButton = document.getElementById('nav-cart-button');
  if (navCartButton) {
    navCartButton.addEventListener('click', () => {
      const cartEl = document.getElementById('cart');
      cartEl.classList.toggle('open');
      renderCart();
    });
  }

  /* send to WhatsApp */
  window.sendToWhatsApp = function(){
    if (!cart.length) return showToast('Seu carrinho está vazio!', 'warning');

    // Separar produtos por categoria
    const chas = [];
    const temperos = [];
    const funcionais = [];
    const sementesEgraos = [];
    const diversos = [];
    const oleaginosas = [];

    cart.forEach(item => {
      // Verificar se é um chá
      if (produtos.chas.some(cha => cha.name === item.name)) {
        chas.push(item);
      }
      // Verificar se é um produto funcional
      else if (produtos.funcionais.some(funcional => funcional.name === item.name)) {
        funcionais.push(item);
      }
      // Verificar se é sementes e grãos
      else if (produtos.sementesEgraos.some(semente => semente.name === item.name)) {
        sementesEgraos.push(item);
      }
      // Verificar se é oleaginosa
      else if (produtos.oleaginosas.some(oleo => oleo.name === item.name)) {
        oleaginosas.push(item);
      }
      // Verificar se é diversos
      else if (produtos.diversos.some(diverso => diverso.name === item.name)) {
        diversos.push(item);
      }
      // Se não for nenhuma das acima, é tempero
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

    // Adicionar sementes e grãos
    if (sementesEgraos.length > 0) {
      msg += '🌱 SEMENTES E GRÃOS:%0A';
      sementesEgraos.forEach(item => {
        msg += `- ${item.name} x${item.qty} = R$ ${(item.price * item.qty).toFixed(2)}%0A`;
      });
      const subtotalSementes = sementesEgraos.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
      msg += `Subtotal Sementes e Grãos: R$ ${subtotalSementes}%0A%0A`;
    }

    // Adicionar oleaginosas
    if (oleaginosas.length > 0) {
      msg += '🥜 OLEAGINOSAS:%0A';
      oleaginosas.forEach(item => {
        msg += `- ${item.name} x${item.qty} = R$ ${(item.price * item.qty).toFixed(2)}%0A`;
      });
      const subtotalOleaginosas = oleaginosas.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
      msg += `Subtotal Oleaginosas: R$ ${subtotalOleaginosas}%0A%0A`;
    }

    // Adicionar diversos
    if (diversos.length > 0) {
      msg += '🛒 DIVERSOS:%0A';
      diversos.forEach(item => {
        msg += `- ${item.name} x${item.qty} = R$ ${(item.price * item.qty).toFixed(2)}%0A`;
      });
      const subtotalDiversos = diversos.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
      msg += `Subtotal Diversos: R$ ${subtotalDiversos}%0A%0A`;
    }

    // Total geral
    const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
    msg += `*TOTAL: R$ ${total}*`;

    const url = `https://wa.me/+5581991889242?text=${msg}`;
    window.open(url, '_blank');
  }

  /* search functionality */
  function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      const sections = document.querySelectorAll('#product-list > section');

      sections.forEach(section => {
        const cards = section.querySelectorAll('.card');
        let hasVisibleCards = false;

        cards.forEach(card => {
          const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
          const desc = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
          const matches = title.includes(searchTerm) || desc.includes(searchTerm);

          if (matches) {
            card.style.display = 'flex';
            hasVisibleCards = true;
          } else {
            card.style.display = 'none';
          }
        });

        // Esconde a seção inteira (título + carrossel) se não houver produtos correspondentes
        section.style.display = hasVisibleCards ? 'block' : 'none';
      });
    });
  }
  setupSearch();

  /* Toast Notification Functionality */
  function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
      success: '✅',
      warning: '⚠️',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div class="toast-message">${esc(message)}</div>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  /* smart input functionality */
  function setupSmartInput() {
    const smartInput = document.getElementById('smart-input');
    const smartAddBtn = document.getElementById('smart-add-btn');
    if (!smartInput || !smartAddBtn) return;

    const processInput = () => {
      const text = smartInput.value.trim();
      if (!text) return;

      // 1. Flatten all products into a single array for easier searching
      const allProducts = Object.values(produtos).flat();

      // 2. Split user input by "e" or ","
      const requests = text.toLowerCase().split(/\s+e\s+|\s*,\s*/);
      
      let itemsAddedCount = 0;
      let notFound = [];

      requests.forEach(request => {
        // 3. Use regex to find quantity and product name
        const match = request.trim().match(/^(\d+)?\s*(.*)/);
        if (!match) return;

        let qty = parseInt(match[1], 10) || 1;
        const nameQuery = match[2].trim();

        if (!nameQuery) return;

        // 4. Find the best product match
        let bestMatch = null;
        let highestScore = 0;

        allProducts.forEach(product => {
          const productName = product.name.toLowerCase();
          if (productName.includes(nameQuery)) {
            // Simple scoring: exact match is best, otherwise prefer shorter product names
            const score = productName === nameQuery ? 100 : 100 - (productName.length - nameQuery.length);
            if (score > highestScore) {
              highestScore = score;
              bestMatch = product;
            }
          }
        });

        // 5. If a match is found, add it to the cart
        if (bestMatch) {
          const existingItem = cart.find(item => item.id === slugify(bestMatch.name));
          if (existingItem) {
            existingItem.qty += qty;
          } else {
            cart.push({ id: slugify(bestMatch.name), name: bestMatch.name, price: bestMatch.price, qty: qty });
          }
          itemsAddedCount += qty;
        } else {
          notFound.push(nameQuery);
        }
      });

      // 6. Provide feedback to the user
      renderCart();
      smartInput.value = '';

      if (notFound.length > 0) {
        showToast(`Não encontramos: "${notFound.join('", "')}". Os outros foram adicionados.`, 'warning');
      } else if (itemsAddedCount > 0) {
        showToast(`${itemsAddedCount} ite${itemsAddedCount > 1 ? 'ns' : 'm'} adicionado${itemsAddedCount > 1 ? 's' : ''} com sucesso!`, 'success');
      }
    };

    smartAddBtn.addEventListener('click', processInput);
    smartInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        processInput();
      }
    });
  }
  setupSmartInput();

  /* Kit Builder Functionality */
function setupKitBuilder() {
  const selectionScreen = document.getElementById('kit-selection-screen');
  const builderUI = document.getElementById('kit-builder-ui');
  const allProducts = Object.values(produtos).flat();

  const kitDefinitions = {
    churrasco: {
      title: '🔥 Monte seu Kit Churrasco!',
      products: ['Sal de Parrilla (100g)', 'Tempero Chimichurri tradicional (100g)', 'Fumaça em pó (100g)', 'Pimenta Calabresa (100g)', 'Alho Frito Granulado (100g)', 'Tempero para Churrasco sem Pimenta (100g)', 'Sal Rosa Grosso do Himalaia (100g)', 'Tempero Beef Ribs (100g)']
    },
    essenciais: {
      title: '🌿 Monte seu Kit de Temperos Essenciais!',
      products: ['Tempero Ana Maria (100g)', 'Tempero Edu Guedes tradicional (100g)', 'Páprica Doce (100g)', 'Açafrão (100g)', 'Cominho Moído (100g)', 'Orégano (100g)', 'Tempero Cebola, Alho e Salsa (100g)', 'Pimenta do Reino Preta Moída (100g)']
    },
    chas: {
      title: '🍵 Monte seu Kit de Chás!',
      products: ['Camomila (50g)', 'Erva-Doce Tradicional (50g)', 'Hortelã (50g)', 'Capim-Limão (50g)', 'Chá Verde (50g)', 'Hibisco (50g)', 'Erva-Cidreira (50g)', 'Boldo (50g)']
    },
    funcionais: {
      title: '💪 Monte seu Kit Funcional!',
      products: ['Maca Peruana (100g)', 'Psyllium (100g)', 'Creatina Monohidratada (100g)', 'Colágeno em Pó Hidrolisado (100g)', 'Farinha de Linhaça Dourada (100g)', 'Cacau em Pó 100% (100g)', 'Gengibre em Pó (100g)', 'Guaraná em Pó (100g)']
    },
    sementes: {
      title: '🌱 Monte seu Kit de Sementes e Grãos!',
      products: ['Chia (100g)', 'Linhaça Dourada (100g)', 'Gergelim Branco (100g)', 'Semente de Abóbora (100g)', 'Pepita de Girassol (100g)', 'Granola Tradicional a granel (100g)', 'Aveia em Flocos Finos (100g)', 'Grão-de-Bico (100g)']
    },
    diversos: {
      title: '🍩 snacking Monte seu Kit de Snacks e Doces!',
      products: [
        'Açúcar Mascavo (100g)',
        'Ameixa Seca sem Caroço (100g)',
        'Uva Passa Preta (100g)',
        'Damasco (100g)',
        'Tâmara sem Caroço (100g)',
        'Milho Torrado Mostarda e Mel (100g)',
        'Chips de Batata Doce e Lemon Pepper (100g)',
        'Biscoito de Arroz sabor Queijo (100g)'
      ]
    },
    ia: {
      title: '🤖 Kit Inteligente',
      keywords: {
        'carnes': ['Sal de Parrilla (100g)', 'Tempero Chimichurri tradicional (100g)', 'Fumaça em pó (100g)', 'Pimenta do Reino Preta Moída (100g)', 'Tempero Beef Ribs (100g)'],
        'aves': ['Tempero Fit Frango (100g)', 'Lemon Pepper (100g)', 'Páprica Doce (100g)', 'Açafrão (100g)', 'Alho em pó (100g)'],
        'frango': ['Tempero Fit Frango (100g)', 'Lemon Pepper (100g)', 'Páprica Doce (100g)', 'Açafrão (100g)', 'Alho em pó (100g)'],
        'peixes': ['Lemon Pepper (100g)', 'Tempero Limão e Ervas Finas (100g)', 'Pimenta Rosa (100g)', 'Endro (50g)', 'Gengibre em Pó (100g)'],
        'saladas': ['Tempero Limão e Ervas Finas (100g)', 'Pimenta Rosa (100g)', 'Gergelim Branco (100g)', 'Pepita de Girassol (100g)'],
        'feijão': ['Tempero Feijãozinho (100g)', 'Cominho Moído (100g)', 'Louro Folhas (40g)', 'Bacon Desidratado (100g)'],
        'massas': ['Orégano (100g)', 'Manjericão (100g)', 'Tempero Molho Tártaro (100g)', 'Páprica Doce (100g)'],
        'molhos': ['Orégano (100g)', 'Manjericão (100g)', 'Tempero Molho Tártaro (100g)', 'Páprica Doce (100g)'],
        'sopas': ['Caldo de Legumes em Pó (100g)', 'Caldo de Galinha em Pó (menos sódio) (100g)', 'Creme de Cebola (100g)', 'Mix para Arroz (100g)'],
        'legumes': ['Tempero Edu Guedes tradicional (100g)', 'Tempero Limão e Ervas Finas (100g)', 'Orégano (100g)', 'Alho Frito Granulado (100g)'],
        'doces': ['Canela em Pó (100g)', 'Cravo-da-India (50g)', 'Anis-Estrelado (50g)', 'Nozes Moscada Inteiro (und)', 'Açúcar Mascavo (100g)'],
        'saudável': ['Tempero Fit Completo (100g)', 'Sal Rosa Fino do Himalaia (100g)', 'Chia (100g)', 'Farinha de Linhaça Dourada (100g)', 'Psyllium (100g)']
      }
    }
  };

  function showSelectionScreen() {
    selectionScreen.style.display = 'block';
    builderUI.style.display = 'none';
    builderUI.innerHTML = '';
  }

  function renderKitBuilder(kitName, productNames) {
    selectionScreen.style.display = 'none';
    builderUI.style.display = 'block';

    const kitProducts = allProducts.filter(p => productNames.includes(p.name));
    
    builderUI.innerHTML = `
      <button class="kit-builder-back-btn" id="back-to-kits">← Voltar para seleção de kits</button>
      <div class="kit-builder-header">
        <h2>${kitDefinitions[kitName].title}</h2>
        <p>Selecione todos os itens e ganhe <strong>10% de desconto</strong> no valor do kit!</p>
      </div>
      <div id="kit-items-container" class="kit-items-grid"></div>
      <div id="kit-summary-container" class="kit-summary"></div>
    `;

    const kitItemsContainer = document.getElementById('kit-items-container');
    kitProducts.forEach(product => {
      const itemEl = document.createElement('div');
      itemEl.className = 'kit-item';
      itemEl.dataset.id = slugify(product.name);
      itemEl.dataset.price = product.price;
      itemEl.dataset.name = product.name;
      itemEl.innerHTML = `
        <img src="${product.img}" alt="${esc(product.name)}" class="kit-item-img" loading="lazy">
        <p class="kit-item-name">${esc(product.name)}</p>
        <p class="fw-bold">R$ ${product.price.toFixed(2)}</p>
      `;
      itemEl.addEventListener('click', () => {
        itemEl.classList.toggle('selected');
        updateKitSummary(kitName);
      });
      kitItemsContainer.appendChild(itemEl);
    });

    document.getElementById('back-to-kits').addEventListener('click', showSelectionScreen);
  }

  function updateKitSummary(kitName) {
    const kitSummaryContainer = document.getElementById('kit-summary-container');
    const allKitItems = builderUI.querySelectorAll('.kit-item');
    const selectedItems = builderUI.querySelectorAll('.kit-item.selected');
    let total = 0;
    selectedItems.forEach(item => total += parseFloat(item.dataset.price));

    if (total === 0) {
      kitSummaryContainer.innerHTML = '';
      return;
    }
    
    const isCompleteKit = selectedItems.length === allKitItems.length && allKitItems.length > 0;
    let summaryHTML = `<p>Total dos itens: R$ ${total.toFixed(2)}</p>`;

    if (isCompleteKit) {
      const discount = total * 0.10;
      const finalTotal = total - discount;
      summaryHTML += `
        <p class="discount">Desconto Kit Completo (10%): - R$ ${discount.toFixed(2)}</p>
        <p class="fw-bold">Total do Kit: R$ ${finalTotal.toFixed(2)}</p>
      `;
    } else {
      summaryHTML += `<p style="font-size: 0.85rem; color: #555;">Selecione todos os itens para ganhar 10% de desconto!</p>`;
    }

    summaryHTML += `<button id="add-kit-btn" class="btn bg-yellow" style="margin-top: 16px;">Adicionar Itens ao Carrinho</button>`;
    kitSummaryContainer.innerHTML = summaryHTML;

    document.getElementById('add-kit-btn').addEventListener('click', () => addKitToCart(kitName));
  }

  function addKitToCart(kitName) {
    const selectedItems = builderUI.querySelectorAll('.kit-item.selected');
    if (selectedItems.length === 0) return showToast('Selecione pelo menos um item para o seu kit!', 'warning');
    const allKitItems = builderUI.querySelectorAll('.kit-item');

    let kitTotal = 0;
    selectedItems.forEach(item => {
      const { id, name, price } = item.dataset;
      addToCart(id, name, parseFloat(price));
      kitTotal += parseFloat(price);
    });

    const isCompleteKit = selectedItems.length === allKitItems.length && allKitItems.length > 0;
    if (isCompleteKit) {
      const discountValue = kitTotal * 0.10;
      cart.push({
        id: `desconto-kit-${slugify(kitName)}`,
        name: `Desconto Kit Completo (10%)`,
        price: -discountValue,
        qty: 1
      });
    }

    renderCart();
    showToast(`${selectedItems.length} ite${selectedItems.length > 1 ? 'ns' : 'm'} adicionado${selectedItems.length > 1 ? 's' : ''} ao carrinho!`, 'success');
    showSelectionScreen();
  }

  function renderIaBuilder() {
    selectionScreen.style.display = 'none';
    builderUI.style.display = 'block';
    builderUI.innerHTML = `
      <button class="kit-builder-back-btn" id="back-to-kits">← Voltar para seleção de kits</button>
      <div class="kit-builder-header">
        <h2>${kitDefinitions.ia.title}</h2>
        <p>Clique em uma categoria abaixo e nós sugerimos um kit para você!</p>
      </div>
      <div class="ia-keywords-container" id="ia-keywords-container">
        <!-- Tags de palavras-chave serão inseridas aqui -->
      </div>
      <div id="ia-results-container"></div>
    `;

    const keywordsContainer = document.getElementById('ia-keywords-container');
    const keywords = Object.keys(kitDefinitions.ia.keywords);
    keywords.forEach(kw => {
      const tag = document.createElement('button');
      tag.className = 'ia-keyword-tag';
      tag.textContent = kw.charAt(0).toUpperCase() + kw.slice(1); // Capitalize
      tag.dataset.keyword = kw;
      tag.addEventListener('click', () => generateIaKit(kw));
      keywordsContainer.appendChild(tag);
    });

    document.getElementById('back-to-kits').addEventListener('click', showSelectionScreen);
  }

  function generateIaKit(keyword) {
    const resultsContainer = document.getElementById('ia-results-container');
    if (!keyword) {
      showToast(`Categoria inválida.`, 'warning');
      return;
    }

    const productNames = kitDefinitions.ia.keywords[keyword];
    const kitProducts = allProducts.filter(p => productNames.includes(p.name));

    resultsContainer.innerHTML = `
      <div class="kit-builder-header" style="margin-top: 24px;">
        <h4>Sugestão para "${keyword.charAt(0).toUpperCase() + keyword.slice(1)}":</h4>
      </div>
      <div id="kit-items-container" class="kit-items-grid"></div>
      <div id="kit-summary-container" class="kit-summary"></div>
    `;

    const kitItemsContainer = document.getElementById('kit-items-container');
    kitProducts.forEach(product => {
      const itemEl = document.createElement('div');
      itemEl.className = 'kit-item';
      itemEl.dataset.id = slugify(product.name);
      itemEl.dataset.price = product.price;
      itemEl.dataset.name = product.name;
      itemEl.innerHTML = `
        <img src="${product.img}" alt="${esc(product.name)}" class="kit-item-img" loading="lazy">
        <p class="kit-item-name">${esc(product.name)}</p>
        <p class="fw-bold">R$ ${product.price.toFixed(2)}</p>
      `;
      itemEl.addEventListener('click', () => {
        itemEl.classList.toggle('selected');
        updateKitSummary('ia');
      });
      kitItemsContainer.appendChild(itemEl);
    });
  }

  document.querySelectorAll('.kit-option-card').forEach(card => {
    card.addEventListener('click', () => {
      const kitName = card.dataset.kit;
      if (kitName === 'ia') {
        renderIaBuilder();
      } else {
        renderKitBuilder(kitName, kitDefinitions[kitName].products);
      }
    });
  });
}
setupKitBuilder();

  /* Tabs Functionality */
  function setupTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabLinks.forEach(link => {
      link.addEventListener('click', () => {
        const tabId = link.dataset.tab;

        tabLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        tabPanels.forEach(panel => {
          panel.classList.toggle('active', panel.id === tabId);
        });
      });
    });
  }
  setupTabs();

  /* Parallax Effect on Hero */
  function setupParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const offset = window.pageYOffset;
      // Move o background na metade da velocidade do scroll
      hero.style.backgroundPositionY = offset * 0.5 + 'px';
    });
  }
  setupParallax();

  /* Favorites Functionality */
  function loadFavorites() {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Erro ao carregar favoritos', e);
      return [];
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Erro ao salvar favoritos', e);
    }
  }

  function toggleFavorite(productId) {
    const allProducts = Object.values(produtos).flat();
    const product = allProducts.find(p => slugify(p.name) === productId);
    if (!product) return;

    const favIndex = favorites.findIndex(fav => fav.id === productId);

    if (favIndex > -1) {
      favorites.splice(favIndex, 1);
      showToast(`${product.name} removido dos favoritos.`, 'info');
    } else {
      favorites.push({ id: productId, name: product.name, price: product.price, img: product.img });
      showToast(`${product.name} adicionado aos favoritos!`, 'success');
    }

    saveFavorites();
    updateFavoriteButtons();
    renderFavorites();
  }

  function updateFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      const productId = btn.dataset.id;
      if (favorites.some(fav => fav.id === productId)) {
        btn.classList.add('active');
        btn.querySelector('svg').style.fill = '#ef4444';
      } else {
        btn.classList.remove('active');
        btn.querySelector('svg').style.fill = 'none';
      }
    });
    document.getElementById('nav-favorites-count').textContent = favorites.length;
  }

  function renderFavorites() {
    const modalList = document.getElementById('favorites-list');
    if (!modalList) return;

    if (favorites.length === 0) {
      modalList.innerHTML = '<p style="text-align:center; color:#888;">Sua lista de favoritos está vazia.</p>';
      return;
    }

    modalList.innerHTML = '';
    favorites.forEach(fav => {
      const itemEl = document.createElement('div');
      itemEl.className = 'favorite-item';
      itemEl.innerHTML = `
        <img src="${fav.img}" alt="${esc(fav.name)}" loading="lazy">
        <div class="favorite-item-info">
          <h5 class="card-title">${esc(fav.name)}</h5>
          <p class="fw-bold">R$ ${fav.price.toFixed(2)}</p>
        </div>
        <button class="btn bg-yellow" data-action="add" data-id="${fav.id}" data-name="${esc(fav.name)}" data-price="${fav.price}">Adicionar</button>
      `;
      modalList.appendChild(itemEl);
    });
  }

  function setupFavoritesModal() {
    const modal = document.getElementById('favorites-modal');
    const openBtn = document.getElementById('nav-favorites-button');
    const closeBtn = document.getElementById('close-favorites-modal');

    openBtn.addEventListener('click', () => { renderFavorites(); modal.style.display = 'flex'; });
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
  }

  favorites = loadFavorites();
  updateFavoriteButtons();
  setupFavoritesModal();

  /* Roulette Functionality */
  function setupRoulette() {
    const modal = document.getElementById('roulette-modal');
    const trigger = document.getElementById('roulette-trigger');
    const closeBtn = document.getElementById('close-roulette-modal');
    const spinBtn = document.getElementById('spin-button');
    const wheel = document.getElementById('roulette-wheel');
    const resultText = document.getElementById('roulette-result');

    if (!modal || !trigger || !closeBtn || !spinBtn || !wheel) return;

    const prizes = [
      { text: '5% OFF', type: 'discount', value: 0.05 },
      { text: 'Tente de Novo', type: 'lose' },
      { text: '10% OFF', type: 'discount', value: 0.10 },
      { text: 'Tente de Novo', type: 'lose' },
      { text: 'Brinde Surpresa', type: 'product', value: 'Canela em Pó (100g)' },
      { text: 'Tente de Novo', type: 'lose' }
    ];

    const segmentCount = prizes.length;
    const segmentAngle = 360 / segmentCount;
    const colors = ['#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff'];

    prizes.forEach((prize, i) => {
      const segment = document.createElement('div');
      segment.className = 'roulette-segment';
      segment.style.transform = `rotate(${i * segmentAngle}deg)`;
      segment.style.backgroundColor = colors[i % colors.length];
      segment.innerHTML = `<span>${prize.text}</span>`;
      wheel.appendChild(segment);
    });

    function showRoulette() {
      const lastSpin = localStorage.getItem('lastSpin');
      const now = new Date().getTime();
      // Permitir girar a cada 24 horas (86400000 ms)
      if (lastSpin && (now - parseInt(lastSpin)) < 86400000) {
        showToast('Você já girou a roleta hoje. Volte amanhã!', 'info');
        return;
      }
      modal.style.display = 'flex';
      spinBtn.disabled = false;
      resultText.textContent = '';
    }

    function spin() {
      spinBtn.disabled = true;
      resultText.textContent = 'Girando...';

      const randomIndex = Math.floor(Math.random() * segmentCount);
      const prize = prizes[randomIndex];

      // Calculate rotation
      const baseRotation = 360 * 5; // 5 full spins
      const prizeAngle = randomIndex * segmentAngle;
      const randomOffset = Math.random() * (segmentAngle - 10) + 5; // To not land on the line
      const finalAngle = baseRotation - prizeAngle - randomOffset;

      wheel.style.transform = `rotate(${finalAngle}deg)`;

      setTimeout(() => {
        handlePrize(prize);
        localStorage.setItem('lastSpin', new Date().getTime().toString());
      }, 5500); // After animation
    }

    function handlePrize(prize) {
      resultText.textContent = `Você ganhou: ${prize.text}!`;

      if (prize.type === 'discount') {
        const discountId = `desconto-roleta-${prize.value * 100}`;
        const existingDiscount = cart.find(item => item.id.startsWith('desconto-roleta'));
        if (existingDiscount) {
          showToast('Você já tem um desconto da roleta no carrinho.', 'warning');
          return;
        }

        const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
        if (total > 0) {
          const discountValue = total * prize.value;
          cart.push({
            id: discountId,
            name: `Desconto Roleta (${prize.value * 100}%)`,
            price: -discountValue,
            qty: 1
          });
          showToast(`Desconto de ${prize.value * 100}% aplicado!`, 'success');
          renderCart();
        } else {
          showToast('Adicione itens ao carrinho para usar seu desconto.', 'info');
        }
      } else if (prize.type === 'product') {
        const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
        if (total > 20) {
          const product = Object.values(produtos).flat().find(p => p.name === prize.value);
          if (product) {
            addToCart(slugify(product.name), product.name, 0); // Add as free
            showToast(`Um brinde foi adicionado ao seu carrinho!`, 'success');
          }
        } else {
          showToast('Você ganhou um brinde! Adicione mais de R$ 20,00 em compras para resgatá-lo.', 'info');
        }
      }

      setTimeout(() => {
        modal.style.display = 'none';
      }, 2000);
    }

    trigger.addEventListener('click', showRoulette);
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    spinBtn.addEventListener('click', spin);

    // Ocultar o botão se o usuário já jogou hoje
    const lastSpin = localStorage.getItem('lastSpin');
    if (lastSpin && (new Date().getTime() - parseInt(lastSpin)) < 86400000) {
      trigger.classList.add('hidden');
    }
  }

  setupRoulette();
});
