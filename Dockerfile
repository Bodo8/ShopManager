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

# Etap 2: Serwowanie aplikacji przez Nginx (wewnętrzny)
FROM nginx:1.27-alpine

# Usunięcie domyślnej konfiguracji Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Kopiowanie prostej konfiguracji dla wewnętrznego Nginx
COPY nginx/internal.conf /etc/nginx/conf.d/default.conf

# Kopiowanie zbudowanej aplikacji z etapu build
COPY --from=build /app/dist/zarzadzanie-cenami/ /usr/share/nginx/html

# Eksponowanie portu 80 (wewnątrz sieci Docker)
EXPOSE 80

# Uruchomienie Nginx
CMD ["nginx", "-g", "daemon off;"]