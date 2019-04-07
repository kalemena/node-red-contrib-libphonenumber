FROM kalemena/node-red:latest

ADD ./libphonenumber /opt/node-red-contrib-libphonenumber

RUN npm i /opt/node-red-contrib-libphonenumber;