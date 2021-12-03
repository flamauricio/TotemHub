FROM openjdk:11
COPY cli-login-agente-1.0-SNAPSHOT-jar-with-dependencies.jar /TotemHub/
WORKDIR /TotemHub/
ENTRYPOINT ["java","-jar","cli-login-agente-1.0-SNAPSHOT-jar-with-dependencies.jar"]