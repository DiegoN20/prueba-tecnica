# Etapa de construcción
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# 1. Copiar solo el archivo de configuración de dependencias
COPY pom.xml .

# 2. Descargar las dependencias (esta capa se cacheará si el pom.xml no cambia)
RUN mvn dependency:go-offline -B

# 3. Ahora copiar el código fuente
COPY src ./src

# 4. Compilar el proyecto (usará las librerías ya descargadas)
RUN mvn clean package -DskipTests

# Etapa de ejecución
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiar el jar generado desde la etapa anterior
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]