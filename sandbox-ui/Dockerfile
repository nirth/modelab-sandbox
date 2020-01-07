FROM tiangolo/node-frontend:10 as build-stage
FROM nginx:1.15

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html


