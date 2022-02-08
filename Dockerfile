FROM kalemena/node-red:latest

COPY --chown=nodered:nodered [ "package*.json", "phonenumber.*", "LICENSE", "example", "/opt/node-red-contrib-libphonenumber/" ]
RUN cd /opt/node-red-contrib-libphonenumber \
  && rm package-lock.json \
  && npm install \
  && cd /opt/node-red \
  && npm i \
        /opt/node-red-contrib-libphonenumber

# RUN npm i node-red-contrib-libphonenumber
