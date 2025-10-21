# Etap 1: Build aplikacji Angular
FROM node:22-alpine AS build

WORKDIR /app

# Kopiowanie plików package.json i package-lock.json
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie reszty plików projektu
COPY . .

# Build aplikacji Angular w trybie produkcyjnym
RUN npm run build --prod

FROM alpine:latest

# Kopiowanie zbudowanej aplikacji
# Angular 19 domyślnie tworzy folder browser/
COPY --from=build /app/dist/zarzadzanie-cenami/browser /app/dist/zarzadzanie-cenami

# Kopiowanie zbudowanej aplikacji z etapu build
# COPY --from=build /app/dist/zarzadzanie-cenami/ /usr/share/nginx/html

# Kontener tylko przechowuje pliki (volume source)
CMD ["tail", "-f", "/dev/null"]