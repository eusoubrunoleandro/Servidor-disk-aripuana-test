const express = require('express');
const Router = express()

// controllers
const ControllerNegocio = require('./controller/ControllerNegocio')
const ControllerAcessoSistema = require('./controller/ControllerAcessoSistema')
const ControllerPromocao = require('./controller/ControllerPromocao')
const ControllerCategoria = require('./controller/ControllerCategoria')
const ControllerCategoriaNegocio = require('./controller/ControllerCategoriaNegocio')
const ControllerNegocioDados = require('./controller/ControllerNegocioDados')
const ControllerPlano = require('./controller/ControllerPlano')
const ControllerPlanoNegocio = require('./controller/ControllerPlanoNegocio')

const MiddlewareEnviarEmail = require('./Middleware/EnviarEmail');

const multer = require('multer');
const multerConfig = require('./setting/multer')
const ControllerUploads = require('./controller/ControllerUploads');
const MiddlewareAcesso = require('./Middleware/Acesso');
const MiddlewareAutenticacao = require('./Middleware/Autenticacao');
const ControllerNegocioAlteracao = require('./controller/ControllerNegocioAlteracao');
const ControllerAcaoNaConta = require('./controller/ControllerAcaoNaConta');
const ControllerVitrine = require('./controller/ControllerVitrine');
const ControllerPlanoCaracteristicas = require('./controller/ControllerPlanoCaracteristicas');
const ControllerProgramaEmpreendedores = require('./controller/ControllerProgramaEmpreendedores');
const ControllerRelatorios = require('./controller/ControllerRelatorios');
const ControllerAWS = require('./controller/ControllerAWS');
const ControllerImagensPromocao = require('./controller/ControllerImagensPromocao');
const Relatorio = require('./controller/Relatorio');


// Público
Router.post('/acesso/login', ControllerAcessoSistema.logar, MiddlewareEnviarEmail.NotificacaoBloqueado);
Router.post('/acesso/cadastrar',
    ControllerNegocio.aberturaDeContaNegocio,
    ControllerNegocioDados.aberturaDeContaNegocioDados,
    ControllerAcessoSistema.inserir,
    ControllerCategoriaNegocio.aberturaDeContaCategoriaNegocio,
    ControllerPlanoNegocio.aberturaDeContaPlanoNegocio,
    MiddlewareEnviarEmail.ConfirmacaoCadastro,
    MiddlewareEnviarEmail.NotificaoDeNovoCadastro
);
Router.get('/validacao/:id_negocio/:token_acesso', ControllerAcaoNaConta.validacaoDeConta)

Router.get('/negocio/busca', ControllerNegocio.buscaPublica);
Router.get('/negocio/busca/perfil/:id_negocio', ControllerNegocio.BuscaPerfil);
Router.post('/promocao/buscaPublica', ControllerPromocao.buscaPublica);
Router.get('/promocao/busca/publica/perfil/:id_promocao', ControllerPromocao.buscaPerfilPublico);

Router.get('/categoria/busca', ControllerCategoria.busca);
Router.get('/plano/busca', ControllerPlano.busca);
Router.get('/plano/caracteristica/lista/:id_plano', ControllerPlanoCaracteristicas.listarCaracteristicas)
Router.get('/nexa', ControllerProgramaEmpreendedores.listaNegocios)

// Acesso 1
Router.use(MiddlewareAutenticacao)
// Router.use(MiddlewareAcesso.acesso2);

Router.get('/categoria/negocio/busca', ControllerCategoriaNegocio.busca);
Router.get('/negocio/premium/busca', ControllerNegocioDados.busca);
Router.get('/plano/negocio/busca', ControllerPlanoNegocio.busca);
Router.post('/negocio/excluir-conta', 
    ControllerAcessoSistema.VerificarSenha,
    ControllerNegocio.excluirConta,
    MiddlewareEnviarEmail.NotificaoExclusaoDeConta
    );
Router.get('/negocio/meu-perfil', ControllerNegocio.MeuPerfil)/*volta aqui */
Router.put('/negocio/alterar-senha', ControllerAcessoSistema.AlterarMinhaSenha)

Router.post('/alterar/meu-perfil/basico',
    ControllerNegocioAlteracao.dadosBasicos,
    ControllerCategoriaNegocio.alterarMinhaCategoria
)

Router.post('/alterar/meu-perfil/imagem_perfil',
    ControllerUploads.uploadImagePerfil
)

// Tudo sobre vitrine
Router.post('/vitrine/adicionar/meu-perfil',
    ControllerUploads.addImagemVitrine
)

Router.get('/vitrine/mostrar/meu-perfil',
    ControllerVitrine.busca
)
Router.delete('/vitrine/delete/meu-perfil/:id_vitrine',
    ControllerVitrine.deletar
)

Router.get('/promocao/listar-imagem/:id_promocao',
    ControllerImagensPromocao.listarImagensPromocao
)
Router.post('/promocao/adicionar-imagem/:id_promocao',
    ControllerUploads.adicionarImagemPromocao
)
Router.delete('/promocao/excluir-imagem/:id_imagem_promocao',
    ControllerImagensPromocao.deletarImagem
)
Router.put('/promocao/adicionar-capa/:id_promocao',
    ControllerPromocao.alterar
)
Router.put('/promocao/publicar/:id_promocao',
    ControllerPromocao.alterar
)

// Area de teste aws
// Router.get('/listar/arquivos', ControllerAWS.ListarImagens)
// / Router.get('/deletar/arquivos', ControllerAWS.ExcluirImagemPerfilAtual)

Router.put('/alterar/meu-perfil/links', ControllerNegocioAlteracao.dadosLinks )
Router.put('/alterar/meu-perfil/telefones', ControllerNegocioAlteracao.dadosTelefones )
Router.put('/alterar/meu-perfil/endereco', ControllerNegocioAlteracao.dadosEndereco )
Router.put('/alterar/meu-perfil/sobre', ControllerNegocioAlteracao.dadosSobre )

Router.post('/minhas-promocao/inserir', ControllerPromocao.inserir);
Router.get('/minhas-promocao/lista', ControllerPromocao.minhasPromocoes);


//----------- Administrador - acesso 2---------------------------------------------------------------
Router.use(MiddlewareAcesso.acesso2)

Router.get('/administrador/relatorio/negocio', Relatorio.relatorio_negocio)
Router.get('/administrador/relatorio/localidade', Relatorio.relatorio_localidades)

Router.put('/administrador/acesso/bloqueio-conta/:id_negocio', ControllerAcaoNaConta.bloqueioConta)
Router.post('/administrador/negocio/inserir',
    ControllerNegocio.criarContaAdmin,
    ControllerNegocioDados.aberturaDeContaNegocioDadosAdmin,
    ControllerAcessoSistema.criarAcesso,
    ControllerCategoriaNegocio.relacionarCategoria,
    ControllerPlanoNegocio.relacionarPlano,
    MiddlewareEnviarEmail.ConfirmacaoCadastroAdmin
)

// Router.post('/administrador/categoria/negocio/inserir', ControllerCategoriaNegocio.relacionarCategoria);
Router.post('/administrador/categoria/inserir', ControllerCategoria.inserir);
Router.delete('/administrador/categoria/deletar/:id_categoria', ControllerCategoria.deletar);
Router.put('/administrador/categoria/alterar/:id_categoria', ControllerCategoria.alterar);

// Alterando dados do negócio pelo administrador
Router.put('/administrador/negocio/alterar/:id_negocio', 
    ControllerNegocio.alterar,
    ControllerNegocioDados.alterar,
    ControllerCategoriaNegocio.alterar,
    ControllerPlanoNegocio.alterar
);

Router.get('/administrador/negocio/lista', ControllerNegocio.buscaAdmin);

Router.post('/administrador/plano/inserir', ControllerPlano.inserir);
Router.put('/administrador/plano/alterar/:id_plano', ControllerPlano.alterar);
Router.delete('/administrador/plano/deletar/:id_plano', ControllerPlano.deletar);
Router.put('/nexa/remover', ControllerProgramaEmpreendedores.deletar)
Router.post('/nexa/inserir', ControllerProgramaEmpreendedores.inserir)
Router.get('/nexa/lista', ControllerProgramaEmpreendedores.listaAdmin)
Router.post('/plano/caracteristica/cadastrar', ControllerPlanoCaracteristicas.cadastrarCaracteristica)
Router.delete('/plano/caracteristica/deletar/:id_plano_caracteristica', ControllerPlanoCaracteristicas.deletar)

Router.get('/administrador/relatorio/negocios', ControllerRelatorios.TotalNegocios);



// alteração de dados

Router.put('/plano/alterar/:id_plano', ControllerPlano.alterar);
Router.put('/plano/negocio/alterar/:id_plano_negocio', ControllerPlanoNegocio.alterar);
Router.put('/promocao/alterar/:id_promocao', ControllerPromocao.alterar);
Router.put('/acesso/alterar/:id_acesso', ControllerAcessoSistema.alterar);

Router.put('/negocio/premium/alterar/:id_negocio', ControllerNegocioDados.alterar);

// Upload de arquivos
Router.post('/upload/perfil', multer(multerConfig).single('image_perfil'), ControllerUploads.uploadImagePerfil)

// delete
Router.delete('/negocio/deletar/:id_negocio', ControllerNegocio.deletar);


Router.delete('/plano/negocio/deletar/:id_plano_negocio', ControllerPlanoNegocio.deletar);
Router.delete('/promocao/deletar/:id_promocao', ControllerPromocao.deletar);
Router.delete('/acesso/deletar/:id_acesso', ControllerAcessoSistema.deletar);
Router.delete('/categoria/negocio/deletar/:id_categoria_negocio', ControllerCategoriaNegocio.deletar);
Router.delete('/negocio/premium/deletar/:id_negocio_dados', ControllerCategoriaNegocio.deletar);


module.exports = Router;