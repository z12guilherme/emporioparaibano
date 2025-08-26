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
      { name: 'Tempero Feijãozinho (100g)', desc: 'Contém cebola, alho, salsa, proteína de soja sabor bacon, caldo de bacon e colorau. Prático para feijão, feijoada, sopas e caldos.', price: 4.99, img: 'img/temperos/feijaozinho.jpg' },
      { name: 'Tempero Pega Esposa (100g)', desc: 'Alho, cebola, pimentões, cenoura, folhas de louro e chas desidratadas (salsa, orégano, manjericão, alecrim). Ótimo para bifes, frango, peixes e saladas.', price: 5.50, img: 'img/temperos/pega_esposa.jpg' },
      { name: 'Tempero Lemon Pepper (100g)', desc: 'Combinação de raspas de limão, sal e pimenta-do-reino moída. Excelente em carnes suínas, aves, peixes, legumes e saladas.', price: 4.99, img: 'img/temperos/lemon_pepper.jpg' },
      { name: 'Tempero Pega Marido (100g)', desc: 'Cebola desidratada, alho granulado, pimentão vermelho, tomate seco, mostarda, alecrim, cebolinha, manjericão e louro. Para arroz, refogados, carnes e sopas.', price: 5.50, img: 'img/temperos/pega_marido.jpg' },
      { name: 'Páprica Doce (100g)', desc: 'Pimentões secos moídos que adicionam cor suave e sabor delicado a carnes, aves, peixes, sopas e molhos.', price: 4.00, img: 'img/temperos/paprica_doce.jpg' },
      { name: 'Páprica Defumada (100g)', desc: 'Pimentões defumados moídos que adicionam sabor e aroma defumado a carnes, aves, peixes e molhos.', price: 4.50, img: 'img/temperos/paprica_defumada.jpg' },
      { name: 'Páprica Picante (100g)', desc: 'Pimentões secos com adição de pimenta, para dar toque picante e cor a pratos diversos.', price: 4.00, img: 'img/temperos/paprica_picante.jpg' },
      { name: 'Açafrão (100g)', desc: 'Também conhecido como cúrcuma, adiciona cor, sabor e propriedades benéficas. Usado em carnes, arroz, sopas e molhos.', price: 4.00, img: 'img/temperos/acafrao.jpg' },
      { name: 'Colorau Paraíba (100g)', desc: 'Colorau de coloração vibrante, usado em arroz, feijão, carnes e molhos para cor e sabor suave.', price: 4.00, img: 'img/temperos/colorau_paraiba.jpg' },
      { name: 'Colorau Tradicional (100g)', desc: 'Urucum em pó que adiciona cor avermelhada e sabor levemente terroso a pratos brasileiros.', price: 3.00, img: 'img/temperos/colorau_tradicional.jpg' },
      { name: 'Cominho Moído (100g)', desc: 'Especiaria versátil para carnes, legumes, ovos, feijão, lentilha, arroz, batatas e sopas.', price: 4.50, img: 'img/temperos/cominho_moido.jpg' },
      { name: 'Mix para Arroz (100g)', desc: 'Composto de cebola, alho e cenoura desidratados para dar sabor de refogado ao arroz e outros pratos.', price: 5.00, img: 'img/temperos/mix_para_arroz.jpg' },
      { name: 'Caldo de Galinha em Pó (menos sódio) (100g)', desc: 'Caldo em pó com menos sódio para substituir cubos, prático em sopas, cozidos e molhos.', price: 3.80, img: 'img/temperos/caldo_de_galinha.jpg' },
      { name: 'Tempero Tempera Tudo (100g)', desc: 'Mistura de especiarias para dar sabor a carnes, legumes, saladas, sopas e ovos.', price: 5.00, img: 'img/temperos/tempera_tudo.jpg' },
      { name: 'Fumaça em pó (100g)', desc: 'Condimento para conferir sabor defumado a carnes, molhos, sopas e até preparações doces como molho barbecue.', price: 6.00, img: 'img/temperos/fumaca.jpg' },
      { name: 'Pimenta-do-reino Moída (100g)', desc: 'Pimenta do reino moída para sabor intenso.', price: 6.00, img: 'img/temperos/pimenta_do_reino_moida.jpg' },
      { name: 'Alho Desidratado (100g)', desc: 'Indicado em todas as preparações culinárias em substituição ao alho cru. Refogados em geral, legumes, temperos para caldos, sopas e molhos.', price: 5.00, img: 'img/temperos/alho_desidratado.jpg' },
      { name: 'Cebola em Flocos Desidratada (100g)', desc: 'Ingrediente versátil que pode ser usado em diversas receitas, tanto para sabor quanto para textura.', price: 5.50, img: 'img/temperos/cebola_em_flocos_desidratada.jpg' },
      { name: 'Pimenta Calabresa (100g)', desc: 'Muito usada para adicionar sabor picante e aroma em carnes, peixes, sopas e molhos.', price: 5.99, img: 'img/temperos/pimenta_calabresa.jpg' },
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
      { name: 'Tempero Master Chef (100g)', desc: 'Seleção de especiarias para sabor intenso e gourmet.', price: 5.00, img: 'img/temperos/masterchef.jpg' },
      { name: 'Tempero Molho Tártaro (100g)', desc: 'Blend com cebola, cenoura, pimentão e chas, ótimo para molhos e peixes.', price: 4.50, img: 'img/temperos/molho_tartaro.jpg' },
      { name: 'Orégano (100g)', desc: 'Erva aromática clássica para massas, pizzas, carnes e molhos.', price: 5.99, img: 'img/temperos/oregano.jpg' },
      { name: 'Tempero Cebola, Alho e Salsa (100g)', desc: 'Combinação versátil para carnes, aves, arroz, feijão e sopas.', price: 4.99, img: 'img/temperos/alho_salsa_cebola.jpg' },
      { name: 'Salsa Desidratada (100g)', desc: 'Prática para sopas, molhos, carnes, saladas e peixes.', price: 4.00, img: 'img/temperos/salsa_desidratada.jpg' },
      { name: 'Alho Frito Granulado (100g)', desc: 'Adiciona crocância e sabor em pratos, ótimo para finalizar receitas.', price: 5.00, img: 'img/temperos/alho_frito_granulado.jpg' },
    ],

    chas: [
      { name: 'Alcachofra (50g)', desc: 'A alcachofra auxilia na melhora da digestão, auxilia na regulação do colesterol, atua como diurético e fonte de fibras, também é tradicionalmente usada como hepatoprotetor.', price: 3.50, img: 'img/chas/placeholder-cha-alcachofra.jpg' },
      { name: 'Alecrim (50g)', desc: 'O alecrim serve para temperar alimentos, atuar como repelente de insetos, além de ter benefícios para a saúde, como melhorar a digestão e a memória, aliviar dores de cabeça, ter ação antioxidante e ajudar a reduzir inflamações e gases.', price: 2.50, img: 'img/chas/placeholder-cha-alecrim.jpg' },
      { name: 'Alfazema (50g)', desc: 'A alfazema (ou lavanda) ajuda a acalmar a mente, reduzir a ansiedade e a insônia, e aliviar dores e tensões musculares devido às suas propriedades relaxantes, sedativas, analgésicas e anti-inflamatórias.', price: 4.00, img: 'img/chas/placeholder-cha-alfazema.jpg' },
      { name: 'Amora Folhas (50g)', desc: 'A folha de amora é utilizada para auxiliar a regular as taxas hormonais, combater os sintomas da menopausa e TPM, fortalecer o sistema imunológico, melhorar a saúde digestiva e da pele, e ajudar no controle do peso corporal.', price: 3.00, img: 'img/chas/placeholder-cha-amora.jpg' },
      { name: 'Anis-Estrelado (50g)', desc: 'O anis-estrelado serve para diversas finalidades: é usado na culinária como especiaria e para aromatizar alimentos e bebidas, como chás, licores e gin; na medicina popular, tem propriedades digestivas, expectorantes e antibacterianas.', price: 5.00, img: 'img/chas/placeholder-cha-anis-estrelado.jpg' },
      { name: 'Aroeira Casca (50g)', desc: 'A aroeira é usada na medicina popular pelas suas propriedades anti-inflamatórias, antimicrobianas e cicatrizantes, sendo indicada para tratar problemas urinários (como cistite), inflamações gerais e reumatismo.', price: 3.50, img: 'img/chas/placeholder-cha-aroeira.jpg' },
      { name: 'Barbatimão Rasurado (50g)', desc: 'O barbatimão é muito utilizado para acelerar a cicatrização de feridas, cortes, queimaduras, e úlceras na pele devido às suas propriedades cicatrizantes, adstringentes, antibacterianas e anti-inflamatórias.', price: 3.00, img: 'img/chas/placeholder-cha-barbatimao.jpg' },
      { name: 'Boldo (50g)', desc: 'O chá de Boldo auxilia na melhora da digestão, no tratamento de problemas hepáticos, ajuda o funcionamento adequado do fígado e alivia desconfortos gastrointestinais, reduzindo sintomas como inchaço abdominal, gases e azia.', price: 4.50, img: 'img/chas/placeholder-cha-boldo.jpg' },
      { name: 'Camomila (50g)', desc: 'A camomila ajuda a acalmar, melhorar o sono e aliviar a ansiedade, devido aos seus efeitos sedativos e ansiolíticos. Também é usada para reduzir a inflamação e aliviar sintomas digestivos como indigestão e cólicas.', price: 4.00, img: 'img/chas/placeholder-cha-camomila.jpg' },
      { name: 'Canela em Pau (50g)', desc: 'A canela em pau serve como um ingrediente saboroso e versátil na culinária, sendo adicionada a doces, pães, bolos, café, chás e até a pratos salgados, para realçar o sabor.', price: 4.80, img: 'img/chas/placeholder-cha-canela-pau.jpg' },
      { name: 'Canela-de-Velho (50g)', desc: 'A canela-de-velho é uma planta medicinal usada para aliviar dores nas articulações, como artrite e artrose, devido às suas propriedades anti-inflamatórias e analgésicas.', price: 2.50, img: 'img/chas/placeholder-cha-canela-velho.jpg' },
      { name: 'Capim-Limão (50g)', desc: 'O Capim-santo, também conhecido como capim-limão ou capim-cidreira, é uma planta medicinal com propriedades calmantes, digestivas, antioxidantes e antimicrobianas.', price: 3.50, img: 'img/chas/placeholder-cha-capim-limao.jpg' },
      { name: 'Cardo-Mariano (50g)', desc: 'O cardo mariano é uma planta de flores roxas cujo principal componente ativo é a silimarina, um poderoso antioxidante e hepatoprotetor.', price: 3.50, img: 'img/chas/placeholder-cha-cardo-mariano.jpg' },
      { name: 'Carqueja (50g)', desc: 'A carqueja é muito utilizada para auxiliar em problemas de digestão e do fígado, como azia e gastrite, além de atuar como diurético, ajudando a reduzir a retenção de líquidos.', price: 2.50, img: 'img/chas/placeholder-cha-carqueja.jpg' },
      { name: 'Cavalinha (50g)', desc: 'A cavalinha serve como um agente diurético natural, ajudando o corpo a eliminar o excesso de líquidos e combatendo o inchaço, e é um excelente remineralizante.', price: 4.00, img: 'img/chas/placeholder-cha-cavalinha.jpg' },
      { name: 'Chá Mate (50g)', desc: 'O chá mate verde serve para dar mais energia e melhorar o foco devido à sua cafeína e outras substâncias stimulantes, além de ser um potente diurético e antioxidante.', price: 2.50, img: 'img/chas/placeholder-cha-mate.jpg' },
      { name: 'Chá Preto (50g)', desc: 'O chá preto serve para aumentar a energia e o foco, graças à cafeína e à L-teanina, além de contribuir para a saúde do coração e do cérebro por ser rico em antioxidantes.', price: 3.50, img: 'img/chas/placeholder-cha-preto.jpg' },
      { name: 'Chá-Seca-Barriga (50g)', desc: 'O chá "seca barriga", refere-se a misturas de ervas comumente associadas à perda de peso e redução da gordura abdominal.', price: 3.50, img: 'img/chas/placeholder-cha-seca-barriga.jpg' },
      { name: 'Chá Verde (50g)', desc: 'O chá verde oferece uma variedade de benefícios para a saúde, como sua ação antioxidante, que combate o envelhecimento precoce, ele também pode ajudar no processo de emagrecimento ao acelerar o metabolismo.', price: 3.00, img: 'img/chas/placeholder-cha-verde.jpg' },
      { name: 'Chambá (50g)', desc: 'O Chambá é uma planta medicinal popularmente utilizada como expectorante, broncodilatador, antitussígeno e para tratar problemas respiratórios como asma, bronquite, tosse e chiado no peito.', price: 3.00, img: 'img/chas/placeholder-cha-chamba.jpg' },
      { name: 'Chapéu-de-Couro (50g)', desc: 'O chapéu-de-couro pode auxiliar no tratamento de problemas no sistema urinário, como infecções, devido às suas propriedades diuréticas, anti-inflamatórias e depurativas.', price: 3.50, img: 'img/chas/placeholder-cha-chapeu-couro.jpg' },
      { name: 'Cravo-da-India (50g)', desc: 'O cravo-da-índia, além de muito utilizado na culinária para a preparação de diversos pratos, também possui ação antioxidante, anti-inflamatória e antimicrobiana.', price: 6.00, img: 'img/chas/placeholder-cha-cravo-india.jpg' },
      { name: 'Dente-de-Leão (50g)', desc: 'O dente-de-leão é usado para diversas finalidades na medicina popular e pode ser consumido como chá, devido às suas propriedades diuréticas, depurativas e hepatoprotetoras.', price: 4.00, img: 'img/chas/placeholder-cha-dente-leao.jpg' },
      { name: 'Desinchá (50g)', desc: 'O chá Desinchá é utilizado para auxiliar na redução do inchaço corporal, promover a saciedade, dar mais energia e acelerar o metabolismo, contribuindo para um processo de emagrecimento saudável.', price: 3.50, img: 'img/chas/placeholder-cha-desincha.jpg' },
      { name: 'Endro (50g)', desc: 'O endro oferece vários benefícios, principalmente por suas propriedades digestivas, ajudando a aliviar gases, inchaço, cólicas, constipação e náuseas.', price: 2.50, img: 'img/chas/placeholder-cha-endro.jpg' },
      { name: 'Erva-Baleeira (50g)', desc: 'A Erva-baleeira é muito utilizada para aliviar dores e inflamações, sendo recomendada para condições como artrite, reumatismo, dores musculares e na coluna, contusões e torções.', price: 3.50, img: 'img/chas/placeholder-cha-erva-baleeira.jpg' },
      { name: 'Erva-Cidreira (50g)', desc: 'A Erva-cidreira é muito utilizada para acalmar, reduzir a ansiedade e melhorar o sono, atuando como um calmante natural no sistema nervoso central.', price: 3.50, img: 'img/chas/placeholder-cha-erva-cidreira.jpg' },
      { name: 'Erva-Doce Argentina (50g)', desc: 'A Erva-doce argentina serve para diversos fins, principalmente para a melhora da digestão, alívio de gases e cólicas, mas também tem propriedades que a tornam benéfica para a saúde dos fígado.', price: 4.00, img: 'img/chas/placeholder-cha-erva-doce-argentina.jpg' },
      { name: 'Erva-Doce Tradicional (50g)', desc: 'A Erva-doce tradicional é muito utilizada na culinária e na medicina popular devido ao seu sabor adocicado e propriedades digestivas e anti-inflamatórias.', price: 2.50, img: 'img/chas/erva-doce.jpg' },
      { name: 'Espinheira-Santa (50g)', desc: 'A Espinheira-santa é utilizada para aliviar problemas digestivos, como gastrite, úlceras, azia, má digestão e gases, atuando como protetor da mucosa gástrica e redutor da acidez estomacal.', price: 3.80, img: 'img/chas/placeholder-cha-espinheira-santa.jpg' },
      { name: 'Eucalipto (50g)', desc: 'O eucalipto oferece uma variedade de benefícios, para a saúde com suas propriedades expectorantes e descongestionantes ajudam a aliviar problemas respiratórios como gripes, resfriados e sinusites.', price: 2.50, img: 'img/chas/placeholder-cha-eucalipto.jpg' },
      { name: 'Folha de Abacateiro (50g)', desc: 'A folha de abacate serve para preparar um chá com propriedades diuréticas, antioxidantes e anti-inflamatórias, que podem auxiliar no controle da diabetes e da pressão alta.', price: 3.00, img: 'img/chas/placeholder-cha-folha-abacate.jpg' },
      { name: 'Ginkgo-Biloba (50g)', desc: 'O Ginkgo Biloba é uma planta comumente usada para melhorar a memória e outras funções cognitivas, além de auxiliar na circulação sanguínea e no tratamento de zumbidos e vertigens.', price: 4.00, img: 'img/chas/placeholder-cha-ginkgo.jpg' },
      { name: 'Graviola Folhas (50g)', desc: 'As folhas da graviola possuem diversas propriedades benéficas à saúde, incluindo ação antioxidante, anti-inflamatória e antimicrobiana, além de auxiliar no controle da diabetes e na saúde digestiva.', price: 3.50, img: 'img/chas/placeholder-cha-graviola.jpg' },
      { name: 'Hibisco (50g)', desc: 'O Chá de Hibisco, pode oferecer vários benefícios para a saúde, incluindo a melhora da saúde cardiovascular, ajudando a controlar a pressão arterial e o colesterol.', price: 3.50, img: 'img/chas/placeholder-cha-hibisco.jpg' },
      { name: 'Hortelã (50g)', desc: 'O Chá de Hortelã pode auxiliar na melhora da digestão, aliviar cólicas e gases intestinais, reduzir náuseas, aliviar dores de cabeça e musculares, combater sintomas de gripe e resfriados.', price: 3.00, img: 'img/chas/placeholder-cha-hortela.jpg' },
      { name: 'Ipê-Roxo (50g)', desc: 'O Ipê-Roxo pode oferecer múltiplos benefícios à saúde, como ação anti-inflamatória, antibiótica e antifúngica, além de ser um potente antioxidante.', price: 3.00, img: 'img/chas/placeholder-cha-ipe-roxo.jpg' },
      { name: 'Jatobá Casca (50g)', desc: 'O jatobá possui propriedades anti-inflamatórias, antioxidantes, antiespasmódicas e expectorantes, que podem ser usadas para ajudar no tratamento de feridas, dor de estômago, diarreia ou inflamação na garganta.', price: 3.00, img: 'img/chas/placeholder-cha-jatoba.jpg' },
      { name: 'Louro Folhas (40g)', desc: 'A folha de louro serve para melhorar a digestão, aliviar dores musculares e cólicas, combater o estresse, reduzir a retenção de líquidos e ajudar no controle do colesterol e da diabetes.', price: 3.00, img: 'img/chas/placeholder-cha-louro.jpg' },
      { name: 'Melissa (50g)', desc: 'O chá de melissa, também conhecido como erva-cidreira, oferece diversos benefícios como a ação calmante para combater a ansiedade e a insónia, propriedades digestivas, anti-inflamatórias, antioxidantes e antivirais.', price: 3.50, img: 'img/chas/placeholder-cha-melissa.jpg' },
      { name: 'Mulungu (30g)', desc: 'O Mulungu, conhecido por suas propriedades calmantes e sedativas, é tradicionalmente utilizado como um remédio natural para ansiedade, estresse e insônia, auxiliando no relaxamento muscular.', price: 3.00, img: 'img/chas/placeholder-cha-mulungu.jpg' },
      { name: 'Passiflora (50g)', desc: 'A Passiflora, também conhecida como flor-do-maracujá, oferece diversos benefícios à saúde, principalmente devido às suas propriedades calmantes e ansiolíticas.', price: 3.00, img: 'img/chas/placeholder-cha-passiflora.jpg' },
      { name: 'Pata-de-Vaca (50g)', desc: 'A Pata-de-Vaca tem como principais benefícios o auxílio no controle do diabetes (ação hipoglicemiante), a ação diurética, que ajuda na eliminação de líquidos, e propriedades antioxidantes e anti-inflamatórias.', price: 3.00, img: 'img/chas/placeholder-cha-pata-vaca.jpg' },
      { name: 'Pau-Tenente (50g)', desc: 'O Pau-Tenente, também conhecido como pau amargo, quina ou quassia, é uma planta medicinal muito usada para problemas digestivos, falta de apetite, diabetes e parasitas intestinais.', price: 3.50, img: 'img/chas/placeholder-cha-pau-tenente.jpg' },
      { name: 'Pedra-Hume (50g)', desc: 'A pedra hume serve para estancar pequenos sangramentos (como os de depilação ou barbear), cicatrizar feridas superficiais, reduzir a transpiração e o mau cheiro nas axilas.', price: 3.00, img: 'img/chas/placeholder-cha-pedra-hume.jpg' },
      { name: 'Picão-Preto (50g)', desc: 'O Chá de Picão-preto tem vários benefícios, incluindo ação anti-inflamatória, hepatoprotetora, diurética e antioxidante.', price: 3.00, img: 'img/chas/placeholder-cha-picao-preto.jpg' },
      { name: 'Porangaba (50g)', desc: 'O chá de Porangaba é utilizado principalmente como diurético para evitar a retenção de líquidos, termogênico e também como inibidor de apetite.', price: 3.00, img: 'img/chas/placeholder-cha-porangaba.jpg' },
      { name: 'Quixaba (50g)', desc: 'O Chá de Quixaba é muito usado para aliviar inflamações no útero e cistos ovarianos, tratar diabetes, auxiliar na cicatrização de feridas na pele e como anti-inflamatório em geral.', price: 3.50, img: 'img/chas/placeholder-cha-quixaba.jpg' },
      { name: 'Quebra-Pedra (50g)', desc: 'O Chá de Quebra-pedra é tradicionalmente usado para ajudar na prevenção e no tratamento de pedras nos rins e problemas do trato urinário.', price: 4.00, img: 'img/chas/placeholder-cha-quebra-pedra.jpg' },
      { name: 'Sene (30g)', desc: 'O chá de sene oferece benefícios como alívio da prisão de ventre, através das suas propriedades laxativas, a planta auxilia na eliminação de gases e evita a retenção de líquidos.', price: 2.00, img: 'img/chas/placeholder-cha-sene.jpg' },
      { name: 'Sucupira Semente (50g)', desc: 'A Semente da Sucupira, de árvores nativas do Brasil, é tradicionalmente usada na medicina popular por suas propriedades anti-inflamatórias, analgésicas e antioxidantes.', price: 8.00, img: 'img/chas/placeholder-cha-sucupira.jpg' },
      { name: 'Unha de Gato (50g)', desc: 'A unha de gato é usada popularmente para tratar condições inflamatórias como artrite, reumatismo e sinusite, e para fortalecer o sistema imunológico.', price: 3.50, img: 'img/chas/placeholder-cha-unha-gato.jpg' },
      { name: 'Uxi Amarelo (50g)', desc: 'Uxi amarelo é uma planta medicinal muito usada para auxiliar no tratamento de inflamações do útero, infecção urinária ou artrite, pois tem propriedades anti-inflamatórias, antioxidantes, diuréticas.', price: 3.00, img: 'img/chas/placeholder-cha-uxi-amarelo.jpg' },
    ],
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
    ['temperos','chas'].forEach(cat => {
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
    
    // Separar chas de temperos
    const chas = [];
    const temperos = [];
    
    cart.forEach(item => {
      // Verificar se é uma erva (baseado no nome ou categoria)
      if (item.name.toLowerCase().includes('erva') || 
          produtos.chas.some(erva => erva.name === item.name)) {
        chas.push(item);
      } else {
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
    
    // Total geral
    const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
    msg += `*TOTAL: R$ ${total}*`;
    
    const url = `https://wa.me/+5581991889242?text=${msg}`;
    window.open(url, '_blank');
  }
});

