# Pasos a seguir para completar un flujo de deployment completo a AWS utilizando Serverless framework + CircleCi
cperez@10pines.com

1. Instalar Serverless framework y crear un serverless project: https://github.com/AnomalyInnovations/serverless-nodejs-starter
2. Crear una cuenta de AWS
https://aws.amazon.com/
3. Subir el proyecto inicial a un repo de github
https://github.com/
4. Crear cuenta de CircleCi
https://circleci.com/
5. Linkear repo de github a CircleCi
6. Crear access & secret key en AWS
https://console.aws.amazon.com/iam/home?region=us-east-1#/security_credentials
7. Linkear CircleCi y AWS agregando las keys como env_vars: AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY
https://app.circleci.com/settings/project/github/{user}/{project}/environment-variables
8. Crear las tablas de dynamodb necesarias.
https://console.aws.amazon.com/dynamodb/home?region=us-east-1#tables:
9. Setear las variables de ambiente necesarias
https://console.aws.amazon.com/systems-manager/parameters/?region=us-east-1&tab=Table
