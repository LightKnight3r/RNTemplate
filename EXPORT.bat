if not exist "BUILD" mkdir BUILD
if not exist "BUILD/APK_File" mkdir BUILD/APK_File
set /P pf=Enter product flavor (1:dev/2:pro):
set /P vs=Enter version code:
if %pf%==1 (SET pf_str=dev) else SET pf_str=pro
del android\app\build\outputs\apk\SanShip.zip
del BUILD\APK_File\SanShip-%vs%.apk
copy android\app\build\outputs\apk\app-%pf_str%-release.apk android\app\build\outputs\apk\SanShip.zip
7z.exe a android\app\build\outputs\apk\SanShip.zip META-INF\
zipalign.exe -f -v 4 android\app\build\outputs\apk\SanShip.zip BUILD\APK_File\SanShip-%pf_str%-%vs%.apk