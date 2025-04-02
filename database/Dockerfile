FROM postgres:16

COPY ./init.sql /docker-entrypoint-initdb.d/
COPY ./insert_data.sql /docker-entrypoint-initdb.d/

EXPOSE 5432