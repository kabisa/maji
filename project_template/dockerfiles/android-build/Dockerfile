FROM ruby:2.1.2

ENV CACHE_DIR /cache

#  Init APT
ENV DEBIAN_FRONTEND noninteractive
RUN dpkg --add-architecture i386
RUN apt-get update -\
  && apt-get -y install apt-utils \
           debian-keyring debian-archive-keyring \
		       build-essential \
		       git-core \
		       curl libssl-dev \
		       libreadline-dev \
		       zlib1g zlib1g-dev \
		       libmysqlclient-dev \
		       libcurl4-openssl-dev \
		       libxslt-dev libxml2-dev \
		       xvfb procps \
		       nodejs-legacy npm \
           libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 wget default-jdk \
           ant

ENV CONTAINER_INIT /usr/local/bin/init-container
RUN echo '#!/usr/bin/env bash' > $CONTAINER_INIT ; chmod +x $CONTAINER_INIT

RUN gem install bundler
RUN bundle config --global path $CACHE_DIR/bundle
RUN echo 'bundle config --global jobs $(cat /proc/cpuinfo | grep -c processor)' >> $CONTAINER_INIT

ENV LANG en_US.UTF-8
ENV GEM_HOME=$CACHE_DIR

ENV JAVA_HOME /usr/lib/jvm/default-java

ENV ANDROID_SDK_VERSION 24.3.3
ENV ANDROID_API_LEVEL android-19
ENV ANDROID_BUILD_TOOLS_VERSION 21.1.2
ENV ANDROID_HOME /opt/android-sdk-linux
ENV PATH ${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
ENV ANDROID_DL_FILE android-sdk_r${ANDROID_SDK_VERSION}-linux.tgz

RUN cd /opt && \
  wget -q http://dl.google.com/android/${ANDROID_DL_FILE} && \
  tar -xzf $ANDROID_DL_FILE && \
  rm $ANDROID_DL_FILE && \
  echo y | android update sdk --no-ui -a \
    --filter tools,platform-tools,${ANDROID_API_LEVEL},build-tools-${ANDROID_BUILD_TOOLS_VERSION}

# Cleanup
RUN rm -rf /var/lib/apt/lists/* && \
  apt-get autoremove -y && \
  apt-get clean
