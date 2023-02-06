#!/bin/bash

apiversion="0.0.1-SNAPSHOT"

mkdir -p "deploy/api"
mkdir -p "deploy/web"

set -o pipefail

#Build API
cd "api"
./mvnw clean install | tee ../deploy/buildlog.txt

if (($? != 0))
then
    echo "API build failed, see deploy/buildlog.txt"
    exit 1
fi

#Copy binaries and initial DB to deploy
cp "target/square-$apiversion.jar" "../deploy/api/square-$apiversion.jar"
cp "target/test.mv.db" "../deploy/api/test.mv.db"

#Build web
cd "../web"
yarn run build | tee -a ../deploy/buildlog.txt

if (($? != 0))
then
    echo "Web build failed, see deploy/buildlog.txt"
    exit 1
fi

cp -r build/* ../deploy/web

echo "Deployed ok"