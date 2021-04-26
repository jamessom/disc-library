FROM ruby:2.7.3-alpine

ENV APP_HOME /dl_app
ENV BUNDLE_PATH ${APP_HOME}/vendor/.dl_gems

ENV DEV_PACKAGES="build-base postgresql-dev git tzdata"

RUN apk --update --upgrade add ${DEV_PACKAGES} && rm -rf /var/cache/apk/*

RUN mkdir -p ${APP_HOME}
WORKDIR ${APP_HOME}

COPY Gemfile* ${APP_HOME}/

RUN bundle config set --local path ${BUNDLE_PATH}
RUN bundle config set --local clean 'true'

RUN bundle install --jobs $(nproc)

ADD . ${APP_HOME}