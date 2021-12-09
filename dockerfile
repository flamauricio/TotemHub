FROM openjdk:11
COPY cli-aplicacaoTotemHub.jar /TotemHub/
WORKDIR /TotemHub/
ENTRYPOINT ["java","-jar","cli-aplicacaoTotemHub.jar"]