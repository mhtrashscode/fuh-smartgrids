#!/usr/bin/with-contenv bashio

# this script is executed in context of /app
# debug
pwd
whoami
node --version
echo "Supervisor Token"
echo ${SUPERVISOR_TOKEN}
# run web server
 npm run start
# keep container alive
#sleep infinity



