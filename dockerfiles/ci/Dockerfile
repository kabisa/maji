FROM ruby:2.1

RUN apt-get update && apt-get -y install apt-utils \
           build-essential \
           git-core \
           curl libssl-dev \
           libreadline-dev \
           zlib1g zlib1g-dev \
           libcurl4-openssl-dev \
           libxslt-dev libxml2-dev \
           xvfb \
           nodejs-legacy npm \
           locales

RUN cd /tmp && curl -L https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64.tar.bz2 -o phantomjs.tar.bz2 && tar xjf phantomjs.tar.bz2 && mv /tmp/phantomjs-*/bin/phantomjs /usr/bin/ && rm -r /tmp/phantomjs*

ENV CONTAINER_INIT /usr/local/bin/init-container
RUN echo '#!/usr/bin/env bash' > $CONTAINER_INIT ; chmod +x $CONTAINER_INIT

RUN gem install bundler
RUN bundle config --global path /cache/bundle
RUN echo 'bundle config --global jobs $(cat /proc/cpuinfo | grep -c processor)' >> $CONTAINER_INIT
RUN echo 'Xvfb :0 -ac -screen 0 1024x768x24 >/dev/null 2>&1 &' >> $CONTAINER_INIT

RUN DEBIAN_FRONTEND=noninteractive dpkg-reconfigure locales && \
    locale-gen C.UTF-8 && \
    /usr/sbin/update-locale LANG=C.UTF-8
RUN echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen && locale-gen

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV PHANTOMJS_BIN /usr/bin/phantomjs
