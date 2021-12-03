
FROM openjdk:11
COPY cli-aplicacao-TotemHub.jar /TotemHub/
WORKDIR /TotemHub/
ENTRYPOINT ["java","-jar","cli-aplicacao-TotemHub.jar"]
