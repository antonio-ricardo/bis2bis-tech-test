# bis2bis-tech-test 🚀
Teste tecnico passando pela bis-2-bis

# Como rodar o projeto 🚀

- instale as dependencias (yarn)

- inicie o servidor (yarn build) obs: precisa estar com o docker rodando no computador

- espere os containers iniciarem e pronto 🚀

# Variáveis de ambiente

- ENVIRONMENT (qual ambiente esta rodando (ex: production))

- PORT (qual porta esta rodando a aplicação)

- REDIS_HOST (o host do redis)

- REDIS_PORT (a porta que o redis esta rodando)

- REDIS_PASSWORD (a senha do redis)

- REDIS_USER (o usuario do redis)

- SECRET_EMAIL (o email que sera utilizado para os envios de email)

- SECRET_PASSWORD (a senha desse email (obs: precisa ser aquelas senhas para app e não a senha do email mesmo e precisa ser um gmail))

- PRIVATE_KEY (a chave secreta para gerar os token de acesso)

- REFRESH_PRIVATE_KEY (a chave secreta para gerar os tokens de renovação)

- CHANGE_PASSWORD_KEY (a chave secreta para gerar os tokens de troca de senha)

- MONGO_HOST (o host do mongo)
