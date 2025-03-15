FROM node:16
RUN git clone https://github.com/msgamecoder/vortex-rebirth /root/msgamecoder
WORKDIR /root/msgamecoder
RUN npm install
EXPOSE 3000
CMD ["npm","start" ] 
#msgamecoder
