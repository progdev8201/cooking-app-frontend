version: '3'

services:
  cooking-app:
    image: orewaprogdev13/cooking-appaws
    ports:
      - 80:80
