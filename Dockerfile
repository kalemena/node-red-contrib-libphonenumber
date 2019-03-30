FROM kalemena/node-red:latest

ADD . /opt/node-red-contrib-libphonenumber

RUN npm i   /opt/node-red-contrib-libphonenumber;