set /P pf=Enter product flavor (1:dev/2:pro):
set /P vs=Enter version code:
if %pf%==1 (SET pf_str=dev
            SET pf_str2=Dev)
if %pf%==2 (SET pf_str=pro
            SET pf_str2=Pro)

echo  %pf_str%
echo  %pf_str2%
cd android
del app\build\outputs\apk\pro\release\app-%pf_str%-release-unaligned.apk
del app\build\outputs\apk\pro\release\app-%pf_str%-release.apk
del app\build\outputs\apk\pro\release\SanShip.zip
call gradlew.bat assemble%pf_str2%Release
cd ..
if not exist "BUILD/APK_File" mkdir "BUILD/APK_File"

del BUILD\APK_File\SanShip-%pf_str%-%vs%.apk
copy android\app\build\outputs\apk\pro\release\app-%pf_str%-release.apk android\app\build\outputs\apk\SanShip.zip
7z.exe a android\app\build\outputs\apk\pro\release\SanShip.zip META-INF\
zipalign.exe -f -v 4 android\app\build\outputs\apk\pro\release\SanShip.zip BUILD\APK_File\SanShip-%pf_str%-%vs%.apk
