#!/bin/sh

# Replace env in app.*.js
for file in /usr/share/nginx/html/js/app.*.js;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi

  envsubst '$VUE_APP_BASE_URI' < $file.tmpl.js > $file
  envsubst '$VUE_APP_API_BASE_URL' < $file > $file
  envsubst '$VUE_APP_AVATAR_BASE_URL' < $file > $file
done

# Replace env in index.html
if [ -z "${VUE_APP_CSP_HOSTS}" ]]; then
  echo "VUE_APP_CSP_HOSTS env value is required";
  exit 1;
fi
  
file="/usr/share/nginx/html/index.html";
echo "Processing $file ...";
cp $file $file.tmp

envsubst '$VUE_APP_CSP_HOSTS' < $file.tmp > $file

head_tag="<\/head>"
# Inject extra headers
if [ -z "${VUE_APP_ANALYTICS_GOOGLE_TAG}" ]; then
  echo "VUE_APP_ANALYTICS_GOOGLE_TAG env value is not defined";
else 
  # Inject google analytics
  g_tag='<script>window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga("create", "'$VUE_APP_ANALYTICS_GOOGLE_TAG'", "auto");ga("send", "pageview");<\/script><script async src="https:\/\/www.google-analytics.com\/analytics.js"><\/script>\n'$head_tag
  sed -i "s/$head_tag/$g_tag/g" $file
fi

echo "Starting Nginx"
nginx -g 'daemon off;'