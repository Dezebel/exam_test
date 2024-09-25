FROM mongo

WORKDIR /final-exam-database

ADD ./data ./data
ADD ./init.sh ./
RUN chmod +x init.sh

CMD ./init.sh