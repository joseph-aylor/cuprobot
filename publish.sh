cd ..
rm -r cuprobot-prod
cp -r cuprobot-dev cuprobot-prod
forever restartall
cd cuprobot-dev
