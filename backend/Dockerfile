FROM ubuntu:16.04

MAINTAINER Long Do "longhoangdo16@gmail.com"

RUN apt-get -yqq update
RUN apt-get -yqq install python3
RUN apt-get -yqq install python3-pip python3-dev curl gnupg
RUN pip3 install --upgrade pip

COPY . /app

WORKDIR /app

RUN pip3 install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["python3"]

CMD [ "app.py" ]