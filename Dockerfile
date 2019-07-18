FROM kalemena/node-red:latest

ADD [ "package.json", "phonenumber.*", "LICENSE", "example", "/opt/node-red-contrib-libphonenumber/" ]

RUN npm i /opt/node-red-contrib-libphonenumber;