FROM kalemena/node-red:latest

ADD [ "package.json", "phonenumber.*", "LICENSE", "example", "/opt/node-red-contrib-libphonenumber/" ]

USER root

RUN npm i \
        /opt/node-red-contrib-libphonenumber

USER nodered