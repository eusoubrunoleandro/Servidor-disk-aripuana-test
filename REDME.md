# Ações a serem realizadas
- Alterar o modo como é salvo o telefone no momento do cadastro
- Verificar sobre o uso do ID no token de acesso
- Criar rotas autenticadas
- Verificar se irá mudar a forma de tratar erros


# Views que precisam ser criadas antes do servidor estiver rodando

CREATE OR REPLACE VIEW view_acesso_negocio AS
select
neg.id_negocio,
neg.email_acesso,
neg.nome_negocio,
neg.conta_verificada,
neg.token_acesso,
neg.data_verificacao_conta,
acs.senha_acesso,
acs.bloqueado,
acs.data_bloqueio,
acs.motivo_bloqueio,
acs.tipo_acesso
from acesso_sistema AS acs
INNER JOIN negocio AS neg
ON neg.id_negocio = acs.id_negocio;

/*-------------------*/

CREATE OR REPLACE VIEW view_plano_negocio AS
select
negocio.id_negocio,
negocio.nome_negocio,
plano.id_plano,
plano.nome_plano,
plano_negocio.data_adesao,
plano_negocio.comentario,
plano_negocio.data_vencimento,
negocio.email_acesso,
negocio.modo_premium,
negocio.conta_verificada

from plano_negocio
INNER JOIN plano
ON plano_negocio.id_plano = plano.id_plano

INNER JOIN negocio
ON plano_negocio.id_negocio = negocio.id_negocio;

/*-------------------*/

CREATE OR REPLACE VIEW view_negocio_perfil AS
select
neg.id_negocio,
neg.nome_negocio,
neg.modo_premium,
neg.conta_verificada,
cat_neg.id_categoria,
cat.nome_categoria,
negocio_dados.image_perfil,
negocio_dados.descricao_negocio,
negocio_dados.link_site,
negocio_dados.link_instagram,
negocio_dados.link_facebook,
negocio_dados.email_comercial,
negocio_dados.endereco,
negocio_dados.cep,
negocio_dados.cidade,
negocio_dados.uf,
negocio_dados.pais,
negocio_dados.imagem_destaque,
negocio_dados.telefone_1,
negocio_dados.telefone_2,
negocio_dados.telefone_3,
negocio_dados.telefone_4,
neg.email_acesso,
acesso_sistema.bloqueado,
acesso_sistema.motivo_bloqueio
from categoria_negocio AS cat_neg

INNER JOIN negocio AS neg
ON neg.id_negocio = cat_neg.id_negocio

INNER JOIN categoria AS cat
ON cat.id_categoria = cat_neg.id_categoria

INNER JOIN negocio_dados
ON neg.id_negocio = negocio_dados.id_negocio

INNER JOIN acesso_sistema
ON neg.id_negocio = acesso_sistema.id_negocio;

/*-------------------*/

CREATE OR REPLACE VIEW view_negocio_completo AS
select
neg.id_negocio,
neg.nome_negocio,
neg.modo_premium,
neg.conta_verificada,
cat_neg.id_categoria,
cat.nome_categoria,
negocio_dados.image_perfil,
negocio_dados.descricao_negocio,
negocio_dados.link_site,
negocio_dados.link_instagram,
negocio_dados.link_facebook,
negocio_dados.email_comercial,
negocio_dados.endereco,
negocio_dados.cep,
negocio_dados.cidade,
negocio_dados.uf,
negocio_dados.pais,
negocio_dados.imagem_destaque,
negocio_dados.telefone_1,
negocio_dados.telefone_2,
negocio_dados.telefone_3,
negocio_dados.telefone_4,
neg.email_acesso,
acesso_sistema.bloqueado,
acesso_sistema.motivo_bloqueio,
vpn.id_plano,
vpn.nome_plano,
pe.id_negocio AS empreendedor
from categoria_negocio AS cat_neg

INNER JOIN negocio AS neg
ON neg.id_negocio = cat_neg.id_negocio

INNER JOIN categoria AS cat
ON cat.id_categoria = cat_neg.id_categoria

INNER JOIN negocio_dados
ON neg.id_negocio = negocio_dados.id_negocio

INNER JOIN acesso_sistema
ON neg.id_negocio = acesso_sistema.id_negocio

INNER JOIN view_plano_negocio AS vpn
ON cat_neg.id_negocio = vpn.id_negocio

LEFT JOIN programa_empreendedores AS pe
ON cat_neg.id_negocio = pe.id_negocio;

/*-------------------*/

CREATE OR REPLACE VIEW view_categoria_negocio AS
SELECT

catneg.id_categoria,
cat.nome_categoria,
cat.descricao_categoria,
cat.icone_categoria,
catneg.id_negocio

FROM categoria_negocio AS catneg

INNER JOIN categoria as cat
ON catneg.id_categoria = cat.id_categoria;

/*--------------------*/
CREATE OR REPLACE VIEW view_empreendedores AS
select
neg.id_negocio,
neg.nome_negocio,
neg.modo_premium,
neg.conta_verificada,
cat_neg.id_categoria,
cat.nome_categoria,
negocio_dados.image_perfil,
negocio_dados.descricao_negocio,
negocio_dados.link_site,
negocio_dados.link_instagram,
negocio_dados.link_facebook,
negocio_dados.email_comercial,
negocio_dados.endereco,
negocio_dados.cep,
negocio_dados.cidade,
negocio_dados.uf,
negocio_dados.pais,
negocio_dados.imagem_destaque,
negocio_dados.telefone_1,
negocio_dados.telefone_2,
negocio_dados.telefone_3,
negocio_dados.telefone_4,
neg.email_acesso,
acesso_sistema.bloqueado,
acesso_sistema.motivo_bloqueio,
vpn.id_plano,
vpn.nome_plano
from categoria_negocio AS cat_neg

INNER JOIN negocio AS neg
ON neg.id_negocio = cat_neg.id_negocio

INNER JOIN categoria AS cat
ON cat.id_categoria = cat_neg.id_categoria

INNER JOIN negocio_dados
ON neg.id_negocio = negocio_dados.id_negocio

INNER JOIN acesso_sistema
ON neg.id_negocio = acesso_sistema.id_negocio

INNER JOIN view_plano_negocio AS vpn
ON cat_neg.id_negocio = vpn.id_negocio

INNER JOIN programa_empreendedores
ON cat_neg.id_negocio = programa_empreendedores.id_negocio;

/* Acesso a promocao com a imagem de capa */
CREATE OR REPLACE VIEW view_promocao AS
select
p.id_promocao,
p.nome_promocao,
p.descricao_promocao,
p.inicio_promocao,
p.fim_promocao,
p.publicar,
p.imagem_capa_promocao,
ip.url_imagem,
p.id_negocio,
vnc.nome_negocio,
vnc.image_perfil,
vnc.id_categoria,
vnc.nome_categoria,
vnc.bloqueado,
vnc.conta_verificada
from promocao AS p
LEFT JOIN imagens_promocao AS ip
ON p.imagem_capa_promocao = ip.id_imagem_promocao

INNER JOIN view_negocio_completo AS vnc
ON p.id_negocio = vnc.id_negocio


### Acesso inicial

/*Criando o cadastro do administrador*/
insert into negocio
(nome_negocio, email_acesso, conta_verificada, data_verificacao_conta, created_at, updated_at) VALUES
('administrador', 'adm@adm', 'true', '2022-07-11 22:17:00', '2022-07-11 22:17:00', '2022-07-11 22:17:00');

/*Criando dados de acesso*/
insert into acesso_sistema
(id_negocio, senha_acesso, tipo_acesso, created_at, updated_at) VALUES
('1', '$2b$10$GKPPuuGdySuIjGgditJ.QucdR78eDCpoDkve5rAxKuausLhIvNp1a','10', '2022-07-11 22:17:00', '2022-07-11 22:17:00');

/*Criando o primeiro registro de categoria para funcionar os cadastros*/
insert into categoria
(nome_categoria, descricao_categoria, id_negocio_registro, created_at, updated_at) VALUES
('Designer Gráfico', 'Designers gráficos','1', '2022-07-11 22:17:00', '2022-07-11 22:17:00');

/*Criando o plano gratuito*/
insert into plano
(nome_plano, valor, id_negocio_registro, created_at, updated_at) VALUES
('Gratuito', 0, 1, '2022-07-11 22:17:00', '2022-07-11 22:17:00')