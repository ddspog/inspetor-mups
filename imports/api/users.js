import { Meteor } from 'meteor/meteor';
import { Ground } from 'meteor/ground:db';

import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
    Meteor.publish('users', function() {
        return Meteor.users.find({}, {
            fields: {
                username: 1,
                emails: 1,
                profile: 1
            }
        });
    });

    let appName = "Inspetor Mups";
    let appEmail = Meteor.settings.mailUrl.email;

    Accounts._options.verificationMaxRetries = 20;
    Accounts._options.verificationRetriesWaitTime = 5 * 1000;
    Accounts._options.verificationWaitTime = 20 * 1000;

    Accounts.emailTemplates.siteName = `${appName}`;
    Accounts.emailTemplates.from = `${appName} Admin ${appEmail}`;

    Accounts.emailTemplates.verifyEmail = {
        from() {
            return `${appName} Reconfigurador de Senhas ${appEmail}`;
        },
        subject(user) {
            return `Obrigado por juntar-se ao ${appName}, ${user.username}!`;
        },
        text(user, url) {
            return "Opa tudo bem?\n\n" +
                `Você ${user.username}, foi selecionado para nos auxiliar a registrar problemas sanitários pela área da UFCG` +
                "(Universidade Federal de Campina Grande). Gostaríamos que você lesse alguma de nossas recomendações, " +
                "e então verificasse seu e-mail, para nos dizer se entendeu tudo.\n\n" +
                "Este aplicativo foi feito no intuito de monitorar em ambientes universitários, a situação sanitária, " +
                "e para isso, estamos utilizando como teste o campus de Campina Grande da UFCG. Pedimos que vocês olhem, " +
                "investiguem certas áreas da universidade, e utilizem o aplicativo para registrar problemas relacionados " +
                "a uma das 4 grandes áreas do saneamento básico: abastecimento d'água, esgoto, drenagem de água de chuva e " +
                "resíduos, detalhadas a seguir:\n" +
                "\t- Abastecimento d'água: refere-se a destinação de água limpa a população. Portanto, os problemas nessa " +
                "área são relacionados a sistema de canos que distribuem a água e a qualidade da mesma em qualquer aparelho " +
                "que deveria utilizar água limpa.\n" +
                "\t- Esgoto: refere-se ao isolamento da coleta de dejetos e despejos produzidos pela população, e correta " +
                "destinação. Mal-cheiro em locais indevidos, devido a canos estourados, mistura do esgoto com canais de " +
                "drenagem, são um dos vários problemas que ocorrem pelo Brasil.\n" +
                "\t- Drenagem de água da chuva: refere-se ao encaminhamento da água da chuva, para de volta a natureza. " +
                "Muitos confundem como um problema pequeno, mas suas consequências são catastróficas. Portanto, é importante " +
                "atentar a poças, alagamentos de algumas áreas, canais de drenagem quebrados, que são sinais de que o sistema " +
                "de drenagem está com problemas.\n" +
                "\t- Resíduos: trata do lixo produzido pelo homem e sua destinação. Problemas nessa área, vão desde incorreto " +
                "acomodamento do lixo (em recipientes inadequados), até a presença de insetos e roedores ao redor de lixo.\n\n" +
                "Para utilizar o aplicativo, uma vez logado no sistema pela aba de login, clique no botão com símbolo de 'mais' " +
                "na tela. Aparecerá um formulário para você registrar um problema de saneamento básico. Deixe para apertar este " +
                "botão quando estiver no local onde encontrou algum problema.\nHá uma área para que você tire a foto do problema, " +
                "e opções para dizer a que grande área do saneamento o problema pertence, e a subárea do problema. Há também uma " +
                "área para que você coloque o título do registro que está fazendo. Esta área serve primordialmente para que você " +
                "identifique este registro no seu aplicativo, e possivelmente o edite, por isso, coloque algum título que seja " +
                "entendível por você mesmo.\n\n" +
                "O grande potencial deste aplicativo, é registrar a localização dos problemas sanitários registrados. Então por " +
                "isso, assim que você abre o formulário de adição de registros, começamos a tentar calcular sua posição. Por isso, " +
                "é importantíssimo que você mantenha a localização do celular ativada quando utiliza nosso aplicativo.\n" +
                "Entretanto, sabemos que para que a sua localização seja encontrada, é melhor que você esteja online. Rastreamento " +
                "de posição do usuário é muito mais rápido, quando o mesmo está com a internet ligada. Mas queremos que nossos " +
                "usuários também utilizem nosso aplicativo mesmo em modo offline. Por isso, o rastreamento da sua posição é opcional. " +
                "Se achar que o processo está demorando demais, por favor, diga onde você está no campo de Notas, com detalhes, se " +
                "se possível. Dessa maneira, seu registro é armazenado mesmo que a posição não seja calculada.\n\n" +
                "Uma vez que você adicione um registro, ele aparecerá na tela principal do aplicativo. Caso você esteja conectado " +
                "na internet, em Wifi ou mesmo em 3G, este registro será adicionado em nosso banco de dados, e você terá feito " +
                "uma grande contribuição a nossa pesquisa. Caso você não esteja conectado na internet, o aplicativo armazena " +
                "temporariamente o registro, para sicronização futura. Então, se você está offline, e fez um registro, não feche " +
                "o aplicativo, e o abra mais uma vez quando estiver online de novo, para recebermos o registro.\n" +
                "Se o aplicativo for fechado, quando você estiver offline (caso você feche para deixar o celulcar mais " +
                "rápido, desligue o celular por algum motivo, ou sem querer), todos os registros que você tiver feito são " +
                "eliminados. Iremos resolver este problema em breve.\n\n" +
                "O código que você recebeu, tem duas funções: a primeira é impedir que pessoas insiram dados não relevantes " +
                "em nosso banco de dados. Para o mantermos online, utilizamos um serviço gratuito, que nos dá no máximo 500MB " +
                "de dados, assim, pretendemos utilizar esse espaço muito bem; a segunda função é para que os professores que " +
                "entregarem esses códigos possam avaliar os alunos que o utilizaram. Cada usuário é agrupado pelo código de " +
                "autorização que utilizou. Dessa maneira podemos facilitar os testes com alunos.\n\n" +
                `Desde já muito obrigado! Por favor verique seu e-mail seguindo o link: ${url}\n\n` +
                "Att,\n" +
                `Equipe ${appName}`;
        }
    };

    Accounts.emailTemplates.resetPassword = {
        from() {
            return `${appName} Reconfigurador de Senhas ${appEmail}`;
        },
        subject() {
            return `${appName} - Reconfigurar Senha`;
        },
        text(user, url) {
            return "Opa tudo bem?\n\n" +
                `Recebemos uma notificação vindo do seu email para resetar a senha do usuário ${user.username}. ` +
                "Caso você não tenha enviado este pedido, por favor, ignore este e-mail. No entanto, se " +
                "deseja prosseguir e configurar uma nova senha, utilize o link a seguir:\n\n" +
                `${url}\n\n` +
                "Att,\n" +
                `Equipe ${appName}`;
        }
    };
}

if(Meteor.isCordova) {
    Ground.Collection(Meteor.users);
}
