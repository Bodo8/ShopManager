# Budowa aplikacji Angular
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

# Kopiujemy resztę kodu
COPY . .

# Budujemy frontend w trybie produkcyjnym
RUN npm run build --prod

# Etap do "przechowywania" statycznych plików
FROM busybox AS frontend-files
WORKDIR /usr/share/frontend
COPY --from=build /app/dist/zarzadzanie-cenami .