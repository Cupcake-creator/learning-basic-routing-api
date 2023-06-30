FROM mcr.microsoft.com/mssql/server:latest

ENV SA_PASSWORD=<your_strong_password_here>
ENV ACCEPT_EULA=Y

COPY setup.sql /opt/mssql-tools/bin/
RUN chmod +x /opt/mssql-tools/bin/setup.sql

CMD /opt/mssql/bin/sqlservr
