# Budowa aplikacji Angular
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

# Kopiujemy resztę kodu
COPY . .

# Budujemy frontend w trybie produkcyjnym
RUN npm run build --prod

# ===== Etap serwowania =====
FROM nginx:alpine

# Kopiujemy pliki statyczne z katalogu dist (Angular)
COPY --from=build /app/dist/ZarzadzanieCenami/ /usr/share/nginx/html

# Ustawiamy port, na którym kontener będzie nasłuchiwał
EXPOSE 80

# ENTRYPOINT uruchamia Nginx zawsze, CMD podaje domyślne argumenty
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]