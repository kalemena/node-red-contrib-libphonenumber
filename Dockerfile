FROM kalemena/node-red:2.1.1

ADD [ "package.json", "phonenumber.*", "LICENSE", "example", "/opt/node-red-contrib-libphonenumber/" ]

USER root

RUN npm i \
        /opt/node-red-contrib-libphonenumber

USER nodered